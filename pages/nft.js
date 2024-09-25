import Head from 'next/head';
import Layout from '../ui/components/_base/Layout';

const Nft = () => {
	return (
		<>
      <Head>
        <title>NFT | ICP Tokens by Market Cap</title>
		<meta name="description" content="Explore ICP NFT markets to buy and sell ICP NFTs easily. Track top collections and manage your digital assets within the Internet Computer ecosystem."></meta>
      </Head>
			<Layout>
				<div className='w-full'>
					<h1 className='h1'>NFT</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-4">
						<a href="https://entrepot.app/" target='_blank' className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/entrepot_logo.webp" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Entrepot</span>
							</div>
							<div className="mt-4">
								<p>Entrepot, developed by ToniqLabs, creators of multiple renowned projects, is a decentralized NFT marketplace offering comprehensive tools for designing, deploying, and managing NFTs and tokens.</p>
							</div>
						</a>
						<a href="https://bioniq.io/" target='_blank' className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/bioniq-logo.jpeg" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Bioniq</span>
							</div>
							<div className="mt-4">
								<p>Bioniq is the fastest Ordinals marketplace, enabling users to buy, sell, and trade with no gas fees, near-instant finality, and secure decentralized token bridging.</p>
							</div>
						</a>
						<a href="https://yumi.io/" target='_blank' className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/yumi_logo.webp" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Yumi</span>
							</div>
							<div className="mt-4">
								<p>Yumi offers a high-speed, low-cost decentralized NFT marketplace on the Internet Computer, providing free, fully on-chain minting and hosting of digital collectibles.</p>
							</div>
						</a>
						<a href="https://yuku.app/" target="_blank" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/yuku_logo.png" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Yuku</span>
							</div>
							<div className="mt-4">
								<p>This AI Web3 Platform integrates an NFT Aggregator, 3D space, and AI avatars, pioneering a new dimension in digital interactions.</p>
							</div>
						</a>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Nft;