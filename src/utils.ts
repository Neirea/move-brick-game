import type { Block, Unit } from "./classes";
import { boardOffset, cellSize, Direction } from "./constants";
//check if two units have overlap
export function isCollision(first: Unit, second: Unit) {
	if (
		first.x >= second.x + second.width || // first to the right
		first.x + first.width <= second.x || // first to the left
		first.y >= second.y + second.height || // first is down
		first.y + first.height <= second.y // first is up
	) {
		return false;
	}

	return true;
}
export function checkBounds(unit: Unit, bounds: Unit) {
	let x = unit.x;
	let y = unit.y;
	//check for x
	if (unit.x <= bounds.x) {
		x = bounds.x;
	} else if (unit.x + unit.width >= bounds.x + bounds.width) {
		x = bounds.x + bounds.width - unit.width;
	}
	//check for y
	if (unit.y <= bounds.y) {
		y = bounds.y;
	} else if (unit.y + unit.height >= bounds.y + bounds.height) {
		y = bounds.y + bounds.height - unit.height;
	}

	return { x, y };
}
export function checkBlock(first: Block, second: Block) {
	let x = first.x;
	let y = first.y;

	if (!first.vertical) {
		if (first.x + first.width > second.x && first.x < second.x) {
			x = second.x - first.width;
			return { x, y, direction: Direction.Right };
		} else if (first.x < second.x + second.width) {
			x = second.x + second.width;
			return { x, y, direction: Direction.Left };
		}
	} else {
		if (first.y + first.height >= second.y && first.y <= second.y) {
			y = second.y - first.height;
			return { x, y, direction: Direction.Down };
		} else if (first.y <= second.y + second.height) {
			y = second.y + second.height;
			return { x, y, direction: Direction.Up };
		}
	}

	//this never happens anyway
	return { x, y, direction: -1 };
}

export function offsetX(x: number) {
	return boardOffset.x + x;
}
export function offsetY(y: number) {
	return boardOffset.y + y;
}

export function checkWin(playerBlock: Block, bounds: Unit) {
	if (playerBlock.x + playerBlock.width >= bounds.x + bounds.width) {
		console.log("WIN");

		return true;
	}
	return false;
}
