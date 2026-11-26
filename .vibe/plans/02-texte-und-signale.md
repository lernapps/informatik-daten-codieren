---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, as in the app's first plan. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: explore
# prePushFailures: failed pre-push runs of this increment, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: {}
---

# Increment: texte-und-signale

<!--
For you, the assistant. One increment of a published app: new competencies, chapters, pages, rounds, questions, or a
correction. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Content method and Retrospective, in the creator's
  language. Delete the comment of a section once the section is filled.
- The first version's decisions stand: archetype, content method, content guide. Never change an earlier plan.
- Work on the branch `increment/<NN>-<short name>`. Until Commit everything is local: push nothing.
-->

*Started 2026-11-26. Explore, Plan, Code, Commit.*

## Goal

Kapitel 5 „Texte und Signale codieren“ (Stufe 7-8) als Inkrement: Lernende codieren Zeichen mit einer Codetabelle
(ASCII, Unicode) als Bytes und erklären, wie aus analogen Signalen digitale Daten werden. Dazu auf „Bit und Byte“
(5-6): Bit → Byte (÷ 8) üben und Mbit/s von MB abgrenzen (Auftrag des Orchestrators).

## Key decisions

- Gleicher Archetyp und Strang; neues Kapitel `texte` mit zwei Seiten, je ein Baustein. Keine Wiederholung nötig:
  `bit-und-byte` und `binaersystem` werden in Kapitel 2 geübt.
- Geschichte für 7-8 als Chat der Klasse (Nachrichten), dieselben Figuren ein Jahr später (7b), keine neuen Bilder der
  Kinder nötig (guess).
- Zeichencodierung mit BitKarten (8 Karten), erweitert um die Aufgabe „Lege den Buchstaben {c}“ (Code 65-90).
- Analog/digital mit einer neuen Komponente `Abtasten` (zum Ausprobieren, keine Übung): Tonkurve, Regler für
  Messpunkte und Bits.
- Runtime: `lernapps update` brachte tooling 0.20.1 mit app-templates 0.21.0. Die angekündigten Neuerungen (`image`
  je Sprache, `tasks: { start: first }`) sind dort noch nicht enthalten; ich nutze sie nicht.

## Notes

- `zeichencodierung` (7-8/1, requires bit-und-byte): „Ich kann erklären, wie Buchstaben und Zeichen mit einem Code
  wie ASCII oder Unicode als Binärzahlen gespeichert werden.“ Seite `texte/zeichen`.
- `analog-und-digital` (7-8/1, requires binaersystem): „Ich kann den Unterschied zwischen analoger und digitaler
  Darstellung erklären und Beispiele für das Digitalisieren nennen.“ Seite `texte/analog`.
- Quellen (geöffnet 2026-11-26): Unicode 18.0.0, https://www.unicode.org/versions/latest/ (172 808 Zeichen); Code von
  A-Z = U+0041-U+005A (65-90), Leerzeichen U+0020 (32), aus dem Unicode-Block Basic Latin (= ASCII); RFC 3629 UTF-8,
  https://www.rfc-editor.org/rfc/rfc3629.txt (1 Byte für U+0000-007F, 2 Bytes bis 07FF, 4 Bytes ab U+10000).
- Fehlvorstellungen: Computer speichert Buchstaben „als Bild“; ein Zeichen = 1 Bit; Ä hat einen ASCII-Code;
  digital = genauer immer; mehr Messpunkte ändert nichts; Mbit und MB gleich.
