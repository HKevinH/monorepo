import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class AddUserModalComponent {
  name: string = '';
  email: string = '';

  constructor(private dialogRef: MatDialogRef<AddUserModalComponent>) {}

  save(): void {
    console.log('Nombre:', this.name);
    console.log('Correo Electrónico:', this.email);
    if (this.name && this.email) {
      this.dialogRef.close({ name: this.name, email: this.email });
    } else {
      console.error('Both name and email are required!');
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
