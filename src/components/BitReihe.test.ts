import { expect, test } from "vite-plus/test";
import { result } from "./BitReihe.ts";

test("the line names the row of bits and the number, the largest card on the left", () => {
  const line = "Bitfolge: {b} · Zahl: {n}";
  expect(result(line, [0, 0, 0, 0, 0])).toBe("Bitfolge: 00000 · Zahl: 0");
  expect(result(line, [0, 1, 1, 0, 1])).toBe("Bitfolge: 01101 · Zahl: 13");
  expect(result(line, [1, 1, 1, 1, 1])).toBe("Bitfolge: 11111 · Zahl: 31");
  expect(result("Pixelzeile: {b}", [0, 0, 1, 1, 0, 0])).toBe("Pixelzeile: 001100");
});
