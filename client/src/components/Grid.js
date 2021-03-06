import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  setUserName,
  setRoomId,
  addToken,
  resetTokens,
  selectToken,
  unselectTokens,
  moveToken,
  deleteToken,
  openNewTokenDialog,
} from "../actions";
import Token from "../components/Token";
import canvasUtils from "../utils/canvasUtils";
import TokenBar from "./TokenBar/TokenBar";
import FloatingButton from "./FloatingButton/FloatingButton";

const gridSize = { width: 60, height: 60 };
const tileSide = 40;
var canvas;
var ctx;

export class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
    this.state = {
      gridData: {},
    };
    this.props.resetTokens();
    this.handleClickOnToken = this.handleClickOnToken.bind(this);
  }

  componentDidMount() {
    this.fetchGrid(this.props.roomId);
    canvas = this.refs.gridCanvas;
    ctx = canvas.getContext("2d");
    canvasUtils.drawGrid(ctx, gridSize, tileSide);
    this.prepareSockets();
    document.addEventListener("keydown", this.handleEscape, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscape, false);
  }

  prepareSockets() {
    this.props.socket.on("moveToken", ({ tokenId, x, y }) => {
      this.props.moveToken(tokenId, { x, y });
    });
    this.props.socket.on("deleteToken", ({ tokenId }) => {
      this.props.deleteToken(tokenId);
    });
    this.props.socket.on("addToken", (tokenId) => {
      this.props.addToken(tokenId);
    });
  }

  async fetchGrid(roomId) {
    axios
      .get(`/api/room/${roomId}`)
      .then((response) => {
        this.setState({ gridData: response.data.grid });
        response.data.grid.tokens.map((token) => this.props.addToken(token));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  handleClickOnToken = (e) => {
    e.preventDefault();
    var tokenId = "";
    if (e.target.id) {
      tokenId = e.target.id;
    } else {
      tokenId = e.target.parentNode.id;
    }
    this.props.selectToken(tokenId);
  };

  handleEscape = (event) => {
    if (event.keyCode === 27) {
      event.preventDefault();
      this.props.unselectTokens();
    }
  };
  handleRightClick(e) {
    e.preventDefault();
  }

  getNewPositionByTileSideWithScrollingOffset(
    clickedPosition,
    tileSide,
    scrollingOffset
  ) {
    return {
      x: Math.floor((clickedPosition.x - scrollingOffset.offsetX) / tileSide),
      y: Math.floor((clickedPosition.y - scrollingOffset.offsetY) / tileSide),
    };
  }

  handleMouseDown(e) {
    if (e.button === 0) {
      const selectedToken = this.props.tokens.filter((token) => {
        return token.selected === true;
      })[0];

      if (selectedToken) {
        const clickedPosition = { x: e.clientX, y: e.clientY };
        const scrollingOffset = canvasUtils.getScrollingOffSet(canvas);
        const newPosition = this.getNewPositionByTileSideWithScrollingOffset(
          clickedPosition,
          tileSide,
          scrollingOffset
        );

        let moveTokenData = {
          room: this.props.roomId,
          user: this.props.nickname,
          tokenId: selectedToken._id,
          x: newPosition.x,
          y: newPosition.y,
        };
        this.props.socket.emit("moveToken", moveTokenData);
        this.props.moveToken(selectedToken._id, newPosition);
      }
    }
  }

  handleMouseUp(e) {}

  render() {
    return (
      <div
        className="container-fluid overflow-auto mt-3"
        style={{ height: "90vh" }}
      >
        <div className="row justify-content-between">
          <div id="room-name">{this.state.gridData.name}</div>
        </div>
        <div
          id="canvas-container"
          width="2400"
          height="2400"
          style={{ position: "relative" }}
        >
          <canvas
            onContextMenu={this.handleRightClick.bind(this)}
            ref="gridCanvas"
            width="2400"
            height="2400"
            style={{
              position: "absolute",
              background: `url(/${this.state.gridData.background})`,
            }}
            onMouseDown={this.handleMouseDown.bind(this)}
            onMouseUp={this.handleMouseUp.bind(this)}
          ></canvas>

          {this.props.tokens.map((token) => {
            return (
              <Token
                key={token._id}
                token={token}
                tileSide={tileSide}
                onClick={this.handleClickOnToken}
              ></Token>
            );
          })}
        </div>
        <TokenBar socket={this.props.socket}></TokenBar>
        <FloatingButton></FloatingButton>
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
  setUserName,
  setRoomId,
  addToken,
  resetTokens,
  selectToken,
  unselectTokens,
  moveToken,
  deleteToken,
  openNewTokenDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
