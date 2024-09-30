import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../ui/components/_base/Layout';

const Dex = () => {
	return (
		<>
      <Head>
        <title>DEX | ICP Tokens by Market Cap</title>
				<meta name="description" content="Access ICP DEX to buy, sell, and exchange ICP tokens. Track real-time market data, liquidity, and trading volumes within the Internet Computer ecosystem" />
				<meta name="twitter:title" content="DEX | ICP Tokens by Market Cap"/>
        <meta name="twitter:description" content="Access ICP DEX to buy, sell, and exchange ICP tokens. Track real-time market data, liquidity, and trading volumes within the Internet Computer ecosystem"/>
      </Head>
			<Layout>
				<div className='w-full'>
					<h1 className='h1'>DEX  ICP Tokens</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-4">
						<Link href="/dex/icp-swap" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/icpswap_logo.webp" alt="ICP Swap Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">ICPSwap</span>
							</div>
							<div className="mt-4">
								<p>ICPSwap is a pioneering DEX on the Internet Computer blockchain, offering on-chain token swaps with high-speed, scalable, and low-cost features, marking it as a first in the Internet Computer DeFi ecosystem.</p>
							</div>
						</Link>
						<Link href="/dex/ic-dex" className="max-w-sm mx-auto p-6 shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/icdex_logo.webp" alt="ICDex Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">ICDex</span>
							</div>
							<div className="mt-4">
								<p>{"ICDex, developed by ICLighthouse, is the world's first on-chain orderbook DEX utilizing advanced ICP smart contracts, setting a new standard in decentralized trading."}</p>
							</div>
						</Link>
						<Link href="/dex/sonic" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/sonic-dex_logo.webp" alt="Sonic DEX Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Sonic</span>
							</div>
							<div className="mt-4">
								<p>Sonic DEX leverages the Internet Computer Protocol to provide a comprehensive multichain DeFi platform where users can trade, stake, and engage in governance for enhanced crypto functionalities.</p>
							</div>
						</Link>
						<Link href="/dex/helix-markets" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/helix_logo.webp" alt="Helix Markets Trading Platform Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Helix Markets</span>
							</div>
							<div className="mt-4">
								<p>Helix Markets introduces a decentralized exchange that ensures true ownership and complete transparency in the crypto trading landscape.</p>
							</div>
						</Link>
						<Link href="/dex/icp-ex" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/ICPEx.jpg" alt="ICP Exchange Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">ICPEx</span>
							</div>
							<div className="mt-4">
								<p>Decentralized exchange built entirely on the chain based on the ICP.</p>
							</div>
						</Link>
						<Link href="/dex/appic-dao" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/appic_logo_icon.jpg" alt="AppIC DAO token swap logo" className="h-12 w-12" />
								<span className="font-bold text-lg">AppIC DAO</span>
							</div>
							<div className="mt-4">
								<p>First-ever infrastructure layer that allows transferring and swapping of tokens between ICP and blockchains such as Bitcoin, Ethereum, and Solana.</p>
							</div>
						</Link>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Dex;
