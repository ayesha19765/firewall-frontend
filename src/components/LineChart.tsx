"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns"; // Use date-fns adapter for time parsing

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale // Register the time scale for time-based data on x-axis
);

interface LineChartProps {
  data: {
    timestamps: string[];
    activeCounts: number[];
    disconnectedCounts: number[];
    neverConnectedCounts: number[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  // Log data to check if it's being passed correctly
  console.log("LineChart data:", data);

  // Provide fallback data if props are missing or invalid
  const defaultData = {
    timestamps: ["2024-09-14T08:00:00", "2024-09-14T09:00:00", "2024-09-14T10:00:00"],
    activeCounts: [10, 12, 14],
    disconnectedCounts: [5, 3, 2],
    neverConnectedCounts: [1, 1, 0],
  };

  const validData = data && data.timestamps?.length ? data : defaultData;

  const chartData = {
    labels: validData.timestamps,
    datasets: [
      {
        label: "Active",
        data: validData.activeCounts,
        borderColor: "#0088FE",
        backgroundColor: "rgba(0, 136, 254, 0.2)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Disconnected",
        data: validData.disconnectedCounts,
        borderColor: "#FF8042",
        backgroundColor: "rgba(255, 128, 66, 0.2)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Never Connected",
        data: validData.neverConnectedCounts,
        borderColor: "#FFBB28",
        backgroundColor: "rgba(255, 187, 40, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Timestamp",
        },
        type: "time",
        time: {
          unit: "hour",
          tooltipFormat: "dd MMM, HH:mm", // Time format in tooltip
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-700">Agent Status Over Time</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
