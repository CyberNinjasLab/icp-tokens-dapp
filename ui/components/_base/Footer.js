import React from 'react';
import Logo from './Logo';
const { version } = require('/package.json');

const Footer = () => {
	return (
		<footer className='mx-auto container mt-14 md:mt-24 mb-12 grid gap-y-12 px-4 md:px-8'>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
						{/* Left Column: Logo and Description */}
						<div>
								<div className="flex items-center gap-4 mb-4">
										<Logo />
								</div>
								<p className="text-left mb-8 max-w-lg text-sm">
								Designed for the ICP enthusiast, our platform is a dedicated hub for all aspects of <b>Internet Computer tokens</b>. From real-time price data to the latest news feeds, we provide a comprehensive and engaging experience for everyone interested in the dynamic world of ICP tokens.
								</p>
						</div>

						{/* Right Column: Footer Links */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-8 text-left md:justify-end">
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
												<li className="text-sm">Why ICP?</li>
												<li className="text-sm">What is a token?</li>
												<li className="text-sm">How to buy a token?</li>
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

				{/* Footer Bottom Text */}
				<div className="md:text-center">
					<p className='text-sm'>
							&copy; {new Date().getFullYear()} ICPTokens v{version}<br />
							Powered by the <a href="https://internetcomputer.org/" className='underline'>Internet Computer</a> &amp; <a href="https://www.tradingview.com/" className='underline'>Trading View</a>
					</p>
				</div>
		</footer>

	);
};

export default Footer;
