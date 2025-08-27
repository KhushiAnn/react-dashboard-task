export const fetchSummary = async () => {
  const res = await fetch("https://disease.sh/v3/covid-19/all");
  return res.json();
};

export const fetchHistory = async () => {
  const res = await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30");
  const data = await res.json();
  return Object.keys(data.cases).map((date) => ({
    date,
    cases: data.cases[date],
    deaths: data.deaths[date],
    recovered: data.recovered[date],
  }));
};