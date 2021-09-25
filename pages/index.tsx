import Head from "next/head";
import { GetServerSideProps } from "next";
import { FC, useContext, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import ImageBox from "../components/ImageBox/ImageBox";
import { LangContext } from "../lib/contexts/LangContext";
import styles from "../styles/Home.module.scss";
import Footer from "../components/Footer/Footer";

const Home: FC = () => {
    const [loading, setLoading] = useState(false);
    const { Home: lang } = useContext(LangContext);
    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_URL}${lang.current === "FR" ? "/fr" : ""}/stats&scope=user-read-recently-played%20user-top-read%20user-read-email%20user-read-private`;

    const startLoading = () => setLoading(true);

    return (<>
        <Head>
            <title>Spotify Hindsight</title>
            <meta name="description" content={lang.metaDesc}/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="canonical" href="https://www.spotify-hindsight.io"/>
        </Head>
        {loading ?
            <LoadingScreen/>
            :
            null
        }
        <NavBar logged={false} loginUrl={loginUrl} startLoading={startLoading}/>
        <main>
            <header className={styles.header}>
                <div className={styles.content}>
                    <h1 className={styles.hero}>{lang.hero[0]}<br/>{lang.hero[1]}<br/>{lang.hero[2]}</h1>
                    <p className={styles.subhero}><strong>{lang.subhero}</strong></p>
                    <a className={styles.buttonIcon} href={loginUrl} onClick={startLoading}>
                        <svg width="19" height="20" viewBox="0 0 19 20">
                            <path d="M1.07272 0.278809L18.012 9.98115L0.992889 19.7292L1.07272 0.278809ZM3.05861 3.72111L3.0071 16.2707L13.988 9.98115L3.05861 3.72111Z"/>
                        </svg>
                        <p>{lang.login} <strong className={styles.green}>Spotify</strong></p>
                    </a>
                </div>
                <img className={styles.longArrow} src="./images/svg/long-arrow.svg" alt="" onClick={() => window.scrollTo(0, window.innerHeight)}/>
                <div className={styles.radialGradient}/>
                <div className={styles.favoritesContainer}>
                    <img className={styles.disc1} src="/images/svg/disc-1.svg" alt=""/>
                    <img className={styles.disc2} src="/images/svg/disc-2.svg" alt=""/>
                    <img className={styles.disc3} src="/images/svg/disc-3.svg" alt=""/>
                    <img className={styles.artist1} src="/images/png/the-weeknd.png" alt=""/>
                    <img className={styles.artist2} src="/images/png/drake.png" alt=""/>
                </div>
                <div className={styles.shootingStars}>
                    <img className={styles.shootingStar1} src="/images/svg/shooting-star.svg" alt=""/>
                    <img className={styles.shootingStar2} src="/images/svg/shooting-star.svg" alt=""/>
                    <img className={styles.shootingStar3} src="/images/svg/shooting-star.svg" alt=""/>
                    <img className={styles.shootingStar4} src="/images/svg/shooting-star.svg" alt=""/>
                    <img className={styles.shootingStar5} src="/images/svg/shooting-star.svg" alt=""/>
                </div>
            </header>
            <section className={styles.section1}>
                <div className={styles.content}>
                    <div className={styles.imageContainer}>
                        <img className={styles.mainImage} src="/images/png/presentation.png" alt=""/>
                        <img className={styles.shootingStar1} src="/images/svg/shooting-star.svg" alt=""/>
                        <img className={styles.shootingStar2} src="/images/svg/shooting-star.svg" alt=""/>
                        <img className={styles.shootingStar3} src="/images/svg/shooting-star.svg" alt=""/>
                    </div>
                    <div className={styles.textContainer}>
                        <h2 className={styles.title}>{lang.title1}</h2>
                        <p className={styles.subtitle}>{lang.subtitle1}</p>
                    </div>
                </div>
            </section>
            <article className={styles.section2}>
                <div className={styles.content}>
                    <div className={styles.imageContainer}>
                        <span className={styles.circle1}/>
                        <span className={styles.circle2}/>
                        <span className={styles.circle3}/>
                        <span className={styles.circle4}/>
                    </div>
                    <div className={styles.textContainer}>
                        <h2 className={styles.title}>{lang.title2}</h2>
                        <p className={styles.subtitle}>{lang.subtitle2}</p>
                    </div>
                </div>
            </article>
            <aside className={styles.section3}>
                <h2 className={styles.title}><a href={loginUrl}>{lang.title3[0]}</a>{lang.title3[1]}</h2>
                <p className={styles.subtitle}>{lang.subtitle3}</p>
            </aside>
            <Footer/>
        </main>
    </>)
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    if(ctx.req.cookies.accessToken || ctx.req.cookies.refreshToken) {
        ctx.res.setHeader("Location", `/${ctx.locale}/stats`);
        ctx.res.statusCode = 302;
        ctx.res.end();
    }

    return {
        props: {}
    }
}

export default Home;
