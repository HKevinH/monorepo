import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IPurchase } from '../../../../../shared/models';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { PurchaseDetailsModalComponent } from '../purchase-details-modal/purchase-details-modal.component';
import { AddPurchaseModalComponent } from '../add-purchase-modal/add-purchase-modal.component';
import { PurchaseService } from '../../services/purchase.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-purchase-cards',
  imports: [CommonModule, MatCardModule, MatDialogModule, MatIconModule],
  templateUrl: './purchase-cards.component.html',
  styleUrls: ['./purchase-cards.component.css'],
  standalone: true,
})
export class PurchaseCardsComponent implements OnInit {
  @Input() purchases: IPurchase[] = [];
  userId: string = '';
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private purchaseService: PurchaseService
  ) {}

  @Output() purchaseClicked = new EventEmitter<any>();

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id') || '';
      if (this.userId) {
        this.fetchPurchases();
      } else {
        console.error('User ID not found in the route parameters.');
      }
    });
  }

  fetchPurchases(): void {
    this.purchaseService.getPurchasesByUserId(this.userId).subscribe({
      next: (data) => {
        this.purchases = data;
        console.log('Purchases fetched successfully:', data);
      },
      error: (err) => {
        console.error('Error fetching purchases:', err);
      },
    });
  }

  openPurchaseDetails(purchase: IPurchase) {
    this.dialog.open(PurchaseDetailsModalComponent, {
      width: '500px',
      data: purchase,
    });
  }

  addPurchase() {
    const dialogRef = this.dialog.open(AddPurchaseModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((newPurchase: IPurchase) => {
      if (newPurchase) {
        const newPurchaseObject: IPurchase = {
          id: newPurchase.id,
          title: newPurchase.title,
          iduser: this.userId,
          totalAmount: newPurchase.totalAmount,
          date: newPurchase.date,
          details: newPurchase.details,
        };
        this.purchaseService.createPurchase(newPurchaseObject).subscribe({
          next: (savedPurchase) => {
            this.purchases = [...this.purchases, newPurchaseObject];
            console.log('Purchase successfully added:', savedPurchase);
          },
          error: (err) => {
            console.error('Error adding purchase:', err);
          },
        });
      } else {
        console.log('No purchase was added.');
      }
    });
  }
}