- Umfang: ASCII nur A-Z und Leerzeichen; Unicode nur als Ausblick (Ä, € und Emoji brauchen mehr Bytes); Abtasten mit
  2-32 Messpunkten und 1-4 Bit; keine Dateiformate (MP3, #492).

## Explore

<!--
- All content questions belong here; Plan maps the answers onto the app. Ask; write no code.
- Skip what earlier answers or the app already tell. At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Read the README of the archetype's template (its path is in skill `lernapps-app`): what the app can do now.
      Tell the creator what is new, if it matters for this increment.
- [x] Load the content guide `.agents/skills/app-content/SKILL.md` and read the earlier plans in `.vibe/plans/`: what
      the app teaches, how its content is made, what is open.
- [x] Interview, one topic per question, the creator's words under "Answers": which competencies, chapters or rounds,
      for which school years; hurdles and examples; the amount; any change of look and feel or of terms. No answer:
      ask once more, then write your assumption with "(guess)".
- [x] Load skill `lernapps-content-research`. Research what the content guide does not cover. Write under "Notes":
      the new competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" the didactic approach per competency and the scope (in, out, data range).
- [x] The increment needs a kind of content the guide does not cover (a new page structure, screen, component or kind
      of exercise): load skills `lernapps-explainer-design` and `lernapps-exercise-patterns`. Else skip this task.
- [ ] **Checkpoint:** research. Show in plain words: the new competencies by chapter, the didactic approach, the
      scope, every "(guess)", the sources and what is unchecked. Stop and wait. Changes: change them, then ask again.

### Answers

<!-- The creator's answers, in their words, one bullet each. -->

## Plan

<!--
- Map the new content onto the app with the guide's patterns. The creator confirms the plan in one read.
- After the yes you work on your own.
-->

### Tasks

- [ ] Load skill `lernapps-content-growth`. Add the tasks of Code as slices, one per competency, in the guide's
      order, one call each: `npx --no -- lernapps plan add --at slices "<task>"`. Say in each which sub-agent may
      write it in parallel, if any.
- [ ] Write "Content method": the guide's patterns, figures and components per slice. Anything new: map it as skill
      `lernapps-explainer-design` says, and say why the guide's patterns do not fit.
- [ ] Draw a sketch of each new component or interactive exercise, in `.vibe/sketches/`.
- [ ] Show the creator, short: goal, new competencies by chapter, slices; in plain words what learners see and do and
      what is new. At most 2 questions.
- [ ] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.

### Content method

<!-- One line each: the guide's patterns, figures and components used, and where; anything new, what it does and
cannot. Something new goes into the guide in the slice that adds it. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

## Code

<!--
- Build locally on the branch, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first.
-->

### Tasks

- [ ] `git switch -c increment/<NN>-<short name>` from `main`. Commit this plan on it.
- [ ] Load skill `lernapps-cli`. Update the app as its section "Update" says. Commit the update alone and fix its
      findings before any content. The update replaces the `lernapps-*` skills: read again those you use.
- [ ] Load skill `lernapps-explainer` and the content guide.
- [ ] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [ ] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
<!-- tasks: slices: one per competency, as written in Plan -->
- [ ] **Checkpoint:** the pattern page, after the first slice. A slice in a pattern the app already has: show it to
      the creator and go on. A new pattern: load skill `lernapps-learner-check`, do its learner check, fix what it
      finds, then ask the creator whether the others may follow it, and wait.
- [ ] Update the content guide so that it describes the app as it is now (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every changed screen, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.

## Commit

<!--
- Publish with the creator's yes. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
-->

### Tasks

- [ ] If pages or exercises changed, load skill `lernapps-explainer-self-assessment` and update the self-assessment
      as it says. Commit.
- [ ] Load skill `lernapps-github`. Push the branch, open the preview pull request and see its checks to green, as it
      says.
- [ ] **Checkpoint:** publish. Show what the increment adds and the preview link. Ask whether it may go online. Stop
      and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: the pull request squash-merged into
      `main`, the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm the new content. Never use a derived address.
- [ ] The app is listed and its entry changes (school years, summary): load skill `lernapps-listing` and write the
      changed entry. Else skip this task.
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it. A push of only `.vibe/` publishes nothing.
- [ ] The entry changed: open the pull request to the catalog as skill `lernapps-listing` says, without asking first,
      and see it to "bestanden". Else skip this task: `npx --no -- lernapps plan skip "entry unchanged"`.
- [ ] **Checkpoint:** list. Tell the creator the result: the pull request and its result, or, when the entry did not
      change, that the catalog takes over the app by itself. Tick it with their reply.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

## Retrospective

<!-- At the end of Commit. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, content guide, messages or answers, and your choice. "None" if none. -->
