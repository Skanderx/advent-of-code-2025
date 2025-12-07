import { readFileSync } from "node:fs";

let manifolds = "";

try {
	const filePath = "day 7/manifolddiagram.txt";
	const fileContent: string = readFileSync(filePath, "utf8");
	manifolds = fileContent;
} catch (error) {
	console.error("Error reading file:", error);
}

(function countSplits() {
	const lines = manifolds.split("\n");
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

(function countTimelines() {
	const lines = manifolds.split("\n");
	let beamCounts = new Map([[lines[0].indexOf("S"), 1]]);
	for (let i = 1; i < lines.length; i++) {
		// const newBeamIndex: Array<number> = [];
		const nextBeamCounts: Map<number, number> = new Map();
		for (const [beamIndex, beamCount] of beamCounts) {
			if (lines[i][beamIndex] === "^") {
				const indexLeft = beamIndex - 1;
				nextBeamCounts.set(
					indexLeft,
					(nextBeamCounts.get(indexLeft) || 0) + beamCount,
				);
				const indexRight = beamIndex + 1;
				nextBeamCounts.set(
					indexRight,
					(nextBeamCounts.get(indexRight) || 0) + beamCount,
				);
			} else {
				nextBeamCounts.set(
					beamIndex,
					(nextBeamCounts.get(beamIndex) || 0) + beamCount,
				);
			}
		}
		beamCounts = nextBeamCounts;
	}

	let numberOfTimeLines = 0;
	for (const count of beamCounts.values()) {
		numberOfTimeLines += count;
	}
	console.log(
		`the particle ends up on ${numberOfTimeLines} different timelines.`,
	);
})();
