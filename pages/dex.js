import Layout from '../ui/components/_base/Layout';

const Dex = () => {
	return (
		<Layout>
			<div className='w-full'>
				<h1 className='h1'>DEX</h1>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-4">
					<a href="https://app.icpswap.com/" target='_blank' class="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
						<div class="flex items-center space-x-4">
							<img src="/dex/icpswap_logo.webp" alt="Logo" class="h-12 w-12"></img>
							<span class="font-bold text-lg">ICPSwap</span>
						</div>
						<div class="mt-4">
							<p>ICPSwap is a pioneering DEX on the Internet Computer blockchain, offering on-chain token swaps with high-speed, scalable, and low-cost features, marking it as a first in the Internet Computer DeFi ecosystem.</p>
						</div>
					</a>
					<a href="https://iclight.io/" target='_blank' class="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
						<div class="flex items-center space-x-4">
							<img src="/dex/icdex_logo.webp" alt="Logo" class="h-12 w-12"></img>
							<span class="font-bold text-lg">ICDex</span>
						</div>
						<div class="mt-4">
							<p>ICDex, developed by ICLighthouse, is the world's first on-chain orderbook DEX utilizing advanced ICP smart contracts, setting a new standard in decentralized trading.</p>
						</div>
					</a>
					<a href="https://app.sonic.ooo/" target='_blank' class="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
						<div class="flex items-center space-x-4">
							<img src="/dex/sonic-dex_logo.webp" alt="Logo" class="h-12 w-12"></img>
							<span class="font-bold text-lg">Sonic</span>
						</div>
						<div class="mt-4">
							<p>Sonic DEX leverages the Internet Computer Protocol to provide a comprehensive multichain DeFi platform where users can trade, stake, and engage in governance for enhanced crypto functionalities.</p>
						</div>
					</a>
					<a href="https://www.helixmarkets.io/" target="_blank" class="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
						<div class="flex items-center space-x-4">
							<img src="/dex/helix_logo.webp" alt="Logo" class="h-12 w-12"></img>
							<span class="font-bold text-lg">Helix Markets</span>
						</div>
						<div class="mt-4">
							<p>Helix Markets introduces a decentralized exchange that ensures true ownership and complete transparency in the crypto trading landscape.</p>
						</div>
					</a>
				</div>
			</div>
		</Layout>
	);
};

export default Dex;