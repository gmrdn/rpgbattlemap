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
    border: "3px solid",
    boxShadow: "2px 2px 2px 1px dimgray",
  },
});

const Token = (props) => {
  const classes = useStyles(props);

  const { x, y, name, image, _id, color, selected } = props.token;

  return (
    <div
      id={`avatar-${x}-${y}`}
      style={{
        position: "absolute",
        left: `${x * props.tileSide}px`,
        top: `${y * props.tileSide}px`,
      }}
      onClick={props.onClick}
    >
      <Tooltip title={name}>
        <IconButton
          alt={name}
          style={{
            width: props.tileSide,
            height: props.tileSide,
          }}
        >
          <Avatar
            className={selected ? classes.selected : classes.notselected}
            alt={name}
            src={`/tokens/${image}`}
            id={_id}
            style={{
              position: "absolute",
              backgroundColor: color,
            }}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Token;
