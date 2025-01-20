import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IProduct } from '../../../../../shared/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-add-purchase-modal',
  templateUrl: './add-purchase-modal.component.html',
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  styleUrls: ['./add-purchase-modal.component.css'],
  standalone: true,
})
export class AddPurchaseModalComponent {
  title: string = '';
  totalAmount: number | null = null;
  date: string = '';
  details: {
    description: string;
    products: IProduct[];
    dateTime: Date;
    status: 'completed' | 'pending' | 'cancelled';
  } = {
    description: '',
    products: [],
    dateTime: new Date(),
    status: 'pending',
  };

  constructor(private dialogRef: MatDialogRef<AddPurchaseModalComponent>) {}

  addProduct(): void {
    this.details.products = [
      ...this.details.products,
      {
        name: '',
        quantity: 0,
        unitPrice: 0,
      },
    ];
  }

  removeProduct(index: number): void {
    this.details.products.splice(index, 1);
  }

  save(): void {
    if (
      this.title &&
      this.totalAmount &&
      this.date &&
      this.details &&
      this.details.products.length > 0
    ) {
      const purchase = {
        id: Math.random().toString(36).substring(2),
        title: this.title,
        totalAmount: this.totalAmount,
        date: new Date(this.date),
        details: this.details,
      };

      this.dialogRef.close(purchase);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
