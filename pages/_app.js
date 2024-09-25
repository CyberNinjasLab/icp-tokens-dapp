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

    if (typeof window !== 'undefined') {
      const host = window.location.hostname;

      // Check if the current URL has a 'www' prefix and redirect to the non-www version.
      // Temporary hotfix: Redirect users to the non-www version.
      // This should ideally be handled via a backend canister solution or DNS configuration.
      if (host.startsWith('www.')) {
        const newHost = host.slice(4); // Remove the 'www.' prefix
        const newUrl = `https://${newHost}${window.location.pathname}${window.location.search}`;

        // Perform the 302 redirect
        window.location.replace(newUrl);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>ICP Tokens by Market Cap</title>
        <meta name="description" content="Explore ICP Tokens for real-time market data, portfolio management, and token analysis within the Internet Computer ecosystem. Stay updated with top ICP projects." />
        <meta property="og:title" content=">ICP Tokens by Market Cap" />
        <meta property="og:description" content="Explore ICP Tokens for real-time market data, portfolio management, and token analysis within the Internet Computer ecosystem. Stay updated with top ICP projects" />
        <meta property="og:url" content="https://icptokens.net/" />
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://icptokens.net/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href="https://icptokens.net"
          key="canonical"
        />

        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@icptokens">
        <meta name="twitter:creator" content="@icptokens">
        <meta name="twitter:url" content="https://icptokens.net">
        <meta name="twitter:title" content="ICP Tokens by Market Cap">
        <meta name="twitter:description" content="Explore ICP Tokens for real-time market data and portfolio management">
        <meta name="twitter:image" content="https://icptokens.net/og-image.png">
        <meta name="twitter:image:alt" content="Explore ICP Tokens for real-time market data, portfolio management, and token analysis within the Internet Computer ecosystem. Stay updated with top ICP projects">
        {/* <!-- Control the behavior of search engine crawling and indexing --> */}
        <meta name="robots" content="index,follow">  {/*<!-- All Search Engines -->*/}
        <meta name="googlebot" content="index,follow">{/*<!-- Google Specific -->*/}
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
