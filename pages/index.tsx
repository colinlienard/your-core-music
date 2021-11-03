import Head from "next/head";
import { GetServerSideProps } from "next";
import { FC, useContext, useRef, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import ImageBox from "../components/ImageBox/ImageBox";
import Footer from "../components/Footer/Footer";
import useAnimOnScroll from "../lib/hooks/useAnimOnScroll";
import { LangContext } from "../lib/contexts/LangContext";
import styles from "../styles/Home.module.scss";

const Home: FC = () => {
    const [loading, setLoading] = useState(false);
    const { Home: lang } = useContext(LangContext);
    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_URL}${lang.current === "FR" ? "/fr" : ""}/stats&scope=user-top-read%20user-read-email%20user-read-private`;
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const visible1 = useAnimOnScroll(ref1);
    const visible2 = useAnimOnScroll(ref2);

    const startLoading = () => setLoading(true);

    return (<>
        <Head>
            <title>{lang.pageTitle}</title>
            <meta name="description" content={lang.metaDesc}/>
            <link rel="icon" href="/favicon.ico"/>
            {/* ⚠ TODO: update canonical URL */}
            {/* <link rel="canonical" href=""/> */}
        </Head>
        {loading ?
            <LoadingScreen/>
            :
            null
        }
        <NavBar logged={false} loginUrl={loginUrl} startLoading={startLoading}/>
        <header className={styles.header}>
            <div className={styles.content}>
                <h1 className={styles.hero}>
                    {lang.hero[0]}
                    <strong>{lang.hero[1]}</strong>
                    <strong>{lang.hero[2]}</strong>
                </h1>
                <p className={styles.subhero}>{lang.subhero}</p>
                <a className={styles.buttonIcon} href={loginUrl} onClick={startLoading}>
                    <svg width="19" height="20" viewBox="0 0 19 20">
                        <path d="M1.07272 0.278809L18.012 9.98115L0.992889 19.7292L1.07272 0.278809ZM3.05861 3.72111L3.0071 16.2707L13.988 9.98115L3.05861 3.72111Z"/>
                    </svg>
                    <p>{lang.login} <strong className={styles.green}>Spotify</strong></p>
                </a>
            </div>
            <img className={styles.longArrow} src="./images/svg/long-arrow.svg" alt={lang.altArrow} onClick={() => window.scrollTo(0, window.innerHeight)}/>
            <div className={styles.radialGradient}/>
            <div className={styles.favoritesContainer}>
                <ImageBox className={styles.disc1} src="/images/svg/disc-1.svg" alt="" width={200} height={200}/>
                <ImageBox className={styles.disc2} src="/images/svg/disc-2.svg" alt="" width={200} height={200}/>
                <ImageBox className={styles.disc3} src="/images/svg/disc-3.svg" alt="" width={200} height={200}/>
                <ImageBox className={styles.artist1} src="/images/png/the-weeknd.png" alt="The Weeknd" width={240} height={300} quality={100}/>
                <ImageBox className={styles.artist2} src="/images/png/drake.png" alt="Drake" width={250} height={250} quality={100}/>
            </div>
            <div className={styles.shootingStars}>
                <img className={styles.shootingStar1} src="/images/svg/shooting-star.svg" alt=""/>
                <img className={styles.shootingStar2} src="/images/svg/shooting-star.svg" alt=""/>
                <img className={styles.shootingStar3} src="/images/svg/shooting-star.svg" alt=""/>
                <img className={styles.shootingStar4} src="/images/svg/shooting-star.svg" alt=""/>
                <img className={styles.shootingStar5} src="/images/svg/shooting-star.svg" alt=""/>
            </div>
        </header>
        <main>
            <section className={styles.section1}>
                <figure className={styles.content}>
                    <div className={`${styles.imageContainer} ${visible1 ? null : styles.hidden}`} ref={ref1}>
                        <span className={styles.halo}/>
                        <ImageBox className={styles.mainImage} src="/images/png/presentation.png" alt="Travis Scott, Billie Eilish" width={500} height={450} quality={100}/>
                        <img className={styles.shootingStar1} src="/images/svg/shooting-star.svg" alt=""/>
                        <img className={styles.shootingStar2} src="/images/svg/shooting-star.svg" alt=""/>
                        <img className={styles.shootingStar3} src="/images/svg/shooting-star.svg" alt=""/>
                    </div>
                    <figcaption className={styles.textContainer}>
                        <h2 className={styles.title}>{lang.title1}</h2>
                        <p className={styles.subtitle}>{lang.subtitle1}</p>
                    </figcaption>
                </figure>
            </section>
            <article className={styles.section2}>
                <figure className={styles.content}>
                    <div className={`${styles.imageContainer} ${visible2 ? null : styles.hidden}`} ref={ref2}>
                        <span className={styles.circle1}/>
                        <span className={styles.circle2}/>
                        <span className={styles.circle3}/>
                        <span className={styles.circle4}/>
                        <ImageBox className={styles.disc1} src="/images/svg/disc-1.svg" alt="" width={200} height={200}/>
                        <ImageBox className={styles.disc2} src="/images/svg/disc-2.svg" alt="" width={200} height={200}/>
                        <ImageBox className={styles.disc3} src="/images/svg/disc-3.svg" alt="" width={200} height={200}/>
                        <ImageBox className={styles.disc4} src="/images/svg/disc-4.svg" alt="" width={200} height={200}/>
                    </div>
                    <figcaption className={styles.textContainer}>
                        <h2 className={styles.title}>{lang.title2}</h2>
                        <p className={styles.subtitle}>{lang.subtitle2}</p>
                    </figcaption>
                </figure>
            </article>
            <aside className={styles.section3}>
                <h2 className={styles.title}><a href={loginUrl} onClick={startLoading}>{lang.title3[0]}</a>{lang.title3[1]}</h2>
                <p className={styles.subtitle}>{lang.subtitle3}</p>
            </aside>
            <Footer loginUrl={loginUrl}/>
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
