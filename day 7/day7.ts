import { readFileSync } from "node:fs";

let mathProblems = "";

try {
	const filePath = "day 7/manifolddiagram.txt";
	const fileContent: string = readFileSync(filePath, "utf8");
	mathProblems = fileContent;
} catch (error) {
	console.error("Error reading file:", error);
}

const operatorRegex = /[+*]/g;

(function countSplits() {
	const lines = mathProblems.split("\n");
	let beamIndexes = [lines[0].indexOf("S")];
	let numberOfSplits = 0;
	for (let i = 1; i < lines.length; i++) {
		const newBeamIndex: Set<number> = new Set();
		beamIndexes.forEach((beamIndex) => {
			if (lines[i][beamIndex] === "^") {
				newBeamIndex.add(beamIndex - 1);
				newBeamIndex.add(beamIndex + 1);
				numberOfSplits++;
			} else {
				newBeamIndex.add(beamIndex);
			}
		});
		beamIndexes = Array.from(newBeamIndex);
	}

	console.log(`a tachyon beam is split a total of ${numberOfSplits} times.`);
})();
