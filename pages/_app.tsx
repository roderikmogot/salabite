import "../styles/globals.css";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import type { AppProps } from "next/app";

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
        <Navbar />
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
