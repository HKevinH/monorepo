import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PurchaseService } from '../../services/purchase.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  standalone: true,
  selector: 'app-purchase-details-modal',
  templateUrl: './purchase-details-modal.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatListModule,
    MatButtonModule,
  ],

  styleUrls: ['./purchase-details-modal.component.css'],
})
export class PurchaseDetailsModalComponent {
  statuses: Array<'completed' | 'pending' | 'cancelled'> = [
    'completed',
    'pending',
    'cancelled',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public purchase: any,
    private dialogRef: MatDialogRef<PurchaseDetailsModalComponent>,
    private purchaseService: PurchaseService
  ) {}

  updateStatus(event: Event) {
    const target = event.target as HTMLSelectElement;
    const status = target.value;

    const updatedPurchase = {
      ...this.purchase,
      details: { ...this.purchase.details, status },
    };

    this.purchaseService
      .updatePurchase(updatedPurchase.id, updatedPurchase)
      .subscribe({
        next: () => {
          this.purchase.details.status = status;
          alert('Estado actualizado correctamente.');
        },
        error: (err) => {
          console.error('Error al actualizar el estado:', err);
          alert('No se pudo actualizar el estado.');
        },
      });
  }

  deletePurchase() {
    this.purchaseService.deletePurchase(this.purchase.id).subscribe({
      next: () => {
        this.dialogRef.close({ deleted: true });
        location.reload();
      },
      error: (err) => {
        console.error('Error al eliminar la compra:', err);
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
