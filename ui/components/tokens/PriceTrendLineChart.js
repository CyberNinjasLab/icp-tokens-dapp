import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis } from 'recharts';

// Utility function to get min and max from the priceData array
const getMinMax = (data, key) => {
  if(data) {
    const values = data.map(item => item[key]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { min, max };
  }

  return {
    min: 0,
    max: 0
  }
};

// Function to determine the scaling factor
const getScalingFactor = (minValue) => {
  if (minValue >= 1000) return 1; // No scaling needed
  if (minValue >= 100) return 10;
  if (minValue >= 10) return 100;
  if (minValue >= 1) return 1000;
  if (minValue >= 0.1) return 10000;
  if (minValue >= 0.01) return 100000;
  if (minValue >= 0.001) return 1000000;
  if (minValue >= 0.0001) return 10000000;
  if (minValue >= 0.00001) return 100000000;
  if (minValue >= 0.000001) return 1000000000;
  if (minValue >= 0.0000001) return 10000000000;
  if (minValue >= 0.00000001) return 100000000000;
  if (minValue >= 0.000000001) return 1000000000000;
  if (minValue >= 0.0000000001) return 10000000000000;
  if (minValue >= 0.00000000001) return 100000000000000;
  return 1000000000000000; // for values < 0.00000000001
};

const PriceTrendLineChart = ({ priceData, lineColor }) => {
  // Get the min and max values for the YAxis domain
  const { min, max } = getMinMax(priceData, 'price');

  // Determine the scaling factor based on the minimum value
  const scalingFactor = getScalingFactor(min);

  // Scale the price data
  const scaledPriceData = priceData ? priceData.map(item => ({
    ...item,
    price: item.price * scalingFactor,
  })) : [];

  return (
    <div className='h-[100%] relative'>
      <ResponsiveContainer width="110%" height='100%'>
        <LineChart
          data={scaledPriceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <YAxis 
            hide={true} 
            domain={[min * scalingFactor, max * scalingFactor]} 
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <XAxis dataKey="name" hide={true} />
          <Line type="natural" dataKey="price" stroke={lineColor} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceTrendLineChart;
