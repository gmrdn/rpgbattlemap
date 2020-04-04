import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <NavLink to="/" className="navbar-brand" id="nav-home">
      RPG Battle Map{" "}
    </NavLink>
    <NavLink
      to="/roomselection"
      className="navbar-brand"
      id="nav-room-selection"
    >
      Room Selection
    </NavLink>
  </nav>
);

export default Header;
