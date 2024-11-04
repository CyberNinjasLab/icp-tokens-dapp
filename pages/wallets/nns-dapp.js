import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import Image from 'next/image'; // Import Next.js Image component
import MarketCapChart from '../../ui/components/markets/MarketCapChart'; // Import the MarketCapChart component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium, FaGithub, FaDiscord } from 'react-icons/fa'; // Import social media icons
// import FearGreedIndex from '../../ui/components/new/FearGreedIndex';

const Nnsdapp = () => {
	return (
		<>
      <Head>
	  <title>NNS Dapp  | ICP Wallet</title>
                <meta name="description" content="NNS Dapp allows users to manage ICP, stake neurons, vote, and earn rewards on a secure blockchain-powered interface for Internet Computer governance." />
                <meta name="twitter:title" content="Nns dapp | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="NNS Dapp allows users to manage ICP, stake neurons, vote, and earn rewards on a secure blockchain-powered interface for Internet Computer governance."/>
                <link rel="canonical" href="https://icptokens.net/wallets/nns-dapp"/>
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Nnsdapp| ICP Tokens by Market Cap" />
                <meta property="og:description" content="NNS Dapp allows users to manage ICP, stake neurons, vote, and earn rewards on a secure blockchain-powered interface for Internet Computer governance." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />      
		</Head>
			<Layout>			
				<div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">NNS Dapp | ICP Wallet</h1>
                        <p className="mt-2 text-lg text-gray-600 p-2">
                        The NNS Dapp is the front-end interface for interacting with the Internet Computer's Network Nervous System (NNS), offering a user-friendly platform for managing ICP tokens, staking neurons, participating in governance voting, and earning rewards. Fully powered by blockchain, this decentralized application enables secure and seamless control of assets and governance participation, empowering users to actively engage in the ICP ecosystem.
                     </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/nns_front_end_logo.webp" 
                            alt="Nnsdapp- ICP Tokens by Market Cap Logo" 
                            width={200} 
                            height={200}
                            className="rounded" // Optional: add some styling like rounded corners
                        />                        
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://github.com/dfinity/nns-dapp" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                <FaGithub size={30} />
                            </a> 
                            <a href="https://x.com/dfinity" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                <FaTwitter size={30} />
                            </a>
                            <a href="https://medium.com/dfinity" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                <FaMedium size={30} />
                            </a>                         		
                           
                            <a href="https://nns.ic0.app/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
                                <FaGlobe size={30} />
                            </a>
                        </div>	
                    </div>				
                </div>
				{/* Insert the Market Cap Chart */}
                <MarketCapChart />
				{/* Add Fear and Greed Index */}
                <div className="flex-2 flex justify-center items-center flex-col p-2">
				{/* { <FearGreedIndex indexValue={FearGreedIndex} /> } */}
                </div>
			</Layout>
		</>
	);
};

export default Nnsdapp;