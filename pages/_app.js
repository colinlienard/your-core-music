import LangProvider from "../lib/contexts/LangContext";
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
    return (
        <LangProvider>
            <Component {...pageProps}/>
        </LangProvider>
    )
}
