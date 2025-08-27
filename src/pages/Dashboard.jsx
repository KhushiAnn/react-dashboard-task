import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MetricsCard from "../components/MetricsCard";
import CasesChart from "../components/CasesChart";
import { fetchSummary, fetchHistory } from "../services/api";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchSummary().then(setSummary);
    fetchHistory().then(setHistory);
  }, []);

  if (!summary || history.length === 0)
    return <div className="flex justify-center items-center h-screen">Loading...</div>;

  const cards = [
    { title: "Total Cases", value: summary.cases.toLocaleString() },
    { title: "Active Cases", value: summary.active.toLocaleString() },
    { title: "New Cases", value: summary.todayCases.toLocaleString() },
    { title: "Deaths", value: summary.deaths.toLocaleString() },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        COVID-19 Analytics Dashboard
      </h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <MetricsCard title={card.title} value={card.value} />
          </motion.div>
        ))}
      </div>

      {/* Line Chart */}
      <CasesChart history={history} />
    </div>
  );
}