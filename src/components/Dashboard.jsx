import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LucideActivity, LucideVirus, LucideHeartPulse } from 'lucide-react';
import { useFetchData } from '../hooks/useFetchData';

// The Dashboard component which renders the UI
export default function Dashboard() {
  const { data, loading, error } = useFetchData({
    metrics: 'https://disease.sh/v3/covid-19/all',
    historical: 'https://disease.sh/v3/covid-19/historical/all?lastdays=90'
  });

  // Show a loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl text-gray-700 font-semibold p-8 rounded-lg">
          Loading dashboard data...
        </div>
      </div>
    );
  }

  // Show an error message if the API call failed
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl text-red-500 font-semibold p-8 rounded-lg bg-red-100 border border-red-300">
          Error: {error}. Please try again later.
        </div>
      </div>
    );
  }

  // Main dashboard layout
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8 font-[Inter] flex flex-col items-center">
      
      {/* Dashboard Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center leading-tight">
        Global COVID-19 Analytics
      </h1>

      {/* Metric Cards Section */}
      <div className="flex flex-wrap justify-center w-full max-w-6xl mb-8">
        {/* Total Cases Card */}
        <div className="bg-white rounded-xl shadow-lg m-4 p-6 w-full sm:w-1/2 lg:w-1/4 flex flex-col items-center text-center transition-transform hover:scale-105 transform">
          <LucideActivity className="text-yellow-500 mb-2" size={48} />
          <h2 className="text-lg md:text-xl font-bold text-gray-600 mb-1">Total Cases</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-yellow-500">{data.metrics.cases.toLocaleString()}</p>
        </div>

        {/* Total Deaths Card */}
        <div className="bg-white rounded-xl shadow-lg m-4 p-6 w-full sm:w-1/2 lg:w-1/4 flex flex-col items-center text-center transition-transform hover:scale-105 transform">
          <LucideVirus className="text-red-500 mb-2" size={48} />
          <h2 className="text-lg md:text-xl font-bold text-gray-600 mb-1">Total Deaths</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-red-500">{data.metrics.deaths.toLocaleString()}</p>
        </div>

        {/* Total Recovered Card */}
        <div className="bg-white rounded-xl shadow-lg m-4 p-6 w-full sm:w-1/2 lg:w-1/4 flex flex-col items-center text-center transition-transform hover:scale-105 transform">
          <LucideHeartPulse className="text-green-500 mb-2" size={48} />
          <h2 className="text-lg md:text-xl font-bold text-gray-600 mb-1">Total Recovered</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-green-500">{data.metrics.recovered.toLocaleString()}</p>
        </div>
      </div>

      {/* Historical Data Chart Section */}
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Historical Trends (Last 90 Days)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data.historical} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px' }}
              labelStyle={{ fontWeight: 'bold', color: '#333' }}
              itemStyle={{ fontSize: '14px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line
              type="monotone"
              dataKey="cases"
              stroke="#f59e0b"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="deaths"
              stroke="#ef4444"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="recovered"
              stroke="#22c55e"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
