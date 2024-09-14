// DonutChart.tsx
"use client"; // Add this directive at the top of your file

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const data = {
  labels: ['Active', 'Disconnected', 'Never Connected'],
  datasets: [
    {
      data: [32, 8, 2],
      backgroundColor: ['#0088FE', '#FF8042', '#FFBB28'],
      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.label || '';
          if (context.parsed !== null) {
            label += `: ${context.parsed}`;
          }
          return label;
        },
      },
    },
    title: {
      display: false,
    },
    datalabels: {
      display: true,
      formatter: (value, context) => {
        if (context.dataIndex === 0) {
          return `Total\n${data.datasets[0].data.reduce((a, b) => a + b, 0)}`;
        }
        return '';
      },
      color: '#000',
      align: 'center',
      anchor: 'center',
      font: {
        size: 20,
        weight: 'bold',
      },
    },
  },
  cutout: '70%', // Adjust to make the donut thinner or thicker
};

const DonutChart = () => (
  <div style={{ position: 'relative', width: 300, height: 300 }}>
    <Doughnut data={data} options={options} />
  </div>
);

export default DonutChart;
