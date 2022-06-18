import SecureLS from "../_snowpack/pkg/secure-ls.js";
import "./index.css.proxy.js";
import {cellSize, Direction} from "./constants.js";
import {Board, Block, Mouse, Touch, GameGrid} from "./classes.js";
import {
  isCollision,
  checkBounds,
  checkBlock,
  checkWin,
  offsetX,
  offsetY
} from "./utils.js";
import {getLevels} from "./levels.js";
const ls = new SecureLS({encodingType: "aes"});
const myHTML = '<section id="controls-container"><div id="control-panel"><div id="moves-panel"><div id="moves-text"><p>Your moves:</p><p>Best moves:</p></div><div id="moves-counter"><p></p><p></p></div></div><div id="levels-panel"><div id="levels-text"><p>Level:</p><p>Total:</p></div><div id="levels-counter"><p></p><p></p></div></div><button id="restart-level" class="btn">Restart level</button><button id="next-level" class="btn">Next level</button></div><select id="load-level"><option value="" disabled selected hidden>Load lvl</option></select><!-- Victory Messages --><h3>LEVEL CLEARED</h3><h3>ALL LEVELS CLEARED</h3></section>';
const tempDiv = document.createElement("div");
tempDiv.innerHTML = myHTML;
document.body.append(tempDiv.children[0]);
tempDiv.remove();
const canvas = document.getElementById("game-canvas");
const startGameButton = document.getElementById("next-level");
const restartLevelButton = document.getElementById("restart-level");
const playerMoves = document.querySelector("#moves-counter>p:first-of-type");
const bestMoves = document.querySelector("#moves-counter>p:last-of-type");
const currentLvlElem = document.querySelector("#levels-counter>p:first-of-type");
const totalLvlsElem = document.querySelector("#levels-counter>p:last-of-type");
const levelCleared = document.querySelector("h3:first-of-type");
const allLevelsCleared = document.querySelector("h3:last-of-type");
const loadLevelSelect = document.querySelector("#load-level");
let currentLvl = ls.get("data") || 0;
let currentMaxLvl = currentLvl;
const maxLevels = getLevels().length;
const gameGrid = new GameGrid();
let blocks = [];
const mouse = new Mouse();
const touch = new Touch();
const gameBoard = new Board(offsetX(0), offsetY(0), 6);
let movesCount = 0;
let stopAnimation = true;
if (canvas != null) {
  addEvents();
}
function touchDrag(e) {
  e.preventDefault();
  if (e.targetTouches.length > 1) {
    return;
  }
  const firstTouch = e.targetTouches[0];
  offsetTouch(firstTouch);
  const movingBlockIndex = getBlockIndexByTouch();
  if (movingBlockIndex === -1)
    return;
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
    document.ontouchmove = (e2) => !blocks[movingBlockIndex].vertical ? touchDragX(e2, blocks[movingBlockIndex]) : touchDragY(e2, blocks[movingBlockIndex]);
  }
  function getBlockIndexByTouch() {
    for (let i = 0; i < blocks.length; i++) {
      if (isCollision(blocks[i], touch)) {
        return i;
      }
    }
    return -1;
  }
  function touchDragX(ex, block) {
    let x = block.x;
    const firstTouch2 = ex.targetTouches[0];
    const mouseDeltaX = firstTouch2.pageX - initialTouchX;
    const moveDirectionX = firstTouch2.pageX > previousTouchPosX ? Direction.Right : Direction.Left;
    if (moveDirectionX === Direction.Right && !block.canMove.right) {
      return;
    }
    if (moveDirectionX === Direction.Left && !block.canMove.left) {
      return;
    }
    block.canMove.right = true;
    block.canMove.left = true;
    const movePositionX = initialBlockX + mouseDeltaX;
    const testBlock = new Block(movePositionX, block.y, block.vertical, block.size);
    x = checkBounds(testBlock, gameBoard).x;
    for (let i = 0; i < blocks.length; i++) {
      if (block !== blocks[i] && isCollision(testBlock, blocks[i])) {
        const movement = checkBlock(testBlock, blocks[i]);
        movement.direction === Direction.Right ? block.canMove.right = false : block.canMove.left = false;
        x = movement.x;
      }
    }
    block.x = x;
    previousTouchPosX = firstTouch2.pageX;
  }
  function touchDragY(ey, block) {
    let y = block.y;
    const firstTouch2 = ey.targetTouches[0];
    const mouseDeltaY = firstTouch2.pageY - initialTouchY;
    const moveDirectionY = firstTouch2.pageY > previousTouchPosY ? Direction.Down : Direction.Up;
    if (moveDirectionY === Direction.Up && !block.canMove.up) {
      return;
    }
    if (moveDirectionY === Direction.Down && !block.canMove.down) {
      return;
    }
    block.canMove.up = true;
    block.canMove.down = true;
    const movePositionY = initialBlockY + mouseDeltaY;
    const testBlock = new Block(block.x, movePositionY, block.vertical, block.size);
    y = checkBounds(testBlock, gameBoard).y;
    for (let i = 0; i < blocks.length; i++) {
      if (block !== blocks[i] && isCollision(testBlock, blocks[i])) {
        const movement = checkBlock(testBlock, blocks[i]);
        movement.direction === Direction.Up ? block.canMove.up = false : block.canMove.down = false;
        y = movement.y;
      }
    }
    block.y = y;
    previousTouchPosY = firstTouch2.pageY;
  }
  function stopTouchDrag(block) {
    const moveX = initialBlockX + Math.round((block.x - initialBlockX) / cellSize) * cellSize;
    const moveY = initialBlockY + Math.round((block.y - initialBlockY) / cellSize) * cellSize;
    if (!block.vertical) {
      if (moveX !== initialBlockX) {
        movesCount++;
        if (playerMoves)
          playerMoves.textContent = movesCount.toString();
      }
      block.x = moveX;
    } else {
      if (moveY !== initialBlockY) {
        movesCount++;
        if (playerMoves)
          playerMoves.textContent = movesCount.toString();
      }
      block.y = moveY;
    }
    block.canMove = {right: true, left: true, up: true, down: true};
    document.ontouchmove = null;
    document.ontouchend = null;
  }
}
function mouseDrag(e) {
  e.preventDefault();
  const movingBlockIndex = getBlockIndex();
  if (movingBlockIndex === -1)
    return;
  const initialBlockX = blocks[movingBlockIndex].x;
  const initialBlockY = blocks[movingBlockIndex].y;
  const initialMouseX = e.x;
  const initialMouseY = e.y;
  let previousMousePosX = e.x;
  let previousMousePosY = e.y;
  if (movingBlockIndex >= 0) {
    document.onmouseup = () => stopMouseDrag(blocks[movingBlockIndex]);
    document.onmousemove = (e2) => !blocks[movingBlockIndex].vertical ? mouseDragX(e2, blocks[movingBlockIndex]) : mouseDragY(e2, blocks[movingBlockIndex]);
  }
  function getBlockIndex() {
    for (let i = 0; i < blocks.length; i++) {
      if (isCollision(blocks[i], mouse)) {
        return i;
      }
    }
    return -1;
  }
  function mouseDragX(e2, block) {
    let x = block.x;
    const mouseDeltaX = e2.x - initialMouseX;
    const moveDirectionX = e2.x > previousMousePosX ? Direction.Right : Direction.Left;
    if (moveDirectionX === Direction.Right && !block.canMove.right) {
      return;
    }
    if (moveDirectionX === Direction.Left && !block.canMove.left) {
      return;
    }
    block.canMove.right = true;
    block.canMove.left = true;
    const movePositionX = initialBlockX + mouseDeltaX;
    const testBlock = new Block(movePositionX, block.y, block.vertical, block.size);
    x = checkBounds(testBlock, gameBoard).x;
    for (let i = 0; i < blocks.length; i++) {
      if (block !== blocks[i] && isCollision(testBlock, blocks[i])) {
        const movement = checkBlock(testBlock, blocks[i]);
        movement.direction === Direction.Right ? block.canMove.right = false : block.canMove.left = false;
        x = movement.x;
      }
    }
    block.x = x;
    previousMousePosX = e2.x;
  }
  function mouseDragY(e2, block) {
    let y = block.y;
    const mouseDeltaY = e2.y - initialMouseY;
    const moveDirectionY = e2.y > previousMousePosY ? Direction.Down : Direction.Up;
    if (moveDirectionY === Direction.Up && !block.canMove.up) {
      return;
    }
    if (moveDirectionY === Direction.Down && !block.canMove.down) {
      return;
    }
    block.canMove.up = true;
    block.canMove.down = true;
    const movePositionY = initialBlockY + mouseDeltaY;
    const testBlock = new Block(block.x, movePositionY, block.vertical, block.size);
    y = checkBounds(testBlock, gameBoard).y;
    for (let i = 0; i < blocks.length; i++) {
      if (block !== blocks[i] && isCollision(testBlock, blocks[i])) {
        const movement = checkBlock(testBlock, blocks[i]);
        movement.direction === Direction.Up ? block.canMove.up = false : block.canMove.down = false;
        y = movement.y;
      }
    }
    block.y = y;
    previousMousePosY = e2.y;
  }
  function stopMouseDrag(block) {
    const moveX = initialBlockX + Math.round((block.x - initialBlockX) / cellSize) * cellSize;
    const moveY = initialBlockY + Math.round((block.y - initialBlockY) / cellSize) * cellSize;
    if (!block.vertical) {
      if (moveX !== initialBlockX) {
        movesCount++;
        if (playerMoves)
          playerMoves.textContent = movesCount.toString();
      }
      block.x = moveX;
    } else {
      if (moveY !== initialBlockY) {
        movesCount++;
        if (playerMoves)
          playerMoves.textContent = movesCount.toString();
      }
      block.y = moveY;
    }
    block.canMove = {right: true, left: true, up: true, down: true};
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function drawEssentials() {
  gameBoard.draw();
  gameGrid.draw();
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].draw();
  }
}
function animateWin() {
  drawEssentials();
  if (canvas && blocks[0].x > canvas.width || startGameButton?.disabled) {
    return;
  }
  blocks[0].draw();
  blocks[0].x += 2;
  requestAnimationFrame(animateWin);
}
function animate() {
  if (blocks.length && checkWin(blocks[0], gameBoard)) {
    actionsOnWin();
    return;
  }
  drawEssentials();
  requestAnimationFrame(animate);
}
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
  if (currentLvlElem)
    currentLvlElem.textContent = (currentLvl + 1).toString();
  if (bestMoves)
    bestMoves.textContent = getLevels()[currentLvl].bestMoves;
  resetUIElements();
  animate();
});
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
loadLevelSelect?.addEventListener("change", () => {
  if (startGameButton) {
    if (startGameButton.textContent === "Start again") {
      startGameButton.textContent = "Next level";
    }
    startGameButton.disabled = true;
  }
  currentLvl = loadLevelSelect.selectedIndex - 1;
  if (currentLvlElem)
    currentLvlElem.textContent = (currentLvl + 1).toString();
  loadLevelSelect.selectedIndex = 0;
  if (bestMoves)
    bestMoves.textContent = getLevels()[currentLvl].bestMoves;
  resetUIElements();
  if (stopAnimation) {
    stopAnimation = false;
    animate();
  }
});
export function startGame() {
  if (startGameButton) {
    startGameButton.disabled = true;
  }
  if (currentLvlElem) {
    currentLvlElem.textContent = (currentLvl + 1).toString();
  }
  gameGrid.create(gameBoard);
  if (playerMoves)
    playerMoves.textContent = movesCount.toString();
  if (bestMoves)
    bestMoves.textContent = getLevels()[currentLvl].bestMoves;
  if (totalLvlsElem)
    totalLvlsElem.innerText = maxLevels.toString();
  if (loadLevelSelect)
    blocks = getLevels()[currentLvl].blocks;
  for (let i = 0; i <= currentLvl; i++) {
    addLevelToLoadList(i);
  }
  animate();
}
function addEvents() {
  if (canvas) {
    canvas.addEventListener("mousemove", function(e) {
      const canvasPosition = canvas.getBoundingClientRect();
      mouse.x = e.x - canvasPosition.left;
      mouse.y = e.y - canvasPosition.top;
    });
    canvas.addEventListener("mouseleave", function(e) {
      mouse.x = 0;
      mouse.y = 0;
    });
    canvas.onmousedown = mouseDrag;
    canvas.ontouchstart = touchDrag;
  }
}
function offsetTouch(curTouch) {
  if (canvas) {
    const canvasPosition = canvas.getBoundingClientRect();
    touch.x = curTouch.pageX - canvasPosition.left;
    touch.y = curTouch.pageY - canvasPosition.top;
  }
}
function addLevelToLoadList(curMax) {
  const newOption = document.createElement("option");
  newOption.textContent = "Level " + (curMax + 1).toString();
  loadLevelSelect?.append(newOption);
}
function resetLoadList() {
  if (loadLevelSelect?.lastChild) {
    while (loadLevelSelect.length > 2) {
      loadLevelSelect.removeChild(loadLevelSelect.lastChild);
    }
  }
}
function removeMouseDownTouchStart() {
  if (canvas) {
    canvas.onmousedown = null;
    canvas.ontouchstart = null;
  }
}
function actionsOnWin() {
  stopAnimation = true;
  if (canvas) {
    canvas.style.opacity = "0.3";
  }
  if (startGameButton)
    startGameButton.disabled = false;
  if (currentLvl + 1 === maxLevels) {
    if (allLevelsCleared)
      allLevelsCleared.style.display = "block";
    if (startGameButton)
      startGameButton.textContent = "Start again";
  } else {
    if (levelCleared)
      levelCleared.style.display = "block";
  }
  if (currentLvl + 1 !== maxLevels && currentLvl + 1 > currentMaxLvl) {
    currentMaxLvl = currentLvl + 1;
    ls.set("data", currentLvl + 1);
    addLevelToLoadList(currentLvl + 1);
  }
  const mouseUpEvent = new Event("mouseup");
  document.dispatchEvent(mouseUpEvent);
  const touchEndEvent = new Event("touchend");
  document.dispatchEvent(touchEndEvent);
  removeMouseDownTouchStart();
  animateWin();
}
function resetUIElements() {
  if (canvas)
    canvas.style.opacity = "1";
  if (levelCleared)
    levelCleared.style.display = "none";
  if (allLevelsCleared)
    allLevelsCleared.style.display = "none";
  if (playerMoves)
    playerMoves.textContent = "0";
  addEvents();
  movesCount = 0;
  blocks = getLevels()[currentLvl].blocks;
}
startGame();
