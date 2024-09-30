import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';

const HelixMarkets = () => {
	return (
		<>
      <Head>
        <title>Helix Markets</title>
        <meta name="twitter:title" content="Helix Markets"/>
				<meta name="description" content="" />
        <meta name="twitter:description" content=""/>
      </Head>
			<Layout>
				<div className='w-full'>
					<h1 className='h1'>helixmarkets.io</h1>
          {/* Add html here */}
					{/* External link: https://helixmarkets.io/ */}
					{/* Logo: /logos/helix_logo.webp */}
				</div>
			</Layout>
		</>
	);
};

export default HelixMarkets;