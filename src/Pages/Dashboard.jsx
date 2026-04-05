import React, { useState, useEffect } from "react";
import { sampleTransactions } from "../SampleData/Data.js";
import "../Styles/Dashboard.css";
import { CiLight, CiDark } from "react-icons/ci";
import { AiOutlineWallet } from "react-icons/ai";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCreditCard2Back, BsPiggyBank } from "react-icons/bs";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : sampleTransactions;
  });

  //cards
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSavings = transactions
    .filter((t) => t.type === "savings")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  //graphs
  const dailyExpenses = transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((t) => ({
      date: new Date(t.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      amount: t.amount,
    }));
  const lineData = {
    labels: dailyExpenses.map((t) => t.date),
    datasets: [
      {
        label: "Daily Expenses",
        data: dailyExpenses.map((t) => t.amount),
        borderColor: "#4f8ef7",
        backgroundColor: "rgba(79, 142, 247, 0.1)",
        borderWidth: 2,
        pointBackgroundColor: "#4f8ef7",
        tension: 0.4,
      },
    ],
  };

  const categoryTotals = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#4f8ef7",
          "#2ecc8a",
          "#f755ae",
          "#e85555",
          "#f7b24f",
          "#a855f7",
          "#f455f7",
          "#cff755",
        ],
        borderColor: "#1a2035",
        borderWidth: 2,
      },
    ],
  };
  const isDark =
    document.documentElement.getAttribute("data-theme") !== "light";

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1a2035",
        borderColor: "#2a3a5c",
        borderWidth: 1,
        titleColor: "#e6edf3",
        bodyColor: "#8b949e",
      },
    },
    scales: {
      x: {
        ticks: { color: isDark ? "#8b949e" : "#4a5568" },
        grid: { color: isDark ? "#2a3a5c" : "#e2e8f0" },
      },
      y: {
        ticks: { color: isDark ? "#8b949e" : "#4a5568" },
        grid: { color: isDark ? "#2a3a5c" : "#e2e8f0" },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: isDark ? "#e6edf3" : "#1a202c", padding: 15 },
      },
      tooltip: {
        backgroundColor: "#1a2035",
        borderColor: "#2a3a5c",
        borderWidth: 1,
        titleColor: "#e6edf3",
        bodyColor: "#8b949e",
      },
    },
  };
  return (
    <>
      <div className="dashboard-div">
        <header className="head">
          <div>
            <h1>Dashboard</h1>
            <p className="head-sub">
              Welcome back! Here's your financial summary
            </p>
          </div>
          <div className="date-theme">
            <div className="theme-toggle">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <CiLight /> : <CiDark />}
              </button>
            </div>
            <div className="head-date">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </header>
        <main className="cards">
          <div className="balance-card">
            <AiOutlineWallet
              style={{
                fontSize: "28px",
                color: "#4f8ef7",
                marginBottom: "8px",
              }}
            />
            <h3>Total Balance</h3>
            <p>₹{totalBalance.toLocaleString()}</p>
          </div>
          <div className="income-card">
            <RiMoneyDollarCircleLine
              style={{
                fontSize: "28px",
                color: "#2ecc8a",
                marginBottom: "8px",
              }}
            />
            <h3>Total Income</h3>
            <p>₹{totalIncome.toLocaleString()}</p>
          </div>
          <div className="expense-card">
            <BsCreditCard2Back
              style={{
                fontSize: "28px",
                color: "#e85555",
                marginBottom: "8px",
              }}
            />
            <h3>Total Expense</h3>
            <p>₹{totalExpenses.toLocaleString()}</p>
          </div>
          <div className="savings-card">
            <BsPiggyBank
              style={{
                fontSize: "28px",
                color: "#f7b24f",
                marginBottom: "8px",
              }}
            />
            <h3>Total Savings</h3>
            <p>₹{totalSavings.toLocaleString()}</p>
          </div>
        </main>
        <section className="chart-sections">
          <div className="expense-graph">
            <h3 className="chart-title">Daily Expenses</h3>
            <div
              style={{ height: "350px", width: "600px", paddingLeft: "30px" }}
            >
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
          <div className="category-graph">
            <h3 className="chart-title">Spending by Category</h3>
            <div style={{ height: "350px", width: "500px" }}>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
