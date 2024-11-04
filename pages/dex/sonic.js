import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import React, { useEffect } from "react";
import useTvlAndVolume from '../../ui/hooks/dex/useTvlAndVolume'
import Image from 'next/image'; // Import Next.js Image component
import { FaTwitter, FaTelegram, FaGlobe, FaMedium } from 'react-icons/fa'; // Import social media icons

const Sonic = () => {
  const { tvlAndVolumeData, fetchSonicData} = useTvlAndVolume();
 
  useEffect(() => {
    fetchSonicData();
  }, []);

	return (
		<>
      <Head>
      <title>Sonic | ICP DEX </title>
                <meta name="description" content="Sonic DEX harnesses the power of the Internet Computer Protocol (ICP) to offer a comprehensive multichain DeFi platform." />
                <meta name="twitter:title" content="Sonic DEX | ICP Tokens by Market Cap"/>
                <meta name="twitter:description" content="Sonic DEX harnesses the power of the Internet Computer Protocol (ICP) to offer a comprehensive multichain DeFi platform."/>
                <link rel="canonical" href="https://icptokens.net/dex/sonic" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Sonic DEX | ICP Tokens by Market Cap" />
                <meta property="og:description" content="Sonic DEX harnesses the power of the Internet Computer Protocol (ICP) to offer a comprehensive multichain DeFi platform." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />
           </Head>
			<Layout>
			<div className="flex flex-col md:flex-row md:items-center p-5">
                    {/* Content Section */}
                    <div className="flex-2 mb-4 md:mb-0">
                        <h1 className="text-4xl font-bold p-1">Sonic</h1>
                        <p className="mt-2 text-lg dark:text-gray-200 p-2">
						              Sonic DEX harnesses the power of the Internet Computer Protocol (ICP) to offer a comprehensive multichain DeFi platform. Users can seamlessly trade, stake, and participate in governance, unlocking enhanced crypto functionalities. By integrating cross-chain capabilities, Sonic provides a dynamic environment for decentralized finance, ensuring scalability, speed, and low fees across multiple blockchain networks.
						            </p>				
                   </div>	
                   <div className="flex-2 flex justify-center items-center flex-col p-5">
                        <div className='bg-black p-3 rounded-full py-10'>
                        <Image 
                            src="/logos/sonic-dex_logo.webp" 
                            alt="Sonic DEX Logo" 
                            width={150} 
                            height={150}
                            className="rounded-full" // Optional: add some styling like rounded corners
                        />   
                        </div>                     
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://data.sonic.ooo/" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-primary">
                                <FaGlobe size={20} />
                            </a>
                            <a href="https://twitter.com/sonic_ooo" target="_blank" rel="noopener noreferrer" className="text-white-700 hover:text-primary">
                                <FaTwitter size={20} />
                            </a>			
                            <a href="https://github.com/sonicdex/" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-primary">
                                <FaTelegram size={20} />
                            </a>	
                            <a href="https://sonic.ooo/" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-primary">
                                <FaMedium size={20} />
                            </a>
                        </div>	
                    </div>	               
                 </div>	
                <h1 className="text-3xl font-bold items-center p-1"></h1>                
                <div className="flex justify-around items-center px-4 py-8 space-x-8 mt-10 dark:bg-black/20 bg-black/5 rounded-lg">
                <div className="flex-1 flex flex-col items-center md:max-w-max max-w-[110px]">
                        <h3 className="text-xl font-bold"><span class="hidden md:inline">Total Value Locked</span> <span class="inline md:hidden block">TVL</span>:  {tvlAndVolumeData.sonic?.tvl}</h3>	
                        {/* <MarketCapChart></MarketCapChart> */}
                    </div> 
                    <div className="flex-1 flex flex-col items-center md:max-w-max max-w-[140px]">
                        <h3 className="text-xl font-bold">24H Volume: {tvlAndVolumeData.sonic?.volume24h}</h3>	
                       {/* <MarketCapChartTVL></MarketCapChartTVL> */}
                    </div>                   
                </div>            
            </Layout>
		</>
	);
};
export default Sonic;