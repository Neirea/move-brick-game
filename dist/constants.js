let clientW = document.documentElement.clientWidth;
export let canvasSize = clientW > 640 ? 640 : clientW;
export const cellSize = canvasSize / 8;
export const cellGap = canvasSize / 160;
export const borderWidth = canvasSize / 40;
export const boardOffset = {x: canvasSize / 16, y: canvasSize / 16};
export var BlockSize;
(function(BlockSize2) {
  BlockSize2[BlockSize2["Short"] = 2] = "Short";
  BlockSize2[BlockSize2["Long"] = 3] = "Long";
})(BlockSize || (BlockSize = {}));
export var Direction;
(function(Direction2) {
  Direction2[Direction2["Up"] = 0] = "Up";
  Direction2[Direction2["Down"] = 1] = "Down";
  Direction2[Direction2["Right"] = 2] = "Right";
  Direction2[Direction2["Left"] = 3] = "Left";
})(Direction || (Direction = {}));
