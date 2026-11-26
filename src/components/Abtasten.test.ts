import { expect, test } from "vite-plus/test";
import { curve, error, level, levels, samples, summary, valueOf } from "./Abtasten.ts";

test("the curve stays between −1 and 1 and nearly reaches both ends", () => {
  const all = Array.from({ length: 2001 }, (_, k) => curve(k / 2000));
  for (const v of all) expect(Math.abs(v)).toBeLessThan(1);
  expect(Math.max(...all.map(Math.abs))).toBeGreaterThan(0.9);
});

test("the default setting (8 points, 2 bits) uses all four levels", () => {
  expect(new Set(samples(8, 2).map((point) => point.stored)).size).toBe(4);
});

test("n bits give 2^n levels, and every value lands on one of them", () => {
  expect([1, 2, 3, 4].map(levels)).toEqual([2, 4, 8, 16]);
  for (const bits of [1, 2, 3, 4]) {
    for (const point of samples(32, bits)) {
      const step = level(point.value, bits);
      expect(step).toBeGreaterThanOrEqual(0);
      expect(step).toBeLessThan(levels(bits));
      expect(point.stored).toBe(valueOf(step, bits));
    }
  }
  expect(valueOf(0, 2)).toBe(-1);
  expect(valueOf(3, 2)).toBe(1);
});

test("more points and more bits bring the stored values closer to the curve", () => {
  expect(error(32, 4)).toBeLessThan(error(4, 4));
  expect(error(32, 4)).toBeLessThan(error(32, 1));
  expect(error(8, 2)).toBeLessThan(error(4, 1));
  expect(samples(8, 2)).toHaveLength(8);
});

test("the line names points, levels and bits", () => {
  expect(summary("{n} Messpunkte · {s} Stufen · {b} Bit", 8, 2)).toBe("8 Messpunkte · 4 Stufen · 16 Bit");
});
