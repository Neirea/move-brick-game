import { offsetX, offsetY } from "./utils";
import { cellSize, cellGap, BlockSize } from "./constants";
import shortImage from "./short.svg";
import longImage from "./long.svg";
import vShortImage from "./short_v.svg";
import vLongImage from "./long_v.svg";
import boardImage from "./board.svg";
import playerImage from "./player.svg";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement | null;
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
//game board
export class Board implements Unit {
	x: number;
	y: number;
	width: number;
	height: number;
	image: HTMLImageElement;
	constructor(x: number, y: number, numberOfCells: number) {
		const boardImage = new Image();
		this.x = x;
		this.y = y;
		this.width = cellSize * numberOfCells;
		this.height = cellSize * numberOfCells;
		this.image = boardImage;
	}
	draw() {
		if (ctx) {
			this.image.src = boardImage;

			ctx.drawImage(
				this.image,
				this.x,
				this.y,
				this.width + cellGap,
				this.height + cellGap
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
	}
	draw() {
		if (ctx) {
			const blockImage = new Image();

			if (this.vertical) {
				blockImage.src =
					this.size === BlockSize.Long ? vLongImage : vShortImage;
			} else {
				blockImage.src = this.size === BlockSize.Long ? longImage : shortImage;
			}
			ctx.drawImage(
				blockImage,
				this.x + cellGap,
				this.y + cellGap,
				this.width - cellGap,
				this.height - cellGap
			);
		}
	}
}
export class PlayerBlock extends Block {
	constructor(x: number) {
		const yCoord = offsetY(cellSize * 2);
		super(x, yCoord, false, BlockSize.Short);
	}
	draw() {
		if (ctx) {
			const blockImage = new Image();
			blockImage.src = playerImage;
			ctx.drawImage(
				blockImage,
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
			for (let y = offsetY(0); y < offsetY(gameBoard.height); y += cellSize) {
				for (let x = offsetX(0); x < offsetX(gameBoard.width); x += cellSize) {
					this.cells.push(new Cell(x, y));
				}
			}
		}
	}
}
