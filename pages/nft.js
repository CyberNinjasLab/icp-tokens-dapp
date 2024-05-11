import Layout from '../ui/components/_base/Layout';

const Nft = () => {
	return (
		<Layout>
			<div className='w-full'>
				<h1 className='h1'>NFT</h1>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-4">
					<a href="https://entrepot.app/" target='_blank' class="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
						<div class="flex items-center space-x-4">
							<img src="/nft/entrepot_logo.webp" alt="Logo" class="h-12 w-12"></img>
							<span class="font-bold text-lg">Entrepot</span>
						</div>
						<div class="mt-4">
							<p>Entrepot, developed by ToniqLabs, creators of multiple renowned projects, is a decentralized NFT marketplace offering comprehensive tools for designing, deploying, and managing NFTs and tokens.</p>
						</div>
					</a>
					<a href="https://bioniq.io/" target='_blank' class="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
						<div class="flex items-center space-x-4">
							<img src="/nft/bioniq-logo.jpeg" alt="Logo" class="h-12 w-12"></img>
							<span class="font-bold text-lg">Bioniq</span>
						</div>
						<div class="mt-4">
							<p>Bioniq is the fastest Ordinals marketplace, enabling users to buy, sell, and trade with no gas fees, near-instant finality, and secure decentralized token bridging.</p>
						</div>
					</a>
					<a href="https://yumi.io/" target='_blank' class="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
						<div class="flex items-center space-x-4">
							<img src="/nft/yumi_logo.webp" alt="Logo" class="h-12 w-12"></img>
							<span class="font-bold text-lg">Yumi</span>
						</div>
						<div class="mt-4">
							<p>Yumi offers a high-speed, low-cost decentralized NFT marketplace on the Internet Computer, providing free, fully on-chain minting and hosting of digital collectibles.</p>
						</div>
					</a>
					<a href="https://yuku.app/" target="_blank" class="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
						<div class="flex items-center space-x-4">
							<img src="/nft/yuku_logo.png" alt="Logo" class="h-12 w-12"></img>
							<span class="font-bold text-lg">Yuku</span>
						</div>
						<div class="mt-4">
							<p>This AI Web3 Platform integrates an NFT Aggregator, 3D space, and AI avatars, pioneering a new dimension in digital interactions.</p>
						</div>
					</a>
				</div>
			</div>
		</Layout>
	);
};

export default Nft;