import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import Image from 'next/image'; // Import Next.js Image component
import MarketCapChart from '../../ui/components/markets/MarketCapChart'; // Import the MarketCapChart component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons
// import FearGreedIndex from '../../ui/components/new/FearGreedIndex';

const HelixMarkets = () => {
	return (
		<>
      <Head>
	  <title>Helix Markets | DEX</title>
                <meta name="description" content="Helix Markets is a decentralized exchange on ICP, offering transparent, secure trading with true asset ownership in a trustless environment." />
                <meta name="twitter:title" content="Helix Markets | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="Helix Markets is a decentralized exchange on ICP, offering transparent, secure trading with true asset ownership in a trustless environment."/>
                <link rel="canonical" href="https://icptokens.net/dex/helix-markets" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Helix Markets | ICP Tokens by Market Cap" />
                <meta property="og:description" content="Helix Markets is a decentralized exchange on ICP, offering transparent, secure trading with true asset ownership in a trustless environment." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />      
		</Head>
			<Layout>			
				<div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">Helix Markets | ICP DEX</h1>
                        <p className="mt-2 text-lg text-gray-600 p-2">
						Helix Markets is a decentralized exchange (DEX) on the Internet Computer (ICP) blockchain, ensuring true asset ownership and complete transparency in the crypto trading landscape. By leveraging ICP's innovative technology, Helix Markets offers a trustless environment where users retain full control of their assets. The platform sets a new standard for decentralized trading, focusing on security, transparency, and user autonomy within the ICP ecosystem.
					   </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/helix_logo.webp" 
                            alt="Helix Markets - ICP Tokens by Market Cap Logo" 
                            width={200} 
                            height={200}
                            className="rounded" // Optional: add some styling like rounded corners
                        />                        
                       
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://t.me/helixmarkets" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                <FaTelegram size={30} />
                            </a>
                            <a href="https://x.com/HelixMarkets" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                                <FaTwitter size={30} />
                            </a>				
                            <a href="https://discord.com/invite/QKSFnspbtb" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
                                <FaDiscord size={30} />
                            </a>
                            <a href="https://oc.app/community/hbrvf-7yaaa-aaaar-aunpa-cai/channel/294290575597985570537951989224772204789/" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:text-blue-800">
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

export default HelixMarkets;