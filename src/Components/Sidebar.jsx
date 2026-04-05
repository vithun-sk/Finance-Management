import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";
import { HiOutlineHome } from "react-icons/hi";
import { CgInsights } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiLight, CiDark } from "react-icons/ci";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import "./Sidebar.css";

const Sidebar = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || "Admin";
  });
  const [showDropDown, setShowDropDown] = useState(false);
  const [showMobileDropDown, setShowMobileDropDown] = useState(false);
  const [showTabSidebar, setShowTabSidebar] = useState(false);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <>
      {/* ───────── DESKTOP SIDEBAR (>1169px) ───────── */}
      <nav className="entire-sidebar desktop-sidebar">
        <section className="website-name">
          <h1>Wealth<span style={{ color: "#4f8ef7" }}>io</span></h1>
        </section>
        <section className="side-bar">
          <div className="nav-links">
            <NavLink to="/" className="nav-link">
              <HiOutlineHome style={{ paddingRight: "10px", fontSize: "32px" }} />
              DashBoard
            </NavLink>
            <NavLink to="/transaction" className="nav-link">
              <GrTransaction style={{ paddingRight: "10px", fontSize: "32px" }} />
              Transactions
            </NavLink>
            <NavLink to="/insights" className="nav-link">
              <CgInsights style={{ paddingRight: "10px", fontSize: "32px" }} />
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
                <p onClick={() => { setRole("Admin"); setShowDropDown(false); }}>Admin</p>
                <p onClick={() => { setRole("Viewer"); setShowDropDown(false); }}>Viewer</p>
              </div>
            )}
          </div>
        </section>
      </nav>

      {/* ───────── TABLET HEADER + SLIDE SIDEBAR (768–1169px) ───────── */}
      <div className="tablet-header">
        <div className="tablet-header-left">
          <button className="hamburger-btn" onClick={() => setShowTabSidebar(true)}>
            <RiMenu3Line />
          </button>
          <h1 className="tablet-logo">Wealth<span style={{ color: "#4f8ef7" }}>io</span></h1>
        </div>
        <div className="tablet-header-right">
          <button className="theme-toggle-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <CiLight /> : <CiDark />}
          </button>
          <div className="mobile-role-wrapper">
            <span className="mobile-role-btn" onClick={() => setShowMobileDropDown(!showMobileDropDown)}>
              {role} <RiArrowDropDownLine />
            </span>
            {showMobileDropDown && (
              <div className="mobile-dropdown">
                <p onClick={() => { setRole("Admin"); setShowMobileDropDown(false); }}>Admin</p>
                <p onClick={() => { setRole("Viewer"); setShowMobileDropDown(false); }}>Viewer</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tablet slide-in sidebar overlay */}
      {showTabSidebar && (
        <div className="tab-sidebar-overlay" onClick={() => setShowTabSidebar(false)}>
          <nav className="tab-slide-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="tab-sidebar-header">
              <h1>Wealth<span style={{ color: "#4f8ef7" }}>io</span></h1>
              <button className="tab-close-btn" onClick={() => setShowTabSidebar(false)}>
                <RiCloseLine />
              </button>
            </div>
            <div className="nav-links">
              <NavLink to="/" className="nav-link" onClick={() => setShowTabSidebar(false)}>
                <HiOutlineHome style={{ paddingRight: "10px", fontSize: "28px" }} />
                DashBoard
              </NavLink>
              <NavLink to="/transaction" className="nav-link" onClick={() => setShowTabSidebar(false)}>
                <GrTransaction style={{ paddingRight: "10px", fontSize: "28px" }} />
                Transactions
              </NavLink>
              <NavLink to="/insights" className="nav-link" onClick={() => setShowTabSidebar(false)}>
                <CgInsights style={{ paddingRight: "10px", fontSize: "28px" }} />
                Insights
              </NavLink>
            </div>
          </nav>
        </div>
      )}

      {/* ───────── MOBILE TOP BAR (350–468px) ───────── */}
      <div className="mobile-topbar">
        <h1 className="mobile-logo">Wealth<span style={{ color: "#4f8ef7" }}>io</span></h1>
        <div className="mobile-topbar-right">
          <button className="theme-toggle-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <CiLight /> : <CiDark />}
          </button>
          <div className="mobile-role-wrapper">
            <span className="mobile-role-btn" onClick={() => setShowMobileDropDown(!showMobileDropDown)}>
              {role} <RiArrowDropDownLine />
            </span>
            {showMobileDropDown && (
              <div className="mobile-dropdown">
                <p onClick={() => { setRole("Admin"); setShowMobileDropDown(false); }}>Admin</p>
                <p onClick={() => { setRole("Viewer"); setShowMobileDropDown(false); }}>Viewer</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ───────── MOBILE BOTTOM NAV (350–468px) ───────── */}
      <nav className="mobile-bottom-nav">
        <NavLink to="/" className="bottom-nav-link">
          <HiOutlineHome className="bottom-nav-icon" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/transaction" className="bottom-nav-link">
          <GrTransaction className="bottom-nav-icon" />
          <span>Transactions</span>
        </NavLink>
        <NavLink to="/insights" className="bottom-nav-link">
          <CgInsights className="bottom-nav-icon" />
          <span>Insights</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
