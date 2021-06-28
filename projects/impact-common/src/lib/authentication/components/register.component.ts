import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
	templateUrl: 'register.component.html',
	styleUrls: ['register.component.scss']
})

export class RegisterComponent implements OnInit {
	registerForm;
	model = {
		username: '',
		password: '',
		email: ''
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
		},
		{
			key: 'email',
			type: 'input',
			templateOptions: {
				type: 'email',
				label: 'Email',
				placeholder: 'Email',
				required: true,
			},
			validators: {
				email: {
					expression: (c) => !c.value ? true : !Validators.email(c),
					message: `This value is not a valid email.`,
				},
			}
		}
	];

	constructor(private auth: AuthService, private router: Router) {
	}

	ngOnInit() {
		this.registerForm = new FormGroup({});
	}

	register() {
		if (this.registerForm.valid) {
			const data = this.registerForm.value;
			this.auth.register(data.username, data.password, data.email).subscribe(res => {
				console.log(res);
				if (res.staus === 'SUCCESS') { // typo in the mock.config response
					console.log(res);
					// this.postRegister();
				}
				else {
					this.tryAgain(res.message);
				}
			});
		}
	}

	postRegister(): void {
		this.router.navigate(['/dashboard']);
	}

	tryAgain(message: string): void {
		window.alert(message);
	}
}
