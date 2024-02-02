import React from 'react';
import Layout from '../ui/components/_base/Layout';
import NewsCard from '../ui/components/newsCard';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';


const News = () => {
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
						News
					</Typography>
					<Typography variant="body" gutterBottom>
						Insights into the biggest events shaping the crypto industry.
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

			<NewsCard></NewsCard>
		</Layout>

	);
};

export default News;
