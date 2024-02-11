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

	const nfts = [
		{name:"OneFall",date:"March 08",price:"0.01 ICP",network:"ICP",image:"sonic.png",id:"1"},
		{name:"Perignon",date:"April 15",price:"12 ICP",network:"Bitcoin",image:"icp.png",id:"2"},
		{name:"ICP Substance",date:"September 18",price:"0.2 ICP",network:"ICP",image:"mod.png",id:"3"},
		{name:"Honululu",date:"October 15",price:"30 ICP",network:"Ethereum",image:"sns1.png",id:"4"},
		{name:"Berlin",date:"December 03",price:"1.5 ICP",network:"ICP",image:"sonic.png",id:"5"},
		{name:"Paris",date:"January 30",price:"3.5 ICP",network:"BBCoin",image:"sns1.png",id:"6"},
		{name:"Motoko",date:"June 08",price:"3.8 ICP",network:"ChkCoin",image:"mod.png",id:"7"},
	]

	console.log(age);
	console.log(alignment);


	return (
		<Layout>
			<div className="py-5">
				<Typography className="!text-3xl sm:!text-4xl" variant="h4" gutterBottom>
					Upcoming Sales of NFT Collections
				</Typography>
				<Typography variant="body" gutterBottom>
					Below is a list of the upcoming sales of NFT collections. They are listed by time and day of release and information includes the blockchain that the collection is hosted on.
				</Typography>
			</div>
			<div className="flex justify-center sm:justify-end">
				<Box className="flex-col sm:flex-row" sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
					<FormControl sx={{ minWidth: 120 }}>
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
					<FormControl sx={{ minWidth: 120 }}>
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
			<div className="flex flex-col items-center sm:flex-row flex-wrap justify-center pt-8 gap-8">
			{
				nfts.map(nft => <NftCard key={nft.id} nft={nft}></NftCard>)
			}
			</div>
		</Layout>

	);
};

export default Nft;