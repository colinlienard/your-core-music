import { useReducer } from "react";
import { ArtistContent, TrackContent } from "../types";

type RankingList = Array<{
    id: string,
    rank: number
}>

type ArtistsRankingAction = {
    type: "artist",
    value: ArtistContent[]
}

const artistsRankingReducer = (state: ArtistContent[], action: ArtistsRankingAction) => {
    switch(action.type) {
        case "artist":
            return [];
    }
}

const useRank = (array: ArtistContent[] | TrackContent) => {
    const [artistsRanking, dispatchArtistsRanking] = useReducer(artistsRankingReducer, []);
    // setArtistsRanking((artistsRanking: RankingList) => [...artistsRanking, { id: artist.id, rank: index }]);

    return [artistsRanking, dispatchArtistsRanking];
}

export default useRank;