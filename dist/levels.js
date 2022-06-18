import {Block, PlayerBlock} from "./classes.js";
import {offsetX, offsetY} from "./utils.js";
import {BlockSize, cellSize} from "./constants.js";
const setX = (x) => offsetX(x * cellSize);
const setY = (y) => offsetY(y * cellSize);
export function getLevels() {
  const levels = [
    {
      bestMoves: "9",
      blocks: [
        new PlayerBlock(setX(3)),
        new Block(setX(0), setY(0), true, BlockSize.Short),
        new Block(setX(1), setY(0), false, BlockSize.Short),
        new Block(setX(3), setY(0), true, BlockSize.Short),
        new Block(setX(4), setY(1), false, BlockSize.Short),
        new Block(setX(2), setY(1), true, BlockSize.Long),
        new Block(setX(5), setY(2), true, BlockSize.Short),
        new Block(setX(0), setY(3), false, BlockSize.Short),
        new Block(setX(1), setY(4), true, BlockSize.Short),
        new Block(setX(3), setY(3), true, BlockSize.Short),
        new Block(setX(4), setY(4), false, BlockSize.Short),
        new Block(setX(2), setY(5), false, BlockSize.Short)
      ]
    },
    {
      bestMoves: "9",
      blocks: [
        new PlayerBlock(setX(0)),
        new Block(setX(1), setY(0), true, BlockSize.Short),
        new Block(setX(2), setY(0), false, BlockSize.Long),
        new Block(setX(2), setY(1), true, BlockSize.Long),
        new Block(setX(3), setY(2), true, BlockSize.Short),
        new Block(setX(0), setY(3), false, BlockSize.Short),
        new Block(setX(1), setY(4), false, BlockSize.Short),
        new Block(setX(1), setY(5), false, BlockSize.Long),
        new Block(setX(4), setY(3), true, BlockSize.Short),
        new Block(setX(5), setY(2), true, BlockSize.Long)
      ]
    },
    {
      bestMoves: "12",
      blocks: [
        new PlayerBlock(setX(0)),
        new Block(setX(0), setY(0), true, BlockSize.Short),
        new Block(setX(1), setY(0), false, BlockSize.Short),
        new Block(setX(2), setY(1), true, BlockSize.Short),
        new Block(setX(3), setY(1), false, BlockSize.Long),
        new Block(setX(4), setY(2), true, BlockSize.Short),
        new Block(setX(5), setY(2), true, BlockSize.Short),
        new Block(setX(2), setY(3), false, BlockSize.Short),
        new Block(setX(1), setY(3), true, BlockSize.Short),
        new Block(setX(0), setY(5), false, BlockSize.Short),
        new Block(setX(2), setY(4), false, BlockSize.Long),
        new Block(setX(5), setY(4), true, BlockSize.Short)
      ]
    },
    {
      bestMoves: "13",
      blocks: [
        new PlayerBlock(setX(3)),
        new Block(setX(0), setY(3), true, BlockSize.Short),
        new Block(setX(1), setY(1), true, BlockSize.Short),
        new Block(setX(2), setY(1), true, BlockSize.Long),
        new Block(setX(1), setY(4), false, BlockSize.Short),
        new Block(setX(1), setY(5), false, BlockSize.Short),
        new Block(setX(3), setY(3), true, BlockSize.Long),
        new Block(setX(4), setY(3), false, BlockSize.Short),
        new Block(setX(5), setY(0), true, BlockSize.Long)
      ]
    },
    {
      bestMoves: "15",
      blocks: [
        new PlayerBlock(setX(1)),
        new Block(setX(0), setY(0), false, BlockSize.Short),
        new Block(setX(2), setY(0), true, BlockSize.Short),
        new Block(setX(3), setY(0), false, BlockSize.Short),
        new Block(setX(0), setY(1), true, BlockSize.Long),
        new Block(setX(3), setY(1), true, BlockSize.Long),
        new Block(setX(5), setY(1), true, BlockSize.Short),
        new Block(setX(1), setY(3), true, BlockSize.Long),
        new Block(setX(2), setY(4), false, BlockSize.Short),
        new Block(setX(2), setY(5), false, BlockSize.Short),
        new Block(setX(4), setY(4), true, BlockSize.Short),
        new Block(setX(4), setY(3), false, BlockSize.Short)
      ]
    },
    {
      bestMoves: "16",
      blocks: [
        new PlayerBlock(setX(0)),
        new Block(setX(0), setY(0), true, BlockSize.Short),
        new Block(setX(2), setY(0), false, BlockSize.Short),
        new Block(setX(4), setY(0), false, BlockSize.Short),
        new Block(setX(2), setY(1), true, BlockSize.Short),
        new Block(setX(3), setY(1), true, BlockSize.Short),
        new Block(setX(5), setY(1), true, BlockSize.Long),
        new Block(setX(2), setY(3), false, BlockSize.Long),
        new Block(setX(3), setY(4), true, BlockSize.Short),
        new Block(setX(4), setY(4), false, BlockSize.Short)
      ]
    },
    {
      bestMoves: "20",
      blocks: [
        new PlayerBlock(setX(2)),
        new Block(setX(1), setY(0), true, BlockSize.Long),
        new Block(setX(2), setY(0), false, BlockSize.Short),
        new Block(setX(4), setY(0), false, BlockSize.Short),
        new Block(setX(2), setY(1), false, BlockSize.Short),
        new Block(setX(1), setY(3), false, BlockSize.Short),
        new Block(setX(4), setY(1), true, BlockSize.Long),
        new Block(setX(3), setY(3), true, BlockSize.Short),
        new Block(setX(4), setY(4), false, BlockSize.Short),
        new Block(setX(3), setY(5), false, BlockSize.Short),
        new Block(setX(2), setY(4), true, BlockSize.Short),
        new Block(setX(0), setY(3), true, BlockSize.Long)
      ]
    },
    {
      bestMoves: "19",
      blocks: [
        new PlayerBlock(setX(0)),
        new Block(setX(0), setY(0), true, BlockSize.Short),
        new Block(setX(1), setY(0), false, BlockSize.Short),
        new Block(setX(3), setY(0), true, BlockSize.Short),
        new Block(setX(2), setY(2), true, BlockSize.Long),
        new Block(setX(3), setY(2), true, BlockSize.Short),
        new Block(setX(0), setY(3), false, BlockSize.Short),
        new Block(setX(4), setY(3), false, BlockSize.Short),
        new Block(setX(0), setY(4), true, BlockSize.Short),
        new Block(setX(1), setY(5), false, BlockSize.Long),
        new Block(setX(5), setY(4), true, BlockSize.Short)
      ]
    },
    {
      bestMoves: "18",
      blocks: [
        new PlayerBlock(setX(0)),
        new Block(setX(0), setY(0), true, BlockSize.Short),
        new Block(setX(2), setY(0), false, BlockSize.Long),
        new Block(setX(1), setY(1), false, BlockSize.Long),
        new Block(setX(4), setY(1), true, BlockSize.Short),
        new Block(setX(2), setY(2), true, BlockSize.Short),
        new Block(setX(5), setY(2), true, BlockSize.Long),
        new Block(setX(3), setY(3), false, BlockSize.Short),
        new Block(setX(0), setY(4), false, BlockSize.Long),
        new Block(setX(0), setY(5), false, BlockSize.Short),
        new Block(setX(4), setY(5), false, BlockSize.Short),
        new Block(setX(3), setY(4), true, BlockSize.Short)
      ]
    },
    {
      bestMoves: "19",
      blocks: [
        new PlayerBlock(setX(0)),
        new Block(setX(0), setY(0), true, BlockSize.Short),
        new Block(setX(1), setY(0), true, BlockSize.Short),
        new Block(setX(3), setY(0), false, BlockSize.Short),
        new Block(setX(2), setY(1), true, BlockSize.Long),
        new Block(setX(3), setY(1), true, BlockSize.Short),
        new Block(setX(4), setY(1), true, BlockSize.Short),
        new Block(setX(0), setY(3), true, BlockSize.Short),
        new Block(setX(1), setY(4), false, BlockSize.Long),
        new Block(setX(2), setY(5), false, BlockSize.Long),
        new Block(setX(5), setY(3), true, BlockSize.Long)
      ]
    },
    {
      bestMoves: "22",
      blocks: [
        new PlayerBlock(setX(2)),
        new Block(setX(1), setY(0), false, BlockSize.Short),
        new Block(setX(3), setY(0), true, BlockSize.Short),
        new Block(setX(4), setY(0), false, BlockSize.Short),
        new Block(setX(0), setY(1), false, BlockSize.Long),
        new Block(setX(5), setY(1), true, BlockSize.Short),
        new Block(setX(4), setY(2), true, BlockSize.Short),
        new Block(setX(0), setY(3), true, BlockSize.Short),
        new Block(setX(1), setY(3), false, BlockSize.Short),
        new Block(setX(2), setY(4), true, BlockSize.Short),
        new Block(setX(3), setY(4), false, BlockSize.Long),
        new Block(setX(0), setY(5), false, BlockSize.Short)
      ]
    },
    {
      bestMoves: "26",
      blocks: [
        new PlayerBlock(setX(0)),
        new Block(setX(1), setY(0), false, BlockSize.Long),
        new Block(setX(2), setY(1), false, BlockSize.Short),
        new Block(setX(4), setY(1), true, BlockSize.Short),
        new Block(setX(5), setY(1), true, BlockSize.Short),
        new Block(setX(2), setY(2), true, BlockSize.Short),
        new Block(setX(3), setY(2), true, BlockSize.Short),
        new Block(setX(0), setY(3), true, BlockSize.Short),
        new Block(setX(4), setY(3), false, BlockSize.Short),
        new Block(setX(1), setY(4), false, BlockSize.Short),
        new Block(setX(3), setY(4), true, BlockSize.Short),
        new Block(setX(4), setY(4), false, BlockSize.Short)
      ]
    },
    {
      bestMoves: "23",
      blocks: [
        new PlayerBlock(setX(1)),
        new Block(setX(4), setY(0), false, BlockSize.Short),
        new Block(setX(0), setY(1), false, BlockSize.Short),
        new Block(setX(2), setY(1), false, BlockSize.Short),
        new Block(setX(4), setY(1), true, BlockSize.Long),
        new Block(setX(0), setY(2), true, BlockSize.Short),
        new Block(setX(3), setY(2), true, BlockSize.Short),
        new Block(setX(1), setY(3), false, BlockSize.Short),
        new Block(setX(2), setY(4), true, BlockSize.Short),
        new Block(setX(3), setY(4), false, BlockSize.Short),
        new Block(setX(5), setY(4), true, BlockSize.Short),
        new Block(setX(0), setY(5), false, BlockSize.Short)
      ]
    },
    {
      bestMoves: "22",
      blocks: [
        new PlayerBlock(setX(2)),
        new Block(setX(1), setY(0), false, BlockSize.Short),
        new Block(setX(4), setY(0), true, BlockSize.Long),
        new Block(setX(0), setY(1), true, BlockSize.Short),
        new Block(setX(1), setY(1), true, BlockSize.Long),
        new Block(setX(0), setY(3), true, BlockSize.Long),
        new Block(setX(2), setY(3), true, BlockSize.Short),
        new Block(setX(3), setY(3), false, BlockSize.Short),
        new Block(setX(5), setY(3), true, BlockSize.Short),
        new Block(setX(3), setY(4), true, BlockSize.Short),
        new Block(setX(1), setY(5), false, BlockSize.Short),
        new Block(setX(4), setY(5), false, BlockSize.Short)
      ]
    },
    {
      bestMoves: "26",
      blocks: [
        new PlayerBlock(setX(0)),
        new Block(setX(0), setY(0), false, BlockSize.Short),
        new Block(setX(2), setY(0), false, BlockSize.Short),
        new Block(setX(2), setY(1), true, BlockSize.Short),
        new Block(setX(4), setY(1), true, BlockSize.Short),
        new Block(setX(5), setY(1), true, BlockSize.Long),
        new Block(setX(0), setY(3), true, BlockSize.Long),
        new Block(setX(2), setY(3), false, BlockSize.Long),
        new Block(setX(3), setY(4), true, BlockSize.Short),
        new Block(setX(4), setY(4), false, BlockSize.Short),
        new Block(setX(1), setY(5), false, BlockSize.Short),
        new Block(setX(4), setY(5), false, BlockSize.Short)
      ]
    }
  ];
  return levels;
}
