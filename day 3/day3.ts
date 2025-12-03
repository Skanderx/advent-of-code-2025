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
function findNextBiggestNumber(arr: any, lastIndex: number): number {
	return biggestDigitIndex(arr.slice(lastIndex + 1)) + lastIndex + 1;
}

(function largestJoltagesSum() {
	const result = banks.split("\n").reduce((sum, bank) => {
		const batteries = bank.split("");
		const digits = Array(12).fill(0);
		for (let i = 0; i < digits.length; i++) {
			const lastIndex = i === 0 ? -1 : digits[i - 1];
			const res = findNextBiggestNumber(
				batteries.slice(0, batteries.length - 11 + i),
				lastIndex,
			);
			digits[i] = res;
		}
		const combination = digits.map((index) => batteries[index]);
		return sum + parseInt(combination.join(""), 10);
	}, 0);
	console.log("result: ", result);
})();
