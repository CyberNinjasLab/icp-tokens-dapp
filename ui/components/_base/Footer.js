import React from 'react';
import Logo from './Logo';
import Link from 'next/link';

const { version } = require('/package.json');

const Footer = () => {
	return (
		<footer className='w-full border-t border-solid dark:border-gray-600 mt-12 md:mt-20'>
				<div className='container mt-8 md:mt-12 mx-auto md:mb-12 mb-8 grid gap-y-12 px-4 md:px-8'>
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
														<a href="https://cyberninjas.net/" target='_blank'>About Us</a>
													</li>
													<li className="text-sm">
														<Link href="/how-it-works" className='hover:underline'>How it works</Link>
													</li>
											</ul>
									</div>
									<div>
											<h5 className="font-bold text-xl mb-4">More</h5>
											<ul className="flex flex-col gap-2">
													<li className="text-sm">
														<Link href="/changelog" className='hover:underline'>Changelog</Link>
													</li>
													<li className="text-sm">
														<Link href="https://tally.so/r/wkWKbd" target='_blank' className='hover:underline'>Listing request</Link>
													</li>
											</ul>
									</div>
									<div>
											<h5 className="font-bold text-xl mb-4">Socials</h5>
											<ul className="flex flex-col gap-2">
													<li className="text-sm">
														<a href="https://oc.app/community/5bgep-3aaaa-aaaar-a3toq-cai/" className='hover:underline' target='_blank'>OpenChat</a>
													</li>
													<li className="text-sm">
														<a href="https://twitter.com/ICPTokens" className='hover:underline' target='_blank'>X (Twitter)</a>
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
				</div>
		</footer>

	);
};

export default Footer;
