const clientW = document.documentElement.clientWidth;
export const canvasSize = clientW > 640 ? 640 : clientW;
export const cellSize = canvasSize / 8;
export const cellGap = canvasSize / 160;
export const borderWidth = canvasSize / 40;
export const boardOffset = {x: canvasSize / 16, y: canvasSize / 16};
export var BlockSize;
(function(BlockSize2) {
  BlockSize2[BlockSize2["Short"] = 2] = "Short";
  BlockSize2[BlockSize2["Long"] = 3] = "Long";
})(BlockSize || (BlockSize = {}));
const debounce = (fn, ms = 200) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
window.addEventListener("resize", debounce(() => {
  window.location.reload();
}, 200));
