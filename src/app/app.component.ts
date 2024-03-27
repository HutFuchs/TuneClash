import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './Views/navigation/navigation.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavigationComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.sass',
})
export class AppComponent {
	title = 'tuneclash';
}
