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

	const mergedRange = intRanges
		.sort(([a], [b]) => a - b)
		.reduce(
			(sum, [start, end]) => {
				// Initial merge
				if (sum.current_merged_Range[1] === -1) {
					return {
						current_merged_Range: [start, end],
						total: sum.total,
					};
				}
				const [currStart, currEnd] = sum.current_merged_Range;

				if (start <= currEnd) {
					// [ currStart, ... ,start, ..., currEnd, ..., end]
					return {
						current_merged_Range: [currStart, Math.max(end, currEnd)],
						total: sum.total,
					};
				}

				// [ currStart, ..., currEnd] [start..., end]
				return {
					current_merged_Range: [start, end],
					total: sum.total + currEnd - currStart + 1,
				};
			},
			{ current_merged_Range: [-1, -1], total: 0 },
		);
	const part2Result =
		mergedRange.total +
		mergedRange.current_merged_Range[1] -
		mergedRange.current_merged_Range[0] +
		1;
	console.log(`a total of ${part2Result} ingredient IDs to be fresh.`);
})();
