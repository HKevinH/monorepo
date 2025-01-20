import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NotificationComponent } from '../notification/notification.component';
import { ViewChild } from '@angular/core';

import type { IUser } from '../../../../../shared/models';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    NotificationComponent,
  ],
  styleUrls: ['./user-table.component.css'],
  standalone: true,
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'id', 'actions'];
  @ViewChild(NotificationComponent) notification!: NotificationComponent;

  users = new MatTableDataSource<IUser>([]);
  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.data = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.showError('Error fetching users.');
      },
    });
  }

  onUserClick(user: IUser) {
    this.router.navigate(['/users', user.id]);
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newUser: Partial<IUser> = {
          name: result.name,
          email: result.email,
        };

        console.log('New user data from modal:', newUser);

        this.userService.addUser(newUser).subscribe({
          next: (user) => {
            this.users.data = [...this.users.data, user];
            this.showMessage('User added successfully!');
          },
          error: (res) => {
            console.error('Error adding user:', res);
            this.showError(res.error.message);
          },
        });
      } else {
        console.log('Modal was closed without data.');
      }
    });
  }

  deleteUser(id: string, event: Event): void {
    event.stopPropagation();
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users.data = this.users.data.filter((user) => user.id !== id);
        this.showMessage('User deleted successfully!');
      },
      error: (res) => {
        this.showError(res.error.message);
      },
      complete: () => {
        console.log('User deletion process completed.');
      },
    });
  }

  showMessage(message: string): void {
    this.notification.show(message, 'success');
  }

  showError(error: string): void {
    console.log('Error:', error);
    this.notification.show(error, 'error');
  }
}
