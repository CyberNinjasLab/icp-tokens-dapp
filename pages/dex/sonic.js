import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';

const SonicDex = () => {
	return (
		<>
      <Head>
        <title>Sonic DEX</title>
        <meta name="twitter:title" content="Sonic DEX"/>
				<meta name="description" content="" />
        <meta name="twitter:description" content=""/>
      </Head>
			<Layout>
				<div className='w-full'>
					<h1 className='h1'>sonic.ooo</h1>
          {/* Add html here */}
					{/* External link: https://sonic.ooo/ */}
					{/* Logo: /logos/sonic-dex_logo.webp */}
				</div>
			</Layout>
		</>
	);
};

export default SonicDex;