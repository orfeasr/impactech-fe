import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { AuthService } from '../../../../impact-common/src/lib/authentication/auth.service';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recentMessages;
  notificationsData = [];
  frequentUsers;
  dataSource: any;
  columnsToDisplay = ['user', 'messages'];


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
    this.notificationsData = this.createNotificationsData();
    this.frequentUsers = this.notificationsData.sort((a, b) => {
      return (a.value > b.value) ? -1 : 1;
    });
    this.dataSource = new MatTableDataSource(this.frequentUsers);
  }

  createNotificationsData(): any[] {
    const user = this.auth.userDetails.username;
    const notifications = localStorage.getItem('senders-recepients');
    const data = [];
    if (notifications != null) {
      const userNotifications = JSON.parse(notifications);
      const indexSender = userNotifications.findIndex(x => x.sender === user);
      if (indexSender > -1) {
        userNotifications[indexSender].notifications.forEach(x => {
          const name = x.recipient;
          const value = x.messages.length;
          data.push({
            name,
            value
          });
          
        });
      }
    }
    return data;
  }




}
