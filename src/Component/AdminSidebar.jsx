import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../public/Update/css/remixicon.css';
function AdminSidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menuName) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };
  
  return (
    <>
      <section className="sidebar">
        <button type="button" className="sidebar-close-btn">
          <iconify-icon icon="radix-icons:cross-2"></iconify-icon>
        </button>
        <div>
          <Link to="/admin/dashboard" className="sidebar-logo" style={{fontSize:"1.9rem",fontWeight:"700",lineHeight:"1",alignItems:"center"}}>
            E-Rickshaw Management
          </Link>
        </div>
        <div className="sidebar-menu-area bg-primary">
          <ul className="sidebar-menu" id="sidebar-menu">
            <li>
              <Link
                to="admin/dashboard"
                className="d-flex align-items-center gap-1 "
              >
                <iconify-icon
                  icon="solar:home-smile-angle-outline"
                  className="icon text-lg"
                ></iconify-icon>
                <span>Dashboard</span>
              </Link>
            </li>
            {/* Vehicle Dropdown */}
            <li className={`dropdown ${openDropdown === "vehicle" ? "open" : ""}`}>
              <Link to="javascript:void(0)"
                onClick={() => toggleDropdown("vehicle")}
                className="d-flex align-items-center gap-1 "
              >
                <iconify-icon
                  icon="twemoji:taxi"
                  className="icon text-lg "
                ></iconify-icon>
                <span>Vehicle</span>
              </Link>
              <ul
                className={`sidebar-submenu ${
                  openDropdown === "vehicle" ? "show" : "hide"
                }`}
              >
                <li>
                  <Link to="/admin/users">
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto"></i>
                    Vehicle
                  </Link>
                </li>
                <li>
                  <Link to="/admin/add_user">
                    <i className="ri-circle-fill circle-icon text-warning-main w-auto"></i>
                    Add Vehicle
                  </Link>
                </li>
              </ul>
            </li>
            {/* Routes */}
            <li>
              <Link
                to="admin/route"
                className="d-flex align-items-center gap-1 "
              >
                <iconify-icon
                  icon="bx:bx-map"
                  className="icon text-lg"
                ></iconify-icon>
                <span>Routes</span>
              </Link>
            </li>
            {/* Verifier Dropdown */}
            <li
              className={`dropdown ${openDropdown === "verifier" ? "open" : ""}`}
            >
              <Link
              to="javascript:void(0)"
                onClick={() => toggleDropdown("verifier")}
                className="d-flex align-items-center gap-1 "
              >
                <iconify-icon
                  icon="ic:baseline-person"
                  className="icon text-lg"
                  ></iconify-icon>
                <span>Verifier</span>
              </Link>
              <ul
                className={`sidebar-submenu ${
                  openDropdown === "verifier" ? "show" : "hide"
                }`}
              >
                <li>
                  <Link to="admin/verifier">
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto"></i>
                    Verifier
                  </Link>
                </li>
                <li>
                  <Link to="admin/add-verifier">
                    <i className="ri-circle-fill circle-icon text-warning-main w-auto"></i>
                    Add Verifier
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={`dropdown ${openDropdown === "zone" ? "open" : ""}`}
            >
              <Link
              to="javascript:void(0)"
                onClick={() => toggleDropdown("zone")}
                className="d-flex align-items-center gap-1 "
              >
                <iconify-icon
                  icon="twemoji:round-pushpin"
                  className="icon text-lg white-icon"
                ></iconify-icon>
                <span>Zone</span>
              </Link>
              <ul
                className={`sidebar-submenu ${
                  openDropdown === "zone" ? "show" : "hide"
                }`}
              >
                <li>
                  <Link to="/admin/zone">
                  <i className="ri-circle-fill circle-icon" style={{ fontSize: '24px', color: '#007bff', width: 'auto', height: 'auto' }}></i>
                  Zone
                  </Link>
                </li>
                <li>
                  <Link to="/admin/zone-head">
                  <i className="ri-circle-fill circle-icon" style={{ fontSize: '24px', color: '#007bff', width: 'auto', height: 'auto' }}></i>
                  Zone Head
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="admin/challan"
                className="d-flex align-items-center gap-1 "
              >
                <iconify-icon
                  icon="twemoji:receipt"
                  className="icon text-lg"
                ></iconify-icon>
                <span>Challan</span>
              </Link>
            </li>
            <li
              className={`dropdown ${openDropdown === "report" ? "open" : ""}`}
            >
              <Link
              to="javascript:void(0)"
                onClick={() => toggleDropdown("report")}
                className="d-flex align-items-center gap-1 "
              >
                <iconify-icon
                  icon="bx:bx-clipboard"
                  className="icon text-lg"
                ></iconify-icon>
                <span>Report</span>
              </Link>
              <ul
                className={`sidebar-submenu ${
                  openDropdown === "report" ? "show" : "hide"
                }`}
              >
                <li>
                  <Link to="admin/today-report">
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto"></i>
                    Today
                  </Link>
                </li>
                <li>
                  <Link to="admin/all-report">
                    <i className="ri-circle-fill circle-icon text-warning-main w-auto"></i>
                    All Report
                  </Link>
                </li>
              </ul>
            </li>
              <li>
                <Link to="admin/sub-admin" className="d-flex align-items-center gap-1 ">
                    <iconify-icon
                      icon="ic:baseline-person"
                      className="icon text-lg"></iconify-icon>
                    <span>Sub Admin</span>
                  </Link>
              </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default AdminSidebar;
