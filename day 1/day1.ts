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
function incrementNumber(start: number, move: string | null, distance: number) {
	if (distance === 0) {
		return start;
	}
	if (move === "L") {
		if (start === 0) {
			return incrementNumber(99, move, distance - 1);
		}
		return incrementNumber(start - 1, move, distance - 1);
	}
	if (move === "R") {
		if (start === 99) {
			return incrementNumber(0, move, distance - 1);
		}
		return incrementNumber(start + 1, move, distance - 1);
	}
	return 0;
}

(function coutZeros() {
	const moves = safeSeq.split("\n").reduce(
		([lastNumber, numberOfZeros], line) => {
			const { move, distance } = extractMove(line);
			const newNumber = incrementNumber(lastNumber, move, distance);
			if (newNumber === 0) {
				return [newNumber, numberOfZeros + 1];
			}
			return [newNumber, numberOfZeros];
		},
		[dialStart, 0],
	);
	console.log("result: ", moves);
})();
