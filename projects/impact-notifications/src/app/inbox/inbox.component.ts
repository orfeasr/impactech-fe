import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { AuthService } from '../../../../impact-common/src/lib/authentication/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NewMessageDialogComponent } from './new-message-dialog/new-message-dialog.component';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  messages;

  constructor(
    private notifications: NotificationsService,
    private auth: AuthService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    const user = this.auth.userDetails.username;
    this.notifications.getMessages(user).subscribe(
      res => {
        this.messages = res;
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewMessageDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.notifications.sendMessage(result.username, result.message).subscribe(
        res => {
          console.log(res);
        }
      );
    });
  }

}
