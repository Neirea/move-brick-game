const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;

export const canvasSize = canvas.width > 640 ? 640 : canvas.width;
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
