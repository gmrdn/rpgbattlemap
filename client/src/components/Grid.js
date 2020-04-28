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
} from "../actions";
import Token from "../components/Token";

const gridSize = { width: 60, height: 60 };
const tileSide = 40;
var canvas;
var ctx;

class Grid extends React.Component {
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
    this.drawGrid(ctx);
  }

  drawGrid(ctx) {
    for (var y = 0; y < gridSize.height; y++) {
      for (var x = 0; x < gridSize.width; x++) {
        ctx.lineWidth = 0.2;
        ctx.beginPath();
        ctx.rect(x * tileSide, y * tileSide, tileSide, tileSide);
        ctx.stroke();
      }
    }
  }

  async fetchGrid(roomId) {
    try {
      const response = await axios(`/api/room/${roomId}`);
      this.setState({ gridData: await response.data.grid });
      response.data.grid.tokens.map((token) => this.props.addToken(token));
    } catch (error) {
      console.error(error);
    }
  }

  handleClickOnToken = (e) => {
    e.preventDefault();
    var tokenId = "";
    if (e.target.id) {
      tokenId = e.target.id;
    } else {
      tokenId = e.target.parentNode.id;
    }
    console.info("You clicked the Token.");
    console.log(tokenId);
    this.props.selectToken(tokenId);
  };

  handleMouseDown(event) {
    console.log("mouse down");
    const selectedToken = this.props.tokens.filter((token) => {
      return token.selected === true;
    })[0];

    if (selectedToken) {
      var BB = canvas.getBoundingClientRect();
      const offsetX = BB.left;
      const offsetY = BB.top;

      const newPosition = {
        x: Math.floor((event.clientX - offsetX) / 40),
        y: Math.floor((event.clientY - offsetY) / 40),
      };
      console.log(newPosition);
      this.props.moveToken(selectedToken, newPosition);
    }
  }

  handleMouseMove(event) {
    return;
    // const selectedToken = this.props.tokens.filter((token) => {
    //   return token.selected === true;
    // })[0];
    // if (selectedToken) {
    //   const fromX = selectedToken.x;
    //   const fromY = selectedToken.y;
    //   console.log(
    //     `from ${fromX}, ${fromY} to ${event.clientX}, ${event.clientY}`
    //   );
    //   this.drawLine(
    //     ctx,
    //     fromX * tileSide + tileSide / 2,
    //     fromY * tileSide + tileSide / 2,
    //     event.clientX - canvas.offsetLeft,
    //     event.clientY - canvas.offsetTop
    //   );
    // } else {
    //   console.log(`from nowhere to ${event.clientX}, ${event.clientY}`);
    // }
  }

  // drawLine(ctx, fromX, fromY, toX, toY) {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.lineWidth = 1;
  //   ctx.beginPath();

  //   ctx.moveTo(fromX, fromY);
  //   ctx.lineTo(toX, toY);
  //   ctx.stroke();
  // }

  handleMouseUp(event) {
    console.log("mouse up");
  }

  render() {
    return (
      <div
        className="container-fluid overflow-auto mt-3"
        style={{ height: "80vh" }}
      >
        <h5 id="room-name">{this.state.gridData.name}</h5>
        <div
          id="canvas-container"
          width="2400"
          height="2400"
          style={{ position: "relative" }}
        >
          <canvas
            ref="gridCanvas"
            width="2400"
            height="2400"
            style={{
              position: "absolute",
              background: `url(/${this.state.gridData.background})`,
            }}
            onMouseDown={this.handleMouseDown.bind(this)}
            onMouseMove={this.handleMouseMove.bind(this)}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
