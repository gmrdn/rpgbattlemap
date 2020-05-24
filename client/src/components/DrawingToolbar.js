import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";

const DrawingToolbar = () => {
  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Button id="tools-pen">
        <CreateIcon id="tools-pen"></CreateIcon>
      </Button>
    </ButtonGroup>
  );
};

export default DrawingToolbar;
