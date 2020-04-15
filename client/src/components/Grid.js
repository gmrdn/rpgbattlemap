import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUserName, setRoomId, addToken } from "../actions";

const gridSize = { width: 60, height: 60 };
const tileSide = 40;

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
    this.state = {
      gridData: {},
    };
  }

  componentDidMount() {
    this.fetchGrid(this.props.roomId);
    const canvas = this.refs.gridCanvas;
    const ctx = canvas.getContext("2d");
    this.drawGrid(ctx);
  }

  // componentDidUpdate() {
  // const canvas = this.refs.gridCanvas;
  // const ctx = canvas.getContext("2d");
  // this.drawTokens(ctx);
  // }

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

  // drawTokens(ctx) {
  //   this.props.tokens.map((token) => {
  //     //rounds
  //     ctx.beginPath();
  //     ctx.arc(
  //       token.x * tileSide + tileSide / 2,
  //       token.y * tileSide + tileSide / 2,
  //       tileSide / 2,
  //       0,
  //       2 * Math.PI,
  //       false
  //     );
  //     ctx.fillStyle = token.color;
  //     ctx.fill();

  //     //rectangles
  //     // ctx.fillStyle = token.color;
  //     // ctx.fillRect(token.x * tileSide, token.y * tileSide, tileSide, tileSide);
  //   });
  // }

  async fetchGrid(roomId) {
    try {
      const response = await axios(`/api/room/${roomId}`);
      this.setState({ gridData: await response.data.grid });
      response.data.grid.tokens.map((token) => this.props.addToken(token));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div
        className="container-fluid border overflow-auto bg-light mt-3"
        style={{ height: "50vh" }}
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
            style={{ position: "absolute" }}
          ></canvas>

          {this.props.tokens.map((token) => {
            return (
              <button
                id="btn-token"
                className="btn btn-outline-dark"
                title={token.name}
                style={{
                  position: "absolute",
                  left: `${token.x * tileSide}px`,
                  top: `${token.y * tileSide}px`,
                  color: token.color,
                }}
              >
                X
              </button>
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

const mapDispatchToProps = { setUserName, setRoomId, addToken };

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
