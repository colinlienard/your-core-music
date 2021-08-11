import LangProvider from "../lib/contexts/LangContext";
import MusicListProvider from "../lib/contexts/MusicListContext"
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
    return (
        <LangProvider>
            <MusicListProvider>
                <Component {...pageProps}/>
            </MusicListProvider>
        </LangProvider>
    )
}
