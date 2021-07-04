import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ShellComponent } from './shell.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { InboxComponent } from '../inbox/inbox.component';
import { NewMessageDialogComponent } from '../inbox/new-message-dialog/new-message-dialog.component';
import { AuthGuard } from '../../services/auth.guard';


import { FlexLayoutModule } from '@angular/flex-layout';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { NgxChartsModule } from '@swimlane/ngx-charts';





const routes: Routes = [
	{
		path: 'shell', component: ShellComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', component: DashboardComponent, pathMatch: 'full' },
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'profile', component: ProfileComponent },
			{ path: 'inbox', component: InboxComponent },
		]
	},
];

@NgModule({
	declarations: [
		ShellComponent,
		DashboardComponent,
		ProfileComponent,
		InboxComponent,
		NewMessageDialogComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		MatToolbarModule,
		MatListModule,
		MatSidenavModule,
		FlexLayoutModule,
		MatCardModule,
		MatButtonModule,
		MatExpansionModule,
		MatDialogModule,
		MatInputModule,
		MatTableModule,
		FormlyModule.forRoot(),
		FormlyMaterialModule,
		NgxChartsModule
	],
	providers: []
})
export class ShellModule {
}
