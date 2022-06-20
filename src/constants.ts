const clientW = document.documentElement.clientWidth;

export const canvasSize = clientW > 640 ? 640 : clientW;
export const cellSize = canvasSize / 8;
export const cellGap = canvasSize / 160;
export const borderWidth = canvasSize / 40;
export const boardOffset = { x: canvasSize / 16, y: canvasSize / 16 };

export enum BlockSize {
	Short = 2,
	Long = 3,
}

const debounce = (fn: Function, ms = 200) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

//recreate the game on new window size
window.addEventListener(
	"resize",
	debounce(() => {
		window.location.reload();
	}, 200)
);
