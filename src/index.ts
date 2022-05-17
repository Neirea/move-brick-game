import "./index.css";
import { cellSize, Direction, canvasSize } from "./constants";
import { Board, Block, Mouse, Touch, GameGrid } from "./classes";
import {
	isCollision,
	checkBounds,
	checkBlock,
	checkWin,
	offsetX,
	offsetY,
	encode,
	decode,
} from "./utils";
import { getLevels } from "./levels";

// query selectors
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement | null;
const ctx = canvas?.getContext("2d");
const startGameButton = document.getElementById(
	"nextLevel"
) as HTMLButtonElement | null;
const restartLevelButton = document.getElementById(
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
const loadLevelSelect = document.querySelector(
	"#loadLevel"
) as HTMLSelectElement | null;

const getLvl = localStorage.getItem("game");
let currentLvl = getLvl !== null ? parseInt(decode(getLvl)) : 0;
let currentMaxLvl = currentLvl;
const maxLevels = getLevels().length;

//global vars
const gameGrid = new GameGrid();
let blocks: Block[] = [];
const mouse: Mouse = new Mouse();
const touch: Touch = new Touch();
const gameBoard = new Board(offsetX(0), offsetY(0), 6);
let movesCount = 0;
let stopAnimation = true;

//global settings
if (canvas != null) {
	canvas.width = canvasSize;
	canvas.height = canvasSize;
	addEvents();
}

//dragging blocks with touch
function touchDrag(e: TouchEvent) {
	e.preventDefault();
	/* touch part */
	if (e.targetTouches.length > 1) {
		return;
	}
	const firstTouch = e.targetTouches[0];
	offsetTouch(firstTouch);
	/* ---------- */
	const movingBlockIndex = getBlockIndexByTouch();
	if (movingBlockIndex === -1) return;
	const initialBlockX = blocks[movingBlockIndex].x;
	const initialBlockY = blocks[movingBlockIndex].y;
	const initialTouchX = firstTouch.pageX;
	const initialTouchY = firstTouch.pageY;
	let previousTouchPosX = firstTouch.pageX;
	let previousTouchPosY = firstTouch.pageY;

	if (movingBlockIndex >= 0) {
		document.ontouchend = () => {
			stopTouchDrag(blocks[movingBlockIndex]);
		};
		document.ontouchcancel = () => {
			stopTouchDrag(blocks[movingBlockIndex]);
		};
		document.ontouchmove = (e) =>
			!blocks[movingBlockIndex].vertical
				? touchDragX(e, blocks[movingBlockIndex])
				: touchDragY(e, blocks[movingBlockIndex]);
	}
	//get block index
	function getBlockIndexByTouch(): number {
		for (let i = 0; i < blocks.length; i++) {
			if (isCollision(blocks[i], touch)) {
				return i;
			}
		}
		return -1;
	}
	function touchDragX(ex: TouchEvent, block: Block) {
		let x = block.x;
		/* touch part */
		const firstTouch = ex.targetTouches[0];
		/* ---------- */

		//horizontal
		const mouseDeltaX = firstTouch.pageX - initialTouchX;

		const moveDirectionX =
			firstTouch.pageX > previousTouchPosX ? Direction.Right : Direction.Left;
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
		previousTouchPosX = firstTouch.pageX;
	}
	function touchDragY(ey: TouchEvent, block: Block) {
		let y = block.y;
		/* touch part */
		const firstTouch = ey.targetTouches[0];
		/* ---------- */
		const mouseDeltaY = firstTouch.pageY - initialTouchY;
		const moveDirectionY =
			firstTouch.pageY > previousTouchPosY ? Direction.Down : Direction.Up;
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
		previousTouchPosY = firstTouch.pageY;
	}
	function stopTouchDrag(block: Block) {
		//calculate final position and round up to final cell
		const moveX =
			initialBlockX +
			Math.round((block.x - initialBlockX) / cellSize) * cellSize;
		const moveY =
			initialBlockY +
			Math.round((block.y - initialBlockY) / cellSize) * cellSize;

		if (!block.vertical) {
			if (moveX !== initialBlockX) {
				movesCount++;
				if (playerMoves) playerMoves.textContent = movesCount.toString();
			}
			block.x = moveX;
		} else {
			if (moveY !== initialBlockY) {
				movesCount++;
				if (playerMoves) playerMoves.textContent = movesCount.toString();
			}
			block.y = moveY;
		}
		block.canMove = { right: true, left: true, up: true, down: true };

		document.ontouchmove = null;
		document.ontouchend = null;
	}
}
//dragging blocks with mouse
function mouseDrag(e: MouseEvent) {
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
		document.onmouseup = () => stopMouseDrag(blocks[movingBlockIndex]);
		document.onmousemove = (e) =>
			!blocks[movingBlockIndex].vertical
				? mouseDragX(e, blocks[movingBlockIndex])
				: mouseDragY(e, blocks[movingBlockIndex]);
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
	function mouseDragX(e: MouseEvent, block: Block) {
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
	function mouseDragY(e: MouseEvent, block: Block) {
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
	function stopMouseDrag(block: Block) {
		//calculate final position and round up to final cell
		const moveX =
			initialBlockX +
			Math.round((block.x - initialBlockX) / cellSize) * cellSize;
		const moveY =
			initialBlockY +
			Math.round((block.y - initialBlockY) / cellSize) * cellSize;

		if (!block.vertical) {
			if (moveX !== initialBlockX) {
				movesCount++;
				if (playerMoves) playerMoves.textContent = movesCount.toString();
			}
			block.x = moveX;
		} else {
			if (moveY !== initialBlockY) {
				movesCount++;
				if (playerMoves) playerMoves.textContent = movesCount.toString();
			}
			block.y = moveY;
		}
		block.canMove = { right: true, left: true, up: true, down: true };

		document.onmouseup = null;
		document.onmousemove = null;
	}
}

/* ANIMATION FUNCTIONS */
//draw essential blocks
function drawEssentials() {
	canvas && ctx?.clearRect(0, 0, canvas.width, canvas.height);
	gameBoard.draw();
	gameGrid.draw();
	for (let i = 0; i < blocks.length; i++) {
		//get instead of fillRect good textures
		blocks[i].draw();
	}
}
//animation on getting level down
function animateWin() {
	drawEssentials();
	//finish animation when block is outside of screen or new game starts
	if ((canvas && blocks[0].x > canvas.width) || startGameButton?.disabled) {
		return;
	}
	blocks[0].draw();
	blocks[0].x += 2;
	requestAnimationFrame(animateWin);
}
//main animate function
function animate() {
	//on win
	if (blocks.length && checkWin(blocks[0], gameBoard)) {
		actionsOnWin();
		return;
	}
	drawEssentials();
	requestAnimationFrame(animate);
}

/* EVENT LISTENERS */
//next level/start again
startGameButton?.addEventListener("click", () => {
	startGameButton.disabled = true;
	if (startGameButton.textContent === "Start again") {
		startGameButton.textContent = "Next level";
		currentLvl = 0;
		currentMaxLvl = 0;
		localStorage.removeItem("game");
		resetLoadList();
	} else {
		currentLvl++;
	}
	if (currentLvlElem) currentLvlElem.textContent = (currentLvl + 1).toString();
	if (bestMoves) bestMoves.textContent = getLevels()[currentLvl].bestMoves;
	resetUIElements();

	animate();
});
//restart level
restartLevelButton?.addEventListener("click", () => {
	if (startGameButton) {
		if (startGameButton.textContent === "Start again") {
			startGameButton.textContent = "Next level";
		}
		startGameButton.disabled = true;
	}

	resetUIElements();

	if (stopAnimation) {
		stopAnimation = false;
		animate();
	}
});
//select level
loadLevelSelect?.addEventListener("change", () => {
	if (startGameButton) {
		if (startGameButton.textContent === "Start again") {
			startGameButton.textContent = "Next level";
		}
		startGameButton.disabled = true;
	}

	currentLvl = loadLevelSelect.selectedIndex - 1;
	if (currentLvlElem) currentLvlElem.textContent = (currentLvl + 1).toString();
	loadLevelSelect.selectedIndex = 0;

	resetUIElements();

	if (stopAnimation) {
		stopAnimation = false;
		animate();
	}
});

/* START GAME FUNCTION */
export function startGame() {
	if (startGameButton) {
		startGameButton.disabled = true;
	}
	if (currentLvlElem) {
		currentLvlElem.textContent = (currentLvl + 1).toString();
	}

	//create board
	gameGrid.create(gameBoard);
	if (playerMoves) playerMoves.textContent = movesCount.toString();
	if (bestMoves) bestMoves.textContent = getLevels()[currentLvl].bestMoves;
	if (totalLvlsElem) totalLvlsElem.innerText = maxLevels.toString();
	if (loadLevelSelect) blocks = getLevels()[currentLvl].blocks;
	for (let i = 0; i <= currentLvl; i++) {
		addLevelToLoadList(i);
	}

	//start animations
	animate();
}

/* HELPER FUNCTIONS */
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
		canvas.onmousedown = mouseDrag;
		canvas.ontouchstart = touchDrag;
	}
}
function offsetTouch(curTouch: globalThis.Touch) {
	if (canvas) {
		const canvasPosition = canvas.getBoundingClientRect();
		touch.x = curTouch.pageX - canvasPosition.left;
		touch.y = curTouch.pageY - canvasPosition.top;
	}
}
//Load one more level on win
function addLevelToLoadList(curMax: number) {
	const newOption = document.createElement("option");
	newOption.textContent = "Level " + (curMax + 1).toString();
	loadLevelSelect?.append(newOption);
}
//Delete all except "Level 1" and hidden on "Start again"
function resetLoadList() {
	if (loadLevelSelect?.lastChild) {
		while (loadLevelSelect.length > 2) {
			loadLevelSelect.removeChild(loadLevelSelect.lastChild);
		}
	}
}
//disable events
function removeMouseDownTouchStart() {
	if (canvas) {
		canvas.onmousedown = null;
		canvas.ontouchstart = null;
	}
}
//bunch of actions when player wins
function actionsOnWin() {
	//used to start new animation after win
	stopAnimation = true;
	//some styling
	if (canvas) {
		canvas.style.opacity = "0.3";
	}
	if (startGameButton) startGameButton.disabled = false;
	//check for last level
	if (currentLvl + 1 === maxLevels) {
		if (allLevelsCleared) allLevelsCleared.style.display = "block";
		if (startGameButton) startGameButton.textContent = "Start again";
	} else {
		if (levelCleared) levelCleared.style.display = "block";
	}
	//save progress
	if (currentLvl + 1 !== maxLevels && currentLvl + 1 > currentMaxLvl) {
		currentMaxLvl = currentLvl + 1;
		localStorage.setItem("game", encode((currentLvl + 1).toString()));
		addLevelToLoadList(currentLvl + 1);
	}
	//simulating mouseup/touchend events
	const mouseUpEvent = new Event("mouseup");
	document.dispatchEvent(mouseUpEvent);
	const touchEndEvent = new Event("touchend");
	document.dispatchEvent(touchEndEvent);
	//remove mouse controls
	removeMouseDownTouchStart();
	animateWin();
}
//reset UI
function resetUIElements() {
	if (canvas) canvas.style.opacity = "1";
	if (levelCleared) levelCleared.style.display = "none";
	if (allLevelsCleared) allLevelsCleared.style.display = "none";
	if (playerMoves) playerMoves.textContent = "0";

	addEvents();
	movesCount = 0;
	blocks = getLevels()[currentLvl].blocks;
}

//LAUNCH GAME
startGame();
