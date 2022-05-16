import "./index.css";
import { cellSize, Direction, canvasSize } from "./constants";
import { Board, Block, Mouse, GameGrid } from "./classes";
import {
	isCollision,
	checkBounds,
	checkBlock,
	checkWin,
	offsetX,
	offsetY,
} from "./utils";
import { getLevels } from "./levels";

// query selectors
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement | null;
const ctx = canvas?.getContext("2d");
const startGameButton = document.getElementById(
	"nextLevel"
) as HTMLButtonElement | null;
const resetLevelButton = document.getElementById(
	"restartLevel"
) as HTMLButtonElement | null;
const playerMoves = document.querySelector(
	"#movesCounter>p:first-of-type"
) as HTMLParagraphElement | null;
const bestMoves = document.querySelector(
	"#movesCounter>p:last-of-type"
) as HTMLParagraphElement | null;
const currentLvlElem = document.querySelector(
	"#levelsCounter>p:first-of-type"
) as HTMLParagraphElement | null;
const totalLvlsElem = document.querySelector(
	"#levelsCounter>p:last-of-type"
) as HTMLParagraphElement | null;
const levelCleared = document.querySelector(
	"h3:first-of-type"
) as HTMLHeadingElement | null;
const allLevelsCleared = document.querySelector(
	"h3:last-of-type"
) as HTMLHeadingElement | null;

//global vars
const gameGrid = new GameGrid();
let blocks: Block[] = [];
const mouse: Mouse = new Mouse();
const gameBoard = new Board(offsetX(0), offsetY(0), 6);
let currentLvl = 0;
let movesCount = 0;
let isWin = false;
let restartLvl = true;
const maxLevels = getLevels().length;
const winEvent = new Event("onWin");

//global settings
if (canvas != null) {
	canvas.width = canvasSize;
	canvas.height = canvasSize;
	addEvents();
}
function addEvents() {
	if (canvas) {
		canvas.addEventListener("mousemove", function (e) {
			const canvasPosition = canvas.getBoundingClientRect();
			mouse.x = e.x - canvasPosition.left;
			mouse.y = e.y - canvasPosition.top;
		});
		canvas.addEventListener("mouseleave", function (e) {
			mouse.x = 0;
			mouse.y = 0;
		});
		canvas.onmousedown = dragMouse;
		canvas.ontouchstart = touchDrag;
	}
}
function removeMouseDownTouchStart() {
	if (canvas) {
		canvas.onmousedown = null;
		canvas.ontouchstart = null;
	}
}
function addMouseDownTouchStart() {
	if (canvas) {
		canvas.onmousedown = dragMouse;
		canvas.ontouchstart = touchDrag;
	}
}

function touchDrag(e: TouchEvent) {
	e.preventDefault();
	const text = document.querySelector(".invis") as HTMLHeadingElement | null;
	if (text) text.style.opacity = "1";
}
//dragging blocks
function dragMouse(e: MouseEvent) {
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

		let deltaX = (block.x - initialBlockX) % cellSize;
		let deltaY = (block.y - initialBlockY) % cellSize;

		if (deltaX < 50 && deltaX > -50) deltaX = -deltaX;
		if (deltaX <= -50) deltaX = -deltaX - cellSize;
		if (deltaX >= 50) deltaX = cellSize - deltaX;
		if (deltaY < 50 && deltaY > -50) deltaY = -deltaY;
		if (deltaY <= -50) deltaY = -deltaY - cellSize;
		if (deltaY >= 50) deltaY = cellSize - deltaY;

		console.log("new delta=", deltaX);

		//add animation from block.x to moveX and same for Y
		function animateMoveEnd() {
			removeMouseDownTouchStart();
			if (!block.vertical) {
				if (deltaX !== 0) {
					block.x += Math.sign(deltaX);
					deltaX -= 2 * Math.sign(deltaX);
					requestAnimationFrame(animateMoveEnd);
				} else {
					block.x = moveX;
					addMouseDownTouchStart();
				}
				return;
			} else {
				if (deltaY > 0.5 || deltaY < -0.5) {
					block.y += Math.sign(deltaY);
					deltaY -= 1.5 * Math.sign(deltaY);
					requestAnimationFrame(animateMoveEnd);
					return;
				} else {
					block.y = moveY;
					addMouseDownTouchStart();
				}
			}
			block.draw();
		}
		animateMoveEnd();
		if (!block.vertical) {
			if (moveX !== initialBlockX) {
				movesCount++;
				if (playerMoves) playerMoves.textContent = movesCount.toString();
			}
			// block.x = moveX;
		} else {
			if (moveY !== initialBlockY) {
				movesCount++;
				if (playerMoves) playerMoves.textContent = movesCount.toString();
			}
			// block.y = moveY;
		}
		block.canMove = { right: true, left: true, up: true, down: true };

		document.onmousemove = null;
		document.onmouseup = null;
	}
}

