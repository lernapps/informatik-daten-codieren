import { expect, test } from "vite-plus/test";
import {
  bits,
  check,
  code,
  describe,
  generate,
  inverted,
  mirrored,
  mistakes,
  picture,
  reason,
  solution,
  transposed,
  wrong,
} from "./PixelEditor.ts";

const tent = [12, 30, 30, 63, 51, 51];
const flag = [48, 60, 63, 48, 32, 32];
const props = {
  task: "Male das Bild.",
  code: "bits" as const,
  bilder: [
    { name: "Zelt", zeilen: tent },
    { name: "Fahne", zeilen: flag },
  ],
  mistakes: ["gespiegelt", "vertauscht", "gedreht"],
  shows: "Das Bild zeigt: {name}.",
};

test("every task has a right answer, and the typical mistakes are wrong", () => {
  for (let seed = 1; seed <= 50; seed++) {
    const task = generate(seed, props);
    expect(check(task, solution(task))).toBe(true);
    expect(check(task, wrong(task))).toBe(false);
    for (const answer of mistakes(task)) if (answer !== undefined) expect(check(task, answer)).toBe(false);
  }
});

test("mirror, swap and transpose", () => {
  expect(mirrored(flag).map(bits)).toEqual(["000011", "001111", "111111", "000011", "000001", "000001"]);
  expect(inverted([12]).map(bits)).toEqual(["110011"]);
  expect(transposed(flag).map(bits)).toEqual(["111111", "111100", "011000", "011000", "001000", "001000"]);
  expect(transposed(transposed(flag))).toEqual(flag);
  // a picture that is the same in the mirror has no mirror mistake
  expect(mistakes({ index: 0, rows: tent })[0]).toBeUndefined();
});

test("each typical mistake gets its message; another wrong answer none", () => {
  const task = { index: 1, rows: flag };
  expect(reason(task, mirrored(flag), props)).toBe("gespiegelt");
  expect(reason(task, inverted(flag), props)).toBe("vertauscht");
  expect(reason(task, transposed(flag), props)).toBe("gedreht");
  expect(reason(task, [0, 0, 0, 0, 0, 0], props)).toBeUndefined();
});

test("the code shows rows as bits or as numbers; describe names the picture", () => {
  const task = { index: 1, rows: flag };
  expect(code(task, "bits")[0]).toBe("110000");
  expect(code(task, "zahl")[0]).toBe("48");
  expect(picture([48])).toBe("■■□□□□");
  expect(describe(task, props, "de").solution.startsWith("Das Bild zeigt: Fahne.")).toBe(true);
});
