import { useRouter } from "next/router";
import { createContext } from "react";
import LangProvider from "../lib/contexts/LangContext";
import en from "../public/locales/en";
import fr from "../public/locales/fr";
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
    return (
        <LangProvider>
            <Component {...pageProps}/>
        </LangProvider>
    )
}
