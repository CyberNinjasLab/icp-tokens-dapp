import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import Image from 'next/image'; // Import Next.js Image component
import MarketCapChart from '../../ui/components/markets/MarketCapChart'; // Import the MarketCapChart component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons
// import FearGreedIndex from '../../ui/components/new/FearGreedIndex';


const KongSwap = () => {
	return (
		<>
      <Head>
        		<title>KongSwap | ICP DEX </title>
                <meta name="description" content="KongSwap is a fast DEX on ICP, optimized for speed with cross-chain support and secure Web2-style login via Internet Identity, enhancing DeFi transactions." />
                <meta name="twitter:title" content="KongSwap | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="KongSwap is a fast DEX on ICP, optimized for speed with cross-chain support and secure Web2-style login via Internet Identity, enhancing DeFi transactions."/>
                <link rel="canonical" href="https://icptokens.net/dex/sonic" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="KongSwap | ICP Tokens by Market Cap" />
                <meta property="og:description" content="" />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />
      </Head>
			<Layout>
			<div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">KongSwap | ICP DEX</h1>
                        <p className="mt-2 text-lg text-gray-600 p-2">
                        KongSwap is a high-speed decentralized exchange (DEX) on the Internet Computer (ICP) network, optimized for rapid on-chain transactions and efficient liquidity pools. With cross-chain support via ChainFusion and Web2-like login powered by Internet Identity, KongSwap delivers a fast, secure, and seamless trading experience. It redefines decentralized finance (DeFi) by combining speed, scalability, and interoperability within the ICP ecosystem.
                        </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/kongswap.webp" 
                            alt="KongSwap - ICP Tokens by Market Cap Logo" 
                            width={200} 
                            height={200}
                            className="rounded" // Optional: add some styling like rounded corners
                        />                        
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://t.me/kong_swap" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                <FaTelegram size={30} />
                            </a>
                            <a href="https://x.com/kongswap" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                                <FaTwitter size={30} />
                            </a>				
                            <a href="https://oc.app/community/maceh-niaaa-aaaaf-bm37q-cai/channel/143833652212619352659918759629305427896" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
                                <FaDiscord size={30} />
                            </a>
                            <a href="https://github.com/KongSwap/kong" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
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

export default KongSwap;
