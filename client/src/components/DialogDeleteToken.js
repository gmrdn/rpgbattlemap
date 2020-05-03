import React from "react";
import { connect } from "react-redux";
import { deleteToken, openDeleteTokenDialog } from "../actions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DialogDeleteToken = (props) => {
  const handleClose = () => {
    props.openDeleteTokenDialog(false);
  };

  const handleConfirmDelete = (e) => {
    e.preventDefault();
    const tokens = props.tokens.filter((token) => token.toBeDeleted === true);

    tokens.forEach((token) => {
      props.deleteToken(token._id);
      let deleteTokenData = {
        room: props.roomId,
        user: props.nickname,
        tokenId: token._id,
      };
      props.socket.emit("deleteToken", deleteTokenData);
    });

    props.openDeleteTokenDialog(false);
  };

  return (
    <Dialog
      id="confirmation-popin"
      open={props.deleteTokenDialogOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete token?"}</DialogTitle>
      <DialogContent>
        {props.tokens
          .filter((token) => token.toBeDeleted === true)
          .map((token) => {
            return (
              <>
                <Avatar
                  alt={token.name}
                  src={`/tokens/${token.image}`}
                  style={{
                    backgroundColor: token.color,
                    margin: "auto",
                  }}
                />
                <DialogContentText id="alert-dialog-description">
                  {token.name}
                </DialogContentText>
              </>
            );
          })}
      </DialogContent>
      <DialogActions>
        <Button id="btn-cancel" onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          id="btn-confirm-delete"
          onClick={handleConfirmDelete}
          color="primary"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
    tokens: state.tokens,
    deleteTokenDialogOpen: state.deleteTokenDialogOpen,
  };
};

const mapDispatchToProps = { deleteToken, openDeleteTokenDialog };

export default connect(mapStateToProps, mapDispatchToProps)(DialogDeleteToken);
