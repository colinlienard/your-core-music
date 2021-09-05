import { useState } from "react";
import { RankList } from "../types";

const useRankGetter = (id: string, artistsRanks: RankList | null) => {

    // const cookie: string = document.cookie;
    // let ranks = cookie.split("; ").find((row) => row.startsWith(type === "artist" ? "artistsRanks=" : "tracksRanks"))!;
    // if(ranks) {
    //     ranks = ranks.split("=")[1];
    //     const list: RankList = JSON.parse(ranks);
    //     const result = list.find((row) => row === id);
    //     setRank(list.indexOf(result as string) + 1);
    // }
    let defaultValue: number | null = 0;
    if(artistsRanks) {
        const position = artistsRanks.find((row) => row === id);
        const oldRank = artistsRanks.indexOf(position as string) + 1;
        defaultValue = oldRank;
    } else {
        defaultValue = null;
    }

    const [rank, setRank] = useState<number | null>(defaultValue);

    return rank;
}

export default useRankGetter;