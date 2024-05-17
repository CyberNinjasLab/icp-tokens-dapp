import '../styles/global.css';
import Head from 'next/head';
import GeneralContextProvider from '../contexts/general/General.Provider';
import AuthContextProvider from '../contexts/auth/Auth.Provider';
import { LoadingProvider } from '../contexts/general/Loading.Provider';
import LoadingOverlay from '../ui/components/_base/LoadingOverlay';
import ReactGA from "react-ga4";
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    ReactGA.initialize('G-VW500QY288');
  }, []);

  return (
    <>
      <Head>
        <title>ICP Tokens</title>
        <meta name="description" content="Dive deep into the world of the ICP ecosystem in a one-stop-shop. Discover the ultimate platform for the latest news, comprehensive insights of your favorite ICP tokens. Whether you're a seasoned investor or new to the scene, icptokens offers everything you need to stay ahead in the dynamic cryptocurrency landscape and will keep staying up on the curve." />
        <meta property="og:image" content="/og-image.png"/>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png?ver=3"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png?ver=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png?ver=2"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        {/* Other head elements */}
      </Head>
      <LoadingProvider>
        <LoadingOverlay />
        <GeneralContextProvider>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </GeneralContextProvider>
      </LoadingProvider>
    </>
  );
}
