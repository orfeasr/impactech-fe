import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private UserDetails = {
		email: '',
		password: '',
		username: ''
	};

	constructor(private http: HttpClient) {}


	get userDetails() {
		return this.UserDetails;
	}

	set userDetails(profile) {
		this.UserDetails = profile;
	}

	register(username, password, email): Observable<any> {
		const url = `https://localhost:42000/register`;
		const body = {
			username,
			password,
			email
		};
		return this.http.post<any>(url, body);
	}

	logIn(username, password): Observable<any> {
		const url = `https://localhost:42000/login`;
		const body = {
			username,
			password
		};
		return this.http.post<any>(url, body);
	}


}
