import Head from 'next/head';
import Layout from '../ui/components/_base/Layout';
import React, { useContext, useEffect } from "react";
import useTvlAndVolume from '../ui/hooks/dex/useTvlAndVolume';
import { GeneralContext } from '../contexts/general/General.Context';

const Dex = () => {
	const { icpPrice } = useContext(GeneralContext);

	const {
    tvlAndVolumeData,
    fetchAllDexData
  } = useTvlAndVolume();

	useEffect(() => {
		if(icpPrice) {
			fetchAllDexData();
		}
	}, [icpPrice])

	setInterval(function() {
		if(icpPrice) {
			fetchAllDexData();
		}
	}, 1000 * 60);
  
	return (
		<>
      <Head>
        <title>DEX | ICP Tokens by Market Cap</title>
		<meta name="description" content="Access ICP DEX to buy, sell, and exchange ICP tokens. Track real-time market data, liquidity, and trading volumes within the Internet Computer ecosystem"></meta>
      </Head>
			<Layout>
				<div className='w-full'>
					<h1 className='h1'>DEX  ICP Tokens</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-4">
						<a href="/dex/icp-swap" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/icpswap_logo.webp" alt="ICPSwap Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">ICPSwap</span>								
							</div>
							<div
								className={`info-box mt-4 transition-all duration-300 rounded-lg dark:bg-black/20 bg-black/5 p-2 ${
									!tvlAndVolumeData.icpswap.tvl ? "blur-sm opacity-50" : ""
								}`}
								>							
								<span className="label">TVL:</span>
								<span className="font-semibold"> {tvlAndVolumeData.icpswap?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="font-semibold"> {tvlAndVolumeData.icpswap?.volume24h}</span>
							</div>					
							<div className="mt-4">
								<p>ICPSwap is a pioneering DEX on the Internet Computer blockchain, offering on-chain token swaps with high-speed, scalable, and low-cost features, marking it as a first in the Internet Computer DeFi ecosystem.</p>
							</div>
						</a>
						<a href="/dex/ic-dex/" className="max-w-sm mx-auto p-6 shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/icdex_logo.webp" alt="ICDex Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">ICDex</span>
							</div>
							<div
								className={`info-box mt-4 transition-all duration-300 rounded-lg dark:bg-black/20 bg-black/5 p-2 ${
									!tvlAndVolumeData.iclight.tvl ? "blur-sm opacity-50" : ""
								}`}
								>	
								<span className="label">TVL:</span>
								<span className="font-semibold"> {tvlAndVolumeData.iclight?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="font-semibold">  {tvlAndVolumeData.iclight?.volume24h}</span>
							</div>
							<div className="mt-4">
								<p>{"ICDex, developed by ICLighthouse, is the world's first on-chain orderbook DEX utilizing advanced ICP smart contracts, setting a new standard in decentralized trading."}</p>
							</div>
						</a>
						<a href="/dex/sonic/" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/sonic-dex_logo.webp" alt="Sonic DEX Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">Sonic</span>
							</div>
							<div
								className={`info-box mt-4 transition-all duration-300 rounded-lg dark:bg-black/20 bg-black/5 p-2 ${
									!tvlAndVolumeData.sonic.tvl ? "blur-sm opacity-50" : ""
								}`}
								>	
								<span className="label">TVL:</span>
								<span className="font-semibold"> {tvlAndVolumeData.sonic?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="font-semibold">  {tvlAndVolumeData.sonic?.volume24h}</span>
							</div>
							<div className="mt-4">
								<p>Sonic DEX leverages the Internet Computer Protocol to provide a comprehensive multichain DeFi platform where users can trade, stake, and engage in governance for enhanced crypto functionalities.</p>
							</div>
						</a>
						<a href="/dex/icp-ex/" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/ICPEx.jpg" alt="ICPEx Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">ICPEx</span>
							</div>
							<div
								className={`info-box mt-4 transition-all duration-300 rounded-lg dark:bg-black/20 bg-black/5 p-2 ${
									!tvlAndVolumeData.icpex.tvl ? "blur-sm opacity-50" : ""
								}`}
								>	
								<span className="label">TVL:</span>
								<span className="font-semibold"> {tvlAndVolumeData.icpex?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="font-semibold"> {tvlAndVolumeData.icpex?.volume24h}</span>
							</div>
							<div className="mt-4">
								<p>ICPEx is a decentralized exchange fully built on-chain, utilizing the power of the Internet Computer to enable fast, secure, and cost-efficient token swaps within the ICP ecosystem.</p>
							</div>
						</a>
						<a href="/dex/kongswap" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/KongSwap.jpg" alt="KongSwap Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">KongSwap</span>
							</div>
							<div
								className={`info-box mt-4 transition-all duration-300 rounded-lg dark:bg-black/20 bg-black/5 p-2 ${
									!tvlAndVolumeData.kongswap.tvl ? "blur-sm opacity-50" : ""
								}`}
								>	
								<span className="label">TVL:</span>
								<span className="font-semibold"> {tvlAndVolumeData.kongswap?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="font-semibold">{tvlAndVolumeData.kongswap?.volume24h}</span>
							</div>
							<div className="mt-4">
								<p>KongSwap is a new DEX on the ICP network, delivering optimized on-chain liquidity pools, cross-chain support using ChainFusion, and a Web2-like login powered by Internet Identity, redefining DeFi&apos;s potential.</p>
							</div>
						</a>
						
					
						<a href="/dex/appic-dao/" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/appic_logo_icon.jpg" alt="AppIC DAO Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">AppIC DAO</span>
							</div>
							{/* <div
								className={`info-box mt-4 transition-all duration-300 rounded-lg dark:bg-black/20 bg-black/5 p-2 ${
									true ? "blur-sm opacity-50" : ""
								}`}
								>	
								<span className="label">TVL:</span>
								<span className="font-semibold"> {tvlAndVolumeData.appic?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="font-semibold">{tvlAndVolumeData.appic?.volume24h}</span>
							</div> */}
							<div className="mt-4">
								<p>First-ever infrastructure layer that allows transferring and swapping of tokens between ICP and blockchains such as Bitcoin, Ethereum, and Solana.</p>
							</div>
						</a>
						<a href="/dex/helix-markets/" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/helix_logo.jpg" alt="Helix Markets Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">Helix Markets</span>
							</div>
							{/* <div
								className={`info-box mt-4 transition-all duration-300 rounded-lg dark:bg-black/20 bg-black/5 p-2 ${
									true ? "blur-sm opacity-50" : ""
								}`}
								>	
								<span className="label">TVL:</span>
								<span className="font-semibold">{tvlAndVolumeData.helix?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="font-semibold">{tvlAndVolumeData.helix?.volume24h}</span>
							</div> */}
							<div className="mt-4">
								<p>Helix Markets introduces a decentralized exchange that ensures true ownership and complete transparency in the crypto trading landscape.</p>
							</div>
						</a>
						
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Dex;