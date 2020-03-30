import React, { useState, useEffect } from "react";

const Grid = props => {
  const [grid, setGrid] = useState(null);

  async function fetchGrid(roomId) {
    const response = await fetch("/api/grid/" + roomId);
    setGrid(await response.json());
  }

  useEffect(() => {
    fetchGrid(props.roomId);
  }, [props.roomId]);

  if (!grid) {
    return "loading...";
  }

  return (
    <div className="container border">
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
