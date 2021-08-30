import { useReducer } from "react";
import { ArtistContent, TrackContent } from "../types";

type RankingList = Array<{
    id: string,
    rank: number
}>

type RankingAction = { type: "artist", id: string, position: number } |
                     { type: "track", id: string, position: number }

const rankingReducer = (state: ArtistContent[] | TrackContent[], action: RankingAction) => {
    switch(action.type) {
        case "artist":
            console.log(action.id, action.position);
            
            return [];
        case "track":
            return [];
    }
}

const useRank = (array: ArtistContent[] | TrackContent[]) => {
    const [ranking, dispatchRanking] = useReducer(rankingReducer, []);
    // setArtistsRanking((artistsRanking: RankingList) => [...artistsRanking, { id: artist.id, rank: index }]);

    return [ranking, dispatchRanking] as const;
}

export default useRank;