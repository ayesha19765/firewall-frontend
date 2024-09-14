"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";
import Card, { CardContent, CardProps } from "@/components/Card";
import AgentsTable from "@/components/AgentsTable";
import DonutChart from "@/components/DonutChart";
import LineChart from "@/components/LineChart";

const cardData: CardProps[] = [
  // Your card data here...
];

const summaryData = {
  activeAgents: 4,
  lastRegisteredAgent: "Fedora",
  disconnectedAgents: 1,
  neverConnectedAgents: 1,
  mostActiveAgent: "Fedora",
  agentsCoverage: "57.14%",
};

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
        <div className="flex-1">
          <CardContent>
            <p className="p-4 font-semibold">Summary</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700 font-semibold">Active Agents</p>
                <p className="text-lg">{summaryData.activeAgents}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Last Registered Agent</p>
                <p className="text-lg">{summaryData.lastRegisteredAgent}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Disconnected</p>
                <p className="text-lg">{summaryData.disconnectedAgents}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Never Connected</p>
                <p className="text-lg">{summaryData.neverConnectedAgents}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Most Active Agent</p>
                <p className="text-lg">{summaryData.mostActiveAgent}</p>
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Agents Coverage</p>
                <p className="text-lg">{summaryData.agentsCoverage}</p>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Line Chart */}
        <div className="flex-1">
          <CardContent>
            <p className="p-4 font-semibold">Agent Activity</p>
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
