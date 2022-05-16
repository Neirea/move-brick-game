import { Block, PlayerBlock } from "./classes";
import { offsetX, offsetY } from "./utils";
import { BlockSize, cellSize } from "./constants";

export function getLevels() {
	const levels = [
		{
			bestMoves: "2",
			blocks: [
				new PlayerBlock(offsetX(0)),
				new Block(
					offsetX(5 * cellSize),
					offsetY(2 * cellSize),
					true,
					BlockSize.Long
				),
			],
		},
		{
			bestMoves: "2",
			blocks: [
				new PlayerBlock(offsetX(0)),
				new Block(
					offsetX(3 * cellSize),
					offsetY(2 * cellSize),
					true,
					BlockSize.Long
				),
			],
		},
	];

	return levels;
}
