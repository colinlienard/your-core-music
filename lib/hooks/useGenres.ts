export default function useGenres(artists: { genres: string[] }[]) {
    let object: any = {};

    artists.forEach(artist => {
        artist.genres.forEach(genre => {
            object[genre] = (object[genre] || 0) + 1;            
        });
    });
    
    const array = Object.keys(object).sort((a, b) => { return object[b] - object[a] });

    const result = array.splice(0, 5);
    
    return result;
}