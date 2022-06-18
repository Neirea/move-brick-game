import {boardOffset, Direction} from "./constants.js";
export function isCollision(first, second) {
  if (first.x >= second.x + second.width || first.x + first.width <= second.x || first.y >= second.y + second.height || first.y + first.height <= second.y) {
    return false;
  }
  return true;
}
export function checkBounds(unit, bounds) {
  let x = unit.x;
  let y = unit.y;
  if (unit.x <= bounds.x) {
    x = bounds.x;
  } else if (unit.x + unit.width >= bounds.x + bounds.width) {
    x = bounds.x + bounds.width - unit.width;
  }
  if (unit.y <= bounds.y) {
    y = bounds.y;
  } else if (unit.y + unit.height >= bounds.y + bounds.height) {
    y = bounds.y + bounds.height - unit.height;
  }
  return {x, y};
}
export function checkBlock(first, second) {
  let x = first.x;
  let y = first.y;
  if (!first.vertical) {
    if (first.x + first.width > second.x && first.x < second.x) {
      x = second.x - first.width;
      return {x, y, direction: Direction.Right};
    } else if (first.x < second.x + second.width) {
      x = second.x + second.width;
      return {x, y, direction: Direction.Left};
    }
  } else {
    if (first.y + first.height >= second.y && first.y <= second.y) {
      y = second.y - first.height;
      return {x, y, direction: Direction.Down};
    } else if (first.y <= second.y + second.height) {
      y = second.y + second.height;
      return {x, y, direction: Direction.Up};
    }
  }
  return {x, y, direction: -1};
}
export function offsetX(x) {
  return boardOffset.x + x;
}
export function offsetY(y) {
  return boardOffset.y + y;
}
export function checkWin(playerBlock, bounds) {
  if (playerBlock.x + playerBlock.width >= bounds.x + bounds.width) {
    return true;
  }
  return false;
}
