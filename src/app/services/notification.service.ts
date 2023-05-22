import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string): void {
    this.showNotification(message, 'success');
  }

  showError(message: string): void {
    this.showNotification(message, 'error');
  }

  showInfo(message: string): void {
    this.showNotification(message, 'info');
  }

  showWarning(message: string): void {
    this.showNotification(message, 'warning');
  }

  private showNotification(message: string, panelClass: string): void {
    const config: MatSnackBarConfig = {
      duration: 5000, // Display duration in milliseconds
      panelClass: ['notification', panelClass], // Additional CSS classes for styling
      verticalPosition: 'top', // Position of the snackbar
    };

    this.snackBar.open(message, '', config);
  }
}
