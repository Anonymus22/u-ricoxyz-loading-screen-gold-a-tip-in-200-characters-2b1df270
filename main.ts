import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TIP =
  "Tip: you and the agent are both staring at this bar, each convinced the other knows what happens next. Neither of you does.";

// Competition gate: one line, 1-200 characters, not only whitespace.
if (TIP.length < 1 || TIP.length > 200) {
  throw new Error(`tip must be 1-200 characters, got ${TIP.length}`);
}
if (TIP.includes("\n") || TIP.includes("\r")) {
  throw new Error("tip must be a single line");
}
if (TIP.trim().length === 0) {
  throw new Error("tip must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
const content = TIP + "\n";
writeFileSync("/output/entry.txt", content, "utf8");

// Round-trip verification: read back and confirm the bytes on disk match.
if (readFileSync("/output/entry.txt", "utf8") !== content) {
  throw new Error("round-trip verification failed: /output/entry.txt differs from what was written");
}
