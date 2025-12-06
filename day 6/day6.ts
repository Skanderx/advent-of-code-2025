import { readFileSync } from "node:fs";

let mathProblems = "";

try {
	const filePath = "day 6/mathproblem.txt";
	const fileContent: string = readFileSync(filePath, "utf8");
	mathProblems = fileContent;
} catch (error) {
	console.error("Error reading file:", error);
}

function makeNumbers(numberColumn: string[]): number[] {
	const numbers: number[] = [];
	for (let i = 0; i < numberColumn[0].length; i++) {
		numbers.push(
			parseInt(
				numberColumn.reduce((number, digits) => number + digits[i], ""),
				10,
			),
		);
	}
	return numbers;
}

const operatorRegex = /[+*]/g;

(function getGrandTotal() {
	const lines = mathProblems.split("\n");

	const operationColumn = lines[lines.length - 1].match(operatorRegex) || [];
	const columnLengths = (lines[lines.length - 1].split(/ [+*]/g) || []).map(
		(spaces, index) => (index === 0 ? spaces.length : spaces.length + 1),
	);

	const numberLines = lines.slice(0, lines.length - 1);

	const result = columnLengths.reduce(
		({ grandSum, currentLength }, columnLength, i) => {
			const column = numberLines.reduce<string[]>((columns, line) => {
				const number = line.slice(currentLength, currentLength + columnLength);
				columns.push(number);
				return columns;
			}, []);

			const numbers = makeNumbers(column);
			if (operationColumn[i] === "*") {
				grandSum += numbers.reduce((product, number) => number * product, 1);
			} else {
				grandSum += numbers.reduce((product, number) => number + product, 0);
			}
			return { grandSum, currentLength: currentLength + columnLength + 1 }; // + 1 for the space seperating numbers from index > 0
		},
		{ grandSum: 0, currentLength: 0 },
	);

	console.log(`the grand total is ${result.grandSum}`);
})();
