// The logic of CaesarScheibe.vue, a Caesar disc: two rings of the letters A to Z, the inner one turned by a number of
// places. Pure functions, which the build tests over fixed seeds (the exercise contract). Three kinds of task, set by
// the prop mode: encrypt a word with a given key, decrypt a word with a given key, or find the key of an encrypted
// word ("knacken"). The answer is what the learner types: a word, or the key as digits. The model is ProzentFeld of
// @lernapps/app-templates.
import { fill } from "./Bits.ts";

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export type Mode = "verschluesseln" | "entschluesseln" | "knacken";

/** The props the logic needs. */
export interface Props {
  /** What the learner does: encrypt, decrypt, or find the key. */
  mode: Mode;
  /** The task, with {wort} for the plaintext, {geheim} for the ciphertext and {k} for the key. */
  task: string;
  /** The words to draw from (the data file woerter), A to Z only. */
  woerter: { wort: string }[];
  /** The smallest and the largest key a task uses. */
  min: number;
  max: number;
  /** The app's message for each typical mistake, in the order of about.mistakes, with {k}. */
  mistakes?: readonly string[];
}

export interface Task {
  /** What the learner does. */
  mode: Mode;
  /** The plaintext. */
  word: string;
  /** The key: how many places each letter moves on. */
  key: number;
}

/** What the learner typed. */
export type Answer = string;

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

/** Each letter moved on by `key` places, after Z back to A; other signs stay. */
export function shift(text: string, key: number): string {
  return text.replace(/[A-Z]/g, (letter) => ALPHABET[(((ALPHABET.indexOf(letter) + key) % 26) + 26) % 26] ?? letter);
}

/** What the learner typed, cleaned up: capitals, no spaces. */
export const clean = (answer: Answer) => answer.replace(/\s+/g, "").toUpperCase();

/** The keys a task may use: never 13, where both directions give the same. */
export function keys(props: Pick<Props, "min" | "max">): number[] {
  const all: number[] = [];
  for (let k = Math.max(1, props.min); k <= Math.min(25, props.max); k++) if (k !== 13) all.push(k);
  return all;
}

/** The task of `seed`: a word and a key. */
export function generate(seed: number, props: Pick<Props, "mode" | "woerter" | "min" | "max">): Task {
  const next = random(seed);
  const word = props.woerter[Math.floor(next() * props.woerter.length)]?.wort ?? "ZELT";
  const choices = keys(props);
  return { mode: props.mode, word, key: choices[Math.floor(next() * choices.length)] ?? 3 };
}

/** The ciphertext of the task. */
export const secret = (task: Task) => shift(task.word, task.key);

/** The right answer. */
export function solution(task: Task): Answer {
  return task.mode === "verschluesseln" ? secret(task) : task.mode === "entschluesseln" ? task.word : String(task.key);
}

/** Whether the answer is right. */
export function check(task: Task, answer: Answer): boolean {
  return clean(answer) === solution(task);
}

/** The answer of each typical mistake: turned the wrong way, one place too far. */
export function mistakes(task: Task, _props?: Props): (Answer | undefined)[] {
  if (task.mode === "verschluesseln") return [shift(task.word, -task.key), shift(task.word, task.key + 1)];
  if (task.mode === "entschluesseln") return [shift(task.word, 2 * task.key), shift(task.word, -1)];
  return [String(26 - task.key), String(task.key + 1)];
}

/** A wrong answer: turned the wrong way. */
export function wrong(task: Task): Answer {
  return mistakes(task)[0] ?? "";
}

/** The app's message for a typical mistake, else none. */
export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = mistakes(task).findIndex((mistake) => mistake === clean(answer));
  const message = index < 0 ? undefined : props.mistakes?.[index];
  return message === undefined ? undefined : fill(message, { k: task.key });
}

/** The task text with the word, the ciphertext and the key filled in. */
export const taskText = (task: Task, props: Pick<Props, "task">) =>
  fill(props.task, { wort: task.word, geheim: secret(task), k: task.key });

/** The task as a learner sees it, and its solution. */
export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  return { task: taskText(task, props), solution: `${solution(task)} (${task.word} → ${secret(task)}, ${task.key})` };
}

/** The task once, with {wort}, {geheim} and {k}. */
export function template(props: Props, _lang: string): string {
  return props.task;
}

/** What sets a task: the word, its ciphertext and the key. */
export function params(task: Task, _props: Props, _lang: string): Record<string, string | number> {
  return { wort: task.word, geheim: secret(task), k: task.key };
}

/** An answer as text. */
export function show(answer: Answer, _task?: Task, _props?: Props, _lang?: string): string {
  return clean(answer);
}

/** The mapping of the disc turned by `turn`: each letter and the letter it becomes. */
export function pairs(turn: number): [string, string][] {
  return ALPHABET.split("").map((letter) => [letter, shift(letter, turn)]);
}

/** What the exercise is, for a tutor. */
export const about = {
  task: {
    de: "Eine Caesar-Scheibe: außen das Alphabet für den Klartext, innen das Alphabet für den Geheimtext. Mit „−1“ und „+1“ dreht das Kind den inneren Ring; die Anzeige sagt, um wie viele Stellen er gedreht ist. Je nach Aufgabe verschlüsselt das Kind ein Wort mit einem gegebenen Schlüssel, entschlüsselt ein Wort oder findet den Schlüssel eines Geheimworts. Es tippt die Antwort in das Feld und drückt „Prüfen“.",
    en: "A Caesar disc: on the outside the alphabet for the plaintext, on the inside the alphabet for the ciphertext. With “−1” and “+1” the child turns the inner ring; the display says by how many places it is turned. Depending on the task, the child encrypts a word with a given key, decrypts a word, or finds the key of a secret word. They type the answer into the field and press “Check”.",
  },
  answer: {
    de: "Ein Wort aus den Buchstaben A bis Z, oder beim Knacken der Schlüssel als Zahl.",
    en: "A word made of the letters A to Z, or when cracking, the key as a number.",
  },
  correct: {
    de: "Richtig, wenn das Wort jeder Buchstabe um den Schlüssel verschoben ist (verschlüsseln), das Klartextwort ist (entschlüsseln) oder die Zahl der Schlüssel ist (knacken).",
    en: "Right if every letter of the word is moved on by the key (encrypt), if it is the plaintext word (decrypt), or if the number is the key (crack).",
  },
  mistakes: [
    {
      de: "In die falsche Richtung gedreht.",
      en: "Turned the wrong way.",
    },
    {
      de: "Um eine Stelle verzählt.",
      en: "Counted one place wrong.",
    },
  ],
};
