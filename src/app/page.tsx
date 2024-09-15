"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";
import Card, { CardContent, CardProps } from "@/components/Card";
import AgentsTable from "@/components/AgentsTable";
import DonutChart from "@/components/DonutChart";
import LineChart from "@/components/LineChart";
import DashboardCards from "@/components/DashboardCards"; // Import DashboardCards component
import '@fortawesome/fontawesome-free/css/all.min.css';

const cardData: CardProps[] = [
  // Your card data here...
];

export default function Home() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Page Title */}
      <PageTitle title="Dashboard" />

      {/* Cards Section */}
      <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            description={d.description}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>

      {/* Top Row: Donut Chart, Summary Card, Line Chart */}
      <section className="grid w-full gap-4 grid-cols-1 md:grid-cols-3">
        {/* Donut Chart */}
        <div className="flex-1">
          <CardContent>
            <p className="p-4 font-semibold">Connection Status</p>
            <DonutChart />
          </CardContent>
        </div>

        {/* Compact Summary Card */}
        <div className="flex-1 ">
          <CardContent>
            <DashboardCards /> {/* Use DashboardCards component to show summary data */}
          </CardContent>
        </div>

        {/* Line Chart */}
        <div className="flex-1">
          <CardContent>
            <LineChart />
          </CardContent>
        </div>
      </section>

      {/* Full-width Agents Table */}
      <section className="w-full">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <AgentsTable />
        </CardContent>
      </section>
    </div>
  );
}
