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
      <title>ICP Tokens by Market Cap</title> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="description" content="Explore ICP Tokens for real-time market data, portfolio management, and token analysis within the Internet Computer ecosystem. Stay updated with top ICP projects"></meta>
     
        {/* <!-- Control the behavior of search engine crawling and indexing --> */}
        <meta name="robots" content="index,follow"/>  {/*<!-- All Search Engines -->*/}
        <meta name="googlebot" content="index,follow"/>{/*<!-- Google Specific -->*/}
        <meta name="yandex-verification" content="612a306d9909f280" />
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
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@icptokens"/>
        <meta name="twitter:creator" content="@icptokens"/>
        <meta name="twitter:url" content="https://icptokens.net"/>
        <meta name="twitter:title" content="ICP Tokens by Market Cap"/>
        <meta name="twitter:description" content="Explore ICP Tokens for real-time market data and portfolio management"/>
        <meta name="twitter:image" content="https://icptokens.net/og-image.png"/>
        <meta name="twitter:image:alt" content="Explore ICP Tokens for real-time market data, portfolio management, and token analysis within the Internet Computer ecosystem. Stay updated with top ICP projects"/>
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
