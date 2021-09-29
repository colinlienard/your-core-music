import { FC } from "react";
import LangProvider from "../lib/contexts/LangContext";
import type { AppProps } from "next/app";
import "../styles/globals.scss";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <LangProvider>
            <Component {...pageProps}/>
        </LangProvider>
    )
}

export default MyApp;
