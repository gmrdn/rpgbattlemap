import React from "react";
import { connect } from "react-redux";
import { openNewTokenDialog } from "../../actions";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import { pink } from "@material-ui/core/colors";

const useStyles = makeStyles({
  fab: {
    position: "absolute",
    background: pink[800],
    "&:hover": {
      background: pink[600],
    },
    bottom: "100px",
    right: "54px",
    "box-shadow": "inset 0 0 1px 3px hsla(0,0%,0%,0.3), 0px 10px 24px dimgray",
  },
});

export const FloatingButton = (props) => {
  const classes = useStyles();

  const handleAddToken = () => {
    props.openNewTokenDialog(true);
  };

  return (
    <Fab
      color="primary"
      aria-label="add"
      id="fab-addtoken"
      className={classes.fab}
      onClick={handleAddToken}
    >
      <AddIcon />
    </Fab>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = { openNewTokenDialog };

export default connect(mapStateToProps, mapDispatchToProps)(FloatingButton);
