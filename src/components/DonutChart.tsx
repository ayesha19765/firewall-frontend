"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { nodes } from "../data/nodesData";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Calculate the number of nodes with specific statuses
const activeNodes = nodes.filter(node => node.status === 'active').length;
const disconnectedNodes = nodes.filter(node => node.status === 'inactive').length;
const neverConnectedNodes = nodes.filter(node => node.status === 'disconnected').length;

const data = {
  labels: ['Active', 'Disconnected', 'Never Connected'],
  datasets: [
    {
      data: [activeNodes, disconnectedNodes, neverConnectedNodes],
      backgroundColor: ['#0088FE', '#FF8042', '#FFBB28'],
      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Hide the built-in legend
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
  },
  cutout: '75%',
};

const DonutChart = () => (
  <div style={{ height: '270px', width: '100%', display: 'flex', alignItems: 'center', padding: '10px' }}>
  <div style={{ flex: '2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ width: '80%', height: '80%' }}>
      <Doughnut data={data} options={options} />
    </div>
  </div>
  <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
  {data.labels.map((label, index) => (
    <div key={label} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '12px', height: '12px', backgroundColor: data.datasets[0].backgroundColor[index], marginRight: '8px' }}></div>
      <span style={{ fontSize: '12px' }}>{label}: {data.datasets[0].data[index]}</span>
    </div>
  ))}
</div>

</div>

);

export default DonutChart;
