import { ArtistName } from "../types";

const splitArtists = (artists: ArtistName[]) => {
    if(artists.length === 1) {
        return artists[0].name;
    }
    let result = "";
    artists.forEach(artist => {
        if(result.length === 0) {
            result = artist.name;
        } else {
            result = `${result}, ${artist.name}`;
        }
    });
    return result;
}

export default splitArtists;