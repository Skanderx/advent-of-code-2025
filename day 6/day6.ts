import { readFileSync } from "node:fs";

let mathProblems = "";

try {
	const filePath = "day 6/mathproblem.txt";
	const fileContent: string = readFileSync(filePath, "utf8");
	mathProblems = fileContent;
} catch (error) {
	console.error("Error reading file:", error);
}

const numberRegex = /(\d+)/g;
const operatorRegex = /[+*]/g;

(function getGrandTotal() {
	const lines = mathProblems.split("\n");
	const numberColumns = lines
		.slice(0, lines.length - 1)
		.map((line) =>
			(line.match(numberRegex) || []).map((val) => parseInt(val, 10)),
		);
	const operationColumn = lines[lines.length - 1].match(operatorRegex) || [];
	let result = 0;
	for (let i = 0; i < numberColumns[0]?.length; i++) {
		if (operationColumn[i] === "*") {
			result += numberColumns.reduce(
				(product, numbers) => numbers[i] * product,
				1,
			);
		} else {
			result += numberColumns.reduce(
				(product, numbers) => numbers[i] + product,
				0,
			);
		}
	}
	console.log(`${result} of the available ingredient IDs are fresh`);
})();
