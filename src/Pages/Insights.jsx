import React, { useState, useEffect } from "react";
import { sampleTransactions } from "../SampleData/Data.js";
import "../Styles/Insights.css";
import { CiLight, CiDark } from "react-icons/ci";
import { useTheme } from "../Components/ThemeContext.jsx";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Insights = () => {
  const { theme, setTheme } = useTheme();
  const isDark =
    document.documentElement.getAttribute("data-theme") !== "light";
  const [transactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : sampleTransactions;
  });

  const expenses = transactions.filter((t) => t.type === "expense");
  const incomes = transactions.filter((t) => t.type === "income");
  const savings = transactions.filter((t) => t.type === "savings");

  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalSavings = savings.reduce((sum, t) => sum + t.amount, 0);
  const savingsRate =
    totalIncome > 0 ? ((totalSavings / totalIncome) * 100).toFixed(1) : 0;
  const expenseRate =
    totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(1) : 0;

  // Highest spending category
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  );
  const highestCategory = sortedCategories[0];

  // Top 3 expensive transactions
  const top3Expenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  // Monthly comparison
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).getMonth();
    if (!acc[month]) acc[month] = { income: 0, expense: 0, savings: 0 };
    if (t.type === "income") acc[month].income += t.amount;
    if (t.type === "expense") acc[month].expense += t.amount;
    if (t.type === "savings") acc[month].savings += t.amount;
    return acc;
  }, {});

  const activeMonths = Object.keys(monthlyData).sort((a, b) => a - b);

  const barData = {
    labels: activeMonths.map((m) => monthNames[m]),
    datasets: [
      {
        label: "Income",
        data: activeMonths.map((m) => monthlyData[m].income),
        backgroundColor: "rgba(46, 204, 138, 0.7)",
        borderColor: "#2ecc8a",
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: "Expenses",
        data: activeMonths.map((m) => monthlyData[m].expense),
        backgroundColor: "rgba(232, 85, 85, 0.7)",
        borderColor: "#e85555",
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: "Savings",
        data: activeMonths.map((m) => monthlyData[m].savings),
        backgroundColor: "rgba(247, 178, 79, 0.7)",
        borderColor: "#f7b24f",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: isDark ? "#8b949e" : "#4a5568", padding: 15 },
      },
      tooltip: {
        backgroundColor: "#1a2035",
        borderColor: "#2a3a5c",
        borderWidth: 1,
        titleColor: "#e6edf3",
        bodyColor: "#8b949e",
        callbacks: {
          label: (ctx) => ` ₹${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#8b949e" },
        grid: { color: isDark ? "#2a3a5c" : "#e2e8f0" },
      },
      y: {
        ticks: {
          color: "#8b949e",
          callback: (v) => `₹${v.toLocaleString()}`,
        },
        grid: { color: isDark ? "#2a3a5c" : "#e2e8f0" },
      },
    },
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // Smart observations
  const observations = [];
  if (expenseRate > 70)
    observations.push({
      icon: "⚠️",
      color: "#e85555",
      text: `You're spending ${expenseRate}% of your income — consider cutting back on non-essentials.`,
    });
  else if (expenseRate < 40)
    observations.push({
      icon: "✅",
      color: "#2ecc8a",
      text: `Great job! You're only spending ${expenseRate}% of your income.`,
    });

  if (savingsRate > 20)
    observations.push({
      icon: "🎯",
      color: "#2ecc8a",
      text: `You're saving ${savingsRate}% of your income — you're on the right track!`,
    });
  else
    observations.push({
      icon: "💡",
      color: "#f7b24f",
      text: `Your savings rate is ${savingsRate}%. Try to aim for at least 20%.`,
    });

  if (highestCategory)
    observations.push({
      icon: "📊",
      color: "#e85555",
      text: `Your biggest spending category is "${highestCategory[0]}" at ₹${highestCategory[1].toLocaleString()}.`,
    });

  const categoryColors = [
    "#4f8ef7",
    "#2ecc8a",
    "#e85555",
    "#f7b24f",
    "#a855f7",
    "#06b6d4",
    "#f43f5e",
    "#84cc16",
  ];

  return (
    <div className="insights-div">
      <header className="head">
        <div>
          <h1>Insights</h1>
          <p className="head-sub">Analyse your financial patterns</p>
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

      <main className="insights-main">
        {/* Summary Rate Cards */}
        <section className="insights-rate-cards">
          <div className="rate-card">
            <span className="rate-icon">💸</span>
            <h4>Expense Rate</h4>
            <p className="rate-value" style={{ color: "#e85555" }}>
              {expenseRate}%
            </p>
            <span className="rate-sub">of total income</span>
          </div>
          <div className="rate-card">
            <span className="rate-icon">🐷</span>
            <h4>Savings Rate</h4>
            <p className="rate-value" style={{ color: "#f7b24f" }}>
              {savingsRate}%
            </p>
            <span className="rate-sub">of total income</span>
          </div>
          <div className="rate-card">
            <span className="rate-icon">🏆</span>
            <h4>Top Spend Category</h4>
            <p
              className="rate-value"
              style={{ color: "#4f8ef7", fontSize: "20px" }}
            >
              {highestCategory ? highestCategory[0] : "N/A"}
            </p>
            <span className="rate-sub">
              {highestCategory
                ? `₹${highestCategory[1].toLocaleString()}`
                : "No data"}
            </span>
          </div>
          <div className="rate-card">
            <span className="rate-icon">📈</span>
            <h4>Net Balance</h4>
            <p
              className="rate-value"
              style={{
                color: totalIncome - totalExpenses >= 0 ? "#2ecc8a" : "#e85555",
              }}
            >
              ₹{(totalIncome - totalExpenses).toLocaleString()}
            </p>
            <span className="rate-sub">income minus expenses</span>
          </div>
        </section>

        {/* Monthly Comparison Chart */}
        <section className="insights-chart-section">
          <div className="insights-chart-card">
            <h3 className="insights-card-title">Monthly Comparison</h3>
            <div style={{ height: "300px" }}>
              {activeMonths.length > 0 ? (
                <Bar data={barData} options={barOptions} />
              ) : (
                <div className="empty-state">No monthly data available</div>
              )}
            </div>
          </div>
        </section>

        <section className="insights-bottom-grid">
          {/* Category Breakdown */}
          <div className="insights-card">
            <h3 className="insights-card-title">Spending by Category</h3>
            {sortedCategories.length === 0 ? (
              <div className="empty-state">No expense data</div>
            ) : (
              <div className="category-breakdown">
                {sortedCategories.map(([cat, amt], i) => {
                  const pct = ((amt / totalExpenses) * 100).toFixed(1);
                  return (
                    <div key={cat} className="category-row">
                      <div className="category-row-top">
                        <span className="cat-name">
                          <span
                            className="cat-dot"
                            style={{
                              backgroundColor:
                                categoryColors[i % categoryColors.length],
                            }}
                          />
                          {cat}
                        </span>
                        <span className="cat-amount">
                          ₹{amt.toLocaleString()}{" "}
                          <span className="cat-pct">({pct}%)</span>
                        </span>
                      </div>
                      <div className="progress-bar-bg">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${pct}%`,
                            backgroundColor:
                              categoryColors[i % categoryColors.length],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Top 3 Expenses + Observations */}
          <div className="insights-right-col">
            {/* Top 3 */}
            <div className="insights-card">
              <h3 className="insights-card-title">Top 3 Expenses</h3>
              {top3Expenses.length === 0 ? (
                <div className="empty-state">No expense data</div>
              ) : (
                <div className="top3-list">
                  {top3Expenses.map((t, i) => (
                    <div key={t.id} className="top3-item">
                      <span className="top3-rank">#{i + 1}</span>
                      <div className="top3-info">
                        <p className="top3-title">{t.title}</p>
                        <p className="top3-meta">
                          {t.category} · {formatDate(t.date)}
                        </p>
                      </div>
                      <span className="top3-amount">
                        -₹{t.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Observations */}
            <div className="insights-card">
              <h3 className="insights-card-title">💡 Smart Observations</h3>
              <div className="observations-list">
                {observations.map((obs, i) => (
                  <div key={i} className="observation-item">
                    <span className="obs-icon">{obs.icon}</span>
                    <p className="obs-text" style={{ color: obs.color }}>
                      {obs.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Insights;
