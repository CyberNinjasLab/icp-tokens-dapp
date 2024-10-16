// Import React and required MUI X-Charts components
import React, { useContext } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { GeneralContext } from '../../../contexts/general/General.Context';

// Define the component
const PortfolioPieChart = ({ tokens }) => {
  const { formatPrice, roundPrice, currency } = useContext(GeneralContext);

  // Prepare data for the pie chart
  const pieData = tokens.map(token => {
    const value = roundPrice(token.quantity * token.token.metrics.price[currency]);
    return { name: token.token.symbol, value };
  });

  // Define the series data for the PieChart
  const series = [
    {
      data: pieData,
      innerRadius: 75,
      outerRadius: 100,
      paddingAngle: 0,
      cornerRadius: 0,
      startAngle: 0,
      endAngle: 360,
      cx: 100,
      cy: 130,
    },
  ];

  return (
    <div style={{ width: '100%', height: 250 }}> {/* Ensure the height is set */}
      <PieChart 
        series={series}
        height={250} 
        sx={{
          '.MuiPieArc-root': {
            stroke: '#0f0f26',  // Set the stroke color
            strokeWidth: 0,     // Optionally hide the stroke
          },
        }}
      /> {/* Set the height for the chart */}
    </div>
  );
};

// Export the component
export default PortfolioPieChart;
