// components/MarketCapChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','Septembre' ,'Oktober', 'November','December'],
  datasets: [
    {
      label: 'TVL (in billions)',
      data: [3, 5.5, 7, 6, 9, 8, 3, 5.5, 7, 6, 9, 8, 11],
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
        text: 'TVL (in billions)'
      },
      beginAtZero: true
    }
  }
};

const MarketCapChart = () => {
  return <Line data={data} options={options} />;
};

export default MarketCapChart;
