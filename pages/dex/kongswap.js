import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import React, { useEffect } from "react";
import useTvlAndVolume from '../../ui/hooks/dex/useTvlAndVolume'
import Image from 'next/image'; // Import Next.js Image component
import { FaTwitter, FaTelegram, FaGlobe } from 'react-icons/fa'; // Import social media icons
import OpenChatIcon from '../../ui/components/_base/icons/OpenChatIcon';

const KongSwap = () => {
  const { tvlAndVolumeData, fetchKongSwapData} = useTvlAndVolume();
 
  useEffect(() => {
    fetchKongSwapData();
  }, []);

	return (
		<>
      <Head>
      <title>KongSwap | ICP DEX </title>
                <meta name="description" content="KongSwap is a fast DEX on ICP, optimized for speed with cross-chain support and secure Web2-style login via Internet Identity, enhancing DeFi transactions." />
                <meta name="twitter:title" content="KongSwap | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="KongSwap is a fast DEX on ICP, optimized for speed with cross-chain support and secure Web2-style login via Internet Identity, enhancing DeFi transactions."/>
                <link rel="canonical" href="https://icptokens.net/dex/kongswap" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="KongSwap | ICP Tokens by Market Cap" />
                <meta property="og:description" content="KongSwap is a fast DEX on ICP, optimized for speed with cross-chain support and secure Web2-style login via Internet Identity, enhancing DeFi transactions." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />
           </Head>
			<Layout>
			<div className="flex flex-col md:flex-row md:items-center p-5">
                    {/* Content Section */}
                    <div className="flex-2 mb-4 md:mb-0">
                        <h1 className="text-4xl font-bold p-1">KongSwap</h1>
                        <p className="mt-2 text-lg dark:text-gray-200 p-2">
                          KongSwap is a high-speed decentralized exchange (DEX) on the Internet Computer (ICP) network, optimized for rapid on-chain transactions and efficient liquidity pools. With cross-chain support via ChainFusion and Web2-like login powered by Internet Identity, KongSwap delivers a fast, secure, and seamless trading experience. It redefines decentralized finance (DeFi) by combining speed, scalability, and interoperability within the ICP ecosystem.
						            </p>				
                   </div>	
                   <div className="flex-2 flex justify-center items-center flex-col p-5">
                        <div>
                          <Image 
                              src="/logos/KongSwap.jpg" 
                              alt="KongSwap DEX Logo" 
                              width={150} 
                              height={150}
                              className="rounded-full" // Optional: add some styling like rounded corners
                          />   
                        </div>                     
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://www.kongswap.io/stats" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-primary">
                                <FaGlobe size={20} />
                            </a>
                            <a href="https://x.com/kongswap" target="_blank" rel="noopener noreferrer" className="text-white-700 hover:text-primary">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://t.me/kong_swap" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-primary">
                                <FaTelegram size={20} />
                            </a>			
                            <a href="https://oc.app/community/maceh-niaaa-aaaaf-bm37q-cai/channel/143833652212619352659918759629305427896" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-blue-800">
                              <div className='w-[22px] h-[22px]'>
                                <OpenChatIcon className="text-mobile-menu w-[22px] grayscale hover:grayscale-0" style={{ fontSize: 38 }} />
                              </div>
                            </a>
                        </div>	
                    </div>	               
                 </div>	
                <h1 className="text-3xl font-bold items-center p-1"></h1>                
                <div className="flex justify-around items-center px-4 py-8 space-x-8 mt-10 dark:bg-black/20 bg-black/5 rounded-lg">
                <div className="flex-1 flex flex-col items-center md:max-w-max max-w-[110px]">
                        <h3 className="text-xl font-bold"><span class="hidden md:inline">Total Value Locked</span> <span class="inline md:hidden block">TVL</span>:  {tvlAndVolumeData.kongswap?.tvl}</h3>	
                        {/* <MarketCapChart></MarketCapChart> */}
                    </div> 
                    <div className="flex-1 flex flex-col items-center md:max-w-max max-w-[140px]">
                        <h3 className="text-xl font-bold">24H Volume: {tvlAndVolumeData.kongswap?.volume24h}</h3>	
                       {/* <MarketCapChartTVL></MarketCapChartTVL> */}
                    </div>                   
                </div>            
            </Layout>
		</>
	);
};
export default KongSwap;