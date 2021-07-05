import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  updateProfile(curentUser: string, userProfile: any): Observable<any> {
    const params = {
      curentUser,
      profile: userProfile
    };
    const url = `https://localhost:42000/updateUser`;
    return this.http.put<any>(url, params);
  }
}
