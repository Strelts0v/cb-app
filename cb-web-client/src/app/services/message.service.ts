import { Injectable } from '@angular/core';
import { NotificationDialogComponent } from '../modules/components/notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public dialog: MatDialog) {}

  add(message: string) {
    console.log(message);
  }

  notify(message: string) {
    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      width: '250px',
      data: {message: message}
    });
  }
}
