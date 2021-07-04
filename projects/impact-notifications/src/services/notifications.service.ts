import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }
  
  getMessages(username: string): Observable < any > {
    const params = new HttpParams().set('username', username);
    const url = `https://localhost:42000/notifications`;
    return this.http.get<any>(url, {params});
  }

  sendMessage(username: string, message: any): Observable<any> {
    const notification = {
      recepient: username,
      notification: message
    };
    const url = `https://localhost:42000/sendNotification`;
    return this.http.post<any>(url, notification);
  }

  updateSenderRecepient(userSender, userRecipient, msg) {
    const notifications = localStorage.getItem('senders-recepients')
    if (notifications != null) {
      const userNotifications = JSON.parse(notifications);
      const indexSender = userNotifications.findIndex(x => x.sender === userSender);
      if (indexSender > -1) {
        const indexRecepient = userNotifications[indexSender].notifications.findIndex(x => x.recipient === userRecipient);
        if (indexRecepient > -1) {
          userNotifications[indexSender].notifications[indexRecepient].messages.push(msg);

        } else {
          userNotifications[indexSender].notifications.push(
              {
                recipient: userRecipient,
                messages: [msg]
              }
          );
        }

      } else {
        userNotifications.push({
          sender: userSender,
          notifications: [
            {
              recipient: userRecipient,
              messages: [msg]
            }
          ]
        });
      }
      localStorage.setItem('senders-recepients', JSON.stringify(userNotifications));
    } else {
      localStorage.setItem('senders-recepients', JSON.stringify([{
        sender: userSender,
        notifications: [
          {
            recipient: userRecipient,
            messages: [msg]
          }
        ]
      }]));
    }

  }
}

