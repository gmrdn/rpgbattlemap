import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { addToken, openNewTokenDialog } from "../actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export class DialogNewToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenName: "",
      tokenColor: "grey",
      tokenImage: "32.png",
    };
  }

  handleNameChange = (e) => {
    this.setState({ tokenName: e.target.value });
  };

  handleColorChange = (e) => {
    this.setState({ tokenColor: e.target.value });
  };

  handleImageChange = (e) => {
    this.setState({ tokenImage: `${e.target.value.toString()}.png` });
  };

  handleAddTokenClose = () => {
    this.props.openNewTokenDialog(false);
  };

  handleCreateToken = () => {
    this.props.openNewTokenDialog(false);
    console.log("Saving token");
    let newToken = {
      name: "new token",
      x: 1,
      y: 1,
      color: "green",
      image: "1.png",
    };
    this.props.socket.emit("addToken", {
      room: this.props.roomId,
      user: this.props.nickname,
      token: newToken,
    });
  };
  render() {
    return (
      <Dialog
        open={this.props.newTokenDialogOpen}
        onClose={this.handleAddTokenClose}
        aria-labelledby="add-token-dialog"
      >
        <DialogTitle id="add-token-dialog">Add a Token</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <form>
              <div className="form-group">
                <input
                  id="txt-token-name"
                  className="form-control mb-3 border-secondary"
                  placeholder="Represents"
                  aria-label="Represents"
                  required
                  onChange={this.handleNameChange}
                ></input>

                <div className="form-group">
                  <input
                    id="txt-token-color"
                    className="form-control mb-3 border-secondary"
                    placeholder="Color"
                    aria-label="Color"
                    required
                    onChange={this.handleColorChange}
                  ></input>
                </div>

                <div className="form-group">
                  <Avatar
                    alt={`/tokens/${this.state.tokenImage}`}
                    src={`/tokens/${this.state.tokenImage}`}
                    style={{
                      backgroundColor: this.state.tokenColor,
                      border: "3px solid",
                      boxShadow: "2px 2px 2px 1px dimgray",
                    }}
                  />
                  <input
                    type="range"
                    class="custom-range"
                    min="1"
                    max="32"
                    id="image-range"
                    onChange={this.handleImageChange}
                  />
                </div>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={this.handleAddTokenClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleCreateToken} color="primary">
            Add Token
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
    tokens: state.tokens,
    newTokenDialogOpen: state.newTokenDialogOpen,
  };
};

const mapDispatchToProps = { addToken, openNewTokenDialog };

export default connect(mapStateToProps, mapDispatchToProps)(DialogNewToken);
