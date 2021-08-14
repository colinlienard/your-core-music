import { NextApiRequest, NextApiResponse } from "next";

const btoa = (text: string) => Buffer.from(text, "binary").toString("base64");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = req.query.code ?
        `https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${process.env.URL}${req.query.lang === "fr" ? "/fr" : ""}/stats`
        :
        `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${req.query.token}`
    ;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)}`
            }
        });
        if(response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else
            res.status(response.status).send(response.statusText);
    } catch(error) {
        res.status(500).send(error);
    }
}