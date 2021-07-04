import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { AuthService } from '../../../../impact-common/src/lib/authentication/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recentMessages;

  constructor(
    private notifications: NotificationsService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    const user = this.auth.userDetails.username;
    this.notifications.getMessages(user).subscribe(
      res => {
        const totalNumOfMessages = res.length;
        this.recentMessages = res.slice(totalNumOfMessages - 10, totalNumOfMessages);
      }
    );
  }

}
