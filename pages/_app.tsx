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
          <title>Salabite - COVID-19 Statistics</title>
          <meta name="description" content="COVID-19 global statistics by Mathdro API" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
