import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark position-fixed"
      style={{ width: "100vw", top: 0, left: 0, right: 0 }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          ОМММ
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/names" className="nav-link">
                Имена
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
