import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import React, { useEffect, useState } from "react";
import useTvlAndVolume from '../../ui/hooks/dex/useTvlAndVolume'
import Image from 'next/image'; // Import Next.js Image component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons

const ICPSwap = () => {
  const { tvlAndVolumeData, fetchIcpSwapData} = useTvlAndVolume();
 
  useEffect(() => {
    fetchIcpSwapData();
  }, []);

	return (
		<>
      <Head>
        <title>ICP Swap | ICP DEX</title>
                <meta name="description" content="ICPSwap is a decentralized exchange (DEX) on the Internet Computer blockchain, enabling fast, scalable, and low-cost token swaps." />
                <meta name="twitter:title" content="ICP Swap | ICP DEX"/>
                <meta name="twitter:description" content="ICPSwap is a decentralized exchange (DEX) on the Internet Computer blockchain, enabling fast, scalable, and low-cost token swaps."/>
                <link rel="canonical" href="https://icptokens.net/dex/icp-swap" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="ICP Swap | ICP DEX" />
                <meta property="og:description" content="ICPSwap is a decentralized exchange (DEX) on the Internet Computer blockchain, enabling fast, scalable, and low-cost token swaps." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />
           </Head>
			<Layout>
			<div className="flex flex-col md:flex-row md:items-center p-5">
                    {/* Content Section */}
                    <div className="flex-2 mb-4 md:mb-0">
                        <h1 className="text-4xl font-bold p-1">ICP Swap</h1>
                                                <p className="mt-2 text-lg text-gray-200 p-5">
						ICPSwap is a decentralized exchange (DEX) on the Internet Computer blockchain, enabling fast, scalable, and low-cost token swaps. As a first in the ICP DeFi ecosystem, it offers on-chain token swapping with seamless speed and efficiency. ICPSwap delivers a scalable infrastructure for traders and developers, pioneering decentralized finance on Internet Computer ICP by providing a user-friendly platform that supports a wide range of digital assets.
                        </p>					
                   </div>	
                   <div className="flex-2 flex justify-center items-center flex-col p-5">
                        <Image 
                            src="/logos/icpswap_logo.webp" 
                            alt="ICP Swap DEX Logo" 
                            width={150} 
                            height={150}
                            className="rounded-full" // Optional: add some styling like rounded corners
                        />                        
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://www.icpswap.com/" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-primary">
                                <FaGlobe size={20} />
                            </a>
                            <a href="https://x.com/icpswap" target="_blank" rel="noopener noreferrer" className="text-white-700 hover:text-primary">
                                <FaTwitter size={20} />
                            </a>	
                            <a href="https://t.me/ICPSwap_Official" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-primary">
                                <FaTelegram size={20} />
                            </a>			
                            <a href="https://icpswap.medium.com/" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-primary">
                                <FaMedium size={20} />
                            </a>
                        </div>	
                    </div>	               
                 </div>	
                <h1 className="text-3xl font-bold items-center p-1"></h1>                
                <div className="flex justify-around items-center px-4 py-8 space-x-8 mt-10 bg-black/20 rounded-lg">
                <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold">Total Value Locked: {tvlAndVolumeData.icpswap?.tvl}</h3>	
                        {/* <MarketCapChart></MarketCapChart> */}
                    </div> 
                    <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold">24H Volume: {tvlAndVolumeData.icpswap?.volume24h}</h3>	
                       {/* <MarketCapChartTVL></MarketCapChartTVL> */}
                    </div>                   
                </div>            
            </Layout>
		</>
	);
};
export default ICPSwap;