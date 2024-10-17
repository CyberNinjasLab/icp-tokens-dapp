import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import Image from 'next/image'; // Import Next.js Image component
import MarketCapChart from '../../ui/components/markets/MarketCapChart'; // Import the MarketCapChart component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons
// import FearGreedIndex from '../../ui/components/new/FearGreedIndex';

const Plugwallet = () => {
	return (
		<>
      <Head>
	  <title>Plug Wallet  | ICP Wallet</title>
                <meta name="description" content="Plug Wallet combines identity and wallet functions for ICP, enabling users to hold, send, swap tokens, and access IC apps on mobile or as a browser extension." />
                <meta name="twitter:title" content="Plug Wallet | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="Plug Wallet combines identity and wallet functions for ICP, enabling users to hold, send, swap tokens, and access IC apps on mobile or as a browser extension."/>
                <link rel="canonical" href="https://icptokens.net/wallets/plug-wallet"/>
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Plug| ICP Tokens by Market Cap" />
                <meta property="og:description" content="Plug Wallet combines identity and wallet functions for ICP, enabling users to hold, send, swap tokens, and access IC apps on mobile or as a browser extension." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />      
		</Head>
			<Layout>			
				<div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">Plug Wallet | ICP Wallet</h1>
                        <p className="mt-2 text-lg text-gray-600 p-2">
                        The Plug Wallet is the front-end interface for interacting with the Internet Computer's Network Nervous System (NNS), offering a user-friendly platform for managing ICP tokens, staking neurons, participating in governance voting, and earning rewards. Fully powered by blockchain, this decentralized application enables secure and seamless control of assets and governance participation, empowering users to actively engage in the ICP ecosystem.
                     </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/plug_logo.webp" 
                            alt="Plug Wallet- ICP Tokens by Market Cap Logo" 
                            width={200} 
                            height={200}
                            className="rounded" // Optional: add some styling like rounded corners
                        />                        
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://discord.com/invite/thqARE5JqF" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                <FaTelegram size={30} />
                            </a>
                            <a href="https://x.com/plug_wallet" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                                <FaTwitter size={30} />
                            </a>				
                            <a href="https://play.google.com/store/apps/details?id=co.psychedelic.plug&pli=1/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
                                <FaMedium size={30} />
                            </a>
                            <a href="https://apps.apple.com/us/app/plug-crypto-wallet/id1599570197" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
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

export default Plugwallet;