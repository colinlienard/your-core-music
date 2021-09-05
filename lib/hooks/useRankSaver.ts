import { Reducer, useEffect, useReducer } from "react";
import { ArtistContent, RankList, TrackContent } from "../types";

type RankingAction = { type: "add", value: ArtistContent[] | TrackContent[], contentType: "artists" | "tracks", timeLimit: string } |
                     { type: "changeTime", value: ArtistContent[] | TrackContent[], contentType: "artists" | "tracks", timeLimit: string }

const rankingReducer: Reducer<RankList, RankingAction> = (state, action) => {
    switch(action.type) {
        case "add":
            let addedContent: RankList = state;
            action.value.forEach((element) => addedContent = [...addedContent, element.id]);
            document.cookie = `${action.contentType}Ranks_${action.timeLimit}=${JSON.stringify(addedContent)}`;
            return addedContent;
        case "changeTime":
            let newContent: RankList = [];
            action.value.forEach((element) => newContent = [...newContent, element.id]);
            document.cookie = `${action.contentType}Ranks_${action.timeLimit}=${JSON.stringify(newContent)}`;
            return newContent;
        default:
            throw new Error("The Ranking system has failed.");
    }
}

const useRankSaver = (array: ArtistContent[] | TrackContent[], type: "artists" | "tracks") => {
    let defaultList: RankList = [];
    array.forEach((element) => defaultList = [...defaultList, element.id]);

    const [ranking, dispatchRanking] = useReducer(rankingReducer, defaultList);

    useEffect(() => {
        let ranks = document.cookie.split("; ").find((row) => row.startsWith(`${type}Ranks`))!;
        if(ranks) {
            ranks = ranks.split("=")[1];
            const list: RankList = JSON.parse(ranks);
            if(JSON.stringify(list) === JSON.stringify(defaultList)) {
                return;
            }
        }
        document.cookie = `${type}Ranks_short_term=${JSON.stringify(defaultList)}`;
    }, [])

    return [ranking, dispatchRanking] as const;
}

export default useRankSaver;