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
			batteries.slice(0, batteries.length - 11),
		);
		const secondDigitIdx =
			biggestDigitIndex(
				batteries.slice(firstDigitIdx + 1, batteries.length - 10),
			) +
			firstDigitIdx +
			1;
		const thirdDigitIdx =
			biggestDigitIndex(
				batteries.slice(secondDigitIdx + 1, batteries.length - 9),
			) +
			secondDigitIdx +
			1;
		const fourthDigitIdx =
			biggestDigitIndex(
				batteries.slice(thirdDigitIdx + 1, batteries.length - 8),
			) +
			thirdDigitIdx +
			1;
		const fithDigitIdx =
			biggestDigitIndex(
				batteries.slice(fourthDigitIdx + 1, batteries.length - 7),
			) +
			fourthDigitIdx +
			1;
		const sixthDigitIdx =
			biggestDigitIndex(
				batteries.slice(fithDigitIdx + 1, batteries.length - 6),
			) +
			fithDigitIdx +
			1;
		const seventhDigitIdx =
			biggestDigitIndex(
				batteries.slice(sixthDigitIdx + 1, batteries.length - 5),
			) +
			sixthDigitIdx +
			1;
		const eightDigitIdx =
			biggestDigitIndex(
				batteries.slice(seventhDigitIdx + 1, batteries.length - 4),
			) +
			seventhDigitIdx +
			1;
		const ninethDigitIdx =
			biggestDigitIndex(
				batteries.slice(eightDigitIdx + 1, batteries.length - 3),
			) +
			eightDigitIdx +
			1;
		const tenthDigitIdx =
			biggestDigitIndex(
				batteries.slice(ninethDigitIdx + 1, batteries.length - 2),
			) +
			ninethDigitIdx +
			1;
		const eleventhDigitIdx =
			biggestDigitIndex(
				batteries.slice(tenthDigitIdx + 1, batteries.length - 1),
			) +
			tenthDigitIdx +
			1;
		const twelvethDigitIdx =
			biggestDigitIndex(
				batteries.slice(eleventhDigitIdx + 1, batteries.length),
			) +
			eleventhDigitIdx +
			1;

		const combination = [
			batteries[firstDigitIdx],
			batteries[secondDigitIdx],
			batteries[thirdDigitIdx],
			batteries[fourthDigitIdx],
			batteries[fithDigitIdx],
			batteries[sixthDigitIdx],
			batteries[seventhDigitIdx],
			batteries[eightDigitIdx],
			batteries[ninethDigitIdx],
			batteries[tenthDigitIdx],
			batteries[eleventhDigitIdx],
			batteries[twelvethDigitIdx],
		];

		return sum + parseInt(combination.join(""), 10);
	}, 0);
	console.log("result: ", result);
})();
