import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { MatTableModule } from '@angular/material/table';
import { HelperService } from '../../services/helper.service';

interface ArtistProperties {
	Listeners: string;
	Playcount: string;
	'Bio-Length': number;
	Image: string;
	Name: string;
}

interface Artists {
	left: ArtistProperties | null;
	right: ArtistProperties | null;
}

@Component({
	selector: 'app-versus',
	standalone: true,
	imports: [CommonModule, SearchbarComponent, MatTableModule],
	templateUrl: './versus.component.html',
	styleUrl: './versus.component.sass',
	animations: [
		trigger('expandCollapse', [
			state(
				'expanded',
				style({
					height: '*', // expandiere auf die natürliche Höhe
					opacity: 1, // voll sichtbar
					visibility: 'visible',
				})
			),
			state(
				'collapsed',
				style({
					height: '0', // kollabiere zu Höhe 0
					opacity: 0, // voll sichtbar
					visibility: 'hidden',
				})
			),
			transition('expanded <=> collapsed', [
				animate('0.3s {{delay}}s ease-in-out', style({ opacity: '*' })), // Anpassung der Verzögerung
				animate('0.3s {{delay}}s ease-in-out'),
			]),
		]),
	],
})
export class VersusComponent {
	Artists: any = { left: null, right: null };
	properties = ['Listeners', 'Playcount', 'Bio-Length'];
	animationState = new Array(this.properties.length).fill('collapsed');

	constructor(public HelperService: HelperService) {}

	// Reagiert auf das Suchergebnis: Erstellt die Eigenschaften für den Künstler und startet die Animation.
	handleSearchResult(artist: any, left: boolean): void {
		if (this.Artists.left && this.Artists.right) this.toggleAnimation(false);
		if (left) this.Artists.left = this.createProperties(artist);
		else this.Artists.right = this.createProperties(artist);
		console.log(this.Artists);
		if (this.Artists.left && this.Artists.right) this.toggleAnimation(true);
	}

	// Behandelt Lade- und Anzeigefehler für Bilder.
	handleImageError(data: any) {
		if (data) data.Image = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
	}

	// Erstellt die Eigenschaften für einen Künstler.
	createProperties(artist: any): any {
		const { stats, bio, image, name } = artist;
		return {
			Listeners: stats.listeners,
			Playcount: stats.playcount,
			'Bio-Length': bio.summary.length,
			Image: image[2]['#text'],
			Name: name,
		};
	}

	// Gibt das Vergleichszeichen zurück.
	sign(left: number, right: number): string {
		if (left > right) return '>';
		if (left < right) return '<';
		return '=';
	}

	// Startet die Animation.
	toggleAnimation(expand: boolean): void {
		const isExpanding = this.animationState.some((state) => state === 'collapsed');

		if (expand) {
			for (let i = 0; i < this.animationState.length; i++) {
				// Berechne die Verzögerung abhängig davon, ob wir expandieren oder kollabieren
				const delay = isExpanding ? (this.animationState.length - i - 1) * 100 : i * 100;

				setTimeout(() => {
					this.animationState[i] = this.animationState[i] === 'expanded' ? 'collapsed' : 'expanded';
					// Spread Operator, um eine neue Instanz des Arrays zu erstellen und Change Detection auszulösen
					this.animationState = [...this.animationState];
				}, delay);
			}
		}

		if (!expand) {
			for (let i = this.animationState.length; i > -1; i--) {
				// Berechne die Verzögerung abhängig davon, ob wir expandieren oder kollabieren
				const delay = isExpanding ? (this.animationState.length - i - 1) * 100 : i * 100;

				setTimeout(() => {
					this.animationState[i] = this.animationState[i] === 'expanded' ? 'collapsed' : 'expanded';
					// Spread Operator, um eine neue Instanz des Arrays zu erstellen und Change Detection auszulösen
					this.animationState = [...this.animationState];
				}, delay);
			}
		}
	}
}
