import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import Image from 'next/image'; // Import Next.js Image component
import MarketCapChart from '../../ui/components/markets/MarketCapChart'; // Import the MarketCapChart component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons
// import FearGreedIndex from '../../ui/components/new/FearGreedIndex';

const Bitfinity = () => {
	return (
		<>
      <Head>
	  <title>Bitfinity  | ICP Wallet</title>
                <meta name="description" content="Bitfinity Wallet is a multi-chain wallet for BTC, ICP, SNS-1, and NFTs, supporting Internet Identity and seamless dapp login on the Internet Computer ecosystem." />
                <meta name="twitter:title" content="Bitfinity | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="Bitfinity Wallet is a multi-chain wallet for BTC, ICP, SNS-1, and NFTs, supporting Internet Identity and seamless dapp login on the Internet Computer ecosystem."/>
                <link rel="canonical" href="https://icptokens.net/wallets/bitfinity"/>
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Bitfinity| ICP Tokens by Market Cap" />
                <meta property="og:description" content="Bitfinity Wallet is a multi-chain wallet for BTC, ICP, SNS-1, and NFTs, supporting Internet Identity and seamless dapp login on the Internet Computer ecosystem." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />      
		</Head>
			<Layout>			
				<div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">Bitfinity | ICP Wallet</h1>
                        <p className="mt-2 text-lg text-gray-600 p-2">
                        The Bitfinity is the front-end interface for interacting with the Internet Computer's Network Nervous System (NNS), offering a user-friendly platform for managing ICP tokens, staking neurons, participating in governance voting, and earning rewards. Fully powered by blockchain, this decentralized application enables secure and seamless control of assets and governance participation, empowering users to actively engage in the ICP ecosystem.
                     </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/bitfinitywallet_logo.webp" 
                            alt="Bitfinity- ICP Tokens by Market Cap Logo" 
                            width={200} 
                            height={200}
                            className="rounded" // Optional: add some styling like rounded corners
                        />                        
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://t.me/infinityswapofficial" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                <FaTelegram size={30} />
                            </a>
                            <a href="https://x.com/bitfinitynet" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                                <FaTwitter size={30} />
                            </a>				
                            <a href="https://medium.com/@infinityswap" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
                                <FaMedium size={30} />
                            </a>
                            <a href="https://github.com/bitfinity-network" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
                                <FaGitHub size={30} />
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

export default Bitfinity;