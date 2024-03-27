import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env.json';
import { Observable } from 'rxjs';
import { TopArtistsResponse, LastFmArtistSearchResults, LastFmArtistDetails, LastFmArtistAlbums } from '../../assets/interfaces/lastfm';

const apiKey = environment.lastfmkey;

@Injectable({
	providedIn: 'root',
})
export class LastfmService {
	constructor(private http: HttpClient) {}

	private baseUrl = 'https://ws.audioscrobbler.com/2.0/';

	// Searches for artists on Last.fm matching the searchTerm, limited to a specified number or 3 by default, and returns the results.
	searchArtists(searchTerm: string, limit: number = 3): Observable<LastFmArtistSearchResults> {
		const url = `${this.baseUrl}?method=artist.search&artist=${encodeURIComponent(searchTerm)}&api_key=${apiKey}&limit=${limit}&format=json`;
		return this.http.get<LastFmArtistSearchResults>(url);
	}

	// Retrieves detailed information about an artist from Last.fm using the artist's name.
	getArtistInfo(artistName: string): Observable<any> {
		const url = `${this.baseUrl}?method=artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`;
		return this.http.get(url);
	}

	// Fetches the top artists for a specified country from Last.fm, limited to a specified number or 10 by default.
	getTopArtists(country: string, limit: number = 10): Observable<TopArtistsResponse> {
		const url = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=${apiKey}&limit=${limit}&format=json`;
		return this.http.get<TopArtistsResponse>(url);
	}

	// Gets detailed information about an artist from Last.fm, similar to getArtistInfo but with typed response.
	getArtistDetails(artistName: string): Observable<LastFmArtistDetails> {
		const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`;
		return this.http.get<LastFmArtistDetails>(url);
	}

	// Retrieves the top albums for an artist from Last.fm, limited to a specified number or 10 by default.
	getArtistAlbums(artistName: string, limit: number = 10): Observable<LastFmArtistAlbums> {
		const url = `${this.baseUrl}?method=artist.gettopalbums&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&limit=${limit}&format=json`;
		return this.http.get<LastFmArtistAlbums>(url);
	}
}
