import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";
import { HiOutlineHome } from "react-icons/hi";
import { CgInsights } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./Sidebar.css";

const Sidebar = () => {
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "Admin";
  });
  const [showDropDown, setShowDropDown] = useState(false);
  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <>
      <nav className="entire-sidebar">
        <section className="website-name">
          <h1>
            Wealth<span style={{color:'#4f8ef7'}}>io</span>
          </h1>
        </section>
        <section className="side-bar">
          <div className="nav-links">
            <NavLink to="/" className="nav-link">
              <HiOutlineHome
                style={{ paddingRight: "10px", fontSize: "32px" }}
              />
              DashBoard
            </NavLink>
            <NavLink to="/transaction" className="nav-link">
              <GrTransaction
                style={{ paddingRight: "10px", fontSize: "32px" }}
              />
              Transactions
            </NavLink>
            <NavLink to="/insights" className="nav-link">
              <CgInsights
                style={{ paddingRight: "10px", fontSize: "32px" }}
              />
              Insights
            </NavLink>
          </div>
          <div className="profile-switch">
            <h3 className="role-heading">Role</h3>
            <p onClick={() => setShowDropDown(!showDropDown)}>
              {role} <RiArrowDropDownLine style={{ fontSize: "24px" }} />
            </p>
            {showDropDown && (
              <div className="dropdown">
                <p
                  onClick={() => {
                    setRole("Admin");
                    setShowDropDown(false);
                  }}
          
                >
                  Admin
                </p>
                <p
                  onClick={() => {
                    setRole("Viewer");
                    setShowDropDown(false);
                  }}
                
                >
                  Viewer
                </p>
              </div>
            )}
          </div>
        </section>
      </nav>
    </>
  );
};

export default Sidebar;
