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

	const news = [
		{title:"Cryptoticker.io – Der Podcast – News Episode 3",description:"In der neuen Episode vom Cryptoticker.io Podcast besprechen wir u.a. die Beschlagnahmung von 50.000 BTC und den Jupiter Airdrop.",source:"CryptoTicker",image:"sonic.png",id:"1"},
		{title:"Real World Assets: Mit diesen 5 Coins partizipiert man am Megatrend",description:"Die Tokenisierung von Real World Assets (RWA) ist ein Billionen-Markt. Welche fünf Kryptowährungen sich anbieten, um am Megatrend zu profitieren With hundreds of thousands of coins and toke With hundreds of thousands of coins and toke",source:"BTC-ECHO",image:"icp.png",id:"2"},
		{title:"SEC wins motion to disclose Ripple financial statements, XRP sales details",description:"A federal judge ruled that Ripple must disclose its financial records and details of XRP sales in the SEC's lawsuit over an unregistered securitie With hundreds of thousands of coins and tokeWith hundreds of thousands of coins and toke With hundreds of thousands of coins and toke",source:"crypto.news",image:"mod.png",id:"3"},
		{title:"Best Token for Instant 20x Profits in February 2024",description:"The post Best Token for Instant 20x Profits in February 2024 appeared first on Coinpedia Fintech News With hundreds of thousands of coins and tokeWith hundreds of thousands of coins and toke With hundreds of thousands of coins and toke",source:"Coinpedia Fintech News",image:"sns1.png",id:"4"},
		{title:"Hackers switching to centralized exchanges to fund crypto attacks",description:"There is growing concern about the number of crypto hackers using centralized exchanges to fund their attacks.In order to pay the transaction fees With hundreds of thousands of coins and toke With hundreds of thousands of coins and toke",source:"Cryptonews",image:"sonic.png",id:"5"},
	];

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
			<div className="mt-16">
			{
				news.map(n => <NewsCard key={n.id} news={n}></NewsCard>)
			}
			</div>
		</Layout>

	);
};

export default News;
