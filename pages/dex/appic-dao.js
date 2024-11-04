import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import React from "react";
import Image from 'next/image'; // Import Next.js Image component
import { FaTwitter, FaGlobe, FaDiscord } from 'react-icons/fa'; // Import social media icons
import { GitHub } from '@mui/icons-material';

const AppICDAO = () => {
	return (
		<>
      <Head>
      <title>AppIC DAO | ICP DEX</title>
                <meta name="description" content="AppIC DAO enables secure token transfers and swaps between ICP, Bitcoin, Ethereum, and Solana, revolutionizing cross-chain interoperability for decentralized finance." />
                <meta name="twitter:title" content="AppIC DAO | ICP DEX"/>
                <meta name="twitter:description" content=""/>
                <link rel="canonical" href="https://icptokens.net/dex/appic-dao" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="AppIC DAO | ICP DEX" />
                <meta property="og:description" content="AppIC DAO enables secure token transfers and swaps between ICP, Bitcoin, Ethereum, and Solana, revolutionizing cross-chain interoperability for decentralized finance." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" /> 
           </Head>
			<Layout>
			<div className="flex flex-col md:flex-row md:items-center p-5">
                    {/* Content Section */}
                    <div className="flex-2 mb-4 md:mb-0">
                      <h1 className="text-3xl font-bold p-1">AppIC DAO</h1>
                      <p className="mt-2 text-lg dark:text-gray-200 p-2">
                        AppIC DAO is the first infrastructure layer enabling seamless token transfers and swaps between the Internet Computer (ICP) blockchain and major networks like Bitcoin, Ethereum, and Solana. By bridging these ecosystems, AppIC DAO enhances interoperability, allowing users to interact with multiple blockchain platforms effortlessly. This pioneering solution offers a scalable and secure way to perform cross-chain transactions, empowering decentralized finance across networks.
                      </p>					
                     </div>	
                   <div className="flex-2 flex justify-center items-center flex-col p-5">
                        <div>
                          <Image 
                              src="/logos/appic_logo_icon.jpg " 
                              alt="AppIC DAO Logo" 
                              width={150} 
                              height={150}
                              className="rounded-full" // Optional: add some styling like rounded corners
                          />   
                        </div>                     
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://appicdao.com/" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-primary">
                                <FaGlobe size={20} />
                            </a>
                            <a href="https://x.com/appic_icp" target="_blank" rel="noopener noreferrer" className="text-white-700 hover:text-primary">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://discord.com/invite/sHa7SCgEPV" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-primary">
                                <FaDiscord size={20} />
                            </a>			
                            <a href="https://github.com/Appic-Solutions" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-blue-800">
                              <div className='w-[22px] h-[22px]'>
                                <GitHub size={20} />
                              </div>
                            </a>
                        </div>	
                    </div>	               
                 </div>	
                <h1 className="text-3xl font-bold items-center p-1"></h1>                
                {/* <div className="flex justify-around items-center px-4 py-8 space-x-8 mt-10 dark:bg-black/20 bg-black/5 rounded-lg">
                <div className="flex-1 flex flex-col items-center md:max-w-max max-w-[110px]">
                        <h3 className="text-xl font-bold"><span class="hidden md:inline">Total Value Locked</span> <span class="inline md:hidden block">TVL</span>:  {tvlAndVolumeData.helix?.tvl}</h3>	
                        <MarketCapChart></MarketCapChart>
                    </div> 
                    <div className="flex-1 flex flex-col items-center md:max-w-max max-w-[140px]">
                        <h3 className="text-xl font-bold">24H Volume: {tvlAndVolumeData.helix?.volume24h}</h3>	
                       <MarketCapChartTVL></MarketCapChartTVL>
                    </div>                   
                </div>             */}
            </Layout>
		</>
	);
};
export default AppICDAO;