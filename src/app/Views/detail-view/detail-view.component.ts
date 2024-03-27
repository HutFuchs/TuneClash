import { Component, OnChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { LastfmService } from '../../services/lastfm.service';
import { LastFmArtistDetails, LastFmArtistAlbums } from '../../../assets/interfaces/lastfm';
import { HelperService } from '../../services/helper.service';

@Component({
	standalone: true,
	selector: 'app-detail-view',
	imports: [CommonModule, MatTabsModule],
	templateUrl: './detail-view.component.html',
	styleUrls: ['./detail-view.component.sass'],
})
export class DetailViewComponent implements OnChanges {
	@Input() artist: LastFmArtistDetails['artist'] | undefined;
	bioParagraphs: string[] = [];
	topAlbums: LastFmArtistAlbums['topalbums']['album'] = [];

	constructor(private lastfmService: LastfmService, private route: ActivatedRoute, public helperService: HelperService) {}

	// Responds to input changes: Trims the artist's bio and summary at the first link, then loads albums and creates bio paragraphs.
	ngOnChanges(): void {
		if (this.artist) {
			let biocut = this.artist.bio.content.indexOf('<a href=');
			let sumcut = this.artist.bio.summary.indexOf('<a href=');
			this.artist.bio.content = this.artist.bio.content.substring(0, biocut);
			this.artist.bio.summary = this.artist.bio.summary.substring(0, sumcut);
			this.createBioParagraphs(this.artist.bio.content);
			this.loadTopAlbums(this.artist.name);
		}
	}

	// Fetches top albums for a given artist from the Last.fm service and updates the topAlbums property.
	loadTopAlbums(country: string): void {
		this.lastfmService.getArtistAlbums(country).subscribe((data) => {
			this.topAlbums = data.topalbums.album;
		});
	}

	// Handles image loading errors by setting a default image for the album.
	handleImageError(album: any) {
		album.image[2]['#text'] = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
	}

	// Splits the bio into random-length paragraphs ranging from 2 to 5 sentences and adds them to bioParagraphs.
	createBioParagraphs(bio: string): void {
		const sentences = bio.split('. ').filter((sentence) => sentence.trim() !== '');
		while (sentences.length > 0) {
			const paragraphLength = this.getRandomInt(2, 6); // Generiert eine zufällige Zahl zwischen 2 und 5
			const paragraph = sentences.splice(0, paragraphLength).join('. ') + '.';
			this.bioParagraphs.push(paragraph);
		}
	}

	// Generates a random integer between the min (inclusive) and max (exclusive) values.
	getRandomInt(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); //Die maximale ist exklusiv und die minimale ist inklusiv
	}
}
