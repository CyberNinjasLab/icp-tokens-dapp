import Head from 'next/head';
import Layout from '../ui/components/_base/Layout';

const Dex = () => {
	return (
		<>
      <Head>
        <title>Wallets | ICP Tokens by Market Cap</title>
				<meta name="description" content="Explore top ICP wallets for secure management of tokens, NFTs, and DeFi assets. Discover wallets like Plug, Stoic, and more, tailored for the Internet Computer ecosystem." />
				<meta name="twitter:title" content="Wallets | ICP Tokens by Market Cap"/>
        <meta name="twitter:description" content="Explore top ICP wallets for secure management of tokens, NFTs, and DeFi assets. Discover wallets like Plug, Stoic, and more, tailored for the Internet Computer ecosystem."/>
      </Head>
			<Layout>
				<div className='w-full'>
					<h1 className='h1'>Wallets</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-4">
						<a href="https://nns.ic0.app/" target='_blank' className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/nns_front_end_logo.webp" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">NNS Dapp</span>
							</div>
							<div className="mt-4">
								<p>{"The NNS front-end dapp allows anyone to interact with the Internet Computer's Network Nervous System with a user-friendly UI. Served completely end-to-end through blockchain, this dapp allows you to manage ICP, stake neurons, participate in voting, and earn governance rewards."}</p>
							</div>
						</a>
						<a href="https://astrox.me/" target='_blank' className="max-w-sm mx-auto p-6 shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/astroxme_logo.webp" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Astrox ME</span>
							</div>
							<div className="mt-4">
								<p>{"ME wallet securing your assets without seed phrase across any devices."}</p>
							</div>
						</a>
						<a href="https://nfid.one/" target='_blank' className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/nfid_logo.webp" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">NFID</span>
							</div>
							<div className="mt-4">
								<p>Embrace the new era of personal empowerment with NFID, the most advanced digital identity to keep your personal information private and digital assets secure.</p>
							</div>
						</a>
						<a href="https://plugwallet.ooo/" target="_blank" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/plug_logo.webp" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Plug Wallet</span>
							</div>
							<div className="mt-4">
								<p>Your Plug into the #InternetComputer Identity + Wallet in one Principal ID Hold, send, swap, deposit cycles, ICP, NFTs and log into IC apps in a click! Available on mobile IOS & Android, and as a browser extension on Chrome & Firefox.</p>
							</div>
						</a>
						<a href="https://wallet.bitfinity.network/" target="_blank" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/bitfinitywallet_logo.webp" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Bitfinity Wallet</span>
							</div>
							<div className="mt-4">
								<p>The Bitfinity Wallet is a multi-chain wallet built and open-sourced by InfinitySwap. It is a browser extension that allows you to store and transfer your BTC, ICP, SNS-1, NFT, and other tokens - as well as log into Internet Computer dapps with a single click. The InfinitySwap Wallet also supports Internet Identity, the powerful authentication framework provided by the Internet Computer.</p>
							</div>
						</a>
						<a href="https://www.stoicwallet.com/" target="_blank" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/stoicwallet_logo.webp" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Stoic Wallet</span>
							</div>
							<div className="mt-4">
								<p>Stoic Wallet by Toniq Labs allows anyone to create a digital wallet, authenticating users through a variety of methods, one of those being Internet Identity. Create accounts, keep an address book, and more.</p>
							</div>
						</a>
						<a href="https://oisy.com/" target="_blank" className="max-w-sm mx-auto p-6  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/oisy_logo.svg" alt="Logo" className="h-12 w-12" />
								<span className="font-bold text-lg">Oisy Wallet</span>
							</div>
							<div className="mt-4">
								<p>Crafted for the Internet Computer, Oisy is a unique Ethereum wallet that operates directly within your browser. It is entirely on-chain and secured by chain-key cryptography and Internet Identity.</p>
							</div>
						</a>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Dex;