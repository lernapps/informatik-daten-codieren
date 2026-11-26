// The logic of BitKarten.vue, the exercise "Lege die Zahl n mit den Bit-Karten": pure functions, which the build
// tests over fixed seeds (the exercise contract). A task is the number n and the number of cards; an answer is the
// row of bits the learner lays out, the largest card first. Right is every row whose open cards add up to n (there
// is only one). The model is ProzentFeld of @lernapps/app-templates.
import { bitsOf, fill, text, valueOf } from "./Bits.ts";

/** The character whose code is `n`, for a task with {c} (65 is A). */
export const charOf = (n: number) => String.fromCharCode(n);

/** The props the logic needs. */
export interface Props {
  /** The task, with {n} for the number to lay out and {c} for the character with that code (65 is A). */
  task: string;
  /** The number of cards, 5 or 8. */
  cards: number;
  /** The smallest and the largest number a task asks for. */
  min: number;
  max: number;
  /**
   * The app's message for each typical mistake, in the order of about.mistakes, with {n} for the number and {s} for
   * the number the cards show: mirrored, too small, too big.
   */
  mistakes?: readonly string[];
}

export interface Task {
  /** The number to lay out. */
  n: number;
  /** The number of cards. */
  cards: number;
}

/** The row of bits, the largest card first, 1 for a card face up. */
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

/** The row read from the other end. */
const mirrored = (bits: readonly number[]) => [...bits].reverse();

/** The numbers a task may ask for: those whose mirrored row is another number, and that need two cards or more. */
export function numbers(props: Pick<Props, "cards" | "min" | "max">): number[] {
  const all: number[] = [];
  for (let n = Math.max(1, props.min); n <= props.max; n++) {
    const bits = bitsOf(n, props.cards);
    if (valueOf(mirrored(bits)) !== n && bits.filter((bit) => bit === 1).length >= 2) all.push(n);
  }
  return all;
}

/** The task of `seed`. */
export function generate(seed: number, props: Props): Task {
  const next = random(seed);
  const choices = numbers(props);
  return { n: choices[Math.floor(next() * choices.length)] ?? 13, cards: props.cards };
}

/** Whether the open cards of `answer` add up to n. */
export function check(task: Task, answer: Answer): boolean {
  return answer.length === task.cards && answer.every((bit) => bit === 0 || bit === 1) && valueOf(answer) === task.n;
}

/** The right row. */
export function solution(task: Task): Answer {
  return bitsOf(task.n, task.cards);
}

/** A wrong row: the right one read from the other end. */
export function wrong(task: Task): Answer {
  return mirrored(solution(task));
}

/** The smallest card that lies open in the right row turned face down: one card too few. */
function oneTooFew(task: Task): Answer {
  const bits = solution(task);
  const last = bits.lastIndexOf(1);
  return bits.map((bit, i) => (i === last ? 0 : bit));
}

/** The answer of each typical mistake of about.mistakes: mirrored, one card too few, (too big has no fixed one). */
export function mistakes(task: Task, _props?: Props): (Answer | undefined)[] {
  return [wrong(task), oneTooFew(task), undefined];
}

/** The app's message for a wrong answer: mirrored, else too small or too big; none for a row that is not complete. */
export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  if (answer.length !== task.cards) return undefined;
  const s = valueOf(answer);
  const index = text(answer) === text(wrong(task)) ? 0 : s < task.n ? 1 : s > task.n ? 2 : -1;
  const message = index < 0 ? undefined : props.mistakes?.[index];
  return message === undefined ? undefined : fill(message, { n: task.n, s, c: charOf(task.n) });
}

/** The values of the open cards of a row, e.g. "8 + 4 + 1". */
function sum(bits: readonly number[]): string {
  return bits
    .map((bit, i) => (bit === 1 ? 2 ** (bits.length - 1 - i) : 0))
    .filter((value) => value > 0)
    .join(" + ");
}

/** The task as a learner sees it, and its solution. */
export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  const bits = solution(task);
  return {
    task: fill(props.task, { n: task.n, c: charOf(task.n) }),
    solution: `${text(bits)}: ${sum(bits)} = ${task.n}`,
  };
}

/** The task once, with {n}. */
export function template(props: Props, _lang: string): string {
  return props.task;
}

/** What sets a task: the number. */
export function params(task: Task, props: Props, _lang: string): Record<string, number | string> {
  return props.task.includes("{c}") ? { n: task.n, c: charOf(task.n) } : { n: task.n };
}

/** An answer as text: the row of bits. */
export function show(answer: Answer, _task?: Task, _props?: Props, _lang?: string): string {
  return text(answer);
}

/** What the exercise is, for a tutor. */
export const about = {
  task: {
    de: "Eine Reihe Bit-Karten, die größte links (16, 8, 4, 2, 1 oder 128 … 1), alle verdeckt. Das Kind dreht durch Antippen Karten um, bis die offenen Karten zusammen die Zahl n ergeben, und drückt „Prüfen“. Die Summe wird vor dem Prüfen nicht angezeigt, nur die Bitfolge.",
    en: "A row of bit cards, the largest on the left (16, 8, 4, 2, 1 or 128 … 1), all face down. The child taps cards to turn them over until the face-up cards add up to the number n, then presses “Check”. The sum is not shown before checking, only the bits.",
  },
  answer: {
    de: "Die Bitfolge der Karten, 1 für offen, 0 für verdeckt, die größte Karte zuerst.",
    en: "The bits of the cards, 1 for face up, 0 for face down, the largest card first.",
  },
  correct: {
    de: "Richtig, wenn die Werte der offenen Karten zusammen n sind.",
    en: "Right if the values of the face-up cards add up to n.",
  },
  mistakes: [
    {
      de: "Die richtige Bitfolge von der falschen Seite gelegt (gespiegelt).",
      en: "The right bits laid out from the wrong end (mirrored).",
    },
    {
      de: "Zu wenig: Die offenen Karten ergeben weniger als n (zum Beispiel eine Karte vergessen).",
      en: "Too little: the face-up cards add up to less than n (for example a card forgotten).",
    },
    {
      de: "Zu viel: Die offenen Karten ergeben mehr als n.",
      en: "Too much: the face-up cards add up to more than n.",
    },
  ],
};
