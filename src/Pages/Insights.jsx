import React from "react";
import '../Styles/Insights.css'

const Insights = () => {
  return (
    <>
      <div className="insights-div">
        <header className="head">
          <div>
            <h1>Insights</h1>
            <p className="head-sub">Analyse your financial patterns</p>
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
        <main></main>
      </div>
    </>
  );
};

export default Insights;
