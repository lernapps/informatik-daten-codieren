<script setup lang="ts">
// The exercise "Lege die Zahl n": a row of bit cards, all face down; the learner taps cards to turn them over. It
// shows the row of bits, never the number the cards show, so nothing gives the answer away before "Prüfen". Its
// logic is in BitKarten.ts. It is the input of the task: it emits the row with answer, and the explainer draws
// "Prüfen", checks, gives the feedback, the task number and "Neue Aufgabe".
import { computed, ref } from "vue";
import { dots, fill, text, values } from "./Bits.ts";
import { charOf, generate } from "./BitKarten.ts";

const props = defineProps<{
  /** The task, with {n} for the number to lay out and {c} for the character with that code. */
  task: string;
  /** The number of cards, 5 or 8. */
  cards: number;
  /** The smallest and the largest number a task asks for. */
  min: number;
  max: number;
  /** The name of a card for screen readers, with {v} for its value. */
  card: string;
  /** The word for an open card (1). */
  open: string;
  /** The word for a hidden card (0). */
  closed: string;
  /** The line below the cards, with {b} for the row of bits. */
  line: string;
  /** The app's message for each typical mistake, in the order of about.mistakes, with {n} and {s}. */
  mistakes: string[];
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the answer the cards give now. */
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [number[]] }>();

const current = computed(() => generate(props.seed, props));
const row = computed(() => values(props.cards));
const bits = ref<number[]>(row.value.map(() => 0));

function toggle(index: number): void {
  bits.value[index] = bits.value[index] === 1 ? 0 : 1;
  emit("answer", [...bits.value]);
}
</script>

<template>
  <div class="bit-karten">
    <p>{{ fill(task, { n: current.n, c: charOf(current.n) }) }}</p>
    <div class="bit-karten-row" :class="{ 'bit-karten-many': cards > 5, 'bit-karten-checked': checked }">
      <div v-for="(value, index) in row" :key="value" class="bit-karten-place">
        <span class="bit-karten-value" aria-hidden="true">{{ value }}</span>
        <button
          type="button"
          class="bit-karten-card"
          :class="{ 'bit-karten-open': bits[index] === 1 }"
          :aria-pressed="bits[index] === 1"
          :aria-label="`${card.replace('{v}', String(value))}: ${bits[index] === 1 ? open : closed}`"
          @click="toggle(index)"
        >
          <svg v-if="bits[index] === 1" viewBox="0 0 40 60" aria-hidden="true">
            <circle v-for="(dot, i) in dots(value)" :key="i" :cx="dot.x" :cy="dot.y" :r="dot.r" />
            <text v-if="value > 16" x="20" y="36" text-anchor="middle">{{ value }}</text>
          </svg>
        </button>
        <span class="bit-karten-bit" aria-hidden="true">{{ bits[index] }}</span>
      </div>
    </div>
    <p class="bit-karten-line" aria-live="polite">{{ fill(line, { b: text(bits) }) }}</p>
  </div>
</template>

<style scoped>
.bit-karten-row {
  display: flex;
  gap: 0.5rem;
}

.bit-karten-many {
  gap: 0.25rem;
}

.bit-karten-place {
  display: flex;
  flex: 0 1 3.5rem;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 0;
}

.bit-karten-value,
.bit-karten-bit {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}

.bit-karten-many .bit-karten-value {
  font-size: 0.85rem;
}

.bit-karten-card {
  width: 100%;
  aspect-ratio: 2 / 3;
  min-height: 44px;
  padding: 0;
  border: 2px solid #333;
  border-radius: 6px;
  background: repeating-linear-gradient(45deg, #9aa0a6 0 6px, #b5babf 6px 12px);
  cursor: pointer;
}

.bit-karten-open {
  background: #fff;
}

/* the answer checked: its open cards framed until the learner changes it */
.bit-karten-checked .bit-karten-open {
  box-shadow: 0 0 0 3px var(--page-accent);
}

.bit-karten-card svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: #222;
  font-size: 14px;
  font-weight: 700;
}

.bit-karten-card:focus-visible {
  outline: 3px solid var(--page-accent);
  outline-offset: 2px;
}

.bit-karten-line {
  font-variant-numeric: tabular-nums;
}
</style>
