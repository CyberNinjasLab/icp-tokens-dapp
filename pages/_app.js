import '../styles/global.css';
import Head from 'next/head';
import GeneralContextProvider from '../contexts/general/General.Provider';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ICP Tokens - Real-time prices, news, and insights</title>
        <meta name="description" content="Discover the ultimate platform for Internet Computer (ICP) enthusiasts at icptokens. Dive into the world of ICP tokens with real-time price updates, latest news, and comprehensive insights designed to enhance your experience. Whether you're a seasoned investor or new to the scene, icptokens offers everything you need to stay ahead in the dynamic cryptocurrency landscape." />
        <meta property="og:image" content="/thumbnail.png"/>
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
