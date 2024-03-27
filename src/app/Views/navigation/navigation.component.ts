import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
	selector: 'app-navigation',
	standalone: true,
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.sass',
	imports: [MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon, MatSidenavModule, MatListModule, CommonModule],
})
export class NavigationComponent {
	sidenavMode: string = 'side';
	constructor(private router: Router) {}

	//  Navigates to the specified route.
	navigateTo(route: string): void {
		this.router.navigate(['/' + route]);
	}

	//  Determines whether the current route is active.
	isActive(url: string): boolean {
		return this.router.url === url;
	}
}
