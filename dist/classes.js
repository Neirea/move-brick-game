import {offsetX, offsetY} from "./utils.js";
import {cellSize, cellGap, BlockSize} from "./constants.js";
import shortImage from "./short.svg.proxy.js";
import longImage from "./long.svg.proxy.js";
import vShortImage from "./short_v.svg.proxy.js";
import vLongImage from "./long_v.svg.proxy.js";
import playerImage from "./player.svg.proxy.js";
import boardImage from "./board.svg.proxy.js";
const canvas = document.getElementById("game-canvas");
const ctx = canvas?.getContext("2d");
export class Mouse {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 0.1;
    this.height = 0.1;
  }
}
export class Touch extends Mouse {
}
export class Board {
  constructor(x, y, numberOfCells) {
    this.x = x;
    this.y = y;
    this.width = cellSize * numberOfCells;
    this.height = cellSize * numberOfCells;
  }
  draw() {
    if (ctx) {
      const boardImg = new Image();
      boardImg.src = boardImage;
      ctx.drawImage(boardImg, this.x - cellSize / 10 - cellGap / 2, this.y - cellSize / 10 - cellGap / 2, this.width + 2 * cellGap + 1.85 * cellSize, this.height + 2 * cellGap + cellSize / 5);
    }
  }
}
export class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }
}
export class Block {
  constructor(x, y, vertical, size) {
    this.x = x;
    this.y = y;
    this.vertical = vertical;
    this.size = size;
    this.canMove = {
      left: true,
      right: true,
      up: true,
      down: true
    };
    if (vertical) {
      this.width = cellSize;
      this.height = cellSize * size;
    } else {
      this.width = cellSize * size;
      this.height = cellSize;
    }
  }
  draw() {
    if (ctx) {
      const blockImage = new Image();
      if (this.vertical) {
        blockImage.src = this.size === BlockSize.Long ? vLongImage : vShortImage;
      } else {
        blockImage.src = this.size === BlockSize.Long ? longImage : shortImage;
      }
      ctx.drawImage(blockImage, this.x + cellGap, this.y + cellGap, this.width - cellGap, this.height - cellGap);
    }
  }
}
export class PlayerBlock extends Block {
  constructor(x) {
    const yCoord = offsetY(cellSize * 2);
    super(x, yCoord, false, BlockSize.Short);
  }
  draw() {
    if (ctx) {
      const blockImage = new Image();
      blockImage.src = playerImage;
      ctx.drawImage(blockImage, this.x + cellGap, this.y + cellGap, this.width - cellGap, this.height - cellGap);
    }
  }
}
export class GameGrid {
  constructor() {
    this.cells = [];
  }
  create(gameBoard) {
    if (canvas !== null) {
      for (let y = offsetY(0); y < offsetY(gameBoard.height); y += cellSize) {
        for (let x = offsetX(0); x < offsetX(gameBoard.width); x += cellSize) {
          this.cells.push(new Cell(x, y));
        }
      }
    }
  }
  draw() {
    if (ctx) {
      ctx.strokeStyle = "rgb(230, 196, 125,0.1)";
      this.cells.forEach((elem) => {
        ctx.strokeRect(elem.x + cellGap, elem.y + cellGap, elem.width - cellGap, elem.height - cellGap);
      });
    }
  }
}
