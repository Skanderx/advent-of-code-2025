import { readFileSync } from "node:fs";

let mathProblems = "";

try {
	const filePath = "day 6/mathproblem.txt";
	const fileContent: string = readFileSync(filePath, "utf8");
	mathProblems = fileContent;
} catch (error) {
	console.error("Error reading file:", error);
}
function rows2cols(a: Array<string[]>) {
	const r: Array<string[]> = [];
	let t: string[];

	for (let i = 0, iLen = a.length; i < iLen; i++) {
		t = a[i];

		for (let j = 0, jLen = t.length; j < jLen; j++) {
			if (!r[j]) {
				r[j] = [];
			}
			r[j][i] = t[j];
		}
	}
	return r;
}

function splitStringByLengths(str: string, lengths: number[]) {
	const result = [];
	let currentIndex = 0;

	for (let i = 0; i < lengths.length; i++) {
		const length = lengths[i];
		if (length <= 0) {
			continue; // Skip invalid lengths
		}

		const subString = str.slice(currentIndex, currentIndex + length);
		result.push(subString);
		currentIndex += length;

		if (currentIndex >= str.length) {
			break; // Stop if the end of the string is reached
		}
	}

	// Add any remaining part of the string if lengths array does not fully consume it
	if (currentIndex < str.length) {
		result.push(str.slice(currentIndex));
	}

	return result;
}

function makeNumbers(numberColumn: string[], columnLength: number): number[] {
	const numbers: number[] = [];
	for (let i = 0; i < columnLength; i++) {
		numbers.push(
			parseInt(
				numberColumn.reduce((number, digits) => number + digits[i], ""),
				10,
			),
		);
	}
	return numbers.filter((n) => !Number.isNaN(n));
}

const numberRegex = /(\d+)/g;
const operatorRegex = /[+*]/g;

(function getGrandTotal() {
	const lines = mathProblems.split("\n");

	const operationColumn = lines[lines.length - 1].match(operatorRegex) || [];
	const columnLengths = (lines[lines.length - 1].split(/ [+*]/g) || []).map(
		(spaces, index) => (index === 0 ? spaces.length : spaces.length + 2),
	);

	const numberLines = lines
		.slice(0, lines.length - 1)
		.map((line) => splitStringByLengths(line, columnLengths));

	const numberColumns = rows2cols(numberLines);

	const result = numberColumns.reduce((grandSum, column, i) => {
		const numbers = makeNumbers(column, columnLengths[i]);
		if (operationColumn[i] === "*") {
			grandSum += numbers.reduce((product, number) => number * product, 1);
		} else {
			grandSum += numbers.reduce((product, number) => number + product, 0);
		}
		return grandSum;
	}, 0);
	console.log(`the grand total is ${result}`);
})();
