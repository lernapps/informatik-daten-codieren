import { expect, test } from "vite-plus/test";
import { bitsOf, dots, fill, text, valueOf, values } from "./Bits.ts";

test("the cards double from right to left", () => {
  expect(values(5)).toEqual([16, 8, 4, 2, 1]);
  expect(values(8)).toEqual([128, 64, 32, 16, 8, 4, 2, 1]);
});

test("bits and numbers convert both ways for every number of five and eight cards", () => {
  for (let n = 0; n < 32; n++) expect(valueOf(bitsOf(n, 5))).toBe(n);
  for (let n = 0; n < 256; n++) expect(valueOf(bitsOf(n, 8))).toBe(n);
  expect(text(bitsOf(13, 5))).toBe("01101");
  expect(text(bitsOf(22, 5))).toBe("10110");
});

test("a card has as many dots as its value, inside the card; large cards show their number", () => {
  for (const value of [1, 2, 4, 8, 16]) {
    const all = dots(value);
    expect(all).toHaveLength(value);
    for (const dot of all) {
      expect(dot.x - dot.r).toBeGreaterThan(0);
      expect(dot.x + dot.r).toBeLessThan(40);
      expect(dot.y + dot.r).toBeLessThan(60);
    }
  }
  expect(dots(32)).toEqual([]);
});

test("fill replaces only known names", () => {
  expect(fill("Lege {n}, {x}", { n: 5 })).toBe("Lege 5, {x}");
});
