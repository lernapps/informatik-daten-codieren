// Shared helpers of the bit cards (BitReihe, BitKarten): the values of a row of cards, the number a row of bits
// shows, and where the dots of a card lie. A row is written as in a binary number: the largest card on the left.

/** The values of a row of `cards` cards, largest first: 5 cards give 16, 8, 4, 2, 1. */
export function values(cards: number): number[] {
  return Array.from({ length: cards }, (_, i) => 2 ** (cards - 1 - i));
}

/** The number a row of bits shows (largest card first). */
export function valueOf(bits: readonly number[]): number {
  return bits.reduce((sum, bit, i) => sum + (bit === 1 ? 2 ** (bits.length - 1 - i) : 0), 0);
}

/** The bits of `n` on `cards` cards, largest first. */
export function bitsOf(n: number, cards: number): number[] {
  return values(cards).map((value) => (Math.floor(n / value) % 2 === 1 ? 1 : 0));
}

/** A row of bits as text, e.g. "01101". */
export const text = (bits: readonly number[]) => bits.join("");

/** The places of the dots of a card of `value` in a box of 40 × 60, in a grid that fills the card. */
export function dots(value: number): { x: number; y: number; r: number }[] {
  if (value > 16) return [];
  const columns = value <= 2 ? 1 : value <= 8 ? 2 : 4;
  const rows = Math.ceil(value / columns);
  const r = value <= 4 ? 5 : value <= 8 ? 4 : 3;
  return Array.from({ length: value }, (_, i) => {
    const column = i % columns;
    const row = Math.floor(i / columns);
    return { x: (40 / (columns + 1)) * (column + 1), y: (60 / (rows + 1)) * (row + 1), r };
  });
}

/** A text of the props with {name} filled in. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (whole, name: string) =>
    values[name] === undefined ? whole : String(values[name]),
  );
}
