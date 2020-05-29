const LINE_WIDTH = 0.2;

const drawGrid = (canvas, gridSize, tileSide) => {
  for (let currentRow = 0; currentRow < gridSize.height; currentRow++) {
    drawGridRow(gridSize, canvas, tileSide, currentRow);
  }
};

const drawGridRow = (gridSize, canvas, tileSide, currentRow) => {
  canvas.lineWidth = LINE_WIDTH;
  for (let currentCol = 0; currentCol < gridSize.width; currentCol++) {
    canvas.beginPath();
    drawCell(canvas, currentCol, tileSide, currentRow);
    canvas.stroke();
  }
};

const drawCell = (canvas, currentCol, tileSide, currentRow) => {
  const startingPositionLeft = currentCol * tileSide;
  const startingPositionTop = currentRow * tileSide;
  canvas.rect(startingPositionLeft, startingPositionTop, tileSide, tileSide);
};

const getScrollingOffSet = (canvas) => {
  const positionInView = canvas.getBoundingClientRect();
  return { offsetX: positionInView.left, offsetY: positionInView.top };
};

const canvasUtils = {
  drawGrid,
  getScrollingOffSet,
};
export default canvasUtils;
