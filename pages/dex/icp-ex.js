import Head from 'next/head';
import Layout from '../../ui/components/_base/Layout';
import React, { useEffect } from "react";
import useTvlAndVolume from '../../ui/hooks/dex/useTvlAndVolume'
import Image from 'next/image'; // Import Next.js Image component
import { FaTwitter, FaGlobe } from 'react-icons/fa'; // Import social media icons
import OpenChatIcon from '../../ui/components/_base/icons/OpenChatIcon';
import { Telegram } from '@mui/icons-material';

const ICPEx = () => {
  const { tvlAndVolumeData, fetchIcpExData} = useTvlAndVolume();
 
  useEffect(() => {
    fetchIcpExData();
  }, []);

	return (
		<>
      <Head>
      <title>ICPEx | ICP DEX</title>
                <meta name="description" content="" />
                <meta name="twitter:title" content="ICPEx | ICP DEX"/>
                <meta name="twitter:description" content="ICPEx is a DEX on the Internet Computer blockchain, providing efficient, secure, and low-cost token swaps. It enhances DeFi within the ICP ecosystem through seamless, scalable, and fully on-chain trading."/>
                <link rel="canonical" href="https://icptokens.net/dex/icp-ex" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="ICPEx | ICP DEX" />
                <meta property="og:description" content="ICPEx is a DEX on the Internet Computer blockchain, providing efficient, secure, and low-cost token swaps. It enhances DeFi within the ICP ecosystem through seamless, scalable, and fully on-chain trading." />
                <meta property="og:url" content="https://icptokens.net" />
                <meta property="og:site_name" content="ICP Tokens by Market Cap" />	
           </Head>
			<Layout>
			<div className="flex flex-col md:flex-row md:items-center p-5">
                    {/* Content Section */}
                    <div className="flex-2 mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold p-1">ICPex</h1>
                    <p className="mt-2 text-lg dark:text-gray-200 p-2">
                      ICPEx is a decentralized exchange (DEX) designed entirely on the Internet Computer (ICP) blockchain, offering rapid, secure, and low-cost token swaps. Built for efficiency and scalability, ICPEx enables seamless trading across the ICP ecosystem, providing users with a reliable, fully on-chain experience. It empowers decentralized finance by ensuring frictionless, cost-effective transactions and enhanced security for all participants in the ICP network.
                    </p>		
                   </div>	
                   <div className="flex-2 flex justify-center items-center flex-col p-5">
                        <div>
                          <Image 
                              src="/logos/ICPEx.jpg " 
                              alt="ICPEx Dex Logo" 
                              width={150} 
                              height={150}
                              className="rounded-full" // Optional: add some styling like rounded corners
                          />   
                        </div>                     
                        {/* Social Icons */}
                        <div className="mt-4 flex justify-center space-x-6">
                            <a href="https://icpex.org/" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-primary">
                                <FaGlobe size={20} />
                            </a>
                            <a href="https://x.com/icpexchange" target="_blank" rel="noopener noreferrer" className="text-white-700 hover:text-primary">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://t.me/icpexchange" target="_blank" rel="noopener noreferrer" className="text-white-500 hover:text-primary">
                                <Telegram size={20} />
                            </a>			
                            <a href="https://oc.app/community/sy7ft-vqaaa-aaaar-bc2sq-cai/" target="_blank" rel="noopener noreferrer" className="text-white-900 hover:text-blue-800">
                              <div className='w-[22px] h-[22px]'>
                                <OpenChatIcon className="text-mobile-menu w-[22px] grayscale hover:grayscale-0" style={{ fontSize: 38 }} />
                              </div>
                            </a>
                        </div>	
                    </div>	               
                 </div>	
                <h1 className="text-3xl font-bold items-center p-1"></h1>                
                <div className="flex justify-around items-center px-4 py-8 space-x-8 mt-10 dark:bg-black/20 bg-black/5 rounded-lg">
                <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold">Total Value Locked: {tvlAndVolumeData.icpex?.tvl}</h3>	
                        {/* <MarketCapChart></MarketCapChart> */}
                    </div> 
                    <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-xl font-bold">24H Volume: {tvlAndVolumeData.icpex?.volume24h}</h3>	
                       {/* <MarketCapChartTVL></MarketCapChartTVL> */}
                    </div>                   
                </div>            
            </Layout>
		</>
	);
};
export default ICPEx;