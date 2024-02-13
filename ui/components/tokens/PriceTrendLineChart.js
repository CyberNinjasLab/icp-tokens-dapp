import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const PriceTrendLineChart = ({ priceData, lineColor }) => {
  // Assuming priceData is now directly passed in the expected format
  // No need to convert the data here, expect it to be ready for use

  return (
    <div className='h-[50px]'>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={priceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <Line type="natural" dataKey="price" stroke={lineColor} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceTrendLineChart;
