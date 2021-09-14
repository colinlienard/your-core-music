import { GenreList } from "../types";

const useGenres = (artists: { genres: string[] }[]) => {
    let object: any = {};

    artists.forEach(artist => {
        artist.genres.forEach(genre => {
            object[genre] = (object[genre] || 0) + 1;            
        });
    });
    
    const array = Object.keys(object).sort((a, b) => { return object[b] - object[a] }).splice(0, 5);

    // const result = array.splice(0, 5);

    let result: GenreList = [];
    
    array.forEach(element => {
        result = [...result, { id: element }];
    });
    
    return result;
}

export default useGenres;