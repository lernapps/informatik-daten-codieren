// The logic of PixelEditor.vue, the exercise "Male das Bild nach dem Code": pure functions, which the build tests over
// fixed seeds (the exercise contract). A task is one picture of 6 × 6 pixels from the data file bilder, given as its
// rows: each row a number whose 6 bits are the pixels, the left pixel the bit of 32 (1 black, 0 white). The code is
// shown as rows of 0 and 1 or as the numbers. An answer is the rows the learner paints, as numbers. The model is
// ProzentFeld of @lernapps/app-templates.
import { fill } from "./Bits.ts";

/** The size of a picture: 6 × 6 pixels. */
export const SIZE = 6;

/** A picture of the data file: its name and its rows. */
export interface Picture {
  name: string;
  zeilen: number[];
}

/** The props the logic needs. */
export interface Props {
  /** The task, the same for every picture. */
  task: string;
  /** How the code is shown: rows of 0 and 1, or the numbers of the rows. */
  code: "bits" | "zahl";
  /** The pictures to draw from. */
  bilder: Picture[];
  /** The app's message for each typical mistake, in the order of about.mistakes. */
  mistakes?: readonly string[];
  /** The solution's sentence, with {name} for the name of the picture. */
  shows: string;
}

export interface Task {
  /** The index of the picture in bilder. */
  index: number;
  /** Its rows, from the top. */
  rows: number[];
}

/** The rows the learner painted, from the top, each a number of 6 bits. */
export type Answer = number[];

/** A small seeded random generator (mulberry32). */
function random(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Whether the pixel of `row` in column `column` (0 is the left) is black. */
export const black = (row: number, column: number) => Math.floor(row / 2 ** (SIZE - 1 - column)) % 2 === 1;

/** A row as text of 0 and 1, e.g. "001100". */
export const bits = (row: number) => row.toString(2).padStart(SIZE, "0");

/** Each row read from the other end. */
export const mirrored = (rows: readonly number[]) =>
  rows.map((row) => parseInt(bits(row).split("").reverse().join(""), 2));

/** Black and white swapped. */
export const inverted = (rows: readonly number[]) => rows.map((row) => 2 ** SIZE - 1 - row);

/** Rows and columns swapped. */
export function transposed(rows: readonly number[]): number[] {
  return Array.from({ length: SIZE }, (_, r) =>
    rows.reduce((sum, row, c) => sum + (black(row, r) ? 2 ** (SIZE - 1 - c) : 0), 0),
  );
}

const same = (a: readonly number[], b: readonly number[]) => a.length === b.length && a.every((x, i) => x === b[i]);

/** The task of `seed`: one of the pictures. */
export function generate(seed: number, props: Pick<Props, "bilder">): Task {
  const next = random(seed);
  const index = Math.floor(next() * props.bilder.length);
  return { index, rows: [...(props.bilder[index]?.zeilen ?? [12, 30, 63, 51, 51, 51])] };
}

/** Whether the painted rows are the picture. */
export function check(task: Task, answer: Answer): boolean {
  return same(answer, task.rows);
}

/** The right rows. */
export function solution(task: Task): Answer {
  return [...task.rows];
}

/** A wrong answer: black and white swapped (never the picture itself). */
export function wrong(task: Task): Answer {
  return inverted(task.rows);
}

/** The answer of each typical mistake, undefined where it would be the picture itself. */
export function mistakes(task: Task, _props?: Props): (Answer | undefined)[] {
  return [mirrored(task.rows), inverted(task.rows), transposed(task.rows)].map((answer) =>
    same(answer, task.rows) ? undefined : answer,
  );
}

/** The app's message for a wrong answer that is a typical mistake, else none. */
export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = mistakes(task).findIndex((mistake) => mistake !== undefined && same(mistake, answer));
  return index < 0 ? undefined : props.mistakes?.[index];
}

/** The code of the task as lines, as the component shows it. */
export function code(task: Task, how: Props["code"]): string[] {
  return task.rows.map((row) => (how === "bits" ? bits(row) : String(row)));
}

/** The picture as text: ■ for black, □ for white. */
export function picture(rows: readonly number[]): string {
  return rows.map((row) => bits(row).replace(/1/g, "■").replace(/0/g, "□")).join("\n");
}

/** The task as a learner sees it, and its solution. */
export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  const name = props.bilder[task.index]?.name ?? "";
  return {
    task: `${props.task}\n\n${code(task, props.code).join("  \n")}`,
    solution: `${fill(props.shows, { name })}\n\n${picture(task.rows).split("\n").join("  \n")}`,
  };
}

/** The task once, with {Code}. */
export function template(props: Props, _lang: string): string {
  return `${props.task} {Code}`;
}

/** What sets a task: the code, row by row. */
export function params(task: Task, props: Props, _lang: string): Record<string, string> {
  return { Code: code(task, props.code).join(" / ") };
}

/** An answer as text: the rows as 0 and 1. */
export function show(answer: Answer, _task?: Task, _props?: Props, _lang?: string): string {
  return answer.map(bits).join(" / ");
}

/** What the exercise is, for a tutor. */
export const about = {
  task: {
    de: "Ein Raster aus 6 × 6 Pixeln, alle weiß. Daneben steht der Code des Bildes, Zeile für Zeile: als sechs Ziffern 0 und 1 oder als Zahl (Bit-Karten 32, 16, 8, 4, 2, 1). 1 heißt schwarz, 0 weiß. Das Kind tippt Pixel an, um sie schwarz oder wieder weiß zu machen, und drückt „Prüfen“.",
    en: "A grid of 6 × 6 pixels, all white. Next to it is the code of the picture, row by row: as six digits 0 and 1, or as a number (bit cards 32, 16, 8, 4, 2, 1). 1 means black, 0 white. The child taps pixels to make them black or white again, then presses “Check”.",
  },
  answer: {
    de: "Die gemalten Zeilen von oben nach unten, jede als Bitfolge.",
    en: "The painted rows from top to bottom, each as a bit string.",
  },
  correct: {
    de: "Richtig, wenn jedes Pixel so ist, wie der Code sagt.",
    en: "Right if every pixel is as the code says.",
  },
  mistakes: [
    {
      de: "Jede Zeile von rechts nach links gelesen (das Bild ist gespiegelt).",
      en: "Each row read from right to left (the picture is mirrored).",
    },
    {
      de: "0 und 1 vertauscht: Schwarz und Weiß sind vertauscht.",
      en: "0 and 1 swapped: black and white are swapped.",
    },
    {
      de: "Zeilen und Spalten vertauscht: Jede Zeile des Codes wurde als Spalte gemalt.",
      en: "Rows and columns swapped: each row of the code was painted as a column.",
    },
  ],
};
