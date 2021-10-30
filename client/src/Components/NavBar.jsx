import React, { Component } from "react";

class NavBar extends React.Component {
  render() {
    return (
      <nav
        id="mainnavbar"
        class="navbar navbar-expand-sm navbar-dark bg-dark position-sticky"
        style={{ top: "0", width: "100%", height: "10%", zIndex: "10" }}
      >
        <div class="container-fluid">
          <a
            class="navbar-brand"
            href="/"
            style={{ fontSize: "30px", marginBottom: "6px" }}
          >
            TikoWeb
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse m-2" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/enter-chat">
                  Chat
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/Shop">
                  Shop
                </a>
              </li>
              <li>
                <a class="nav-link" href="/about-us">
                  About us!
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/register">
                  Register!
                </a>
              </li>
              <li>
                <button class="btn btn-outline-success me-2" type="submit">
                  <a href="/donate" style={{ color: "inherit" }}>
                    Donate
                  </a>
                </button>
              </li>
            </ul>
            <span class="navbar-text h4 m-2">
              The Place To Improve Yourself
            </span>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
