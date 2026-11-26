---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: explore
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: {}
---

# Plan: informatik-daten-codieren, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-26. Explore, Plan, Code, Commit.*

## Goal

Kinder der Klassen 5-6 stellen dieselbe Information (die Klassenfahrt der Klasse 6b) immer wieder neu dar: als
Tabelle, Diagramm und Baum, als Bitfolge mit der Bit-Kartenreihe, als Pixelbild und als Geheimbotschaft. Sie lernen,
dass ein Computer am Ende alles mit 0 und 1 codiert (Issue lernapps/apps#491, Welle 1: Kapitel 1-4, 13 Bausteine).

## Key decisions

- Archetyp `explainer`: Das Issue verlangt einen Explainer im Format 2; die Kinder brauchen Erklärseiten mit Bildern
  und Übungen dazwischen, die interaktiven Umgebungen sind Komponenten auf den Seiten.
- Strang `informatik/daten`, eine Strang-App (Karte: `explainerFocus: strand`).
- Welle 1 baut nur die Kapitel 1-4 (5-6); Kapitel 5 (7-8: `zeichencodierung`, `analog-und-digital`) wird mitgeplant
  und kommt als Inkrement auf `increment/7-8`.
- Sprache nur Deutsch, einfache Sprache, „du“ (Gemeinsame Regeln #509, Abschnitt 2).
- Keine Sammel-Wiederholung in Kapitel 1-4 nötig: Alle Voraussetzungen der 13 Bausteine liegen im Explainer selbst
  (`information-und-daten` hat keine Voraussetzung).

## Notes

### Strang und Bausteine (Lernlandkarte informatik.json, gelesen 2026-11-26)

Strang `informatik/daten` („Information und Daten“). Alle 13 Bausteine haben `practisedBy: []` (Lücken).

| Kap. | Seite | Baustein | Stufe/Schritt | requires |
|---|---|---|---|---|
| 1 | Information und Daten | `information-und-daten` | 5-6/1 | – |
| 1 | Daten deuten | `daten-interpretieren` | 5-6/2 | information-und-daten |
| 1 | Tabelle, Diagramm, Bild | `darstellungsformen-von-information` | 5-6/2 | information-und-daten |
| 1 | Der Baum | `baum` | 5-6/3 | darstellungsformen |
| 2 | Codes im Alltag | `codierung-im-alltag` | 5-6/2 | information-und-daten |
| 2 | Die Bit-Karten | `binaersystem` | 5-6/3 | codierung-im-alltag |
| 2 | Zahlen in Bits verwandeln | `dezimal-in-binaer` | 5-6/4 | binaersystem |
| 2 | Bit und Byte | `bit-und-byte` | 5-6/4 | binaersystem |
| 3 | Bilder aus Pixeln | `pixelgrafik` | 5-6/3 | codierung-im-alltag |
| 3 | Pixel oder Vektor? | `pixel-und-vektorgrafik` | 5-6/4 | pixelgrafik |
| 4 | Die Geheimschrift | `verschluesselung-grundidee` | 5-6/3 | codierung-im-alltag |
| 4 | Die Caesar-Scheibe | `caesar-verschluesselung` | 9-10/1 (Ausnahme laut Issue) | verschluesselung-grundidee |
| 4 | Wie sicher ist das? | `verschluesselung-bewerten` | 5-6/4 | verschluesselung-grundidee |
| 5 (später) | Zeichen werden Zahlen | `zeichencodierung` | 7-8/1 | bit-und-byte |
| 5 (später) | Analog und digital | `analog-und-digital` | 7-8/1 | binaersystem |

### Didaktik

- Eine Information, viele Darstellungen: Die Klassenfahrt der 6b kehrt auf jeder Seite wieder.
- Bit-Kartenreihe (unplugged: Karten mit 1, 2, 4, 8, 16 Punkten, offen = 1, verdeckt = 0) als tragendes Werkzeug:
  Kapitel 2 zählt und rechnet mit ihr, Kapitel 3 macht aus einer Kartenreihe eine Pixelzeile, Kapitel 5 verlängert
  sie auf 8 Karten (ein Byte).
- Übungen nach exercise-patterns, Informatik: Umrechnen als `generated` mit gezogener Zahl und dem Fehler „von der
  falschen Seite gelesen“; Zuordnen als `matching`; Bewerten als `true-false`/`single-choice` mit Grund.

### Weg zum Baustein und Fehlvorstellung (je Baustein)

- `information-und-daten`: Die Kinder bekommen einen Zettel „6b · 12.5. · 8:00 · Bahnhof“ ohne Erklärung und
  merken: ohne Zusammenhang sagt er nichts. Fehler: „Daten sind schon Information.“
- `daten-interpretieren`: Dieselbe Zahl (21, 12.5) in drei Zusammenhängen deuten. Fehler: eine Zahl hat nur eine
  Bedeutung; Einheit/Spalte überlesen.
- `darstellungsformen-von-information`: Die Daten der Klassenfahrt (Wahl des Ziels) selbst als Tabelle und
  Säulendiagramm sehen und je Frage die schnellste Form wählen. Fehler: „Ein Diagramm ist immer besser.“
- `baum`: Aus der Gliederung der Fahrt (Klasse → Zimmer → Kinder) und einem Turnierbaum Wurzel, Knoten, Kanten,
  Blätter selbst finden. Fehler: Wurzel steht unten wie beim echten Baum; ein Knoten hat zwei Eltern.
- `codierung-im-alltag`: Ampel, Morsezeichen, Barcode: eine kurze Nachricht mit gegebener Morsetabelle codieren und
  decodieren. Fehler: Code = Geheimschrift; ohne Codetabelle decodieren wollen.
- `binaersystem`: Mit der Bit-Kartenreihe (1, 2, 4, 8, 16) zählen; die Kinder entdecken, dass jede Karte doppelt so
  viel ist wie die rechte daneben; Binär → Dezimal. Fehler: von der falschen Seite lesen; Ziffern addieren statt
  Stellenwerte.
- `dezimal-in-binaer`: Mit den Karten von links „passt die Karte noch?“ (größte zuerst), dann fortgesetztes Teilen
  durch 2 (Reste von unten nach oben). Fehler: Reste in falscher Reihenfolge; eine Karte zu viel.
- `bit-und-byte`: 8 Karten = 1 Byte; wie viele Byte hat die Nachricht, wie viele Kilobyte ein Foto. Fehler: 1 Byte =
  10 Bit; Kilobyte = 1024 Byte (hier: 1000 laut Regeln).
- `pixelgrafik`: Eine Kartenreihe wird eine Pixelzeile (1 = schwarz, 0 = weiß); ein Bild aus Zahlen decodieren und
  im Pixel-Editor selbst codieren; Farbwerte als Zahlen. Fehler: Zeilen/Spalten vertauscht; „das Bild speichert
  Formen“.
- `pixel-und-vektorgrafik`: Ein Pixelbild und dasselbe Bild als Vektor vergrößern: Treppen vs. glatt; für Zweck
  (Foto, Logo, Plakat) die Grafikart begründen. Fehler: „Vektor ist immer besser“, auch für Fotos.
- `verschluesselung-grundidee`: Die Klassenfahrt-Nachricht soll vor der Parallelklasse geheim bleiben: mit einer
  Skytale (Streifen um einen Stab, Schlüssel = Zahl der Zeilen) ver- und entschlüsseln. Fehler: Verfahren und
  Schlüssel verwechseln; ein Code ist schon geheim.
- `caesar-verschluesselung`: Mit der Caesar-Scheibe (Simulation) die Nachricht mit Schlüssel 3 verschlüsseln und
  zurück. Fehler: beim Entschlüsseln in die falsche Richtung drehen; nach Z nicht bei A weitermachen.
- `verschluesselung-bewerten`: Eine Gruppe knackt eine Caesar-Nachricht ohne Schlüssel (nur 25 Schlüssel zu
  probieren); Vergleich mit einem gemischten Alphabet (sehr viele Schlüssel). Fehler: „Ein unbekanntes Verfahren ist
  sicher“; „Langer Text = sicher“. Nur Schutz, keine Angriffsanleitung auf echte Systeme.

### Umfang

- Drin: 13 Bausteine, je eine Seite; Zahlen bis 31 mit 5 Karten (Kapitel 2), bis 255 mit 8 Karten nur in Bit und
  Byte; Pixelbilder schwarz-weiß 8×8, Farbe nur als Ausblick mit wenigen Farbnummern; Caesar nur mit den 26
  Großbuchstaben A-Z (Ä, Ö, Ü, ß werden AE, OE, UE, SS); Einheiten Bit, Byte, KB, MB, GB mit Faktor 1000.
- Nicht drin: Graph, Hypertext, Feld (#496); Tabellen zum Rechnen (#494) und Speichern (#498); KI (#493); Dateien
  und Ordner (#492); ASCII/Unicode und Analog-digital (Kapitel 5, später); Kibibyte; moderne Kryptografie (7-10 laut
  GI ID-12), außer als Ausblick „so schützt du dich“.
- Sprache: nur Deutsch.

### Quellen

- Lernlandkarte Informatik, https://lernapps.net/apps/map/informatik.json (Quelle der Karte: GI-Bildungsstandards).
- GI: Bildungsstandards Informatik für die Sekundarstufe I (2025), doi:10.18420/rec2025_052, PDF bei mnu.de, gelesen:
  S. 16, Inhaltsbereich „Informationen und Daten“, ID-1 bis ID-3 (5-6), ID-12 Kryptografie (7-10). Begriffe
  Information/Daten nach S. 16.
- Lehrpläne HE, BY, NRW: Die Karte enthält noch keine Einordnungen (`curricula: []`); nicht geprüft.

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [ ] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.

### Answers

<!-- The interview: per topic the creator's answer, in their words. Keep the topics. -->

Der „Creator“ ist hier das Issue lernapps/apps#491 mit den gemeinsamen Regeln des Epics #509; Rückfragen gehen an den
Orchestrator.

- Goal: Issue: „Ich verstehe, dass dieselbe Information auf viele Arten dargestellt werden kann, als Tabelle, Baum,
  Bitfolge, Pixelbild oder Geheimschrift, und dass ein Computer am Ende alles mit 0 und 1 codiert.“
- Learners: Issue: Informatik, „Stufen 5-6, 7-8“; Welle 1 nur 5-6. Vorwissen: keins aus Informatik.
- Model and focus: Issue: „Das tragende Werkzeug ist eine Bit-Kartenreihe“; interaktive Umgebungen „Bit-Karten,
  Pixel-Editor, Caesar-Scheibe“ als Vue-Komponenten (Regeln 3). Ein Vorbild aus dem Katalog nennt der Auftrag nicht.
- Hurdles: Issue nennt keine; aus dem Auftrag abgeleitet (guess): Binärzahl von der falschen Seite lesen; Bit und
  Byte verwechseln; Daten für schon Information halten; Code und Verschlüsselung gleichsetzen.
- Content: Issue: „Er ist fertig entworfen und kann ohne Rückfrage umgesetzt werden.“ Ich schreibe die Inhalte aus
  Karte und Quellen.
- Amount: Issue: „Welle 1 (Stufe 5-6): die Kapitel 1 bis 4 mit 13 Bausteinen“.
- Languages: Regeln 2: „Deutsch in einfacher Sprache (ISO 24495), Lernende mit ‚du‘ anreden.“
- Look and feel: fixed by the archetype (Runtime: ruhig wie ein Arbeitsblatt, Dark Mode nach Gerät).
- Terms: Regeln 2: GI-Begriffe (Bit, Byte, …), „1 Byte = 8 Bit; Kilobyte = 1000 Byte“; wiederkehrende Bilder
  „Klassenfahrt-Nachricht (#491), Baum (#491, #492, #496)“.
- Finding the app: der Katalogeintrag macht der Orchestrator (Auftrag, Punkt 6).

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [ ] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [ ] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [ ] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [ ] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [ ] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [ ] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [ ] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.

### Content method

<!-- One line each: the patterns and where; the figures and how they are made; the data files; each component, what it
checks and what it cannot; how a later agent adds a chapter. It becomes the content guide in Code. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [ ] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [ ] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [ ] Load skill `lernapps-explainer`.
- [ ] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [ ] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
<!-- tasks: pattern: the one page or screen that is the pattern for the others -->
- [ ] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
<!-- tasks: pages: the other pages or screens, after the pattern -->
- [ ] Update the content guide so that it describes the app as built (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [ ] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [ ] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [ ] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [ ] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, messages or answers, and your choice. "None" if none. -->
