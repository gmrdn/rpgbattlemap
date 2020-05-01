import React from "react";
import TokenChip from "./TokenChip";
import { connect } from "react-redux";
import { addToken } from "../actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const TokenBar = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleAddToken = (e) => {
    setOpen(true);
    console.log("Clicked add token");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateToken = () => {
    setOpen(false);
    console.log("Saving token");
    let newToken = {
      name: "new token",
      x: 1,
      y: 1,
      color: "green",
      image: "1.png",
    };
    props.socket.emit("addToken", {
      room: props.roomId,
      user: props.nickname,
      token: newToken,
    });
  };
  return (
    <div className="container-fluid overflow-auto mt-3 p-0">
      <ul className="list-group border-0">
        {props.tokens.map((token) => {
          return (
            <li
              key={token._id}
              className="list-group-item border-0 pl-0 pr-2 pb-0 pt-0"
            >
              <TokenChip
                token={token}
                tileSide={40}
                socket={props.socket}
              ></TokenChip>
            </li>
          );
        })}
      </ul>
      <button onClick={handleAddToken}>Add</button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-token-dialog"
      >
        <DialogTitle id="add-token-dialog">Add a Token</DialogTitle>
        <DialogContent>
          <DialogContentText>Token details</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateToken} color="primary">
            Add Token
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
    tokens: state.tokens,
  };
};

const mapDispatchToProps = { addToken };

export default connect(mapStateToProps, mapDispatchToProps)(TokenBar);
