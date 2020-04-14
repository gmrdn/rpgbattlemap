import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

export const Header = (props) => (
  <header className="header">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink to="/" className="navbar-brand" id="nav-home">
        RPG Battle Map
      </NavLink>
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <NavLink
            to="/roomselection"
            className="nav-link"
            id="nav-room-selection"
          >
            Room Selection
          </NavLink>
        </li>
        <li className="nav-item"></li>
        <li className="nav-item"></li>
      </ul>
      <div className="my-2 my-lg-0">
        <NavLink
          to="/roomselection"
          id="header-room-id"
          className="badge badge-success"
        >
          {props.roomId}
        </NavLink>
        <NavLink
          to={`/joinroom/${props.roomId}`}
          id="header-nickname"
          className="badge badge-primary"
        >
          {props.nickname}
        </NavLink>
      </div>
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
