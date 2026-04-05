import React, { useState, useEffect } from "react";
import "../Styles/Transaction.css";
import TransactionLayout from "../Components/TransactionLayout";
import { TbArrowsUpDown } from "react-icons/tb";
import { CiFilter } from "react-icons/ci";
import { RiDownloadCloud2Line } from "react-icons/ri";
import { CiLight, CiDark } from "react-icons/ci";
import { sampleTransactions } from "../SampleData/Data";
import { useTheme } from "../Components/ThemeContext";

const Transaction = () => {
  const { theme, setTheme } = useTheme();
  const [role, setRole] = useState(localStorage.getItem("role") || "Admin");
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role") || "Admin");
    };
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(() => {
      setRole(localStorage.getItem("role") || "Admin");
    }, 300);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const [isReversed, setIsReversed] = useState(false);

  const [showNewForm, setShowNewForm] = useState(false);
  const [showFilters, setShowFilter] = useState(false);
  const [active, setActive] = useState("expense");

  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));
  const [newCategory, setNewCategory] = useState("Food");

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");

  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : sampleTransactions;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = () => {
    if (!newTitle || !newAmount || !newDate) {
      alert("Please fill all fields!");
      return;
    }
    const newTransaction = {
      id: Date.now(),
      title: newTitle,
      amount: Number(newAmount),
      type: active,
      category: newCategory,
      date: newDate,
    };
    const updated = [...transactions, newTransaction];
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
    setNewTitle("");
    setNewAmount("");
    setNewDate(new Date().toISOString().slice(0, 10));
    setNewCategory("Food");
    setActive("expense");
    setShowNewForm(false);
    alert("Transaction added successfully!");
  };

  const handleDelete = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };
  const filtered = transactions
    .filter((t) =>
      filterType === "All" ? true : t.type === filterType.toLowerCase(),
    )
    .filter((t) =>
      filterCategory === "All" ? true : t.category === filterCategory,
    )
    .filter((t) => (filterDateFrom ? t.date >= filterDateFrom : true))
    .filter((t) => (filterDateTo ? t.date <= filterDateTo : true))
    .filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()),
    );
  const handleExportCSV = () => {
    const headers = ["Date", "Title", "Category", "Type", "Amount"];
    const rows = filtered.map((t) => [
      t.date,
      t.title,
      t.category,
      t.type,
      t.amount,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
    alert("File Downloaded Successfully");
  };

  const displayedData = isReversed ? [...filtered].reverse() : filtered;
  const isDark =
    document.documentElement.getAttribute("data-theme") !== "light";

  return (
    <>
      <div className="transaction-div">
        <header className="head">
          <div>
            <h1>All Transactions</h1>
            <p className="head-sub">Manage your transactions</p>
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
        <main>
          <div className="top-body">
            <div className="records-details">
              <div style={{ padding: "15px" }}>
                <h2>Transaction</h2>
                <p>{filtered.length} Records Found</p>
              </div>
              <div className="export-addTrans">
                <button className="export-btn" onClick={handleExportCSV}>
                  <span className="btn-icon">
                    <RiDownloadCloud2Line />
                  </span>
                  <span className="btn-text"> Export CSV</span>
                </button>
                {role === "Admin" && (
                  <button
                    className="add-transac-btn"
                    onClick={() => setShowNewForm(true)}
                  >
                    <span className="btn-icon">+</span>
                    <span className="btn-text"> Add Transaction</span>
                  </button>
                )}
              </div>
              {showNewForm && (
                <div className="new-transac-overlay">
                  <div className="transac-overlay-form">
                    <section className="overlay-sec1">
                      <h2>Add Transaction</h2>
                      <button
                        className="cross-btn"
                        onClick={() => setShowNewForm(false)}
                      >
                        X
                      </button>
                    </section>
                    <section className="overlay-sec2">
                      <button
                        className={active === "expense" ? "btn expense" : "btn"}
                        onClick={() => setActive("expense")}
                      >
                        Expense
                      </button>
                      <button
                        className={active === "income" ? "btn income" : "btn"}
                        onClick={() => setActive("income")}
                      >
                        Income
                      </button>
                      <button
                        className={active === "savings" ? "btn savings" : "btn"}
                        onClick={() => setActive("savings")}
                      >
                        Savings
                      </button>
                    </section>
                    <section className="overlay-sec3">
                      <form>
                        <div className="form-div">
                          <label>Description</label>
                          <input
                            required
                            type="text"
                            placeholder="E.g. Monthly Salary"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                          />
                        </div>
                        <div className="form-div">
                          <label>Enter Amount</label>
                          <input
                            required
                            type="number"
                            placeholder="E.g. 50000"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                          />
                        </div>
                        <div className="form-div">
                          <label>Date</label>
                          <input
                            required
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                          />
                        </div>
                        <div className="form-div">
                          <label>Category</label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                          >
                            <option value="Food">Food</option>
                            <option value="Transportation">
                              Transportation
                            </option>
                            <option value="Salary">Salary</option>
                            <option value="Education">Education</option>
                            <option value="Investment">Investment</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Travel">Travel</option>
                            <option value="Sports">Sports</option>
                            <option value="Health">Health</option>
                            <option value="Movies">Movies</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Bills">Bills</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                        <div className="form-actions">
                          <button
                            type="button"
                            onClick={() => setShowNewForm(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            style={{
                              backgroundColor: "#4f8ef7",
                              color: "White",
                            }}
                            onClick={handleAddTransaction}
                          >
                            Add Transaction
                          </button>
                        </div>
                      </form>
                    </section>
                  </div>
                </div>
              )}
            </div>
            <div className="filter-div">
              <div className="filter-top">
                <section className="search-box">
                  <input
                    type="text"
                    placeholder="Search by name or category"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </section>
                <section>
                  <button
                    className="order-btn"
                    onClick={() => setIsReversed(!isReversed)}
                  >
                    <TbArrowsUpDown />
                  </button>
                </section>
                <div className="filter-container">
                  <section className="filter-btn">
                    <button
                      className={
                        showFilters === true
                          ? "active-filter-btn"
                          : "inactive-filter-btn"
                      }
                      onClick={() => {
                        setShowFilter(!showFilters);
                      }}
                    >
                      <CiFilter
                        style={{
                          color: "white",
                          paddingRight: "2px",
                          paddingTop: "3px",
                          fontSize: "20px",
                        }}
                      />
                      Filter
                    </button>
                  </section>
                </div>
              </div>
              {showFilters && (
                <section className="filter-overlay">
                  <div className="filter-form">
                    <label>Type</label>

                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="All">All Types</option>
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                      <option value="Savings">Savings</option>
                    </select>
                  </div>
                  <div className="filter-form">
                    <label>Category</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Food">Food</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Salary">Salary</option>
                      <option value="Education">Education</option>
                      <option value="Investment">Investment</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Travel">Travel</option>
                      <option value="Sports">Sports</option>
                      <option value="Health">Health</option>
                      <option value="Movies">Movies</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Bills">Bills</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="filter-form">
                    <label>From</label>
                    <input
                      type="date"
                      value={filterDateFrom}
                      onChange={(e) => setFilterDateFrom(e.target.value)}
                    />
                  </div>
                  <div className="filter-form">
                    <label>To</label>
                    <input
                      type="date"
                      value={filterDateTo}
                      onChange={(e) => setFilterDateTo(e.target.value)}
                    />
                  </div>
                  <div style={{ paddingTop: "38px", marginLeft: "40px" }}>
                    <button
                      className="reset-btn"
                      onClick={() => {
                        setFilterType("All");
                        setFilterCategory("All");
                        setFilterDateFrom("");
                        setFilterDateTo("");
                        setSearch("");
                      }}
                    >
                      X Reset
                    </button>
                  </div>
                </section>
              )}
            </div>
          </div>
          <div>
            {filtered.length === 0 ? (
              <div className="empty-state-div">
                <span className="empty-icon">🔍</span>
                <h3>No transactions found</h3>
              </div>
            ) : (
              displayedData.map((item) => (
                <TransactionLayout
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Transaction;
