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
}

