import React, { useState, useEffect } from "react";
import axios from "axios";
import Cell from "./Cell";

const divStyle = {
  height: "50vh",
};

const rowStyle = {
  "white-space": "nowrap",
  "flex-wrap": "nowrap",
};

const gridSize = { width: 40, height: 40 };

const Grid = (props) => {
  const [grid, setGrid] = useState(null);

  async function fetchGrid(roomId) {
    const response = await axios(`/api/room/${roomId}/grid`);
    setGrid(await response.data);
  }

  useEffect(() => {
    fetchGrid(props.roomId);
  }, [props.roomId]);

  if (!grid) {
    return "loading...";
  }

  return (
    <div className="container border overflow-auto bg-light" style={divStyle}>
      <h5 id="room-name">{grid.name}</h5>
      <div>
        {[...Array(gridSize.height)].map((_, i) => (
          <div className="row" style={rowStyle}>
            {[...Array(gridSize.width)].map((_, i) => (
              <div className="col-sm pr-0 pl-0">
                <Cell></Cell>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
