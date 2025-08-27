import { useState, useEffect } from 'react';

// A custom hook to handle data fetching logic
export const useFetchData = (apiUrls) => {
  const [data, setData] = useState({ metrics: null, historical: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    try {
      // Fetch key metrics
      const metricsResponse = await fetch(apiUrls.metrics);
      if (!metricsResponse.ok) {
        throw new Error('Failed to fetch metrics data');
      }
      const metricsData = await metricsResponse.json();

      // Fetch historical data for the chart
      const historicalResponse = await fetch(apiUrls.historical);
      if (!historicalResponse.ok) {
        throw new Error('Failed to fetch historical data');
      }
      const historicalRawData = await historicalResponse.json();

      // Transform the historical data into a format suitable for Recharts
      const transformedData = Object.keys(historicalRawData.cases).map(date => ({
        date,
        cases: historicalRawData.cases[date],
        deaths: historicalRawData.deaths[date],
        recovered: historicalRawData.recovered[date],
      }));

      setData({
        metrics: {
          cases: metricsData.cases,
          deaths: metricsData.deaths,
          recovered: metricsData.recovered
        },
        historical: transformedData
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to call the fetchAllData function once when the component mounts
  useEffect(() => {
    fetchAllData();
  }, []);

  return { data, loading, error };
};
