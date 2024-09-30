import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';

const ICPEx = () => {
	return (
		<>
      <Head>
        <title>ICPEx</title>
        <meta name="twitter:title" content="ICPEx"/>
				<meta name="description" content="" />
        <meta name="twitter:description" content=""/>
      </Head>
			<Layout>
				<div className='w-full'>
					<h1 className='h1'>icpex.org</h1>
          {/* Add html here */}
					{/* External link: https://icpex.org/ */}
					{/* Logo: /logos/ICPEx.jpg */}
				</div>
			</Layout>
		</>
	);
};

export default ICPEx;