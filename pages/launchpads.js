import Head from 'next/head';
import Layout from '../ui/components/_base/Layout';
import React from "react";
import Link from 'next/link';

const Launchpads = () => {
	return (
		<>
      <Head>
        <title>Launchpads | ICP Tokens by Market Cap</title>
		<meta name="description" content="Discover leading ICP launchpads for token creation, fundraising, and decentralized project launcheson on the Internet Computer blockchain."></meta>
      </Head>
			<Layout>
				<div className='w-full'>
					<h1 className='h1 text-center'>Internet Computer Launchpads</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-4 max-w-[950px] mx-auto">
						<Link href="https://nns.ic0.app/launchpad" target='blank' className="max-w-sm mx-auto p-6 w-full  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/nns_front_end_logo.webp" alt="ICPSwap Logo" className="h-12 w-12 rounded-full" />
								<h2 className="font-bold text-lg">NNS Launchpad</h2>								
							</div>
							<div className="mt-4">
                <h3 class="font-semibold mb-1">Decentralized Governance DAOs</h3>
								<p>Launch <a href="https://internetcomputer.org/how-it-works/sns" target='_blank'>SNS</a> DAOs to transform dapps into community-owned ecosystems with built-in governance tokens.</p>
							</div>
						</Link>
						<Link href="https://launch.bob.fun/" target='blank' className="max-w-sm mx-auto p-6 w-full  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/bob-launchpad.png" alt="ICPSwap Logo" className="h-12 w-12 rounded-full" />
								<h2 className="font-bold text-lg">BOB Launch</h2>								
							</div>
							<div className="mt-4">
                <h3 class="font-semibold mb-1">Instantly Tradable Tokens</h3>
								<p>Create tokens that can be traded immediately without liquidity seeding.</p>
							</div>
						</Link>
            <Link href="https://icto.app/Launchpad" target='blank' className="max-w-sm mx-auto p-6 w-full  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/ICTO.png" alt="ICPSwap Logo" className="h-12 w-12 rounded-full" />
								<h2 className="font-bold text-lg">ICTO Launchpad</h2>								
							</div>
							<div className="mt-4">
                <h3 class="font-semibold mb-1">Automated Token Management</h3>
								<p>Streamline token vesting, payroll, and fundraising on the Internet Computer blockchain.</p>
							</div>
						</Link>		
            <Link href="https://pacapump.io/" target='blank' className="max-w-sm mx-auto p-6 w-full  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/paca-launchpad.png" alt="ICPSwap Logo" className="h-12 w-12 rounded-full" />
								<h2 className="font-bold text-lg">PacaPump</h2>								
							</div>
							<div className="mt-4">
                <h3 class="font-semibold mb-1">Token Creation Made Easy</h3>
								<p>Launch, manage, and trade tokens on the Internet Computer blockchain with a few clicks.</p>
							</div>
						</Link>		
            <Link href="https://fomowell.com/" target='blank' className="max-w-sm mx-auto p-6 w-full  shadow-lg dark:bg-gray-500/20 rounded-lg">
							<div className="flex items-center space-x-4">
								<img src="/logos/fomowell.png" alt="ICPSwap Logo" className="h-12 w-12 rounded-full" />
								<h2 className="font-bold text-lg">FomoWell</h2>								
							</div>
							<div className="mt-4">
                <h3 class="font-semibold mb-1">Meme Coin Launchpad</h3>
								<p>Issue low-cost meme coins with AI integration and on-chain content management via ICP.</p>
							</div>
						</Link>			
						<div>
							<img src="/illustrations/astrounaut.png" className='w-auto max-w-[200px] mx-auto hidden sm:block' />
						</div>			
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Launchpads;