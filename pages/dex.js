import Head from 'next/head';
import Layout from '../ui/components/_base/Layout';

const Dex = () => {
	return (
		<>
      <Head>
        <title>DEX | ICP Tokens</title>
      </Head>
			<Layout>
				<div className='w-full'>
					<h1 className='h1'>DEX</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-4">
						<a href="https://app.icpswap.com/" target='_blank' className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/icpswap_logo.webp" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">ICPSwap</span>
							</div>
							<div className="mt-4">
								<p>ICPSwap is a pioneering DEX on the Internet Computer blockchain, offering on-chain token swaps with high-speed, scalable, and low-cost features, marking it as a first in the Internet Computer DeFi ecosystem.</p>
							</div>
						</a>
						<a href="https://iclight.io/" target='_blank' className="max-w-sm mx-auto p-6 shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/icdex_logo.webp" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">ICDex</span>
							</div>
							<div className="mt-4">
								<p>{"ICDex, developed by ICLighthouse, is the world's first on-chain orderbook DEX utilizing advanced ICP smart contracts, setting a new standard in decentralized trading."}</p>
							</div>
						</a>
						<a href="https://app.sonic.ooo/" target='_blank' className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/sonic-dex_logo.webp" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Sonic</span>
							</div>
							<div className="mt-4">
								<p>Sonic DEX leverages the Internet Computer Protocol to provide a comprehensive multichain DeFi platform where users can trade, stake, and engage in governance for enhanced crypto functionalities.</p>
							</div>
						</a>
						<a href="https://www.helixmarkets.io/" target="_blank" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/helix_logo.webp" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Helix Markets</span>
							</div>
							<div className="mt-4">
								<p>Helix Markets introduces a decentralized exchange that ensures true ownership and complete transparency in the crypto trading landscape.</p>
							</div>
						</a>
						<a href="https://icpex.org/" target="_blank" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/ICPEx.jpg" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">ICPEx</span>
							</div>
							<div className="mt-4">
								<p>Decentralized exchange built entirely on the chain based on the ICP.</p>
							</div>
						</a>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Dex;