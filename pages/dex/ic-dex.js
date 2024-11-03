import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import React, { useEffect, useState } from "react";
import useTvlAndVolume from '../../ui/hooks/dex/useTvlAndVolume'
import MarketCapChart from '../../ui/components/markets/MarketCapChart';
import MarketCapChartTVL from '../../ui/components/markets/MarketCapChartTVL';
import Image from 'next/image'; // Import Next.js Image component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons
const ICPEx = () => {
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
	  <title>ICDex | ICP DEX</title>
                <meta name="description" content="CLighthouse developed ICDex, the world's first on-chain orderbook decentralized exchange (DEX), on the Internet Computer blockchain." />
                <meta name="twitter:title" content="ICDex | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="CLighthouse developed ICDex, the world's first on-chain orderbook decentralized exchange (DEX), on the Internet Computer blockchain."/>
                <link rel="canonical" href="https://icptokens.net/dex/ic-dex" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="ICDex | ICP Tokens by Market Cap" />
                <meta property="og:description" content="" />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />        	
      </Head>
			<Layout>		
				<div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">ICDex | ICP DEX</h1>
                        <p className="mt-2 text-lg text-gray-200 p-2">
						CLighthouse developed ICDex, the world's first on-chain orderbook decentralized exchange (DEX), on the Internet Computer blockchain. Utilizing advanced ICP smart contracts, ICDex introduces a new standard in decentralized trading with unmatched transparency, security, and efficiency. Its innovative orderbook model enables users to trade digital assets directly on-chain, redefining decentralized finance within the ICP ecosystem.
                        </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/icdex_logo.webp " 
                            alt="ICDex - ICP Tokens by Market Cap Logo" 
                            width={150} 
                            height={150}
                            className="rounded-full" // Optional: add some styling like rounded corners
                        />                        
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://discord.com/invite/FQZFGGq7zv" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-blue-600">
                                <FaTelegram size={20} />
                            </a>
                            <a href="https://x.com/ICLighthouse" target="_blank" rel="noopener noreferrer" className="text-white-700 hover:text-blue-800">
                                <FaTwitter size={20} />
                            </a>				
                            <a href="https://medium.com/@ICLighthouse" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-blue-800">
                                <FaMedium size={20} />
                            </a>
                            <a href="https://iclight.house" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-blue-800">
                                <FaGlobe size={20} />
                            </a>
                        </div>	
                    </div>				
                </div>
                <h1 className="text-3xl font-bold items-center p-1"></h1>                
                <div className="flex justify-around items-center p-4 space-x-8 mt-10">
                <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold pb-2">Total Value Locked: {iclight?.tvl}</h3>	
                        <MarketCapChart></MarketCapChart>
                    </div> 
                    <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold pb-2 ">24H Volume: {iclight?.volume24h}</h3>	
                       <MarketCapChartTVL></MarketCapChartTVL>
                    </div>                   
                </div>  
			</Layout>
		</>
	);
};

export default ICPEx;