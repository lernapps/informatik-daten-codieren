<script setup lang="ts">
// A row of bit cards to try out, no exercise: the learner turns cards over and sees the row of bits and the number it
// shows. With pixel, an open card is a black square and the row is a row of pixels (chapter "bilder"), without
// values and number. Its logic is in Bits.ts and BitReihe.ts.
import { computed, ref } from "vue";
import { dots, values } from "./Bits.ts";
import { result } from "./BitReihe.ts";

const props = defineProps<{
  /** The number of cards, 5 or 8. */
  cards: number;
  /** Whether the row is a row of pixels: an open card is a black square. */
  pixel?: boolean;
  /** The name of a card for screen readers, with {v} for its value and {i} for its place from the left. */
  card: string;
  /** The word for an open card (1). */
  open: string;
  /** The word for a hidden card (0). */
  closed: string;
  /** The line below the cards, with {b} for the row of bits and {n} for the number. */
  line: string;
  /** The label of the button that turns every card face down. */
  reset: string;
}>();

const row = computed(() => values(props.cards));
const bits = ref<number[]>(row.value.map(() => 0));
const shown = computed(() => result(props.line, bits.value));

function toggle(index: number): void {
  bits.value[index] = bits.value[index] === 1 ? 0 : 1;
}

function hideAll(): void {
  bits.value = row.value.map(() => 0);
}
</script>

<template>
  <div class="bit-reihe">
    <div class="bit-reihe-row" :class="{ 'bit-reihe-many': cards > 5 }">
      <div v-for="(value, index) in row" :key="value" class="bit-reihe-place">
        <span v-if="!pixel" class="bit-reihe-value" aria-hidden="true">{{ value }}</span>
        <button
          type="button"
          class="bit-reihe-card"
          :class="{ 'bit-reihe-open': bits[index] === 1, 'bit-reihe-pixel': pixel }"
          :aria-pressed="bits[index] === 1"
          :aria-label="`${card.replace('{v}', String(value)).replace('{i}', String(index + 1))}: ${bits[index] === 1 ? open : closed}`"
          @click="toggle(index)"
        >
          <svg v-if="!pixel && bits[index] === 1" viewBox="0 0 40 60" aria-hidden="true">
            <circle v-for="(dot, i) in dots(value)" :key="i" :cx="dot.x" :cy="dot.y" :r="dot.r" />
            <text v-if="value > 16" x="20" y="36" text-anchor="middle">{{ value }}</text>
          </svg>
        </button>
        <span class="bit-reihe-bit" aria-hidden="true">{{ bits[index] }}</span>
      </div>
    </div>
    <p class="bit-reihe-line" aria-live="polite">{{ shown }}</p>
    <div class="bit-reihe-actions">
      <button type="button" class="bit-reihe-reset" @click="hideAll">{{ reset }}</button>
    </div>
  </div>
</template>

<style scoped>
.bit-reihe-row {
  display: flex;
  gap: 0.5rem;
}

.bit-reihe-many {
  gap: 0.25rem;
}

.bit-reihe-place {
  display: flex;
  flex: 0 1 3.5rem;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 0;
}

.bit-reihe-value,
.bit-reihe-bit {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}

.bit-reihe-card {
  width: 100%;
  aspect-ratio: 2 / 3;
  min-height: 44px;
  padding: 0;
  border: 2px solid #333;
  border-radius: 6px;
  background: repeating-linear-gradient(45deg, #9aa0a6 0 6px, #b5babf 6px 12px);
  cursor: pointer;
}

.bit-reihe-open {
  background: #fff;
}

.bit-reihe-pixel {
  aspect-ratio: 1;
  border-radius: 0;
  background: #fff;
}

.bit-reihe-pixel.bit-reihe-open {
  background: #111;
}

.bit-reihe-card svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: #222;
  font-size: 16px;
  font-weight: 700;
}

.bit-reihe-card:focus-visible {
  outline: 3px solid var(--page-accent);
  outline-offset: 2px;
}

.bit-reihe-line {
  font-variant-numeric: tabular-nums;
}

.bit-reihe-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.bit-reihe-reset {
  min-height: 44px;
  padding: 0 1rem;
  border: 1px solid var(--page-border);
  border-radius: 6px;
  background: var(--page-surface);
  color: var(--page-text);
}
</style>
