import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import React, { useEffect, useState } from "react";
import useTvlAndVolume from '../../ui/hooks/dex/useTvlAndVolume'
import MarketCapChart from '../../ui/components/markets/MarketCapChart';
import MarketCapChartTVL from '../../ui/components/markets/MarketCapChartTVL';
import Image from 'next/image'; // Import Next.js Image component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons

const ICPSwap = () => {
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
        <title>ICP Swap | ICP DEX</title>
                <meta name="description" content="ICPSwap is a decentralized exchange (DEX) on the Internet Computer blockchain, enabling fast, scalable, and low-cost token swaps." />
                <meta name="twitter:title" content="ICP Swap | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="ICPSwap is a decentralized exchange (DEX) on the Internet Computer blockchain, enabling fast, scalable, and low-cost token swaps."/>
                <link rel="canonical" href="https://icptokens.net/dex/icp-swap" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="ICP Swap | ICP Tokens by Market Cap" />
                <meta property="og:description" content="" />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />
           </Head>
			<Layout>
			<div className="flex flex-col md:flex-row md:items-center p-5">
                    {/* Content Section */}
                    <div className="flex-2 mb-4 md:mb-0">
                        <h1 className="text-4xl font-bold p-1">ICP Swap | ICP DEX</h1>
                                                <p className="mt-2 text-lg text-gray-200 p-5">
						ICPSwap is a decentralized exchange (DEX) on the Internet Computer blockchain, enabling fast, scalable, and low-cost token swaps. As a first in the ICP DeFi ecosystem, it offers on-chain token swapping with seamless speed and efficiency. ICPSwap delivers a scalable infrastructure for traders and developers, pioneering decentralized finance on Internet Computer ICP by providing a user-friendly platform that supports a wide range of digital assets.
                        </p>					
                   </div>	
                   <div className="flex-2 flex justify-center items-center flex-col p-5">
                        <Image 
                            src="/logos/icpswap_logo.webp" 
                            alt="KongSwap - ICP Tokens by Market Cap Logo" 
                            width={200} 
                            height={200}
                            className="rounded-full" // Optional: add some styling like rounded corners
                        />                        
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://t.me/kong_swap" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-blue-600">
                                <FaTelegram size={20} />
                            </a>
                            <a href="https://x.com/kongswap" target="_blank" rel="noopener noreferrer" className="text-white-700 hover:text-blue-800">
                                <FaTwitter size={20} />
                            </a>				
                            <a href="https://oc.app/community/maceh-niaaa-aaaaf-bm37q-cai/channel/143833652212619352659918759629305427896" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-blue-800">
                                <FaMedium size={20} />
                            </a>
                            <a href="https://github.com/KongSwap/kong" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-blue-800">
                                <FaGlobe size={20} />
                            </a>
                        </div>	
                    </div>	               
                 </div>	
                <h1 className="text-3xl font-bold items-center p-1"></h1>                
                <div className="flex justify-around items-center p-4 space-x-8 mt-10">
                <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold pb-2">Total Value Locked: {icpswap?.tvl}</h3>	
                        <MarketCapChart></MarketCapChart>
                    </div> 
                    <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold pb-2 ">24H Volume: {icpswap?.volume24h}</h3>	
                       <MarketCapChartTVL></MarketCapChartTVL>
                    </div>                   
                </div>            
            </Layout>
		</>
	);
};
export default ICPSwap;