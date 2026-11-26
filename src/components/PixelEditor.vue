<script setup lang="ts">
// The exercise "Male das Bild nach dem Code": a grid of 6 × 6 pixels, all white, and next to it the code of a picture,
// row by row. Tapping a pixel makes it black (a small 1 in it) or white again (0). Its logic is in PixelEditor.ts. It
// emits the painted rows with answer; the explainer draws "Prüfen", checks and gives the feedback.
import { computed, ref } from "vue";
import { code, generate, SIZE } from "./PixelEditor.ts";

const props = defineProps<{
  /** The task, the same for every picture. */
  task: string;
  /** How the code is shown: rows of 0 and 1, or the numbers of the rows. */
  code: "bits" | "zahl";
  /** The pictures to draw from (the data file bilder). */
  bilder: { name: string; zeilen: number[] }[];
  /** The heading of the code beside the grid. */
  codeLabel: string;
  /** The line above the numbers when the code is numbers, e.g. the values of the cards. */
  values?: string;
  /** The name of a pixel for screen readers, with {r} for its row and {c} for its column. */
  cell: string;
  /** The words for a black and a white pixel. */
  black: string;
  white: string;
  /** The label of the button that makes every pixel white. */
  reset: string;
  /** The app's message for each typical mistake. */
  mistakes: string[];
  /** The solution's sentence, with {name}. */
  shows: string;
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the answer the grid gives now. */
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [number[]] }>();

const current = computed(() => generate(props.seed, props));
const lines = computed(() => code(current.value, props.code));
const grid = ref<boolean[][]>(Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => false)));

const rows = () => grid.value.map((row) => row.reduce((sum, on, c) => sum + (on ? 2 ** (SIZE - 1 - c) : 0), 0));

function toggle(r: number, c: number): void {
  const row = grid.value[r];
  if (row === undefined) return;
  row[c] = !row[c];
  emit("answer", rows());
}

function clear(): void {
  grid.value = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => false));
  emit("answer", rows());
}
</script>

<template>
  <div class="pixel-editor">
    <p>{{ task }}</p>
    <p class="pixel-editor-label">{{ codeLabel }}</p>
    <p v-if="props.code === 'zahl' && values" class="pixel-editor-values">{{ values }}</p>
    <div class="pixel-editor-work">
      <ul class="pixel-editor-lines">
        <li v-for="(line, r) in lines" :key="r">{{ line }}</li>
      </ul>
      <div class="pixel-editor-grid" :class="{ 'pixel-editor-checked': checked }">
        <template v-for="(row, r) in grid" :key="r">
          <button
            v-for="(on, c) in row"
            :key="`${r}-${c}`"
            type="button"
            class="pixel-editor-pixel"
            :class="{ 'pixel-editor-black': on }"
            :aria-pressed="on"
            @click="toggle(r, c)"
          >
            <span class="pixel-editor-hidden"
              >{{ cell.replace("{r}", String(r + 1)).replace("{c}", String(c + 1)) }}: {{ on ? black : white }},
            </span>
            <span>{{ on ? 1 : 0 }}</span>
          </button>
        </template>
      </div>
    </div>
    <div class="pixel-editor-actions">
      <button type="button" class="pixel-editor-reset" @click="clear">{{ reset }}</button>
    </div>
  </div>
</template>

<style scoped>
.pixel-editor-work {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.pixel-editor-label,
.pixel-editor-values {
  margin: 0 0 0.25rem;
  font-weight: 600;
}

.pixel-editor-values {
  font-size: 0.85rem;
}

.pixel-editor-lines {
  margin: 2px 0 0;
  padding: 0;
  list-style: none;
  font-family: ui-monospace, monospace;
  font-size: 0.875rem;
}

.pixel-editor-lines li {
  height: 44px;
  line-height: 44px;
}

.pixel-editor-grid {
  display: grid;
  grid-template-columns: repeat(6, 40px);
  grid-auto-rows: 44px;
  gap: 0;
  border: 2px solid #333;
  width: max-content;
}

.pixel-editor-pixel {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 2px 4px;
  border: 1px solid #9aa0a6;
  border-radius: 0;
  background: #fff;
  color: #555;
  font-size: 0.7rem;
  cursor: pointer;
}

.pixel-editor-black {
  background: #111;
  color: #ddd;
}

.pixel-editor-checked .pixel-editor-black {
  background: #333;
}

.pixel-editor-pixel:focus-visible {
  outline: 3px solid var(--page-accent);
  outline-offset: -3px;
}

.pixel-editor-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.pixel-editor-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.pixel-editor-reset {
  min-height: 44px;
  padding: 0 1rem;
  border: 1px solid var(--page-border);
  border-radius: 6px;
  background: var(--page-surface);
  color: var(--page-text);
}
</style>
