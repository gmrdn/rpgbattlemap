import React from "react";
import TokenChip from "./TokenChip";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { addToken } from "../actions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const TokenBar = (props) => {
  const [openNew, setOpenNew] = React.useState(false);

  const handleNameChange = (e) => {
    console.log("name changed");
  };

  const handleColorChange = (e) => {
    console.log("color changed");
  };

  const handleAddToken = (e) => {
    setOpenNew(true);
    console.log("Clicked add token");
  };

  const handleAddTokenClose = () => {
    setOpenNew(false);
  };

  const handleCreateToken = () => {
    setOpenNew(false);
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
    <div className="container-fluid mt-3 p-0" style={{ opacity: "0.8" }}>
      <div
        className="container-fluid overflow-auto p-0"
        style={{ height: "50vh" }}
      >
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
      </div>
      <button onClick={handleAddToken}>Add</button>
      <Dialog
        open={openNew}
        onClose={handleAddTokenClose}
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
                  onChange={handleNameChange}
                ></input>

                <div className="form-group">
                  <input
                    id="txt-token-color"
                    className="form-control mb-3 border-secondary"
                    placeholder="Color"
                    aria-label="Color"
                    required
                    onChange={handleColorChange}
                  ></input>
                </div>

                <div className="form-group">
                  <Avatar
                    alt="/tokens/1.png"
                    src="/tokens/1.png"
                    style={{
                      backgroundColor: "yellow",
                    }}
                  />
                  <input
                    type="range"
                    class="custom-range"
                    min="1"
                    max="32"
                    id="image-range"
                  />
                </div>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAddTokenClose} color="primary">
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
