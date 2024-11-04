import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import React from "react";
import Image from 'next/image'; // Import Next.js Image component
import { FaTwitter, FaGlobe } from 'react-icons/fa'; // Import social media icons
import OpenChatIcon from '../../ui/components/_base/icons/OpenChatIcon';
import { Telegram } from '@mui/icons-material';

const HelixMarkets = () => {
	return (
		<>
      <Head>
      <title>Helix Markets | ICP DEX</title>
                <meta name="description" content="Helix Markets is a decentralized exchange on ICP, offering transparent, secure trading with true asset ownership in a trustless environment." />
                <meta name="twitter:title" content="Helix Markets | ICP DEX"/>
                <meta name="twitter:description" content="Helix Markets is a decentralized exchange on ICP, offering transparent, secure trading with true asset ownership in a trustless environment."/>
                <link rel="canonical" href="https://icptokens.net/dex/helix-markets" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Helix Markets | ICP DEX" />
                <meta property="og:description" content="Helix Markets is a decentralized exchange on ICP, offering transparent, secure trading with true asset ownership in a trustless environment." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />      
           </Head>
			<Layout>
			<div className="flex flex-col md:flex-row md:items-center p-5">
                    {/* Content Section */}
                    <div className="flex-2 mb-4 md:mb-0">
                      <h1 className="text-3xl font-bold p-1">Helix Markets</h1>
                      <p className="mt-2 text-lg dark:text-gray-200 p-2">
                        Helix Markets is a decentralized exchange (DEX) on the Internet Computer (ICP) blockchain, ensuring true asset ownership and complete transparency in the crypto trading landscape. By leveraging ICP&apos;s innovative technology, Helix Markets offers a trustless environment where users retain full control of their assets. The platform sets a new standard for decentralized trading, focusing on security, transparency, and user autonomy within the ICP ecosystem.
                      </p>					
                     </div>	
                   <div className="flex-2 flex justify-center items-center flex-col p-5">
                        <div>
                          <Image 
                              src="/logos/helix_logo.jpg " 
                              alt="Helix Markets Logo" 
                              width={150} 
                              height={150}
                              className="rounded-full" // Optional: add some styling like rounded corners
                          />   
                        </div>                     
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://www.helixmarkets.io/" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-primary">
                                <FaGlobe size={20} />
                            </a>
                            <a href="https://x.com/helixmarkets" target="_blank" rel="noopener noreferrer" className="text-white-700 hover:text-primary">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://t.me/helixmarkets" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-primary">
                                <Telegram size={20} />
                            </a>			
                            <a href="https://oc.app/community/hbrvf-7yaaa-aaaar-aunpa-cai/" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-blue-800">
                              <div className='w-[22px] h-[22px]'>
                                <OpenChatIcon className="text-mobile-menu w-[22px] grayscale hover:grayscale-0" style={{ fontSize: 38 }} />
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
export default HelixMarkets;