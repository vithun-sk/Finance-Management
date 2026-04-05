# 💰 Wealthio – Finance Dashboard UI

Wealthio is a responsive finance dashboard web application that allows users to track income, expenses, and savings, explore spending patterns, and manage transactions with a clean and modern interface.
It provides a smooth and user-friendly experience for understanding your financial activity at a glance.

---

## 🚀 Live Demo

🔗 **[Live Demo](https://welthio-finance-mangement.vercel.app/)**

---

## 📖 About the Project

Managing personal finances can be overwhelming without the right tools.
Wealthio simplifies this by offering a clean platform where users can:

- View a complete financial summary at a glance
- Add, edit, and delete transactions easily
- Filter and search through transaction history
- Understand spending patterns through charts and insights
- Switch between Admin and Viewer roles for different access levels

This project is focused entirely on frontend development with simulated data and role-based UI behavior.

---

## 🧩 Key Features

- **Dashboard Overview** — Summary cards for Balance, Income, Expenses, and Savings
- **Interactive Charts** — Daily expense line chart and category-wise pie chart
- **Transaction Management** — Add, edit, delete transactions (Admin only)
- **Search, Filter & Sort** — Filter by type, category, and date range
- **Export CSV** — Download filtered transactions as a `.csv` file
- **Role-Based UI** — Admin can manage transactions; Viewer has read-only access
- **Insights Page** — Monthly comparison, top spending category, smart observations
- **Dark / Light Theme** — Toggle between themes, persisted across sessions
- **Fully Responsive** — Optimized for mobile, tablet, and desktop
- **Data Persistence** — All data saved in localStorage
- **Deployed using Vercel**

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React, CSS |
| **Charts** | Chart.js, react-chartjs-2 |
| **Routing** | React Router v6 |
| **State Management** | React Context API, useState, localStorage |
| **Icons** | React Icons |
| **Build Tool** | Vite |
| **Deployment** | Vercel |
| **Tools Used** | VS Code, Git, GitHub |

---

## 🧠 Learning Outcomes

From this project, I learned how to:

- Build a multi-page React application with React Router
- Implement role-based UI behavior on the frontend
- Use React Context API for global state management
- Integrate Chart.js for interactive data visualizations
- Create a complete dark/light theme system using CSS variables
- Build responsive layouts for mobile, tablet, and desktop
- Persist data using localStorage
- Deploy a React + Vite application on Vercel

---

## 🧰 Installation & Setup

Follow these steps to run this project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/vithun-sk/Finance-Management.git
   ```

2. **Navigate into the project directory**
   ```bash
   cd wealthio
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser and visit**
   ```
   http://localhost:5173
   ```

---

## 📁 Project Structure

```
src/
├── Components/
│   ├── Sidebar.jsx           # Navigation — desktop sidebar, tablet hamburger, mobile bottom nav
│   ├── Sidebar.css
│   ├── TransactionLayout.jsx # Individual transaction card with edit/delete
│   ├── TransactionLayout.css
│   └── ThemeContext.jsx      # React Context for global theme state
├── Pages/
│   ├── Dashboard.jsx         # Summary cards + line chart + pie chart
│   ├── Dashboard.css
│   ├── Transaction.jsx       # Transaction list with filters, search, sort, export
│   ├── Transaction.css
│   ├── Insights.jsx          # Financial analytics and smart observations
│   └── Insights.css
├── SampleData/
│   └── Data.js               # Sample transaction data
├── App.jsx
├── main.jsx
└── index.css                 # Global styles + CSS variables for theming
```

---

## 🙌 Contributions

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a pull request.

---

## 🧑‍💻 Developed by

**Vithun S K**
Frontend Developer | MERN Stack Learner

📧 Email: [vithunkumar07@gmail.com]

🔗 LinkedIn: [https://www.linkedin.com/in/vithun-sk/]
