// components/MarketCapChartTVL.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','Septembre' ,'Oktober', 'November','December'],
  datasets: [
    {
      label: 'VOLUME (in billions)',
      data: [350, 540, 599, 698, 660, 690, 540, 599, 698, 660, 698, 752],
      fill: false,
      backgroundColor: '#2f2048',
      borderColor: '#2f2048'
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => `${tooltipItem.raw} billion`
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Month'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Volume (in billions)'
      },
      beginAtZero: true
    }
  }
};

const MarketCapChartTVL = () => {
  return <Line data={data} options={options} />;
};

export default MarketCapChartTVL;
