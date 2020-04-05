import React, { useState, useEffect } from "react";
import axios from "axios";

const divStyle = {
  height: "50vh",
  overflowY: "scroll",
};

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
    <div className="container border" style={divStyle}>
      <h5>Grid component</h5>
      <div>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
        <p>{grid.name}</p>
      </div>
    </div>
  );
};

export default Grid;
