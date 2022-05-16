let clientW = document.documentElement.clientWidth;
let clientH = document.documentElement.clientHeight;

export let canvasSize = clientW > clientH ? 800 : clientW;
export const cellSize = canvasSize / 8;
export const cellGap = canvasSize / 160;
export const borderWidth = canvasSize / 40;
export const boardOffset = { x: canvasSize / 16, y: canvasSize / 16 };

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
