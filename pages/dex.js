import Head from 'next/head';
import Layout from '../ui/components/_base/Layout';
import React, { useEffect, useState } from "react";
import useTvlAndVolume from '../ui/hooks/dex/useTvlAndVolume';

const Dex = () => {
	const [loading, setLoading] = useState(true);
    const { icpswap, kongswap, icpex, iclight, sonic, icdex, helix, appic} = useTvlAndVolume();

    useEffect(() => {
        // Set loading to false when all data is fetched
        if (icpswap.tvl && kongswap.tvl && icpex.tvl && iclight.tvl && sonic.tvl) {
            setLoading(false);
        }
    }, [icpswap, kongswap, icpex, iclight, sonic, icdex, helix, appic]);
  
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
						<a href="/dex/icp-swap" target='_blank' className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/icpswap_logo.webp" alt="Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">ICPSwap</span>								
							</div>
							<div
								className={`info-box mt-4 mt-4 transition-all duration-300 ${
									loading ? "blur-sm opacity-50" : ""
								}`}
								>							
								<span className="label">TVL:</span>
								<span className="valueDown"> {icpswap?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="valueUp"> {icpswap?.volume24h}</span>
							</div>					
							<div className="mt-4">
								<p>ICPSwap is a pioneering DEX on the Internet Computer blockchain, offering on-chain token swaps with high-speed, scalable, and low-cost features, marking it as a first in the Internet Computer DeFi ecosystem.</p>
							</div>
						</a>
						<a href="/dex/ic-dex/" target='_blank' className="max-w-sm mx-auto p-6 shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/icdex_logo.webp" alt="Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">ICDex</span>
							</div>
							<div
								className={`info-box mt-4 mt-4 transition-all duration-300 ${
									loading ? "blur-sm opacity-50" : ""
								}`}
								>	
								<span className="label">TVL:</span>
								<span className="valueDown"> {iclight?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="valueUp">  {iclight?.volume24h}</span>
							</div>
							<div className="mt-4">
								<p>{"ICDex, developed by ICLighthouse, is the world's first on-chain orderbook DEX utilizing advanced ICP smart contracts, setting a new standard in decentralized trading."}</p>
							</div>
						</a>
						<a href="/dex/sonic/" target='_blank' className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/sonic-dex_logo.webp" alt="Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">Sonic</span>
							</div>
							<div
								className={`info-box mt-4 mt-4 transition-all duration-300 ${
									loading ? "blur-sm opacity-50" : ""
								}`}
								>	
								<span className="label">TVL:</span>
								<span className="valueUp"> {sonic?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="valueUp">  {sonic?.volume24h}</span>
							</div>
							<div className="mt-4">
								<p>Sonic DEX leverages the Internet Computer Protocol to provide a comprehensive multichain DeFi platform where users can trade, stake, and engage in governance for enhanced crypto functionalities.</p>
							</div>
						</a>
						<a href="/dex/icp-ex/" target="_blank" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/ICPEx.jpg" alt="Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">ICPEx</span>
							</div>
							<div
								className={`info-box mt-4 mt-4 transition-all duration-300 ${
									loading ? "blur-sm opacity-50" : ""
								}`}
								>	
								<span className="label">TVL:</span>
								<span className="valueUp"> {icpex?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="valueUp"> {icpex?.volume24h}</span>
							</div>
							<div className="mt-4">
								<p>ICPEx is a decentralized exchange fully built on-chain, utilizing the power of the Internet Computer to enable fast, secure, and cost-efficient token swaps within the ICP ecosystem.</p>
							</div>
						</a>
						<a href="/dex/kongswap" target="_blank" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/KongSwap.jpg" alt="Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">KongSwap</span>
							</div>
							<div
								className={`info-box mt-4 mt-4 transition-all duration-300 ${
									loading ? "blur-sm opacity-50" : ""
								}`}
								>	
								<span className="label">TVL:</span>
								<span className="valueUp"> {kongswap?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="valueDown">{kongswap?.volume24h}</span>
							</div>
							<div className="mt-4">
								<p>KongSwap is a new DEX on the ICP network, delivering optimized on-chain liquidity pools, cross-chain support using ChainFusion, and a Web2-like login powered by Internet Identity, redefining DeFi&apos;s potential.</p>
							</div>
						</a>
						
					
						<a href="/dex/appic-dao/" target="_blank" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/appic_logo_icon.jpg" alt="Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">AppIC DAO</span>
							</div>
							<div
								className={`info-box mt-4 mt-4 transition-all duration-300 ${
									loading ? "blur-sm opacity-50" : ""
								}`}
								>	
								<span className="label">TVL:</span>
								<span className="valueUp"> {appic?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="valueUp">{appic?.volume24h}</span>
							</div>
							<div className="mt-4">
								<p>First-ever infrastructure layer that allows transferring and swapping of tokens between ICP and blockchains such as Bitcoin, Ethereum, and Solana.</p>
							</div>
						</a>
						<a href="/dex/helix-markets/" target="_blank" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/helix_logo.jpg" alt="Logo" className="h-12 w-12 rounded-full" />
								<span className="font-bold text-lg">Helix Markets</span>
							</div>
							<div
								className={`info-box mt-4 mt-4 transition-all duration-300 ${
									loading ? "blur-sm opacity-50" : ""
								}`}
								>	
								<span className="label">TVL:</span>
								<span className="valueUp">{helix?.tvl}</span>
								<br />
								<span className="label">24 Vol:</span>
								<span className="valueUp">{helix?.volume24h}</span>
							</div>
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