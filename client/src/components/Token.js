import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(0),
    },
  },
}));

const Token = (props) => {
  const classes = useStyles();

  return (
    <div
      id={`avatar-${props.token.x}-${props.token.y}`}
      className={classes.root}
      style={{
        position: "absolute",
        left: `${props.token.x * props.tileSide}px`,
        top: `${props.token.y * props.tileSide}px`,
      }}
    >
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        variant="dot"
      >
        {/* <Avatar
          id="btn-token"
          className={classes.purple}
          title={props.token.name}
        >
          X
        </Avatar> */}
        <Avatar
          alt={props.token.name}
          src="/broken-image.jpg"
          className={{ backgroundColor: props.token.color }}
        />
      </StyledBadge>
    </div>
  );
};

export default Token;
