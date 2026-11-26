import { expect, test } from "vite-plus/test";
import {
  check,
  clean,
  describe,
  generate,
  keys,
  mistakes,
  pairs,
  reason,
  secret,
  shift,
  solution,
  wrong,
  type Mode,
} from "./CaesarScheibe.ts";

const props = (mode: Mode) => ({
  mode,
  task: "Wort {wort}, geheim {geheim}, Schlüssel {k}.",
  woerter: [{ wort: "ZELT" }, { wort: "SEE" }, { wort: "BUS" }],
  min: 1,
  max: 25,
  mistakes: ["falsche Richtung bei {k}", "eins daneben"],
});

test("the Caesar shift goes on after Z with A, and back", () => {
  expect(shift("TREFFEN MONTAG ACHT UHR AM BAHNHOF", 3)).toBe("WUHIIHQ PRQWDJ DFKW XKU DP EDKQKRI");
  expect(shift("MEET ON MONDAY AT EIGHT AT THE STATION", 3)).toBe("PHHW RQ PRQGDB DW HLJKW DW WKH VWDWLRQ");
  expect(shift("XYZ", 3)).toBe("ABC");
  expect(shift(shift("ZELT", 7), -7)).toBe("ZELT");
  expect(pairs(3)[0]).toEqual(["A", "D"]);
  expect(keys({ min: 1, max: 25 })).not.toContain(13);
});

test("every task of every mode has a right answer, and the typical mistakes are wrong", () => {
  for (const mode of ["verschluesseln", "entschluesseln", "knacken"] as const) {
    for (let seed = 1; seed <= 50; seed++) {
      const task = generate(seed, props(mode));
      expect(check(task, solution(task))).toBe(true);
      expect(check(task, wrong(task))).toBe(false);
      for (const answer of mistakes(task)) if (answer !== undefined) expect(check(task, answer)).toBe(false);
    }
  }
});

test("answers are read in capitals and without spaces; mistakes get their message", () => {
  const task = { mode: "verschluesseln" as const, word: "ZELT", key: 3 };
  expect(secret(task)).toBe("CHOW");
  expect(check(task, " chow ")).toBe(true);
  expect(clean("c h o w")).toBe("CHOW");
  expect(reason(task, "WBIQ", props("verschluesseln"))).toBe("falsche Richtung bei 3");
  expect(reason(task, "DIPX", props("verschluesseln"))).toBe("eins daneben");
  expect(reason(task, "XXXX", props("verschluesseln"))).toBeUndefined();
  const crack = { mode: "knacken" as const, word: "SEE", key: 5 };
  expect(check(crack, "5")).toBe(true);
  expect(reason(crack, "21", props("knacken"))).toBe("falsche Richtung bei 5");
});

test("describe fills in the task", () => {
  const task = { mode: "entschluesseln" as const, word: "BUS", key: 2 };
  expect(describe(task, props("entschluesseln"), "de").task).toBe("Wort BUS, geheim DWU, Schlüssel 2.");
  expect(describe(task, props("entschluesseln"), "de").solution.startsWith("BUS")).toBe(true);
});
