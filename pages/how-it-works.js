import Layout from '../ui/components/_base/Layout';

const HowItWorks = () => {
	return (
		<Layout>
      <div className='max-w-xl mx-auto mt-6'>
        <h2 className='text-xl font-semibold text-center'>Token Price Calculation Mechanism</h2>
        <p className='mt-4'>Our token price tracker for the <b>Internet Computer network</b> utilizes direct interactions with decentralized exchange (DEX) applications native to the Internet Computer platform. By querying pool canisters directly, we ensure real-time, accurate tracking of token metrics within the ecosystem.</p>
        
        <h3 className='text-base font-semibold mt-6'>Process Overview:</h3>
        <div className='mt-2'>
          <ol className='list-disc pl-6 flex flex-col space-y-2'>
              <li><strong>Direct Query to DEX Canisters:</strong> Regularly querying pool canisters on native Internet Computer DEX apps to obtain the latest market data for each token.</li>
              <li><strong>Data Integrity:</strong> All retrieved data undergoes cleaning and verification steps to ensure accuracy and reliability.</li>
              <li><strong>Price Estimation:</strong> Estimating the price of each token by analyzing data from the pool canisters.</li>
              <li><strong>Volume Calculation:</strong> Determining trading volume by summing transaction volumes across all queried pools over a specified period.</li>
              <li><strong>Data Filtering:</strong> Excluding data points that do not reflect free market conditions or significantly deviate from the norm to ensure accurate representation of prices and volumes.</li>
          </ol>
        </div>
        
        <p className='mt-6'>This methodology ensures that the prices and volumes of tokens on the Internet Computer network are reflective of real market conditions, providing users with reliable and up-to-date information.</p>
      </div>
		</Layout>
	);
};

export default HowItWorks;