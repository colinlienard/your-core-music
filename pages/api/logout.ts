import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Set-Cookie", ["accessToken=; path=/; max-age=-1;", "refreshToken=; path=/; max-age=-1;"]);
    res.status(200).redirect("/");
}