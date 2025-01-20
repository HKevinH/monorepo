import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class NotificationComponent {
  message: string = '';
  visible: boolean = false;
  type: 'success' | 'error' | 'warning' | 'info' = 'success';

  show(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'success'
  ): void {
    this.message = message;
    this.type = type;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, 3000);
  }
}
