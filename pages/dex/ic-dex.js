import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';

const ICPEx = () => {
	return (
		<>
      <Head>
        <title>ICLight House</title>
        <meta name="twitter:title" content="ICLight House"/>
				<meta name="description" content="" />
        <meta name="twitter:description" content=""/>
      </Head>
			<Layout>
				<div className='w-full'>
					<h1 className='h1'>iclight.io</h1>
          {/* Add html here */}
					{/* Тези са DEX + House/Explorer разгледай ги :) */}
					{/* Заслужават описателна страница */}

					{/* DEX link1: https://iclight.io/ */}
					{/* ICLight House link: https://iclight.house/ */}
					{/* Logo: /logos/icdex_logo.webp */}
				</div>
			</Layout>
		</>
	);
};

export default ICPEx;