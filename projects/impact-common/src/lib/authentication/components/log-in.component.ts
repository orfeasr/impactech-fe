import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
	selector: 'imp-log-in',
	templateUrl: 'log-in.component.html',
	styleUrls: ['log-in.component.scss']
})

export class LogInComponent implements OnInit {
	loginForm;
	model = {
		username: '',
		password: ''
	};
	fields: FormlyFieldConfig[] = [
		{
			key: 'username',
			type: 'input',
			templateOptions: {
				label: 'Username',
				placeholder: 'Username',
				required: true,
			}
		},
		{
			key: 'password',
			type: 'input',
			templateOptions: {
				label: 'Password',
				placeholder: 'Password',
				required: true,
			}
		}
	];

	constructor(private auth: AuthService, private router: Router) {
	}

	ngOnInit() {
		this.loginForm = new FormGroup({});
	}

	onSubmit() {
		if (this.loginForm.valid) {
			const data = this.loginForm.value;
			this.auth.logIn(data.username, data.password).subscribe(res => {
				console.log(res);
				if (res.authenticated) {
					// this.postLogIn();
					console.log(res);
				}
				else {
					this.tryAgain();
				}
			});
		}
	}

	postLogIn(): void {
		this.router.navigate(['/dashboard']);
	}

	tryAgain(): void {
		window.alert('Incorrect Username or Password. Please try again.');
	}
}
