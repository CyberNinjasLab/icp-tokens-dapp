import Head from 'next/head';
import Layout from '../ui/components/_base/Layout';

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
          Every day, thousands of cryptocurrencies are launched, overwhelming the crypto space and diluting its core. We are committed to providing a service that paves the way for projects that go beyond just being a token — projects that carry the idea of a decentralized product, functioning according to Web3.0 standards. Our focus is on <b>delivering everything our users need</b> to navigate the Internet Computer ecosystem, all in one place. By considering the needs and vision of those who use the platform, we are showing the world that it's possible to create projects with true value!
          </p>

          <h2 className='text-lg font-semibold mt-10'>Building with Love ❤️</h2>
          <p className='mt-6'>
          To bring this project to life, we chose not to raise funds or tokenize from day one. The idea is to first satisfy needs and demonstrate that we <b>bring real value to the network</b> before taking any further steps. This dedication ensures that we will build a strong foundation for future growth and innovation within the community.
          </p>
          <h2 className='text-lg font-semibold mt-10'>Our Mission 🎯</h2>
          <p className='mt-6'>
          The platform's goal is to create an <b>all-in-one tool for future and current investors</b> in the #ICP ecosystem. Our mission is to build a bridge that fills the gap between tokens and the user base.
          </p>      

          <h2 className='text-lg font-semibold mt-10'>Our Vision 👇</h2>    
          <p className='mt-6'>
          ICP Tokens aims to become <b>a project driven and guided by the community</b> through a DAO model. We believe that collective effort, volunteerism, and participation in this cause provide the energy needed to be pioneers in the crypto space! Together, we are shaping the future, creating unique conditions for collaboration and development!
          </p>

          <blockquote className="text-lg font-semibold mt-16 italic border-l-4 border-blue-500 pl-4 dark:bg-black/25 bg-black/5 p-4">
            "Build the Tools, Shape the Future!"
          </blockquote>
        </div>
      </Layout>
    </>
	);
};

export default HowItWorks;