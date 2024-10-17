import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import Image from 'next/image'; // Import Next.js Image component
import MarketCapChart from '../../ui/components/markets/MarketCapChart'; // Import the MarketCapChart component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons
// import FearGreedIndex from '../../ui/components/new/FearGreedIndex';

const AppicDAO = () => {
    return (
        <>
            <Head>
                <title>AppIC DAO | ICP DEX</title>
                <meta name="description" content="AppIC DAO enables secure token transfers and swaps between ICP, Bitcoin, Ethereum, and Solana, revolutionizing cross-chain interoperability for decentralized finance." />
                <meta name="twitter:title" content="AppIC DAO | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content=""/>
                <link rel="canonical" href="https://icptokens.net/dex/appic-dao" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="AppIC DAO | ICP Tokens by Market Cap" />
                <meta property="og:description" content="AppIC DAO enables secure token transfers and swaps between ICP, Bitcoin, Ethereum, and Solana, revolutionizing cross-chain interoperability for decentralized finance." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />
            </Head>		
            <Layout>
                <div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">AppIC DAO</h1>
                        <p className="mt-2 text-lg text-gray-600 p-2">
                        AppIC DAO is the first infrastructure layer enabling seamless token transfers and swaps between the Internet Computer (ICP) blockchain and major networks like Bitcoin, Ethereum, and Solana. By bridging these ecosystems, AppIC DAO enhances interoperability, allowing users to interact with multiple blockchain platforms effortlessly. This pioneering solution offers a scalable and secure way to perform cross-chain transactions, empowering decentralized finance across networks.
                        </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/appic_logo_icon.jpg" 
                            alt="AppIC DAO - ICP Tokens by Market Cap Logo" 
                            width={200} 
                            height={200}
                            className="rounded" // Optional: add some styling like rounded corners
                        />                        
                        
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://t.me/ICPSwap_Official" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                <FaTelegram size={30} />
                            </a>
                            <a href="https://twitter.com/ICPSwap" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                                <FaTwitter size={30} />
                            </a>				
                            <a href="https://icpswap.medium.com/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
                                <FaMedium size={30} />
                            </a>
                            <a href="https://www.icpswap.com/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
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

export default AppicDAO;
