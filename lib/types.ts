export interface userData {
    display_name: string,
    email: string,
    product: string,
    external_urls: { spotify: string },
    images: { url: string }[]
}

export interface ArtistContent {
    external_urls: { spotify: string },
    images: Image[],
    name: string,
    popularity: number,
    genres: string[]
}

export interface TrackContent {
    album: { images: Image[] },
    artists: { name: string }[],
    external_urls: { spotify: string },
    name: string,
    preview_url: string
}

interface Image {
    width: number,
    height: number,
    url: string
}

export interface ArtistName {
    name: string
}
