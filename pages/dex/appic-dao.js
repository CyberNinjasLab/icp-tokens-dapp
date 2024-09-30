import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';

const AppicDAO = () => {
	return (
		<>
      <Head>
        <title>AppIC DAO</title>
        <meta name="twitter:title" content="AppIC DAO"/>
				<meta name="description" content="" />
        <meta name="twitter:description" content=""/>
      </Head>
			<Layout>
				<div className='w-full'>
					<h1 className='h1'>app.appic.solutions</h1>
          {/* Add html here */}
					{/* External link: https://app.appic.solutions/ */}
					{/* Logo: /logos/appic_logo_icon.jpg */}
				</div>
			</Layout>
		</>
	);
};

export default AppicDAO;