import React, { useState } from "react";
import "./TransactionLayout.css";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";

const TransactionLayout = ({ item, onDelete, transactions, setTransactions }) => {
  const role = localStorage.getItem("role");
  const [showEditForm, setShowEditForm] = useState(false);


  const [editTitle, setEditTitle] = useState(item.title);
  const [editAmount, setEditAmount] = useState(item.amount);
  const [editDate, setEditDate] = useState(item.date);
  const [editCategory, setEditCategory] = useState(item.category);
  const [editType, setEditType] = useState(item.type);

  const handleEdit = () => {
    if (!editTitle || !editAmount || !editDate) {
      alert("Please fill all fields!");
      return;
    }
    const updated = transactions.map((t) =>
      t.id === item.id
        ? {
            ...t,
            title: editTitle,
            amount: Number(editAmount),
            date: editDate,
            category: editCategory,
            type: editType,
          }
        : t
    );
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
    setShowEditForm(false);
    alert("Transaction edited successfully!");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="transaction-lists">
        <div className="transaction-row">
          <div>
            <h4 className="item-title">{item.title}</h4>
            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              <p className="item-category">{item.category}</p>
              <p style={{ fontSize: "14px", color: "grey" }}>
                {formatDate(item.date)}
              </p>
            </div>
          </div>
          <div className="transac-type">
            <span
              className={
                item.type === "income"
                  ? "income-dis"
                  : item.type === "savings"
                  ? "savings-dis"
                  : "expense-dis"
              }
            >
              {item.type.toUpperCase()}
            </span>
            <h4 className={item.type === "expense" ? "loss" : "profit"}>
              {item.type === "expense" ? "-" : "+"}₹{item.amount}
            </h4>
            {role === "Admin" && (
              <div className="transac-actions">
                <button
                  className="edit-action"
                  onClick={() => setShowEditForm(true)}
                >
                  <MdOutlineEdit />
                </button>
                <button
                  className="delete-action"
                  onClick={() => onDelete(item.id)}
                >
                  <MdDeleteOutline />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      
      {showEditForm && (
        <div className="edit-transac-overlay">
          <div className="edit-transac-overlay-form">
            <section className="edit-overlay-sec1">
              <h2>Edit Transaction</h2>
              <button
                className="edit-cross-btn"
                onClick={() => setShowEditForm(false)}
              >
                X
              </button>
            </section>
            <section className="edit-overlay-sec2">
              <button
                className={editType === "expense" ? "btn expense" : "btn"}
                onClick={() => setEditType("expense")}
              >
                Expense
              </button>
              <button
                className={editType === "income" ? "btn income" : "btn"}
                onClick={() => setEditType("income")}
              >
                Income
              </button>
              <button
                className={editType === "savings" ? "btn savings" : "btn"}
                onClick={() => setEditType("savings")}
              >
                Savings
              </button>
            </section>
            <section className="edit-overlay-sec3">
              <form>
                <div className="edit-form-div">
                  <label>Description</label>
                  <input
                    required
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </div>
                <div className="edit-form-div">
                  <label>Enter Amount</label>
                  <input
                    required
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                  />
                </div>
                <div className="edit-form-div">
                  <label>Date</label>
                  <input
                    required
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                </div>
                <div className="edit-form-div">
                  <label>Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
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
                    <option value="Housing">Housing</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="edit-form-actions">
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    style={{ backgroundColor: "#4f8ef7" }}
                    onClick={handleEdit}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionLayout;