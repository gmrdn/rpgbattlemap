import React from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  selected: {
    border: "3px solid",
    borderColor: "yellow",
  },
  notselected: {
    boxShadow: "2px 2px 1px 0px",
    border: "3px solid",
  },
});

const Token = (props) => {
  const classes = useStyles(props);

  return (
    <div
      id={`avatar-${props.token.x}-${props.token.y}`}
      style={{
        position: "absolute",
        left: `${props.token.x * props.tileSide}px`,
        top: `${props.token.y * props.tileSide}px`,
      }}
      onClick={props.onClick}
    >
      <Tooltip title={props.token.name}>
        <IconButton
          alt={props.token.name}
          style={{
            width: props.tileSide,
            height: props.tileSide,
          }}
        >
          <Avatar
            className={
              props.token.selected ? classes.selected : classes.notselected
            }
            alt={props.token.name}
            src={`/tokens/${props.token.image}`}
            id={props.token._id}
            style={{
              position: "absolute",
              backgroundColor: props.token.color,
            }}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Token;
