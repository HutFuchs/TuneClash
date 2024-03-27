export interface LastFmArtist {
	name: string;
	listeners: string;
	mbid: string;
	url: string;
	streamable: string;
	image: LastFmImage[];
}

export interface LastFmArtistDetails {
	artist: {
		name: string;
		mbid: string;
		url: string;
		image: LastFmImage[];
		stats: {
			listeners: string;
			playcount: string;
		};
		bio: {
			summary: string;
			content: string;
		};
		tags: { tag: { name: string; url: string }[] };
	};
}

export interface LastFmImage {
	'#text': string;
	size: string;
}

export interface TopArtistsResponse {
	topartists: {
		artist: LastFmArtist[];
	};
}

export interface LastFmArtistSearchResults {
	results: {
		artistmatches: {
			artist: LastFmArtist[];
		};
		'@attr': {
			for: string;
		};
		'opensearch:totalResults': string;
		'opensearch:startIndex': string;
		'opensearch:itemsPerPage': string;
	};
}

export interface LastFmAlbum {
	name: string;
	playcount: number;
	url: string;
	artist: {
		name: string;
		mbid: string;
		url: string;
	};
	image: Array<{
		'#text': string;
		size: string;
	}>;
}

export interface LastFmArtistAlbums {
	topalbums: {
		album: LastFmAlbum[];
		'@attr': {
			artist: string;
			page: string;
			perPage: string;
			totalPages: string;
			total: string;
		};
	};
}
