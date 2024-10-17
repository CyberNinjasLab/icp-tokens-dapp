import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import Image from 'next/image'; // Import Next.js Image component
import MarketCapChart from '../../ui/components/markets/MarketCapChart'; // Import the MarketCapChart component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons
// import FearGreedIndex from '../../ui/components/new/FearGreedIndex';


const SonicDex = () => {
	return (
		<>
      <Head>
        		<title>Sonic | ICP DEX </title>
                <meta name="description" content="Sonic DEX harnesses the power of the Internet Computer Protocol (ICP) to offer a comprehensive multichain DeFi platform." />
                <meta name="twitter:title" content="Sonic DEX | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="Sonic DEX harnesses the power of the Internet Computer Protocol (ICP) to offer a comprehensive multichain DeFi platform."/>
                <link rel="canonical" href="https://icptokens.net/dex/sonic" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Sonic DEX | ICP Tokens by Market Cap" />
                <meta property="og:description" content="" />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />
      </Head>
			<Layout>
			<div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">Sonic | ICP DEX</h1>
                        <p className="mt-2 text-lg text-gray-600 p-2">
						Sonic DEX harnesses the power of the Internet Computer Protocol (ICP) to offer a comprehensive multichain DeFi platform. Users can seamlessly trade, stake, and participate in governance, unlocking enhanced crypto functionalities. By integrating cross-chain capabilities, Sonic provides a dynamic environment for decentralized finance, ensuring scalability, speed, and low fees across multiple blockchain networks.
						</p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/sonic-dex_logo.webp" 
                            alt="ICP Swap - ICP Tokens by Market Cap Logo" 
                            width={200} 
                            height={200}
                            className="rounded" // Optional: add some styling like rounded corners
                        />                        
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://t.me/Sonic DEX_Official" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                <FaTelegram size={30} />
                            </a>
                            <a href="https://twitter.com/Sonic DEX" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                                <FaTwitter size={30} />
                            </a>				
                            <a href="https://Sonic DEX.medium.com/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
                                <FaMedium size={30} />
                            </a>
                            <a href="https://www.Sonic DEX.com/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
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

export default SonicDex;