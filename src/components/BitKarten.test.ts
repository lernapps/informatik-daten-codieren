import { expect, test } from "vite-plus/test";
import { check, describe, generate, mistakes, numbers, params, reason, show, solution, wrong } from "./BitKarten.ts";

const props = {
  task: "Lege die Zahl {n}.",
  cards: 5,
  min: 3,
  max: 31,
  mistakes: ["gespiegelt: {s} statt {n}", "zu klein: {s}", "zu groß: {s}"],
};

test("every task has a right row, and the typical mistakes are wrong", () => {
  for (const cards of [5, 8]) {
    const p = { ...props, cards, max: cards === 5 ? 31 : 255 };
    for (let seed = 1; seed <= 50; seed++) {
      const task = generate(seed, p);
      expect(task.n).toBeGreaterThanOrEqual(3);
      expect(check(task, solution(task))).toBe(true);
      expect(check(task, wrong(task))).toBe(false);
      for (const answer of mistakes(task)) if (answer !== undefined) expect(check(task, answer)).toBe(false);
      expect(solution(task)).toHaveLength(cards);
    }
  }
});

test("no number whose row reads the same from both ends, and none of a single card", () => {
  const all = numbers({ cards: 5, min: 1, max: 31 });
  expect(all).not.toContain(17); // 10001
  expect(all).not.toContain(4); // 00100, one card
  expect(all).toContain(13);
});

test("each typical mistake gets its message; an incomplete row none", () => {
  const task = { n: 13, cards: 5 };
  expect(show(solution(task))).toBe("01101");
  expect(reason(task, [1, 0, 1, 1, 0], props)).toBe("gespiegelt: 22 statt 13");
  expect(reason(task, [0, 1, 1, 0, 0], props)).toBe("zu klein: 12");
  expect(reason(task, [0, 1, 1, 1, 1], props)).toBe("zu groß: 15");
  expect(reason(task, [0, 1, 1], props)).toBeUndefined();
  expect(check(task, [0, 1, 1, 0, 1])).toBe(true);
  expect(check(task, [0, 1, 1, 0, 2])).toBe(false);
});

test("describe states the task and the sum of the open cards", () => {
  expect(describe({ n: 13, cards: 5 }, props, "de")).toEqual({
    task: "Lege die Zahl 13.",
    solution: "01101: 8 + 4 + 1 = 13",
  });
  expect(params({ n: 27, cards: 5 }, props, "de")).toEqual({ n: 27 });
});
