import { readFileSync } from "node:fs";

let idRanges = "";

try {
	const filePath = "day 2/id_ranges.txt";
	const fileContent: string = readFileSync(filePath, "utf8");
	idRanges = fileContent;
} catch (error) {
	console.error("Error reading file:", error);
}
function sumInvalidIdsInRange(range: string): number {
	let sum = 0;
	const [start, end] = range.split("-").map((part) => parseInt(part, 10));
	for (let i = start; i <= end; i++) {
		const iStr = i.toString();
		const midpoint = iStr.length / 2;
		if (
			iStr.length % 2 === 0 &&
			iStr.substring(0, midpoint) === iStr.substring(midpoint)
		) {
			sum += i;
		}
	}
	return sum;
}

(function sumInvalidIds() {
	const moves = idRanges.split(",").reduce((sum, range) => {
		return sum + sumInvalidIdsInRange(range);
	}, 0);
	console.log("result: ", moves);
})();
