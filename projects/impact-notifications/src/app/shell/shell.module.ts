import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ShellComponent } from './shell.component';
import { DashboardComponent } from '../dashboard/dashboard.component';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

const routes: Routes = [
	{
		path: 'shell', component: ShellComponent,
		children: [
			{ path: '', component: DashboardComponent, pathMatch: 'full' },
		]
	},
];

@NgModule({
	declarations: [
		ShellComponent,
		DashboardComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		MatToolbarModule,
		MatListModule,
		MatSidenavModule
	],
	providers: []
})
export class ShellModule {
}