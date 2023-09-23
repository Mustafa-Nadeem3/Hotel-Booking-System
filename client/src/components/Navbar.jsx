import React from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Navbar(props) {
  return (
    <>
      <section id="home">
        <nav className="navbar navbar-expand-lg bg-white shadow">
          <div className="container">
            <img
              src={process.env.PUBLIC_URL + "/images/logo.png"}
              alt="Logo"
              className="logo"
            />
            <Link className="navbar-brand text-primary" to="#home">
              <div>Hotel</div>
              <div>Haven</div>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className={props.main_links}>
                <li className="nav-item">
                  <a className="nav-link text-primary d-flex" href="#intro">
                    <div></div>
                    <div className="mt-1">
                      <i class="fa-solid fa-hotel me-2"></i>Home
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-primary d-flex" href="#room">
                    <div></div>
                    <div className="mt-1">
                      <i class="fa-solid fa-bed me-2"></i>Room
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-primary d-flex" href="#services">
                    <div></div>
                    <div className="mt-1">
                      <i class="fa-solid fa-bell-concierge me-2"></i>Services
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-primary d-flex" to="/rooms">
                    <div></div>
                    <div className="mt-1">
                      <i class="fa-solid fa-book me-2"></i>Book
                    </div>
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link login_btn text-white d-flex"
                    to={props.last_link_path}
                  >
                    <div></div>
                    <div className="mt-1">{props.last_link_name}</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
}

Navbar.defaultProps = {
  main_links: "navbar-nav mx-auto",
  last_link_path: "/",
  last_link_name: "Last Link Name",
};

Navbar.PropType = {
  main_links: PropTypes.string,
  last_link_path: PropTypes.string,
  last_link_name: PropTypes.string,
};

export default Navbar;
