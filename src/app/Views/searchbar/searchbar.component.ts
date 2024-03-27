import { Component, Output, EventEmitter } from '@angular/core';
import { LastFmArtist, LastFmArtistDetails } from '../../../assets/interfaces/lastfm';
import { LastfmService } from '../../services/lastfm.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

@Component({
	selector: 'app-searchbar',
	standalone: true,
	imports: [MatInputModule, MatIcon, MatButtonModule, MatSelectModule, CommonModule, MatListModule],
	templateUrl: './searchbar.component.html',
	styleUrl: './searchbar.component.sass',
})
export class SearchbarComponent {
	searchValue = '';
	searchResults: LastFmArtist[] = [];
	selectedArtist: LastFmArtist | null = null;
	isSearchFocused: boolean = false;
	detailedArtist: LastFmArtistDetails['artist'] | null = null;
	@Output() searchResult = new EventEmitter<LastFmArtistDetails['artist'] | null>();

	constructor(private lastfmService: LastfmService) {}

	// Selects an artist from the search results and sets it as the selected artist.
	selectArtist(artist: LastFmArtist): void {
		this.selectedArtist = artist;
	}

	// Updates the search value and fetches search results from the Last.fm service.
	updateSearchValue(event: Event): void {
		const target = event.target as HTMLInputElement;
		if (target) {
			this.searchValue = target.value;
			this.lastfmService.searchArtists(this.searchValue).subscribe((data) => {
				this.searchResults = data.results ? data.results.artistmatches.artist : [];
			});
		}
	}

	// Searches for an artist by name and fetches detailed information from the Last.fm service.
	searchArtist(event?: Event, artist?: LastFmArtist): void {
		if (event) event.preventDefault();
		if (artist) {
			this.detailedArtist = null;
			this.lastfmService.getArtistInfo(artist.name).subscribe((data) => {
				this.detailedArtist = data.artist;
				this.searchResult.emit(this.detailedArtist);
			});
		} else if (this.searchResults[0]) {
			this.detailedArtist = null;
			this.lastfmService.getArtistInfo(this.searchResults[0].name).subscribe((data) => {
				this.detailedArtist = data.artist;
				this.searchResult.emit(this.detailedArtist);
			});
		}
		this.searchValue = '';
	}
}
