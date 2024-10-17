import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import Image from 'next/image'; // Import Next.js Image component
import MarketCapChart from '../../ui/components/markets/MarketCapChart'; // Import the MarketCapChart component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons
// import FearGreedIndex from '../../ui/components/new/FearGreedIndex';

const Yuku = () => {
    return (
        <>
            <Head>
                <title>Yuku | ICP NFT Market</title>
                <meta name="description" content="Yumi is a fast, low-cost decentralized NFT marketplace on ICP, offering free on-chain minting, RWA NFTs, and hosting of digital collectibles." />
                <meta name="twitter:title" content="Yuku | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="Yumi is a fast, low-cost decentralized NFT marketplace on ICP, offering free on-chain minting, RWA NFTs, and hosting of digital collectibles."/>
                <link rel="canonical" href="https://icptokens.net/nft/yuku" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Yuku | ICP Tokens by Market Cap" />
                <meta property="og:description" content="Yumi is a fast, low-cost decentralized NFT marketplace on ICP, offering free on-chain minting, RWA NFTs, and hosting of digital collectibles." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />
            </Head>		
            <Layout>
                <div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">Yuku | ICP NFT Market</h1>
                        <p className="mt-2 text-lg text-gray-600 p-2">
                        Yuku is an AI-driven Web3 platform that combines an NFT aggregator, 3D virtual spaces, and AI-powered avatars to create an immersive digital experience. As the gateway to the metaverse, NFTs, and AI agents, Yuku redefines digital interactions by integrating cutting-edge technologies. It offers limitless potential for creators, collectors, and users to engage in an interactive, futuristic ecosystem, pioneering a new dimension in Web3.
                       </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/yuku_logo.png" 
                            alt="Yuku - ICP Tokens by Market Cap Logo" 
                            width={200} 
                            height={200}
                            className="rounded" // Optional: add some styling like rounded corners
                        />                        
                        
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://t.me/yukuchats" target="_blank" rel="noopener noreferrer" className="text-blue-496 hover:text-blue-600">
                                <FaTelegram size={30} />
                            </a>
                            <a href="https://x.com/yukuapp" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                                <FaTwitter size={30} />
                            </a>				
                            <a href="https://medium.com/@yukuApp" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
                                <FaMedium size={30} />
                            </a>
                            <a href="https://yuku.app/s" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
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

export default Yuku;
