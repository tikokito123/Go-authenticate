import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <nav
        id="mainnavbar"
        className="navbar navbar-expand-sm navbar-dark bg-dark position-sticky"
        style={{ top: "0", width: "100%", height: "10%", zIndex: "10" }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="/"
            style={{ fontSize: "30px", marginBottom: "6px" }}
          >
            TikoWeb
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse m-2" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/enter-chat">
                  Chat
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Shop">
                  Shop
                </a>
              </li>
              <li>
                <a className="nav-link" href="/about-us">
                  About us!
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register!
                </a>
              </li>
              <li>
                <button className="btn btn-outline-success me-2" type="submit">
                  <a href="/donate" style={{ color: "inherit" }}>
                    Donate
                  </a>
                </button>
              </li>
            </ul>
            <span className="navbar-text h4 m-2">
              The Place To Improve Yourself
            </span>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
