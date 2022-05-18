import {Block, PlayerBlock} from "./classes.js";
import {offsetX, offsetY} from "./utils.js";
import {BlockSize, cellSize} from "./constants.js";
export function getLevels() {
  const levels = [
    {
      bestMoves: "9",
      blocks: [
        new PlayerBlock(offsetX(3 * cellSize)),
        new Block(offsetX(0), offsetY(0), true, BlockSize.Short),
        new Block(offsetX(cellSize), offsetY(0), false, BlockSize.Short),
        new Block(offsetX(3 * cellSize), offsetY(0), true, BlockSize.Short),
        new Block(offsetX(4 * cellSize), offsetY(cellSize), false, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(cellSize), true, BlockSize.Long),
        new Block(offsetX(5 * cellSize), offsetY(2 * cellSize), true, BlockSize.Short),
        new Block(offsetX(0), offsetY(3 * cellSize), false, BlockSize.Short),
        new Block(offsetX(cellSize), offsetY(4 * cellSize), true, BlockSize.Short),
        new Block(offsetX(3 * cellSize), offsetY(3 * cellSize), true, BlockSize.Short),
        new Block(offsetX(4 * cellSize), offsetY(4 * cellSize), false, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(5 * cellSize), false, BlockSize.Short)
      ]
    },
    {
      bestMoves: "9",
      blocks: [
        new PlayerBlock(offsetX(0)),
        new Block(offsetX(cellSize), offsetY(0), true, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(0), false, BlockSize.Long),
        new Block(offsetX(2 * cellSize), offsetY(cellSize), true, BlockSize.Long),
        new Block(offsetX(3 * cellSize), offsetY(2 * cellSize), true, BlockSize.Short),
        new Block(offsetX(0), offsetY(3 * cellSize), false, BlockSize.Short),
        new Block(offsetX(cellSize), offsetY(4 * cellSize), false, BlockSize.Short),
        new Block(offsetX(cellSize), offsetY(5 * cellSize), false, BlockSize.Long),
        new Block(offsetX(4 * cellSize), offsetY(3 * cellSize), true, BlockSize.Short),
        new Block(offsetX(5 * cellSize), offsetY(2 * cellSize), true, BlockSize.Long)
      ]
    },
    {
      bestMoves: "12",
      blocks: [
        new PlayerBlock(offsetX(0)),
        new Block(offsetX(0), offsetY(0), true, BlockSize.Short),
        new Block(offsetX(cellSize), offsetY(0), false, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(cellSize), true, BlockSize.Short),
        new Block(offsetX(3 * cellSize), offsetY(cellSize), false, BlockSize.Long),
        new Block(offsetX(4 * cellSize), offsetY(2 * cellSize), true, BlockSize.Short),
        new Block(offsetX(5 * cellSize), offsetY(2 * cellSize), true, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(3 * cellSize), false, BlockSize.Short),
        new Block(offsetX(cellSize), offsetY(3 * cellSize), true, BlockSize.Short),
        new Block(offsetX(0), offsetY(5 * cellSize), false, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(4 * cellSize), false, BlockSize.Long),
        new Block(offsetX(5 * cellSize), offsetY(4 * cellSize), true, BlockSize.Short)
      ]
    },
    {
      bestMoves: "13",
      blocks: [
        new PlayerBlock(offsetX(3 * cellSize)),
        new Block(offsetX(0), offsetY(3 * cellSize), true, BlockSize.Short),
        new Block(offsetX(cellSize), offsetY(cellSize), true, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(cellSize), true, BlockSize.Long),
        new Block(offsetX(cellSize), offsetY(4 * cellSize), false, BlockSize.Short),
        new Block(offsetX(cellSize), offsetY(5 * cellSize), false, BlockSize.Short),
        new Block(offsetX(3 * cellSize), offsetY(3 * cellSize), true, BlockSize.Long),
        new Block(offsetX(4 * cellSize), offsetY(3 * cellSize), false, BlockSize.Short),
        new Block(offsetX(5 * cellSize), offsetY(0), true, BlockSize.Long)
      ]
    },
    {
      bestMoves: "15",
      blocks: [
        new PlayerBlock(offsetX(cellSize)),
        new Block(offsetX(0), offsetY(0), false, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(0), true, BlockSize.Short),
        new Block(offsetX(3 * cellSize), offsetY(0), false, BlockSize.Short),
        new Block(offsetX(0), offsetY(cellSize), true, BlockSize.Long),
        new Block(offsetX(3 * cellSize), offsetY(cellSize), true, BlockSize.Long),
        new Block(offsetX(5 * cellSize), offsetY(cellSize), true, BlockSize.Short),
        new Block(offsetX(cellSize), offsetY(3 * cellSize), true, BlockSize.Long),
        new Block(offsetX(2 * cellSize), offsetY(4 * cellSize), false, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(5 * cellSize), false, BlockSize.Short),
        new Block(offsetX(4 * cellSize), offsetY(4 * cellSize), true, BlockSize.Short),
        new Block(offsetX(4 * cellSize), offsetY(3 * cellSize), false, BlockSize.Short)
      ]
    },
    {
      bestMoves: "16",
      blocks: [
        new PlayerBlock(offsetX(0)),
        new Block(offsetX(0), offsetY(0), true, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(0), false, BlockSize.Short),
        new Block(offsetX(4 * cellSize), offsetY(0), false, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(cellSize), true, BlockSize.Short),
        new Block(offsetX(3 * cellSize), offsetY(cellSize), true, BlockSize.Short),
        new Block(offsetX(5 * cellSize), offsetY(cellSize), true, BlockSize.Long),
        new Block(offsetX(2 * cellSize), offsetY(3 * cellSize), false, BlockSize.Long),
        new Block(offsetX(3 * cellSize), offsetY(4 * cellSize), true, BlockSize.Short),
        new Block(offsetX(4 * cellSize), offsetY(4 * cellSize), false, BlockSize.Short)
      ]
    },
    {
      bestMoves: "20",
      blocks: [
        new PlayerBlock(offsetX(2 * cellSize)),
        new Block(offsetX(cellSize), offsetY(0), true, BlockSize.Long),
        new Block(offsetX(2 * cellSize), offsetY(0), false, BlockSize.Short),
        new Block(offsetX(4 * cellSize), offsetY(0), false, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(cellSize), false, BlockSize.Short),
        new Block(offsetX(cellSize), offsetY(3 * cellSize), false, BlockSize.Short),
        new Block(offsetX(4 * cellSize), offsetY(cellSize), true, BlockSize.Long),
        new Block(offsetX(3 * cellSize), offsetY(3 * cellSize), true, BlockSize.Short),
        new Block(offsetX(4 * cellSize), offsetY(4 * cellSize), false, BlockSize.Short),
        new Block(offsetX(3 * cellSize), offsetY(5 * cellSize), false, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(4 * cellSize), true, BlockSize.Short),
        new Block(offsetX(0), offsetY(3 * cellSize), true, BlockSize.Long)
      ]
    },
    {
      bestMoves: "19",
      blocks: [
        new PlayerBlock(offsetX(0)),
        new Block(offsetX(0), offsetY(0), true, BlockSize.Short),
        new Block(offsetX(cellSize), offsetY(0), false, BlockSize.Short),
        new Block(offsetX(3 * cellSize), offsetY(0), true, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(2 * cellSize), true, BlockSize.Long),
        new Block(offsetX(3 * cellSize), offsetY(2 * cellSize), true, BlockSize.Short),
        new Block(offsetX(0), offsetY(3 * cellSize), false, BlockSize.Short),
        new Block(offsetX(4 * cellSize), offsetY(3 * cellSize), false, BlockSize.Short),
        new Block(offsetX(0), offsetY(4 * cellSize), true, BlockSize.Short),
        new Block(offsetX(cellSize), offsetY(5 * cellSize), false, BlockSize.Long),
        new Block(offsetX(5 * cellSize), offsetY(4 * cellSize), true, BlockSize.Short)
      ]
    },
    {
      bestMoves: "18",
      blocks: [
        new PlayerBlock(offsetX(0)),
        new Block(offsetX(0), offsetY(0), true, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(0), false, BlockSize.Long),
        new Block(offsetX(cellSize), offsetY(cellSize), false, BlockSize.Long),
        new Block(offsetX(4 * cellSize), offsetY(cellSize), true, BlockSize.Short),
        new Block(offsetX(2 * cellSize), offsetY(2 * cellSize), true, BlockSize.Short),
        new Block(offsetX(5 * cellSize), offsetY(2 * cellSize), true, BlockSize.Long),
        new Block(offsetX(3 * cellSize), offsetY(3 * cellSize), false, BlockSize.Short),
        new Block(offsetX(0), offsetY(4 * cellSize), false, BlockSize.Long),
        new Block(offsetX(0), offsetY(5 * cellSize), false, BlockSize.Short),
        new Block(offsetX(4 * cellSize), offsetY(5 * cellSize), false, BlockSize.Short),
        new Block(offsetX(3 * cellSize), offsetY(4 * cellSize), true, BlockSize.Short)
      ]
    }
  ];
  return levels;
}
