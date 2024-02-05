import React from 'react';
import Layout from '../ui/components/_base/Layout';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import NftCard from '../ui/components/NftCard';


const Nft = () => {
	const [typeNews, setTypeNews] = React.useState('');

	const handleChange = (event) => {
		setTypeNews(event.target.value);
	};
	
	console.log(typeNews);

	return (
		<Layout>
			<div className='flex flex-row justify-between items-center'>
				<div>
					<Typography variant="h4" gutterBottom>
					Upcoming Sales of NFT Collections
					</Typography>
					<Typography variant="body" gutterBottom>
					Below is a list of the upcoming sales of NFT collections. They are listed by time and day of release and information includes the blockchain that the collection is hosted on.
					</Typography>
				</div>
				<Box sx={{ minWidth: 120, maxWidth: 220, width: "20%" }}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">All</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={typeNews}
							label="Age"
							onChange={handleChange}
						>
							<MenuItem value={"ICP"}>ICP</MenuItem>
							<MenuItem value={"Bitcoin"}>Bitcoin</MenuItem>
							<MenuItem value={"Something"}>Something</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</div>

			<NftCard></NftCard>
		</Layout>

	);
};

export default Nft;