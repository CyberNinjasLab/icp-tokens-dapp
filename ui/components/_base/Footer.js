import React from 'react';

const Footer = () => {
	return (
		<footer className="text-center p-8">
			<div className="mb-8">
				<div className="flex items-center gap-4 mb-8">
					<img src="/logo.png" alt="ICP Tokens logo" className="w-[28px]" />
					<span className="font-semibold uppercase tracking-wide">
						ICP
						<span className="text-[#019a9a]">Tokens</span>
					</span>
				</div>
				<p className="text-left mb-8">Immersed in the ICP ecosystem, our platform delivers an in-depth analysis of the market,transcending basic price and capitalization tracking.</p>
				<div className="flex flex-start flex-wrap gap-x-16 gap-y-8 text-left">
					<div>
						<h5 className="font-bold text-xl mb-4">About</h5>
						<ul className="flex flex-col gap-2">
							<li className="text-sm">About Us</li>
							<li className="text-sm">Roadmap</li>
							<li className="text-sm">How it works</li>
						</ul>
					</div>
					<div>
						<h5 className="font-bold text-xl mb-4">FAQ</h5>
						<ul className="flex flex-col gap-2">
							<li className="text-sm">What is token</li>
							<li className="text-sm">Why ICP</li>
							<li className="text-sm">How to buy token</li>
						</ul>
					</div>
					<div>
						<h5 className="font-bold text-xl mb-4">Links</h5>
						<ul className="flex flex-col gap-2">
							<li className="text-sm">X (Twitter)</li>
							<li className="text-sm">Facebook</li>
							<li className="text-sm">Instagram</li>
						</ul>
					</div>
				</div>
			</div>
			<p>
				&copy; {new Date().getFullYear()} ICPTokens<br />
				Powered by the <a href="https://internetcomputer.org/" className='underline'>Internet Computer</a> & <a href="https://www.tradingview.com/" className='underline'>Trading View</a>
			</p>
		</footer>
	);
};

export default Footer;
