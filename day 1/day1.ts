import { readFileSync } from "node:fs";

const dialStart = 50;
let safeSeq = "";

try {
	const filePath = "day 1/safe_sequence.txt";
	const fileContent: string = readFileSync(filePath, "utf8");
	safeSeq = fileContent;
} catch (error) {
	console.error("Error reading file:", error);
}
function extractMove(input: string): {
	move: string | null;
	distance: number;
} {
	const regex = /^([a-zA-Z]+)(\d+)/;

	const matchResult = input.match(regex);

	if (matchResult) {
		const move = matchResult[1];
		const distance = parseInt(matchResult[2], 10);

		return { move, distance };
	} else {
		return { move: null, distance: 0 };
	}
}
function incrementNumber(
	start: number,
	move: string | null,
	distance: number,
): { dialNumber: number; numberOfZeroes: number } {
	if (distance === 0) {
		return { dialNumber: start, numberOfZeroes: 1 };
	}
	let dialNumber = start;
	let numberOfZeroes = 0;
	for (let i = distance; i > 0; i--) {
		if (move === "L") {
			if (dialNumber === 0) {
				dialNumber = 99;
			} else {
				dialNumber--;
			}
		}
		if (move === "R") {
			if (dialNumber === 99) {
				dialNumber = 0;
			} else {
				dialNumber++;
			}
		}
		if (dialNumber === 0) {
			numberOfZeroes++;
		}
	}
	return { dialNumber, numberOfZeroes };
}

(function coutZeros() {
	const moves = safeSeq.split("\n").reduce(
		([lastNumber, pointedAtZeros], line) => {
			const { move, distance } = extractMove(line);
			const { dialNumber, numberOfZeroes } = incrementNumber(
				lastNumber,
				move,
				distance,
			);
			return [dialNumber, pointedAtZeros + numberOfZeroes];
		},
		[dialStart, 0],
	);
	console.log("result: ", moves);
})();
