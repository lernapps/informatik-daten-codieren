<script setup lang="ts">
// A Caesar disc: the outer ring holds the alphabet of the plaintext, the inner ring the alphabet of the ciphertext,
// turned by "−1" and "+1". Below it, the field for the answer. It shows the disc as it is turned, never the answer of
// the task: the learner reads the letters off themself. Its logic is in CaesarScheibe.ts.
import { computed, ref } from "vue";
import { ALPHABET, generate, pairs, taskText } from "./CaesarScheibe.ts";

const props = defineProps<{
  /** What the learner does: encrypt, decrypt, or find the key. */
  mode: "verschluesseln" | "entschluesseln" | "knacken";
  /** The task, with {wort}, {geheim} and {k}. */
  task: string;
  /** The words to draw from (the data file woerter). */
  woerter: { wort: string }[];
  /** The smallest and the largest key a task uses. */
  min: number;
  max: number;
  /** The label of the field. */
  field: string;
  /** The display of the turn, with {k}. */
  turned: string;
  /** The labels of the two buttons. */
  back: string;
  forward: string;
  /** The text for screen readers that names the letters, with {list}. */
  mapping: string;
  /** The app's message for each typical mistake. */
  mistakes: string[];
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the answer. */
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [string | undefined] }>();

const current = computed(() => generate(props.seed, props));
const turn = ref(0);
const typed = ref("");
const letters = ALPHABET.split("");

function rotate(by: number): void {
  turn.value = (turn.value + by + 26) % 26;
}

function input(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  typed.value = value;
  emit("answer", value.trim() === "" ? undefined : value);
}

/** The place of letter `i` on a ring of radius `r`, A at the top, clockwise. */
function at(i: number, r: number): { x: number; y: number } {
  const angle = (i / 26) * 2 * Math.PI;
  return { x: 150 + r * Math.sin(angle), y: 150 - r * Math.cos(angle) };
}

const spoken = computed(() =>
  props.mapping.replace(
    "{list}",
    pairs(turn.value)
      .map(([from, to]) => `${from} ${to}`)
      .join(", "),
  ),
);
</script>

<template>
  <div class="caesar">
    <p>{{ taskText(current, props) }}</p>
    <div class="caesar-disc">
      <svg viewBox="0 0 300 300" aria-hidden="true">
        <circle cx="150" cy="150" r="146" class="caesar-outer" />
        <circle cx="150" cy="150" r="112" class="caesar-inner" />
        <circle cx="150" cy="150" r="80" class="caesar-middle" />
        <line
          v-for="(letter, i) in letters"
          :key="`l${letter}`"
          :x1="at(i + 0.5, 146).x"
          :y1="at(i + 0.5, 146).y"
          :x2="at(i + 0.5, 112).x"
          :y2="at(i + 0.5, 112).y"
          class="caesar-tick"
        />
        <text
          v-for="(letter, i) in letters"
          :key="`o${letter}`"
          :x="at(i, 129).x"
          :y="at(i, 129).y + 6"
          class="caesar-letter"
        >
          {{ letter }}
        </text>
        <text
          v-for="(letter, i) in letters"
          :key="`i${letter}`"
          :x="at(i, 96).x"
          :y="at(i, 96).y + 5"
          class="caesar-letter caesar-secret"
        >
          {{ letters[(i + turn) % 26] }}
        </text>
        <text x="150" y="157" class="caesar-key">{{ turn }}</text>
      </svg>
      <p class="caesar-hidden" aria-live="polite">{{ spoken }}</p>
    </div>
    <div class="caesar-controls">
      <button type="button" class="caesar-button" @click="rotate(-1)">{{ back }}</button>
      <span class="caesar-turned">{{ turned.replace("{k}", String(turn)) }}</span>
      <button type="button" class="caesar-button" @click="rotate(1)">{{ forward }}</button>
    </div>
    <label class="caesar-field" :class="{ 'caesar-checked': checked }">
      <span>{{ field }}</span>
      <input
        :value="typed"
        :inputmode="mode === 'knacken' ? 'numeric' : 'text'"
        autocapitalize="characters"
        autocomplete="off"
        spellcheck="false"
        @input="input"
      />
    </label>
  </div>
</template>

<style scoped>
.caesar-disc {
  max-width: 300px;
}

.caesar-disc svg {
  display: block;
  width: 100%;
  height: auto;
}

.caesar-outer {
  fill: #fff;
  stroke: #333;
  stroke-width: 2;
}

.caesar-inner {
  fill: #fdf1d6;
  stroke: #333;
  stroke-width: 2;
}

.caesar-middle {
  fill: #fff;
  stroke: #333;
  stroke-width: 1.5;
}

.caesar-tick {
  stroke: #9aa0a6;
  stroke-width: 1;
}

.caesar-letter {
  fill: #222;
  font-family: sans-serif;
  font-size: 15px;
  font-weight: 700;
  text-anchor: middle;
}

.caesar-secret {
  fill: #8a2b00;
  font-size: 13px;
}

.caesar-key {
  fill: #222;
  font-family: sans-serif;
  font-size: 22px;
  font-weight: 700;
  text-anchor: middle;
}

.caesar-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.caesar-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin: 0.5rem 0;
}

.caesar-button {
  min-width: 44px;
  min-height: 44px;
  padding: 0 1rem;
  border: 1px solid var(--page-border);
  border-radius: 6px;
  background: var(--page-surface);
  color: var(--page-text);
  font-weight: 700;
}

.caesar-turned {
  font-weight: 600;
}

.caesar-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-width: 20rem;
}

.caesar-field input {
  min-height: 44px;
  padding: 0 0.5rem;
  border: 1px solid var(--page-border);
  border-radius: 6px;
  background: var(--page-background);
  color: var(--page-text);
  font-family: ui-monospace, monospace;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.caesar-checked input {
  border-color: var(--page-accent);
}
</style>
