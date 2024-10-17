import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import Image from 'next/image'; // Import Next.js Image component
import MarketCapChart from '../../ui/components/markets/MarketCapChart'; // Import the MarketCapChart component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons
// import FearGreedIndex from '../../ui/components/new/FearGreedIndex';

const Bioniq = () => {
    return (
        <>
            <Head>
                <title>Bioniq | ICP NFT Market</title>
                <meta name="description" content="Bioniq is the fastest Ordinals marketplace, offering gas-free trading, near-instant finality, and secure decentralized token bridging for seamless transactions." />
                <meta name="twitter:title" content="Bioniq | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="Bioniq is the fastest Ordinals marketplace, offering gas-free trading, near-instant finality, and secure decentralized token bridging for seamless transactions."/>
                <link rel="canonical" href="https://icptokens.net/nft/bioniq" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Bioniq | ICP Tokens by Market Cap" />
                <meta property="og:description" content="Bioniq is the fastest Ordinals marketplace, offering gas-free trading, near-instant finality, and secure decentralized token bridging for seamless transactions." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />
            </Head>		
            <Layout>
                <div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">Bioniq | ICP NFT Market</h1>
                        <p className="mt-2 text-lg text-gray-600 p-2">
                        Bioniq is the fastest Ordinals marketplace, enabling users to seamlessly buy, sell, and trade digital assets without gas fees. With near-instant finality and secure decentralized token bridging, Bioniq offers a frictionless experience for NFT and token transactions. Built for speed and security, it redefines the trading experience, providing a reliable platform where users can engage with digital assets quickly and efficiently.

                       </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/bioniq-logo.jpeg" 
                            alt="Bioniq - ICP Tokens by Market Cap Logo" 
                            width={200} 
                            height={200}
                            className="rounded" // Optional: add some styling like rounded corners
                        />                        
                        
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://t.me/Bioniq" target="_blank" rel="noopener noreferrer" className="text-blue-496 hover:text-blue-600">
                                <FaTelegram size={30} />
                            </a>
                            <a href="https://twitter.com/Bioniq" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                                <FaTwitter size={30} />
                            </a>				
                            <a href="https://Bioniq.medium.com/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
                                <FaMedium size={30} />
                            </a>
                            <a href="https://www.Bioniq.com/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
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

export default Bioniq;
