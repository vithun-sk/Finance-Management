import React, { useState } from "react";
import { sampleTransactions } from "../SampleData/Data.js";
import "../Styles/Dashboard.css";
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
  //cards
  const totalIncome = sampleTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSavings = sampleTransactions
    .filter((t) => t.type === "savings")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = sampleTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  //graphs
  const dailyExpenses = sampleTransactions
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

  const categoryTotals = sampleTransactions
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
          "#e85555",
          "#f7b24f",
          "#a855f7",
        ],
        borderColor: "#1a2035",
        borderWidth: 2,
      },
    ],
  };
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
        ticks: { color: "#8b949e" },
        grid: { color: "#2a3a5c" },
      },
      y: {
        ticks: { color: "#8b949e" },
        grid: { color: "#2a3a5c" },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#e6edf3", padding: 15 },
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
          <div className="head-date">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
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
            <h3
              style={{
                color: "#e6edf3",
                marginBottom: "20px",
                padding: "20px",
              }}
            >
              Daily Expenses
            </h3>
            <div style={{ height: "300px" }}>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
          <div className="category-graph">
            <h3
              style={{
                color: "#e6edf3",
                marginBottom: "20px",
                padding: "20px",
              }}
            >
              Spending by Category
            </h3>
            <div style={{ height: "300px" }}>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
