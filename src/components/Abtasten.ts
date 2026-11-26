// The logic of Abtasten.vue, digitising a sound curve to try out (no exercise): the curve is measured at evenly spaced
// points (sampling), and each value is rounded to one of 2^bits levels (quantising). Pure functions, tested in
// Abtasten.test.ts.
import { fill } from "./Bits.ts";

/** The sound curve, a value between −1 and 1 at the time t from 0 to 1. */
export function curve(t: number): number {
  return 0.6 * Math.sin(2 * Math.PI * t) + 0.35 * Math.sin(6 * Math.PI * t + 0.5);
}

/** How many levels `bits` bits can tell apart. */
export const levels = (bits: number) => 2 ** bits;

/** The level (0 … levels − 1) a value is rounded to. */
export function level(value: number, bits: number): number {
  const top = levels(bits) - 1;
  return Math.min(top, Math.max(0, Math.round(((value + 1) / 2) * top)));
}

/** The value a level stands for, between −1 and 1. */
export function valueOf(step: number, bits: number): number {
  const top = levels(bits) - 1;
  return top === 0 ? 0 : (step / top) * 2 - 1;
}

/** The measuring points: their time, the value of the curve there and the value that is stored. */
export function samples(points: number, bits: number): { t: number; value: number; stored: number }[] {
  return Array.from({ length: points }, (_, i) => {
    const t = (i + 0.5) / points;
    const value = curve(t);
    return { t, value, stored: valueOf(level(value, bits), bits) };
  });
}

/** The average distance between the curve and what is stored, over the whole time. */
export function error(points: number, bits: number): number {
  const all = samples(points, bits);
  let sum = 0;
  const steps = 400;
  for (let k = 0; k < steps; k++) {
    const t = (k + 0.5) / steps;
    const index = Math.min(points - 1, Math.floor(t * points));
    sum += Math.abs(curve(t) - (all[index]?.stored ?? 0));
  }
  return sum / steps;
}

/** The line below the curve: {n} measuring points, {s} levels, {b} bits altogether. */
export function summary(line: string, points: number, bits: number): string {
  return fill(line, { n: points, s: levels(bits), b: points * bits });
}
