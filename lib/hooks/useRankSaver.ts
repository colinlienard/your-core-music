import { Reducer, useEffect, useReducer } from "react";
import { ArtistContent, GenreList, RankList, TrackContent } from "../types";

type RankingAction = { type: "add", value: ArtistContent[] | TrackContent[], contentType: "artists" | "tracks", timeLimit: string } |
                     { type: "changeTime", value: ArtistContent[] | TrackContent[], contentType: "artists" | "tracks", timeLimit: string } |
                     { type: "updateGenres", value: GenreList, timeLimit: string }

const rankingReducer: Reducer<RankList, RankingAction> = (state, action) => {
    switch(action.type) {
        case "add":
            let addedContent: RankList = state;
            action.value.forEach((element) => addedContent = [...addedContent, element.id]);
            const ranks = document.cookie.split("; ").find((row) => row.startsWith(`${action.contentType}Ranks_${action.timeLimit}`))!;
            const list = JSON.parse(ranks.split("=")[1]);
            if(JSON.stringify(list.slice(0, addedContent.length)) !== JSON.stringify(addedContent)) {
                document.cookie = `${action.contentType}Ranks_${action.timeLimit}=${JSON.stringify(addedContent)}; expires=Tue, 19 Jan 2038 04:14:07 GMT`;
            }
            return addedContent;
        case "changeTime":
            let newContent: RankList = [];
            action.value.forEach((element) => newContent = [...newContent, element.id]);
            const newRanks = document.cookie.split("; ").find((row) => row.startsWith(`${action.contentType}Ranks_${action.timeLimit}`))!;
            const newList = JSON.parse(newRanks.split("=")[1]);
            if(JSON.stringify(newList.slice(0, 10)) !== JSON.stringify(newContent)) {
                document.cookie = `${action.contentType}Ranks_${action.timeLimit}=${JSON.stringify(newContent)}; expires=Tue, 19 Jan 2038 04:14:07 GMT`;
            }
            return newContent;
        case "updateGenres":
            let newGenres: RankList = [];
            action.value.forEach((element) => newGenres = [...newGenres, element.id]);
            document.cookie = `genresRanks_${action.timeLimit}=${JSON.stringify(newGenres)}; expires=Tue, 19 Jan 2038 04:14:07 GMT`;
            return newGenres;
        default:
            throw new Error("The Ranking system has failed.");
    }
}

const useRankSaver = (array: ArtistContent[] | TrackContent[] | GenreList, type: "artists" | "tracks" | "genres", timeLimit: string) => {
    let defaultList: RankList = [];
    array.forEach((element) => defaultList = [...defaultList, element.id]);

    const [ranking, dispatchRanking] = useReducer(rankingReducer, defaultList);

    useEffect(() => {
        let ranks = document.cookie.split("; ").find((row) => row.startsWith(`${type}Ranks_${timeLimit}`))!;
        if(ranks) {
            ranks = ranks.split("=")[1];
            const list: RankList = JSON.parse(ranks);
            // console.log(type, list.slice(0, 10), defaultList);
            if(JSON.stringify(list.slice(0, 10)) === JSON.stringify(defaultList)) {
                return;
            }
        }
        document.cookie = `${type}Ranks_short_term=${JSON.stringify(defaultList)}; expires=Tue, 19 Jan 2038 04:14:07 GMT`;
    }, [])

    return [ranking, dispatchRanking] as const;
}

export default useRankSaver;