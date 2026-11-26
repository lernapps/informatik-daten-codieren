<script setup lang="ts">
// Digitising a sound curve, to try out (no exercise): two sliders set the number of measuring points and the bits per
// point; the stored values are drawn as a staircase with dots over the curve, the levels as faint lines. The line
// below names points, levels and bits and is announced when a slider changes. Its logic is in Abtasten.ts.
import { computed, ref } from "vue";
import { curve, levels, samples, summary, valueOf } from "./Abtasten.ts";

const props = defineProps<{
  /** The label of the slider for the measuring points. */
  pointsLabel: string;
  /** The label of the slider for the bits per point. */
  bitsLabel: string;
  /** The line below, with {n} points, {s} levels and {b} bits altogether. */
  line: string;
  /** The names of the two lines in the legend: the curve and the stored values. */
  curveLabel: string;
  storedLabel: string;
}>();

const points = ref(8);
const bits = ref(2);

const W = 320;
const H = 160;
const x = (t: number) => 10 + t * (W - 20);
const y = (v: number) => H / 2 - v * (H / 2 - 10);

const wave = Array.from({ length: 121 }, (_, k) => {
  const t = k / 120;
  return `${k === 0 ? "M" : "L"}${x(t).toFixed(1)} ${y(curve(t)).toFixed(1)}`;
}).join(" ");

const points_ = computed(() => samples(points.value, bits.value));
const stairs = computed(() =>
  points_.value
    .map((point, i) => {
      const from = x(i / points.value);
      const to = x((i + 1) / points.value);
      return `${i === 0 ? "M" : "L"}${from.toFixed(1)} ${y(point.stored).toFixed(1)} L${to.toFixed(1)} ${y(point.stored).toFixed(1)}`;
    })
    .join(" "),
);
const grid = computed(() => Array.from({ length: levels(bits.value) }, (_, k) => y(valueOf(k, bits.value))));
const said = computed(() => summary(props.line, points.value, bits.value));
</script>

<template>
  <div class="abtasten">
    <svg :viewBox="`0 0 ${W} ${H}`" class="abtasten-figure" aria-hidden="true">
      <rect x="0" y="0" :width="W" :height="H" fill="#fff" />
      <line v-for="(g, k) in grid" :key="`g${k}`" x1="10" :x2="W - 10" :y1="g" :y2="g" class="abtasten-level" />
      <path :d="wave" class="abtasten-curve" />
      <path :d="stairs" class="abtasten-stairs" />
      <circle
        v-for="(point, i) in points_"
        :key="`p${i}`"
        :cx="x(point.t)"
        :cy="y(point.stored)"
        r="3.5"
        class="abtasten-dot"
      />
    </svg>
    <p class="abtasten-legend">
      <span class="abtasten-item"><span class="abtasten-key abtasten-key-curve"></span>{{ curveLabel }}</span>
      <span class="abtasten-item"><span class="abtasten-key abtasten-key-stored"></span>{{ storedLabel }}</span>
    </p>
    <div class="abtasten-controls">
      <label class="abtasten-control">
        <span>{{ pointsLabel }}: {{ points }}</span>
        <input v-model.number="points" type="range" min="2" max="32" step="1" />
      </label>
      <label class="abtasten-control">
        <span>{{ bitsLabel }}: {{ bits }}</span>
        <input v-model.number="bits" type="range" min="1" max="4" step="1" />
      </label>
    </div>
    <p class="abtasten-line" aria-live="polite">{{ said }}</p>
  </div>
</template>

<style scoped>
.abtasten-figure {
  display: block;
  width: 100%;
  max-width: 32rem;
  height: auto;
  border: 1px solid var(--page-border);
}

.abtasten-level {
  stroke: #ddd;
  stroke-width: 1;
}

.abtasten-curve {
  fill: none;
  stroke: #2f5fb3;
  stroke-width: 2.5;
}

.abtasten-stairs {
  fill: none;
  stroke: #c0392b;
  stroke-width: 2;
  stroke-dasharray: 6 3;
}

.abtasten-dot {
  fill: #c0392b;
}

.abtasten-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  align-items: center;
}

.abtasten-item {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  white-space: nowrap;
}

.abtasten-key {
  display: inline-block;
  width: 1.5rem;
  height: 0;
  border-top: 3px solid #2f5fb3;
}

.abtasten-key-stored {
  border-top: 3px dashed #c0392b;
}

.abtasten-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.abtasten-control {
  display: flex;
  flex: 1 1 12rem;
  flex-direction: column;
  gap: 0.25rem;
}

.abtasten-control input {
  min-height: 44px;
  accent-color: var(--page-accent);
}

.abtasten-line {
  font-weight: 600;
}
</style>
