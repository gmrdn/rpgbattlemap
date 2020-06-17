import React from "react";
import { connect } from "react-redux";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
      paddingRight: "2rem",
    },
  })
);

export const Header = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Link component={RouterLink} color="inherit" to={"/"} id={"nav-home"}>
          <Typography variant="h6" className={classes.title}>
            RPG Battle Map
          </Typography>
        </Link>

        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link
              component={RouterLink}
              color="inherit"
              to="/roomselection"
              id="nav-room-selection"
            >
              Room Selection
            </Link>
          </li>
          <li className="nav-item"></li>
          <li className="nav-item"></li>
        </ul>
        <div className="my-2 my-lg-0">
          <Link
            component={RouterLink}
            color="inherit"
            to="/roomselection"
            id="header-room-id"
            className="badge badge-success"
          >
            {props.roomId}
          </Link>
          <Link
            component={RouterLink}
            color="inherit"
            to={`/joinroom/${props.roomId}`}
            id="header-nickname"
            className="badge badge-primary"
          >
            {props.nickname}
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

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
