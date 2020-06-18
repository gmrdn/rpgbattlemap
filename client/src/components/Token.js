import React from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

const useStyles = makeStyles({
  selected: {
    animation: `$selectedEffect 700ms linear infinite alternate`,
  },
  notselected: {
    "box-shadow": "inset 0 0 1px 3px hsla(0,0%,0%,0.3)",
  },
  "@keyframes selectedEffect": {
    "0%": {
      "box-shadow": `inset 0 0 1px 3px hsla(0,0%,0%,0.3), 0px 10px 24px dimgray, 0 0 4px 4px ${pink["A200"]}`,
    },
    "100%": {
      "box-shadow": `inset 0 0 1px 3px hsla(0,0%,0%,0.3), 0px 10px 24px dimgray, 0 0 4px 1px ${pink["A200"]}`,
    },
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
