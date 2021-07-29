import { NextApiRequest, NextApiResponse } from "next";

const btoa = (text: string) => Buffer.from(text, "binary").toString("base64");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch(`https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${req.query.lang === "fr" ? process.env.REDIRECT_URI_FR : process.env.REDIRECT_URI}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)}`
            }
        });
        if(response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        }
        else
            res.status(response.status).send(response.statusText);
    } catch(error) {
        res.status(500).send(error);
    }
}