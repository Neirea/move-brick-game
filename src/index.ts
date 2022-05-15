import "./index.css";
import { cellSize, Direction, BlockSize } from "./constants";
import { Board, Cell, Block, PlayerBlock, Mouse, GameGrid } from "./classes";
import {
	isCollision,
	checkBounds,
	checkBlock,
	checkWin,
	offsetX,
	offsetY,
} from "./utils";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement | null;
const ctx = canvas?.getContext("2d");
const gameGrid = new GameGrid();
const controlsGrid: Cell[] = [];
const blocks: Block[] = [];
const mouse: Mouse = new Mouse();
// create Game class with method to start game
const gameBoard = new Board(offsetX(0), offsetY(0), 6);

//global settings
if (canvas != null) {
	// canvas.width = 800;
	// canvas.height = 800;

	canvas.addEventListener("mousemove", function (e) {
		const canvasPosition = canvas.getBoundingClientRect();
		mouse.x = e.x - canvasPosition.left;
		mouse.y = e.y - canvasPosition.top;
	});
	canvas.addEventListener("mouseleave", function (e) {
		mouse.x = 0;
		mouse.y = 0;
	});
	canvas.onmousedown = dragMouseDown;
}

//controlsbar
const controlsBar = {
	width: canvas?.width || 0,
	height: cellSize,
};

//dragging blocks
function dragMouseDown(e: MouseEvent) {
	e.preventDefault();
	//on mousedown get index of current block
	const movingBlockIndex = getBlockIndex();
	if (movingBlockIndex === -1) return;
	const initialBlockX = blocks[movingBlockIndex].x;
	const initialBlockY = blocks[movingBlockIndex].y;
	const initialMouseX = e.x;
	const initialMouseY = e.y;
	let previousMousePosX = e.x;
	let previousMousePosY = e.y;

	if (movingBlockIndex >= 0) {
		document.onmouseup = () => closeDragBlock(blocks[movingBlockIndex]);
		document.onmousemove = (e) =>
			!blocks[movingBlockIndex].vertical
				? blockDragX(e, blocks[movingBlockIndex])
				: blockDragY(e, blocks[movingBlockIndex]);
		document.ontouchend = () => closeDragBlock(blocks[movingBlockIndex]);
		// document.ontouchmove = !blocks[movingBlockIndex].vertical
		// 	? blockDragX(e, blocks[movingBlockIndex])
		// 	: blockDragY(e, blocks[movingBlockIndex]);
	}
	//get block index
	function getBlockIndex(): number {
		for (let i = 0; i < blocks.length; i++) {
			if (isCollision(blocks[i], mouse)) {
				return i;
			}
		}
		return -1;
	}
	//on drag horizontally
	function blockDragX(e: MouseEvent, block: Block) {
		let x = block.x;

		//horizontal
		const mouseDeltaX = e.x - initialMouseX;

		const moveDirectionX =
			e.x > previousMousePosX ? Direction.Right : Direction.Left;
		if (moveDirectionX === Direction.Right && !block.canMove.right) {
			//check distance to other
			return;
		}
		if (moveDirectionX === Direction.Left && !block.canMove.left) {
			return;
		}
		block.canMove.right = true;
		block.canMove.left = true;

		const movePositionX = initialBlockX + mouseDeltaX;
		const testBlock: Block = new Block(
			movePositionX, //x
			block.y,
			block.vertical,
			block.size
		);

		x = checkBounds(testBlock, gameBoard).x;
		for (let i = 0; i < blocks.length; i++) {
			if (block !== blocks[i] && isCollision(testBlock, blocks[i])) {
				const movement = checkBlock(testBlock, blocks[i]);
				movement.direction === Direction.Right
					? (block.canMove.right = false)
					: (block.canMove.left = false);
				x = movement.x;
			}
		}
		block.x = x;
		previousMousePosX = e.x;
	}
	//on drag vertically
	function blockDragY(e: MouseEvent, block: Block) {
		let y = block.y;
		const mouseDeltaY = e.y - initialMouseY;
		const moveDirectionY =
			e.y > previousMousePosY ? Direction.Down : Direction.Up;
		if (moveDirectionY === Direction.Up && !block.canMove.up) {
			return;
		}
		if (moveDirectionY === Direction.Down && !block.canMove.down) {
			return;
		}
		block.canMove.up = true;
		block.canMove.down = true;

		const movePositionY = initialBlockY + mouseDeltaY;
		const testBlock: Block = new Block(
			block.x,
			movePositionY, //y
			block.vertical,
			block.size
		);

		y = checkBounds(testBlock, gameBoard).y;
		for (let i = 0; i < blocks.length; i++) {
			if (block !== blocks[i] && isCollision(testBlock, blocks[i])) {
				const movement = checkBlock(testBlock, blocks[i]);
				movement.direction === Direction.Up
					? (block.canMove.up = false)
					: (block.canMove.down = false);
				y = movement.y;
			}
		}
		block.y = y;
		previousMousePosY = e.y;
	}
	//on drop
	function closeDragBlock(block: Block) {
		const moveX =
			initialBlockX +
			Math.round((block.x - initialBlockX) / cellSize) * cellSize;
		const moveY =
			initialBlockY +
			Math.round((block.y - initialBlockY) / cellSize) * cellSize;

		//add animation from block.x to moveX and same for Y
		if (!block.vertical) {
			block.x = moveX;
		} else {
			block.y = moveY;
		}
		block.canMove = { right: true, left: true, up: true, down: true };

		document.onmousemove = null;
		document.onmouseup = null;
	}
}

// TEST BLOCK - player block
const testBlockHorizontal = new PlayerBlock(offsetX(0));
const testBlockVertical = new Block(
	offsetX(300),
	offsetY(200),
	true,
	BlockSize.Long
);
//animation cycle
function animate() {
	if (checkWin(testBlockHorizontal, gameBoard)) {
		//animate win thing
	}

	if (ctx && canvas) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//get picture background instead
		//draw ControlBar
		ctx.fillStyle = "blue";
		ctx.fillRect(
			0,
			offsetY(gameBoard.y + gameBoard.height),
			controlsBar.width,
			controlsBar.height
		);
	}
	gameBoard.draw();
	for (let i = 0; i < blocks.length; i++) {
		//get instead of fillRect good textures
		blocks[i].draw();
	}
	requestAnimationFrame(animate);
}

//start game function
export function startGame() {
	// document.addEventListener(
	// 	"contextmenu",
	// 	function (event) {
	// 		event.preventDefault();
	// 	},
	// 	false
	// );
	blocks.push(testBlockHorizontal);
	blocks.push(testBlockVertical);

	//create board
	gameGrid.create(gameBoard);

	//load level
	//start animations
	animate();
}

startGame();
