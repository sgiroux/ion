import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import axios from "axios";
import ServiceWorker from "../components/ServiceWorker";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.timeout = 2000;

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((res) => res.data),
      }}
    >
      <Head>
        <title>ion</title>
        <meta name="theme-color" content="#007abc" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="white-translucent"
        />
        <link
          rel="manifest"
          href="/manifest.webmanifest"
          crossOrigin="use-credentials"
        />
        <meta name="apple-mobile-web-app-title" content="ion" />
        <meta name="description" content="Energy Monitor" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="ion" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
      </Head>
      <ServiceWorker />
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
