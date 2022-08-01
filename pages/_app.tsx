import "../styles/globals.css";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <>
        <Head>
          <title>COVID-19 Statistics</title>
          <link rel="icon" href="/favicon.png" />

          <meta name="title" content="covid19" />
          <meta
            name="description"
            content="COVID-19 global statistics by disease.sh"
          />
          <meta name="keywords" content="COVID-19, Disease" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://salabite.vercel.app/" />
          <meta property="og:title" content="https://salabite.vercel.app/" />
          <meta
            property="og:description"
            content="COVID-19 global statistics by disease.sh"
          />
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
