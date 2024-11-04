import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import React, { useEffect, useState } from "react";
import useTvlAndVolume from '../../ui/hooks/dex/useTvlAndVolume'
import Image from 'next/image'; // Import Next.js Image component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium, FaMediumM } from 'react-icons/fa'; // Import social media icons
import OpenChatIcon from '../../ui/components/_base/icons/OpenChatIcon';

const ICDex = () => {
  const { tvlAndVolumeData, fetchIcLightData} = useTvlAndVolume();
 
  useEffect(() => {
    fetchIcLightData();
  }, []);

	return (
		<>
      <Head>
      <title>ICDex | ICLighthouse | ICP Dex</title>
                <meta name="description" content="ICLighthouse developed ICDex, the world's first on-chain orderbook decentralized exchange (DEX), on the Internet Computer blockchain." />
                <meta name="twitter:title" content="ICDex | ICLight | ICP Dex"/>
                <meta name="twitter:description" content="ICLighthouse developed ICDex, the world's first on-chain orderbook decentralized exchange (DEX), on the Internet Computer blockchain."/>
                <link rel="canonical" href="https://icptokens.net/dex/ic-dex" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="ICDex | ICLight | ICP Dex" />
                <meta property="og:description" content="ICLighthouse developed ICDex, the world's first on-chain orderbook decentralized exchange (DEX), on the Internet Computer blockchain." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />        	
           </Head>
			<Layout>
			<div className="flex flex-col md:flex-row md:items-center p-5">
                    {/* Content Section */}
                    <div className="flex-2 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">ICDex | ICLight</h1>
                        <p className="mt-2 text-lg text-gray-200 p-2">
						ICLighthouse developed ICDex, the world's first on-chain orderbook decentralized exchange (DEX), on the Internet Computer blockchain. Utilizing advanced ICP smart contracts, ICDex introduces a new standard in decentralized trading with unmatched transparency, security, and efficiency. Its innovative orderbook model enables users to trade digital assets directly on-chain, redefining decentralized finance within the ICP ecosystem.
                        </p>			
                   </div>	
                   <div className="flex-2 flex justify-center items-center flex-col p-5">
                        <div>
                          <Image 
                              src="/logos/icdex_logo.webp " 
                              alt="IC Light DEX Logo" 
                              width={150} 
                              height={150}
                              className="rounded-full" // Optional: add some styling like rounded corners
                          />   
                        </div>                     
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://iclight.house" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-primary">
                                <FaGlobe size={20} />
                            </a>
                            <a href="https://x.com/ICLighthouse" target="_blank" rel="noopener noreferrer" className="text-white-700 hover:text-primary">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://medium.com/@ICLighthouse" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-primary">
                                <FaMediumM size={20} />
                            </a>			
                            <a href="https://oc.app/community/tm574-taaaa-aaaaf-bifgq-cai/" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-blue-800">
                              <div className='w-[22px] h-[22px]'>
                                <OpenChatIcon className="text-mobile-menu w-[22px] grayscale hover:grayscale-0" style={{ fontSize: 38 }} />
                              </div>
                            </a>
                        </div>	
                    </div>	               
                 </div>	
                <h1 className="text-3xl font-bold items-center p-1"></h1>                
                <div className="flex justify-around items-center px-4 py-8 space-x-8 mt-10 bg-black/20 rounded-lg">
                <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold">Total Value Locked: {tvlAndVolumeData.iclight?.tvl}</h3>	
                        {/* <MarketCapChart></MarketCapChart> */}
                    </div> 
                    <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold">24H Volume: {tvlAndVolumeData.iclight?.volume24h}</h3>	
                       {/* <MarketCapChartTVL></MarketCapChartTVL> */}
                    </div>                   
                </div>            
            </Layout>
		</>
	);
};
export default ICDex;