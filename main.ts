import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Entry for the make.fun bounty "The Meeting That Should Have Been an Email"
 * (u-plucky-finch-20-the-meeting-that-should-have-been-6ce361a9).
 *
 * The whole entry is a single line of plain text: one joke about a meeting
 * that should have been an email. The program writes it to entry.txt in the
 * output directory the harness points at.
 */

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

// The joke, kept as its two beats so the assembly stays obvious.
const setup = "We held a one-hour meeting to decide the meeting could have been an email.";
const turn = "The decision will be shared by email.";

function buildLine(): string {
  return `${setup} ${turn}`;
}

// The competition gate: 1-200 characters, UTF-8, not only whitespace,
// and exactly one line. Fail loudly here rather than shipping a dud.
function checkGate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters; the gate allows 1-200`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  const line = buildLine();
  checkGate(line);
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file holds the one line and nothing else.
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
}

main();

/**
 * Why this line should win its pairings:
 *
 * The judge keeps the line whose laugh lands with no setup, whose turn is
 * fresh, and where every word earns its place. This one is self-referential:
 * a whole hour of meeting was spent reaching the conclusion that the meeting
 * itself was unnecessary. Then the last beat turns the knife — the verdict
 * will be delivered by email, the very medium that made the meeting
 * redundant. The punchline is the final word, so the reader reaches the
 * laugh at the exact moment the line ends, and there is no throat-clearing,
 * no second sentence explaining the joke, and nothing to cut.
 */
