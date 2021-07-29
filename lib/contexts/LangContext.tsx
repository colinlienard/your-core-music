import { useRouter } from "next/router";
import { createContext, FC } from "react";
import en from "../../public/locales/en";
import fr from "../../public/locales/fr";

export const LangContext = createContext(en);

const LangProvider: FC = ({ children }) => {
    const router = useRouter();

    return (
        <LangContext.Provider value={router.locale === "fr" ? fr : en}>
            {children}
        </LangContext.Provider>
    )
}

export default LangProvider;