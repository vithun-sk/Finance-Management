import React from "react";
import {  Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Transaction from "./Pages/Transaction";
import Insights from "./Pages/Insights";
import Sidebar from "./Components/Sidebar";

const App = () => {
  return (
     <div style={{display:'flex'}}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
  );
};

export default App;
