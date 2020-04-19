import React from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

const Token = (props) => {
  return (
    <div
      id={`avatar-${props.token.x}-${props.token.y}`}
      style={{
        position: props.position,
        left: `${props.token.x * props.tileSide}px`,
        top: `${props.token.y * props.tileSide}px`,
      }}
    >
      <IconButton
        alt={props.token.name}
        style={{
          width: props.tileSide,
          height: props.tileSide,
        }}
      >
        <Avatar
          alt={props.token.name}
          src={`/tokens/${props.token.image}`}
          style={{ position: "absolute", backgroundColor: props.token.color }}
        />
      </IconButton>
    </div>
  );
};

export default Token;