//animation cycle
function animate() {
	if (blocks.length && checkWin(blocks[0], gameBoard)) {
		isWin = true;
		restartLvl = true;
		if (canvas) {
			canvas.style.opacity = "0.3";
		}

		//animate win thing
		if (startGameButton) startGameButton.disabled = false;
		//check for last level
		if (currentLvl + 1 === maxLevels) {
			if (allLevelsCleared) allLevelsCleared.style.display = "block";
			if (startGameButton) startGameButton.textContent = "Start again";
		} else {
			if (levelCleared) levelCleared.style.display = "block";
		}
		document.dispatchEvent(winEvent);
		animateWin();
		return;
	}

	gameBoard.draw();
	for (let i = 0; i < blocks.length; i++) {
		//get instead of fillRect good textures
		blocks[i].draw();
	}
	if (!isWin) requestAnimationFrame(animate);
}

//animation on getting level down
function animateWin() {
	if (isWin) {
		canvas && ctx?.clearRect(0, 0, canvas.width, canvas.height);

		gameBoard.draw();
		for (let i = 0; i < blocks.length; i++) {
			blocks[i].draw();
		}
		//finish animation
		if (canvas && blocks[0].x > canvas.width) {
			return;
		}
		blocks[0].draw();
		blocks[0].x++;
		requestAnimationFrame(animateWin);
	}
}

document.addEventListener("onWin", () => {
	if (isWin) {
		removeMouseDownTouchStart();
	}
});

function resetValues() {
	if (canvas) canvas.style.opacity = "1";
	if (levelCleared) levelCleared.style.display = "none";
	if (allLevelsCleared) allLevelsCleared.style.display = "none";
	if (playerMoves) playerMoves.textContent = "0";

	addEvents();
	movesCount = 0;
	isWin = false;
	blocks = getLevels()[currentLvl].blocks;
}

startGameButton?.addEventListener("click", () => {
	startGameButton.disabled = true;
	if (startGameButton.textContent !== "Start again") {
		currentLvl++;
	} else {
		currentLvl = 0;
		startGameButton.textContent = "Next level";
	}
	if (currentLvlElem?.textContent) {
		currentLvlElem.textContent = (currentLvl + 1).toString();
	}
	if (bestMoves) bestMoves.textContent = getLevels()[currentLvl].bestMoves;
	resetValues();

	animate();
});
resetLevelButton?.addEventListener("click", () => {
	if (startGameButton) {
		if (startGameButton.textContent === "Start again") {
			startGameButton.textContent = "Next level";
		}
		startGameButton.disabled = true;
	}
	resetValues();

	if (restartLvl) {
		restartLvl = false;
		animate();
	}
});

//start game function
export function startGame() {
	if (startGameButton) {
		startGameButton.disabled = true;
	}
	if (currentLvlElem) {
		currentLvlElem.textContent = "1";
	}

	//create board
	gameGrid.create(gameBoard);
	if (playerMoves) playerMoves.textContent = movesCount.toString();
	if (bestMoves) bestMoves.textContent = getLevels()[currentLvl].bestMoves;
	if (totalLvlsElem) totalLvlsElem.innerText = maxLevels.toString();
	blocks = getLevels()[currentLvl].blocks;

	//start animations
	animate();
}

startGame();
