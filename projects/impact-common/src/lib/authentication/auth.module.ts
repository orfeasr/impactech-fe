import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in.component';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './components/register.component';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


import { HttpClientModule } from '@angular/common/http';



const routes: Routes = [
	{ path: 'log-in', component: LogInComponent, canActivate: [] }, // UnauthGuard
	{ path: 'register', component: RegisterComponent, canActivate: [] } // UnauthGuard
];


@NgModule({
	declarations: [
		LogInComponent,
		RegisterComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		FormlyModule.forRoot({
			validationMessages: [
				{ name: 'required', message: 'This field is required' }
			]
		}),
		FormlyMaterialModule,
		MatCardModule,
		MatDividerModule,
		MatButtonModule,
		HttpClientModule
	],
	providers: [
		AuthService,
	], exports: [
		LogInComponent,
		RegisterComponent,
	]
})

export class AuthModule {
}


export { AuthService };
