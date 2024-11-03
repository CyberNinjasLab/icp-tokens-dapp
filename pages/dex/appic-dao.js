import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import React, { useEffect, useState } from "react";
import useTvlAndVolume from '../../ui/hooks/dex/useTvlAndVolume'
import MarketCapChart from '../../ui/components/markets/MarketCapChart';
import MarketCapChartTVL from '../../ui/components/markets/MarketCapChartTVL';
import Image from 'next/image'; // Import Next.js Image component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons
const AppicDAO = () => {
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
                <title>AppIC DAO | ICP DEX</title>
                <meta name="description" content="AppIC DAO enables secure token transfers and swaps between ICP, Bitcoin, Ethereum, and Solana, revolutionizing cross-chain interoperability for decentralized finance." />
                <meta name="twitter:title" content="AppIC DAO | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content=""/>
                <link rel="canonical" href="https://icptokens.net/dex/appic-dao" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="AppIC DAO | ICP Tokens by Market Cap" />
                <meta property="og:description" content="AppIC DAO enables secure token transfers and swaps between ICP, Bitcoin, Ethereum, and Solana, revolutionizing cross-chain interoperability for decentralized finance." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />
            </Head>		
            <Layout>
                <div className="flex flex-col md:flex-row md:items-center p-2">
                    {/* Content Section */}
                    <div className="flex-1 mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold p-1">AppIC DAO</h1>
                        <p className="mt-2 text-lg text-gray-200 p-2">
                        AppIC DAO is the first infrastructure layer enabling seamless token transfers and swaps between the Internet Computer (ICP) blockchain and major networks like Bitcoin, Ethereum, and Solana. By bridging these ecosystems, AppIC DAO enhances interoperability, allowing users to interact with multiple blockchain platforms effortlessly. This pioneering solution offers a scalable and secure way to perform cross-chain transactions, empowering decentralized finance across networks.
                        </p>					
                   </div>										
                   {/* Image Section */}
                    <div className="flex-2 flex justify-center items-center flex-col p-2">
                        <Image 
                            src="/logos/appic_logo_icon.jpg" 
                            alt="AppIC DAO - ICP Tokens by Market Cap Logo" 
                            width={150} 
                            height={150}
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
                        <h3 className="text-xl font-bold pb-2">Total Value Locked: {appic?.tvl}</h3>	
                        <MarketCapChart></MarketCapChart>
                    </div> 
                    <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold pb-2 ">24H Volume: {appic?.volume24h}</h3>	
                       <MarketCapChartTVL></MarketCapChartTVL>
                    </div>                   
                </div>             
            </Layout>
        </>
    );
};

export default AppicDAO;
