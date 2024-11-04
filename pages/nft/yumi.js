import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import Image from 'next/image'; // Import Next.js Image component
import MarketCapChart from '../../ui/components/markets/MarketCapChart'; // Import the MarketCapChart component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium, FaDiscord } from 'react-icons/fa'; // Import social media icons
// import FearGreedIndex from '../../ui/components/new/FearGreedIndex';

const Yumi = () => {
    return (
        <>
            <Head>
                <title>Yumi | ICP NFT Market</title>
                <meta name="description" content="Yuku is an AI Web3 platform combining NFT aggregation, 3D spaces, and AI avatars, pioneering new digital interactions in the metaverse and beyond." />
                <meta name="twitter:title" content="Yumi | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="Yuku is an AI Web3 platform combining NFT aggregation, 3D spaces, and AI avatars, pioneering new digital interactions in the metaverse and beyond."/>
                <link rel="canonical" href="https://icptokens.net/nft/yumi" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Yumi | ICP Tokens by Market Cap" />
                <meta property="og:description" content="Yuku is an AI Web3 platform combining NFT aggregation, 3D spaces, and AI avatars, pioneering new digital interactions in the metaverse and beyond." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />
            </Head>		
            <Layout>
                <div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">Yumi | ICP NFT Market</h1>
                        <p className="mt-2 text-lg text-gray-600 p-2">
                        Yumi is a high-speed, low-cost decentralized NFT marketplace on the Internet Computer (ICP) blockchain, offering free, fully on-chain minting and hosting of digital collectibles. As the premier Real World Assets (RWA) NFT marketplace, Yumi bridges digital assets with real-world value, providing creators and collectors a seamless platform for minting, trading, and hosting NFTs with scalable and efficient blockchain technology.
                      </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/yumi_logo.webp" 
                            alt="Yumi - ICP Tokens by Market Cap Logo" 
                            width={200} 
                            height={200}
                            className="rounded" // Optional: add some styling like rounded corners
                        />                        
                        
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://discord.com/invite/x239m2dx6j" target="_blank" rel="noopener noreferrer" className="text-blue-496 hover:text-blue-600">
                                <FaDiscord size={30} />
                            </a>
                            <a href="https://twitter.com/YumiMarketplace" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                                <FaTwitter size={30} />
                            </a>				
                            <a href="https://medium.com/@YumiMarketplace" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
                                <FaMedium size={30} />
                            </a>
                            <a href="https://yumi.io/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
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

export default Yumi;
