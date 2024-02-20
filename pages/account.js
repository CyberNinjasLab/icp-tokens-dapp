import React, { useState, useContext, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Layout from '../ui/components/_base/Layout';
import { createActor } from '../src/declarations/backend_core';
import { AuthContext } from '../contexts/auth/Auth.Context';
import { useRouter } from 'next/router';

const Account = () => {
	const [accountName, setAccountName] = useState('');
	const { identity, user, initializeUserSession, authClient } = useContext(AuthContext);
	const router = useRouter();

	const backendCoreActor = createActor(process.env.NEXT_PUBLIC_BACKEND_CORE_CANISTER_ID, {
		agentOptions: {
			identity,
			host: process.env.DFX_NETWORK === 'ic' ? (`https://${process.env.NEXT_PUBLIC_BACKEND_CORE_CANISTER_ID}.ic0.app`) : 'http://127.0.0.1:4943',
		},
	});

	// Handler for when the account name changes
	const handleAccountNameChange = (event) => {
		setAccountName(event.target.value);
	};

	// Handler for the click event of the request access button
	const handleRequestAccessClick = async () => {
		await backendCoreActor.addTwitterAcc(accountName);
		initializeUserSession(authClient); // Uncomment or modify according to your actual method to refresh user data
	};

	// Determine if the user has a Twitter account linked
	const hasTwitterAcc = user && user[0] && user[0]['twitterAcc'];
	const showAccessRequest = (!(user && user[0] && user[0]['hasAccess']));

	useEffect(() => {
		if (hasTwitterAcc && !showAccessRequest) {
			router.push('/');
		}
	}, [hasTwitterAcc, showAccessRequest]);

	return (
		<Layout>
			<div className='w-full text-center md:mt-6 max-w-[440px] mx-auto'>
				{!hasTwitterAcc ? (
					<>
						<span className='text-center block text-3xl md:text-2xl font-semibold'>Please Enter<br/>Twitter or OpenChat</span>
						<div className='mt-8'>
							<TextField
								id="outlined-basic"
								label="Account name"
								variant="outlined"
								className='w-full'
								value={accountName}
								onChange={handleAccountNameChange}
							/>
						</div>
						<div className='mt-2'>
							<Button
								variant="contained"
								size='large'
								color='primary'
								className='w-full'
								onClick={handleRequestAccessClick}
							>
								Request access
							</Button>
						</div>
					</>
				) : (
					// Message displayed when a Twitter account is already linked
					<Typography variant="h5" component="h2" className="mt-8">
						{showAccessRequest ? (
							<span>Your request is under review.</span>
						) : (
							<span>My Account</span>
						)}
					</Typography>
				)}
			</div>
		</Layout>
	);
};

export default Account;
