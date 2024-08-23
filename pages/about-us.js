import Head from 'next/head';
import Layout from '../ui/components/_base/Layout';
import Link from 'next/link';
import { Button } from '@mui/material';

const HowItWorks = () => {
	return (
		<>
      <Head>
        <title>About Us | ICP Tokens</title>
      </Head>
      <Layout>
        <div className='max-w-xl mx-auto lg:mt-6'>
          <h2 className='text-xl font-semibold lg:text-center'>Why ICP Tokens?</h2>    
          <p className='mt-6'>
          Every day, thousands of cryptocurrencies are launched, overwhelming the crypto space and diluting its core. We are committed to providing a service that paves the way for projects that go beyond just being a token — projects that carry the idea of a decentralized product, functioning according to Web3.0 standards. 
          </p>
          <p className='mt-6'>
          Our focus is on <b>delivering everything our users need</b> to navigate the Internet Computer ecosystem, all in one place. By considering the needs and vision of those who use the platform, we are showing the world that it&apos;s possible to create projects with true value!
          </p>

          <h2 className='text-lg font-semibold mt-10'>Building with Love ❤️</h2>
          <p className='mt-6'>
          To bring this project to life, we chose not to raise funds or tokenize from day one. We strive to <b>bring real value to the network</b> before taking any further steps, ensuring a strong foundation and a community incentivised by love, vision and purpose...
          </p>
          <h2 className='text-lg font-semibold mt-10'>Our Mission 🎯</h2>
          <p className='mt-6'>
          The platform&apos;s goal is to create an <b>all-in-one tool for investors</b> in the ICP ecosystem. Our mission is to be a bridge for everything ICP can offer.
          </p>      

          <h2 className='text-lg font-semibold mt-10'>Our Vision 👇</h2>    
          <p className='mt-6'>
          ICP Tokens aims to become a project driven and guided by the community through a DAO model. We believe that collective effort, volunteerism, and participation in this cause provide the energy needed to be pioneers in the crypto space! <b>Together we shape the future.</b>
          </p>

          {/* <blockquote className="text-lg text-center font-semibold mt-6 italic border-l-4 border-blue-500 pl-4 dark:bg-black/25 bg-black/5 p-4">
            &quot;Together we shape the future.&quot;
          </blockquote> */}

          <Link href="https://oc.app/community/5bgep-3aaaa-aaaar-a3toq-cai/" target='_blank' className='sm:mt-16 mt-12 text-center scale-125 block'>
            <Button variant="contained" size='large'>🚨 We are recruiting 🚨</Button>
          </Link>
        </div>
      </Layout>
    </>
	);
};

export default HowItWorks;