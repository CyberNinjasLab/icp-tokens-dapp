import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';

const ICPSwap = () => {
	return (
		<>
      <Head>
        <title>ICP Swap</title>
        <meta name="twitter:title" content="ICP Swap"/>
				<meta name="description" content="" />
        <meta name="twitter:description" content=""/>
      </Head>
			<Layout>
				<div className='w-full'>
					<h1 className='h1'>icpswap.com</h1>
          {/* Add html here */}
					{/* External link: https://app.icpswap.com/ */}
					{/* Logo: /logos/icpswap_logo.webp */}
				</div>
			</Layout>
		</>
	);
};

export default ICPSwap;