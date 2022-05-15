// const canvas = document.getElementById("myCanvas") as HTMLCanvasElement | null;
// const ctx = canvas?.getContext("2d");

//use commented stuff for dymanic sizing?

export const cellSize = 100;
export const cellGap = 5;
export const borderWidth = 20;
export const boardOffset = { x: 50, y: 50 };

export enum BlockSize {
	Short = 2,
	Long = 3,
}
export enum Direction {
	Up,
	Down,
	Right,
	Left,
}
