import React from "react";
import axios from "axios";

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
    const response = await axios(`/api/room/${roomId}/grid`);
    this.setState({ gridData: await response.data });
  }

  render() {
    return (
      <div
        className="container border overflow-auto bg-light"
        style={{ height: "50vh" }}
      >
        <h5 id="room-name">{this.state.gridData.name}</h5>
        <div>
          <canvas ref="gridCanvas" width="2400" height="2400"></canvas>
        </div>
      </div>
    );
  }
}

export default Grid;
