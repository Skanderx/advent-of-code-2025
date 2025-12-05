import { readFileSync } from "node:fs";

let paperRolls = "";

try {
	const filePath = "day 4/paper_rolls.txt";
	const fileContent: string = readFileSync(filePath, "utf8");
	paperRolls = fileContent;
} catch (error) {
	console.error("Error reading file:", error);
}

function countAdjPapers(
	paperGrid: Array<string[]>,
	x: number,
	y: number,
): number {
	const len = paperGrid.length;
	const adjPapers = [
		// top
		y > 0 && x > 0 && paperGrid[y - 1][x - 1] === "@",
		y > 0 && paperGrid[y - 1][x] === "@",
		y > 0 && x < len - 1 && paperGrid[y - 1][x + 1] === "@",

		// middle
		x > 0 && paperGrid[y][x - 1] === "@",
		// paperGrid[y][x] === "@", not counted
		x < len - 1 && paperGrid[y][x + 1] === "@",

		// bot
		y < len - 1 && x > 0 && paperGrid[y + 1][x - 1] === "@",
		y < len - 1 && paperGrid[y + 1][x] === "@",
		y < len - 1 && x < len - 1 && paperGrid[y + 1][x + 1] === "@",
	];
	const count = adjPapers.reduce(
		(count, isPaper) => (isPaper ? count + 1 : count),
		0,
	);
	return count;
}

function isPaperAccessible(
	paperGrid: Array<string[]>,
	x: number,
	y: number,
): boolean {
	if (paperGrid[y][x] === "@") {
		return countAdjPapers(paperGrid, x, y) < 4;
	}
	return false;
}
function removeAccessiblePapers(
	paperGrid: Array<string[]>,
): [number, Array<string[]>] {
	let removed = 0;
	const gridAfterRemoval = Array.from({ length: paperGrid.length }, () =>
		Array(paperGrid.length).fill("."),
	);

	for (let y = 0; y < paperGrid.length; y++) {
		for (let x = 0; x < paperGrid[y].length; x++) {
			if (isPaperAccessible(paperGrid, x, y)) {
				removed++;
			} else {
				gridAfterRemoval[y][x] = paperGrid[y][x];
			}
		}
	}
	return [removed, gridAfterRemoval];
}

(function findAccessablePapers() {
	const paperGrid = paperRolls.split("\n").map((line) => line.split(""));
	let result = 0;
	let [removed, newGrid] = removeAccessiblePapers(paperGrid);
	while (removed > 0) {
		result += removed;
		[removed, newGrid] = removeAccessiblePapers(newGrid);
	}
	console.log(
		`there are ${result} rolls of paper that can be accessed by a forklift`,
	);
})();
