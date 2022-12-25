import { offsetX, offsetY } from "./utils";
import { cellSize, cellGap, BlockSize } from "./constants";
import shortImage from "./short.svg";
import longImage from "./long.svg";
import vShortImage from "./short_v.svg";
import vLongImage from "./long_v.svg";
import playerImage from "./player.svg";
import boardImage from "./board.svg";

const canvas = document.getElementById(
    "game-canvas"
) as HTMLCanvasElement | null;
const ctx = canvas?.getContext("2d");

export interface Unit {
    x: number;
    y: number;
    width: number;
    height: number;
}
//mouse
export class Mouse implements Unit {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0.1;
        this.height = 0.1;
    }
}
export class Touch extends Mouse {}
//game board
export class Board implements Unit {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    constructor(x: number, y: number, numberOfCells: number) {
        this.x = x;
        this.y = y;
        this.width = cellSize * numberOfCells;
        this.height = cellSize * numberOfCells;
        this.image = new Image();
        this.image.src = boardImage;
    }
    draw() {
        if (ctx) {
            //need offsets because of bad image
            ctx.drawImage(
                this.image,
                this.x - cellSize / 10 - cellGap / 2,
                this.y - cellSize / 10 - cellGap / 2,
                this.width + 2 * cellGap + 1.85 * cellSize,
                this.height + 2 * cellGap + cellSize / 5
            );
        }
    }
}
//Cell
export class Cell implements Unit {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
}
//block class
export class Block implements Unit {
    x: number;
    y: number;
    width: number;
    height: number;
    vertical: boolean;
    size: BlockSize;
    image: HTMLImageElement;
    canMove: {
        left: boolean;
        right: boolean;
        up: boolean;
        down: boolean;
    };

    constructor(x: number, y: number, vertical: boolean, size: BlockSize) {
        this.x = x;
        this.y = y;
        this.vertical = vertical;
        this.size = size;

        this.canMove = {
            left: true,
            right: true,
            up: true,
            down: true,
        };
        if (vertical) {
            this.width = cellSize;
            this.height = cellSize * size;
        } else {
            this.width = cellSize * size;
            this.height = cellSize;
        }
        this.image = new Image();
        if (this.vertical) {
            this.image.src =
                this.size === BlockSize.Long ? vLongImage : vShortImage;
        } else {
            this.image.src =
                this.size === BlockSize.Long ? longImage : shortImage;
        }
    }
    draw() {
        if (ctx) {
            ctx.drawImage(
                this.image,
                this.x + cellGap,
                this.y + cellGap,
                this.width - cellGap,
                this.height - cellGap
            );
        }
    }
}
export class PlayerBlock extends Block {
    image: HTMLImageElement;
    constructor(x: number) {
        const yCoord = offsetY(cellSize * 2);
        super(x, yCoord, false, BlockSize.Short);
        this.image = new Image();
        this.image.src = playerImage;
    }
    draw() {
        if (ctx) {
            ctx.drawImage(
                this.image,
                this.x + cellGap,
                this.y + cellGap,
                this.width - cellGap,
                this.height - cellGap
            );
        }
    }
}
//game grid
export class GameGrid {
    cells: Cell[];

    constructor() {
        this.cells = [];
    }

    create(gameBoard: Board) {
        if (canvas !== null) {
            for (
                let y = offsetY(0);
                y < offsetY(gameBoard.height);
                y += cellSize
            ) {
                for (
                    let x = offsetX(0);
                    x < offsetX(gameBoard.width);
                    x += cellSize
                ) {
                    this.cells.push(new Cell(x, y));
                }
            }
        }
    }
    draw() {
        if (ctx) {
            ctx.strokeStyle = "rgb(230, 196, 125,0.1)";
            this.cells.forEach((elem) => {
                ctx.strokeRect(
                    elem.x + cellGap,
                    elem.y + cellGap,
                    elem.width - cellGap,
                    elem.height - cellGap
                );
            });
        }
    }
}
