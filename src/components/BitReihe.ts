// The logic of BitReihe.vue, the row of bit cards to try out: the line below the cards.
import { fill, text, valueOf } from "./Bits.ts";

/** The line below the cards: {b} the row of bits, {n} the number it shows. */
export function result(line: string, bits: readonly number[]): string {
  return fill(line, { b: text(bits), n: valueOf(bits) });
}
