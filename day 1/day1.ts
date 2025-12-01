const path = "/path/to/file.txt";
const file = Bun.file(path);

const text = await file.text();