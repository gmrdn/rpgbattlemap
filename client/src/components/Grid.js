import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  setUserName,
  setRoomId,
  addToken,
  resetTokens,
  selectToken,
  moveToken,
  deleteToken,
  openNewTokenDialog,
} from "../actions";
import Token from "../components/Token";
import canvasUtils from "../utils/canvasUtils";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const gridSize = { width: 60, height: 60 };
const tileSide = 40;
var canvas;
var ctx;

const fabStyle = {
  position: "absolute",
  top: "160px",
  left: "16px",
};

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

  handleAddToken = () => {
    this.props.openNewTokenDialog(true);
  };

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
        style={{ height: "80vh" }}
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
        <Fab
          color="primary"
          aria-label="add"
          id="fab-addtoken"
          style={fabStyle}
          onClick={this.handleAddToken}
        >
          <AddIcon />
        </Fab>
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
  moveToken,
  deleteToken,
  openNewTokenDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
