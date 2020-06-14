import React from "react";
import TokenChip from "../TokenChip";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { openNewTokenDialog } from "../../actions";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "3px",
    backgroundColor: theme.palette.background.default,
    position: "absolute",
    "max-height": "240px",
    overflowY: "auto",
    top: "200px",
    right: "0px",
  },
}));

export const TokenBar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box class={classes.root}>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Tokens" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <List dense>
        {props.tokens.map((token) => {
          return (
            <ListItem key={token._id}>
              <TokenChip
                token={token}
                tileSide={40}
                socket={props.socket}
              ></TokenChip>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
    tokens: state.tokens,
  };
};

const mapDispatchToProps = { openNewTokenDialog };

export default connect(mapStateToProps, mapDispatchToProps)(TokenBar);
