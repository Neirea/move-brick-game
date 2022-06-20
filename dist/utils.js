import {boardOffset} from "./constants.js";
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
export const getClosestBlocksX = (current, blocks, gameBoard) => {
  const initY = current.y;
  const collidableX = [];
  const newBounds = {
    x: gameBoard.x,
    y: 0,
    width: gameBoard.width,
    height: 0
  };
  for (let i = 0; i < blocks.length; i++) {
    if (current === blocks[i])
      continue;
    if (initY >= blocks[i].y && initY < blocks[i].y + blocks[i].height) {
      collidableX.push(blocks[i]);
    }
  }
  if (!collidableX.length)
    return newBounds;
  let closestLeft = null;
  let closestRight = null;
  const currRight = current.x + current.width;
  for (let i = 0; i < collidableX.length; i++) {
    const currLeft = collidableX[i].x + collidableX[i].width;
    if (current.x - currLeft >= 0) {
      if (closestLeft == null) {
        closestLeft = collidableX[i];
      } else if (closestLeft.x + closestLeft.width < currLeft) {
        closestLeft = collidableX[i];
      }
    }
    if (collidableX[i].x - currRight >= 0) {
      if (closestRight == null) {
        closestRight = collidableX[i];
      } else if (closestRight.x > collidableX[i].x) {
        closestRight = collidableX[i];
      }
    }
  }
  if (closestLeft == null) {
    newBounds.width = closestRight.x - newBounds.x;
    return newBounds;
  }
  if (closestRight == null) {
    newBounds.width = newBounds.x + newBounds.width - (closestLeft.x + closestLeft.width);
    newBounds.x = closestLeft.x + closestLeft.width;
    return newBounds;
  }
  newBounds.x = closestLeft.x + closestLeft.width;
  newBounds.width = closestRight.x - newBounds.x;
  return newBounds;
};
export const getClosestBlocksY = (current, blocks, gameBoard) => {
  const initX = current.x;
  const collidableY = [];
  const newBounds = {
    x: 0,
    y: gameBoard.y,
    width: 0,
    height: gameBoard.height
  };
  for (let i = 0; i < blocks.length; i++) {
    if (current === blocks[i])
      continue;
    if (initX >= blocks[i].x && initX < blocks[i].x + blocks[i].width) {
      collidableY.push(blocks[i]);
    }
  }
  if (!collidableY.length)
    return newBounds;
  let closestTop = null;
  let closestBottom = null;
  const currBottom = current.y + current.height;
  for (let i = 0; i < collidableY.length; i++) {
    const currTop = collidableY[i].y + collidableY[i].height;
    if (current.y - currTop >= 0) {
      if (closestTop == null) {
        closestTop = collidableY[i];
      } else if (closestTop.y + closestTop.height < currTop) {
        closestTop = collidableY[i];
      }
    }
    if (collidableY[i].y - currBottom >= 0) {
      if (closestBottom == null) {
        closestBottom = collidableY[i];
      } else if (closestBottom.y > collidableY[i].y) {
        closestBottom = collidableY[i];
      }
    }
  }
  if (closestTop == null) {
    newBounds.height = closestBottom.y - newBounds.y;
    return newBounds;
  }
  if (closestBottom == null) {
    newBounds.height = newBounds.y + newBounds.height - (closestTop.y + closestTop.height);
    newBounds.y = closestTop.y + closestTop.height;
    return newBounds;
  }
  newBounds.y = closestTop.y + closestTop.height;
  newBounds.height = closestBottom.y - newBounds.y;
  return newBounds;
};
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
