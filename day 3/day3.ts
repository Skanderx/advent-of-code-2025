import { readFileSync } from "node:fs";

const dialStart = 50;
let banks = "";

try {
	const filePath = "day 3/batterie_banks.txt";
	const fileContent: string = readFileSync(filePath, "utf8");
	banks = fileContent;
} catch (error) {
	console.error("Error reading file:", error);
}

function biggestDigitIndex(arr: any[]): number {
	return arr.reduce((maxIndex, currentValue, currentIndex, array) => {
		return currentValue > array[maxIndex] ? currentIndex : maxIndex;
	}, 0);
}

(function largestJoltagesSum() {
	const result = banks.split("\n").reduce((sum, bank) => {
		const batteries = bank.split("");
		const firstDigitIdx = biggestDigitIndex(
			batteries.slice(0, batteries.length - 1),
		);
		const secondDigitIdx = biggestDigitIndex(
			batteries.slice(firstDigitIdx + 1),
		);

		const firstDigit = batteries[firstDigitIdx];
		const secondDigit = batteries[secondDigitIdx + 1 + firstDigitIdx];

		return sum + parseInt(`${firstDigit}${secondDigit}`, 10);
	}, 0);
	console.log("result: ", result);
})();
