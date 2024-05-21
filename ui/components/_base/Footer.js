import React from 'react';
import Logo from './Logo';
import Link from 'next/link';

const { version } = require('/package.json');

const Footer = () => {
	return (
		<footer className='mx-auto container mt-14 md:mt-24 md:mb-12 mb-8 grid gap-y-12 px-4 md:px-8'>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
						{/* Left Column: Logo and Description */}
						<div>
								<div className="flex items-center gap-4 mb-4">
										<Logo />
								</div>
								<p className="text-left mb-8 max-w-lg text-sm">The all-in-one tool for investors within the ICP ecosystem.</p>
						</div>

						{/* Right Column: Footer Links */}
						<div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-8 text-left md:justify-end mt-4 md:mt-0">
								<div>
										<h5 className="font-bold text-xl mb-4">About</h5>
										<ul className="flex flex-col gap-2">
												<li className="text-sm">
													<Link href="/about-us" className='hover:underline'>About Us</Link>
												</li>
												<li className="text-sm">
													<Link href="/how-it-works" className='hover:underline'>How it works</Link>
												</li>
												<li className="text-sm">
													<Link href="https://docs.google.com/forms/d/e/1FAIpQLSdgnD57_rJuz4ZkQI8ayjbe1LUInOmGozRehGAlY9pznzuRYw/viewform" target='_blank' className='hover:underline'>Listing request</Link>
												</li>
												<li className="text-sm">
													<Link href="/changelog" className='hover:underline'>Changelog</Link>
												</li>
										</ul>
								</div>
								{/* <div>
										<h5 className="font-bold text-xl mb-4">FAQ</h5>
										<ul className="flex flex-col gap-2">
												<li className="text-sm">Why ICP?</li>
												<li className="text-sm">What is a token?</li>
												<li className="text-sm">How to buy a token?</li>
										</ul>
								</div> */}
								<div>
										<h5 className="font-bold text-xl mb-4">Links</h5>
										<ul className="flex flex-col gap-2">
												<li className="text-sm">
													<a href="https://twitter.com/ICPTokens" className='hover:underline' target='_blank'>X (Twitter)</a>
												</li>
												<li className="text-sm">
													<a href="https://oc.app/community/5bgep-3aaaa-aaaar-a3toq-cai/" className='hover:underline' target='_blank'>OpenChat</a>
												</li>
										</ul>
								</div>
						</div>
				</div>

				{/* Footer Bottom Text */}
				<div className="md:text-center mt-4 md:mt-0">
					<p className='text-sm'>
							&copy; {new Date().getFullYear()} ICPTokens v{version}<br />
							Powered by the <a href="https://internetcomputer.org/" target='_blank' className='underline'>Internet Computer</a> &amp; <a href="https://www.tradingview.com/" target='_blank' className='underline'>Trading View</a>
					</p>
				</div>
		</footer>

	);
};

export default Footer;
