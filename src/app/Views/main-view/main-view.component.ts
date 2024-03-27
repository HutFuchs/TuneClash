import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LastfmService } from '../../services/lastfm.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { LastFmArtist, LastFmArtistDetails } from '../../../assets/interfaces/lastfm';
import { HelperService } from '../../services/helper.service';
import { MatListModule } from '@angular/material/list';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { DetailViewComponent } from '../detail-view/detail-view.component';

@Component({
	selector: 'app-main-view',
	standalone: true,
	imports: [MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon, MatSelectModule, CommonModule, MatTableModule, MatListModule, DetailViewComponent, SearchbarComponent],
	templateUrl: './main-view.component.html',
	styleUrl: './main-view.component.sass',
})
export class MainViewComponent implements OnInit {
	searchValue = '';
	selectetCountry = 'germany';
	topArtists: LastFmArtist[] = [];
	detailedArtist: LastFmArtistDetails['artist'] | null = null;
	displayedColumns: string[] = ['rank', 'name', 'listeners', 'image'];
	countries = [
		{ name: 'Deutschland', code: 'germany' },
		{ name: 'USA', code: 'United States' },
		{ name: 'Großbritannien', code: 'United Kingdom' },
	];

	constructor(private lastfmService: LastfmService, public helperService: HelperService) {}

	// Initializes the component by loading the top artists for Germany.
	ngOnInit(): void {
		this.loadTopArtists('germany');
	}

	// Fetches top artists for a specified country from the Last.fm service and updates the topArtists property
	loadTopArtists(country: string): void {
		this.lastfmService.getTopArtists(country).subscribe((data) => {
			this.topArtists = data.topartists.artist;
		});
	}

	// Selects an artist, retrieves detailed information, and scrolls to the main wrapper element.
	selectArtist(name: string): void {
		const scoreboardElement = document.getElementById('main-wrapper');
		this.lastfmService.getArtistInfo(name).subscribe((data) => {
			this.detailedArtist = data.artist;
		});
		if (scoreboardElement) scoreboardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Updates the detailedArtist property with the selected artist's data.
	handleSearchResult(artist: any): void {
		this.detailedArtist = artist;
	}

	// Sets a default image if there's an error loading an artist's image.
	handleImageError(data: any) {
		data.image[2]['#text'] = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
	}
}
