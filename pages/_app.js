import '../styles/global.css';
import Head from 'next/head';
import GeneralContextProvider from '../contexts/general/General.Provider';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ICP Tokens</title>
        <meta name="description" content="Your page description" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Other head elements */}
      </Head>
      <GeneralContextProvider>
        <Component {...pageProps} />
      </GeneralContextProvider>
    </>
  );
}
