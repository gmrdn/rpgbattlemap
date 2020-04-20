import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const TokenChip = (props) => {
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  return (
    <div id={`tokenchip-${props.token.x}-${props.token.y}`}>
      <Chip
        size="small"
        avatar={
          <Avatar
            alt={props.token.name}
            src={`/tokens/${props.token.image}`}
            style={{
              backgroundColor: props.token.color,
            }}
          />
        }
        label={props.token.name}
        onClick={handleClick}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TokenChip;
