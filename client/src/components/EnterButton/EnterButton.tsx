import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

interface IProps {
  text: string;
}

const color = grey[800];

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    background: color,
    "&:hover": {
      backgroundColor: color,
    },
    border: 1,
    borderRadius: 0,
    "text-transform": "none",
    "text-shadow": "rgba(0, 0, 0, 0.25) 0px -1px 0px",
    "font-weight": "850",
    "font-size": "20px",
    "line-height": "1.25rem",
    color: "white",
    height: 48,
    width: 240,
    padding: "0 30px",
    textAlign: "center",
  },
});

export const EnterButton = (props: IProps) => {
  const classes = useStyles();
  return (
    <Button type="submit" className={classes.root} id="btn-join">
      {props.text}
    </Button>
  );
};

export default EnterButton;
