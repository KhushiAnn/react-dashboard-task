# 📊 COVID-19 Analytics Dashboard

## Task Title
Build a simple analytics dashboard in React that fetches data from a public API and visualizes it using Recharts.

---

## 🛠 Tech Stack Used
- **React 18** – Frontend framework
- **Vite** – Build tool
- **TailwindCSS** – Styling
- **Recharts** – Data visualization
- **Framer Motion** – Animations
- **Public API** – [disease.sh COVID-19 API](https://disease.sh/)

---

## 📌 Approach
1. **Data Fetching** – Used the `disease.sh` API to fetch global COVID-19 summary and historical data.
2. **Components** – Split the project into reusable components:
   - `MetricsCard` for key stats (Total, Active, New Cases, Deaths)
   - `CasesChart` for the historical line chart
   - `Card` (custom UI wrapper)
3. **Visualization** – Displayed cases, deaths, and recovered trends using Recharts’ LineChart.
4. **Styling** – Used TailwindCSS for responsive design and modern UI.
5. **Animations** – Added subtle animations to metric cards using Framer Motion.

---

## 🚀 How to Run the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/analytics-dashboard.git
cd analytics-dashboard
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run Development Server
```bash
npm run dev
```
