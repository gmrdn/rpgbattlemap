import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

export const Header = (props) => (
  <header className="header">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink to="/" className="navbar-brand" id="nav-home">
        RPG Battle Map
      </NavLink>
      <NavLink
        to="/roomselection"
        className="navbar-brand"
        id="nav-room-selection"
      >
        Room Selection
      </NavLink>
      <NavLink to="/" id="header-nickname" className="navbar-brand">
        {props.nickname}
      </NavLink>
      <NavLink to="/" id="header-room-id" className="navbar-brand">
        {props.roomId}
      </NavLink>
    </nav>
  </header>
);

// const mapStateToProps = (state) => {
//   return {
//     nickname: state.nickname,
//     roomId: state.roomId,
//   };
// };

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
  };
};

export default connect(mapStateToProps)(Header);
