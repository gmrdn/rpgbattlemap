import "jest-canvas-mock";
import canvasSerializer from "jest-canvas-snapshot-serializer";
import canvasUtils from "../canvasUtils";

expect.addSnapshotSerializer(canvasSerializer);

describe("Utils", () => {
  describe("Canvas Utils", () => {
    it("draws a grid", () => {
      const canvas = document.createElement("canvas");
      canvas.id = "canvas";
      canvas.setAttribute("width", "2400");
      canvas.setAttribute("height", "2400");
      const ctx = canvas.getContext("2d");
      const gridSize = { width: 60, height: 60 };
      const tileSide = 40;
      canvasUtils.drawGrid(ctx, gridSize, tileSide);

      expect(ctx).toMatchSnapshot();
    });
  });
});
