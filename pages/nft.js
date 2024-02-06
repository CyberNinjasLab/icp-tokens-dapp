import React from 'react';
import Layout from '../ui/components/_base/Layout';
import { Box, FormControl , MenuItem, Select, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import NftCard from '../ui/components/NftCard';


const Nft = () => {
	const [alignment, setAlignment] = React.useState('web');
	const [age, setAge] = React.useState('');

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};


	const handleChange2 = (event) => {
		setAge(event.target.value);
	};

	console.log(age);
	console.log(alignment);


	return (
		<Layout>
			<div>
				<Typography variant="h4" gutterBottom>
					Upcoming Sales of NFT Collections
				</Typography>
				<Typography variant="body" gutterBottom>
					Below is a list of the upcoming sales of NFT collections. They are listed by time and day of release and information includes the blockchain that the collection is hosted on.
				</Typography>
			</div>
			<div className="flex justify-end">
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<ToggleButtonGroup
						color="primary"
						value={alignment}
						exclusive
						onChange={handleChange}
						aria-label="Platform"
					>
						<ToggleButton value="web">All</ToggleButton>
						<ToggleButton value="android">Popular</ToggleButton>
						<ToggleButton value="ios">Free</ToggleButton>
					</ToggleButtonGroup>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<Select
							value={age}
							onChange={handleChange2}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
						>
							<MenuItem value="">
								<em>Category</em>
							</MenuItem>
							<MenuItem value={10}>Game</MenuItem>
							<MenuItem value={20}>Art</MenuItem>
							<MenuItem value={30}>Music</MenuItem>
							<MenuItem value={40}>Metaverse</MenuItem>
							<MenuItem value={50}>Utility</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<Select
							value={age}
							onChange={handleChange2}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
						>
							<MenuItem value="">
								<em>All Networks</em>
							</MenuItem>
							<MenuItem value={10}>ICP</MenuItem>
							<MenuItem value={20}>Ethereum</MenuItem>
							<MenuItem value={30}>BRC-20</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</div>
			<NftCard></NftCard>
		</Layout>

	);
};

export default Nft;