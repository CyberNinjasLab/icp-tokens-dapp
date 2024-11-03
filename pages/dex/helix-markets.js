import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import React, { useEffect, useState } from "react";
import useTvlAndVolume from '../../ui/hooks/dex/useTvlAndVolume'
import MarketCapChart from '../../ui/components/markets/MarketCapChart';
import MarketCapChartTVL from '../../ui/components/markets/MarketCapChartTVL';
import Image from 'next/image'; // Import Next.js Image component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons
const HelixMarkets = () => {
    const { icpswap, kongswap, icpex, iclight, sonic, icdex, helix, appic} = useTvlAndVolume();
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
      // Set loading to false when all data is fetched
      if (icpswap.tvl && kongswap.tvl && icpex.tvl && iclight.tvl && sonic.tvl) {
          setLoading(false);
      }
  }, [icpswap, kongswap, icpex, iclight, sonic, icdex, helix, appic]);
    useEffect(() => {
        // Set loading to false when all data is fetched
        if (icpswap.tvl && kongswap.tvl && icpex.tvl && iclight.tvl && sonic.tvl) {
            setLoading(false);
        }
    }, [icpswap, kongswap, icpex, iclight, sonic, icdex, helix, appic]);
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
                        <p className="mt-2 text-lg text-gray-200 p-2">
						Helix Markets is a decentralized exchange (DEX) on the Internet Computer (ICP) blockchain, ensuring true asset ownership and complete transparency in the crypto trading landscape. By leveraging ICP's innovative technology, Helix Markets offers a trustless environment where users retain full control of their assets. The platform sets a new standard for decentralized trading, focusing on security, transparency, and user autonomy within the ICP ecosystem.
					   </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/helix_logo.jpg" 
                            alt="Helix Markets - ICP Tokens by Market Cap Logo" 
                            width={150} 
                            height={150}
                            className="rounded-full" // Optional: add some styling like rounded corners
                        />                        
                       
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://t.me/helixmarkets" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-blue-600">
                                <FaTelegram size={20} />
                            </a>
                            <a href="https://x.com/HelixMarkets" target="_blank" rel="noopener noreferrer" className="text-white-700 hover:text-blue-800">
                                <FaTwitter size={20} />
                            </a>
                           <a href="https://oc.app/community/hbrvf-7yaaa-aaaar-aunpa-cai/channel/294290575597985570537951989224772204789/" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-blue-800">
                                <FaGlobe size={20} />
                            </a>
                        </div>	
                    </div>				
                </div>
                <h1 className="text-3xl font-bold items-center p-1"></h1>                
                <div className="flex justify-around items-center p-4 space-x-8 mt-10">
                <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold pb-2">Total Value Locked: {helix?.tvl}</h3>	
                        <MarketCapChart></MarketCapChart>
                    </div> 
                    <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold pb-2 ">24H Volume: {helix?.volume24h}</h3>	
                       <MarketCapChartTVL></MarketCapChartTVL>
                    </div>                   
                </div> 
			</Layout>
		</>
	);
};

export default HelixMarkets;