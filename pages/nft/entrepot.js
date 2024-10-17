import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import Image from 'next/image'; // Import Next.js Image component
import MarketCapChart from '../../ui/components/markets/MarketCapChart'; // Import the MarketCapChart component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons
// import FearGreedIndex from '../../ui/components/new/FearGreedIndex';

const Entrepot = () => {
    return (
        <>
            <Head>
                <title>Entrepot | ICP NFT Market</title>
                <meta name="description" content="Entrepot, developed by ToniqLabs, is a decentralized NFT marketplace built on the Internet Computer (ICP)." />
                <meta name="twitter:title" content="Entrepot | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content=""/>
                <link rel="canonical" href="https://icptokens.net/dex/entrepot" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Entrepot | ICP Tokens by Market Cap" />
                <meta property="og:description" content="Entrepot, developed by ToniqLabs, is a decentralized NFT marketplace built on the Internet Computer (ICP)." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />
            </Head>		
            <Layout>
                <div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">Entrepot | ICP NFT Market</h1>
                        <p className="mt-2 text-lg text-gray-600 p-2">
                        Entrepot, developed by ToniqLabs, is a decentralized NFT marketplace built on the Internet Computer (ICP), offering powerful tools for designing, deploying, and managing NFTs and tokens. Known for its innovative solutions, Entrepot provides a comprehensive platform for creators and collectors to engage with digital assets securely and efficiently. By leveraging the power of ICP, it enables fast transactions and seamless NFT management across the ecosystem.
                       </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/entrepot_logo.webp" 
                            alt="Entrepot - ICP Tokens by Market Cap Logo" 
                            width={200} 
                            height={200}
                            className="rounded" // Optional: add some styling like rounded corners
                        />                        
                        
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://t.me/entrepot" target="_blank" rel="noopener noreferrer" className="text-blue-496 hover:text-blue-600">
                                <FaTelegram size={30} />
                            </a>
                            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                                <FaTwitter size={30} />
                            </a>				
                            <a href="https://entrepot.app/marketplace" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
                                <FaMedium size={30} />
                            </a>
                            <a href="https://entrepot.app/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
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

export default Entrepot;
