import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { selectToken, deleteToken } from "../actions";

class TokenChip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleDelete = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleConfirmDelete = (e) => {
    e.preventDefault();
    const tokenId = e.target.parentNode.dataset.tokenid;
    this.props.deleteToken(tokenId);
    let deleteTokenData = {
      room: this.props.roomId,
      user: this.props.nickname,
      tokenId: tokenId,
    };
    this.props.socket.emit("deleteToken", deleteTokenData);
    this.setState({ open: false });
  };

  handleClick = (e) => {
    e.preventDefault();
    const tokenId = e.target.parentNode.id;
    this.props.selectToken(tokenId);
  };

  render() {
    return (
      <div>
        <div id={`tokenchip-${this.props.token.x}-${this.props.token.y}`}>
          <Chip
            size="small"
            avatar={
              <Avatar
                alt={this.props.token.name}
                src={`/tokens/${this.props.token.image}`}
                style={{
                  backgroundColor: this.props.token.color,
                }}
              />
            }
            label={this.props.token.name}
            color={this.props.token.selected ? "primary" : ""}
            id={this.props.token._id}
            onClick={this.handleClick}
            onDelete={this.handleDelete}
          />
        </div>

        <Dialog
          id="confirmation-popin"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete token?"}</DialogTitle>
          <DialogContent>
            <Avatar
              alt={this.props.token.name}
              src={`/tokens/${this.props.token.image}`}
              style={{
                backgroundColor: this.props.token.color,
                margin: "auto",
              }}
            />
            <DialogContentText id="alert-dialog-description">
              {this.props.token.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button id="btn-cancel" onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              id="btn-confirm-delete"
              data-tokenid={this.props.token._id}
              onClick={this.handleConfirmDelete}
              color="primary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
    tokens: state.tokens,
  };
};

const mapDispatchToProps = {
  selectToken,
  deleteToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenChip);
