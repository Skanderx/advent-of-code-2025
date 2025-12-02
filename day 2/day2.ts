import { readFileSync } from "node:fs";

let idRanges = "";

try {
	const filePath = "day 2/id_ranges.txt";
	const fileContent: string = readFileSync(filePath, "utf8");
	idRanges = fileContent;
} catch (error) {
	console.error("Error reading file:", error);
}
function isInvalidId(id: number): boolean {
	const idStr = id.toString();
	const len = idStr.length;
	for (let nbrseq = len; nbrseq > 1; nbrseq--) {
		if (len % nbrseq === 0) {
			const seqLenth = len / nbrseq;
			const seq = idStr.substring(0, seqLenth);
			let pass = true;
			for (let i = 1; i < nbrseq; i++) {
				const currentSeq = idStr.substring(
					i * seqLenth,
					i * seqLenth + seqLenth,
				);
				if (seq !== currentSeq) {
					pass = false;
					break;
				}
			}
			if (pass) return true;
		}
	}

	return false;
}

function sumInvalidIdsInRange(range: string): number {
	let sum = 0;
	const [start, end] = range.split("-").map((part) => parseInt(part, 10));
	for (let id = start; id <= end; id++) {
		if (isInvalidId(id)) {
			sum += id;
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
