const drawGrid = (ctx, gridSize, tileSide) => {
  for (var y = 0; y < gridSize.height; y++) {
    for (var x = 0; x < gridSize.width; x++) {
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.rect(x * tileSide, y * tileSide, tileSide, tileSide);
      ctx.stroke();
    }
  }
};

const canvasUtils = {
  drawGrid,
};
export default canvasUtils;
