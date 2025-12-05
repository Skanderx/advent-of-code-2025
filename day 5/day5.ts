import { readFileSync } from "node:fs";

let ingredientsIds = "";

try {
	const filePath = "day 5/ingredients.txt";
	const fileContent: string = readFileSync(filePath, "utf8");
	ingredientsIds = fileContent;
} catch (error) {
	console.error("Error reading file:", error);
}

(function freshIngredientsCount() {
	const [ranges, ids] = ingredientsIds.split("\n\n");

	const intRanges = ranges
		.split("\n")
		.map((range) => range.split("-").map((part) => parseInt(part, 10)));
	const intIds = ids.split("\n").map((part) => parseInt(part, 10));

	const result = intIds.reduce((freshCount, id) => {
		const isFresh = intRanges.some(([start, end]) => id >= start && id <= end);
		return isFresh ? freshCount + 1 : freshCount;
	}, 0);

	console.log(`${result} of the available ingredient IDs are fresh`);
})();
