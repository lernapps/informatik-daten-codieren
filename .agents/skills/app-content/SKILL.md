---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Explainer „Daten darstellen und codieren“, Informatik, Strang `informatik/daten` der Lernlandkarte. Bauauftrag:
lernapps/apps#491, Epic lernapps/apps#509 (gemeinsame Regeln und Nachträge). Welle 1: Kapitel 1-4 (Stufe 5-6).

## Curriculum

- Richtstufe 5-6 (Kapitel 1-4), 7-8 (Kapitel 5, Inkrement auf `increment/7-8`).
- Orientierung: GI-Bildungsstandards Informatik Sek I (2025), Inhaltsbereich „Informationen und Daten“, ID-1 bis
  ID-3 (5-6), S. 16; ID-12 Kryptografie steht dort in 7-10, die Karte und das Issue setzen die Grundidee in 5-6.
- Lehrpläne: keine (die Karte hat bewusst `curricula: []`).
- `caesar-verschluesselung` steht auf der Karte in 9-10; laut Issue (Ausnahme) hier in Kapitel 4, weil die
  Sicherheit sich nur an einem konkreten Verfahren beurteilen lässt.

## Competencies

Ids und „Ich kann …“-Sätze aus `https://lernapps.net/apps/map/informatik.json`, nie umformulieren.

| Kapitel | Datei | Baustein | Übungs-ids |
|---|---|---|---|
| information | `src/information/daten.yaml` | `information-und-daten` | zettel-klar, weg-der-nachricht, daten-zaehlen, information-erkennen, daten-oder-information |
| information | `src/information/deuten.yaml` | `daten-interpretieren` | was-ist-21, boot-15, wanderung-dauer, tag-ordnen, zahl-immer-gleich |
| information | `src/information/darstellen.yaml` | `darstellungsformen-von-information` | strichliste-zaehlen, alle-stimmen, frage-und-form, ziele-ordnen, diagramm-immer |
| information | `src/information/baum.yaml` | `baum` | ali-zimmer, teile-des-baums, blaetter-turnier, kanten-zimmer, wurzel-unten |
| bits | `src/bits/codes.yaml` | `codierung-im-alltag` | zeichen-bedeutung, morse-decodieren, nest-codieren, sos-zeichen, code-geheim |
| bits | `src/bits/binaersystem.yaml` | `binaersystem` | karten-lesen, naechste-karte, wie-viele-zahlen, falsche-seite, bits-lesen-ueben, zimmer-ordnen (BitReihe) |
| bits | `src/bits/umrechnen.yaml` | `dezimal-in-binaer` | karten-legen (BitKarten), dezimal-binaer-ueben, teilen-ordnen, karten-fuer-40, zwoelf-binaer |
| bits | `src/bits/bit-und-byte.yaml` | `bit-und-byte` | groesste-mit-acht, byte-legen (BitKarten), byte-in-bit, kb-in-byte, einheiten-ordnen, was-ist-wie-gross, fotos-auf-tablet |
| bilder | `src/bilder/pixel.yaml` | `pixelgrafik` | pixel-zaehlen, bild-malen (PixelEditor), zeile-decodieren, farbe-decodieren, bits-farbbild, bild-kennt-form |
| bilder | `src/bilder/vektor.yaml` | `pixel-und-vektorgrafik` | welche-treppig, pixel-nach-vergroessern, zahlen-kreis, was-speichert-wer, foto-vektor, logo-plakat |
| geheim | `src/geheim/skytale.yaml` | `verschluesselung-grundidee` | streifen-lesen, begriffe, spalten-lesen, zeilen-zaehlen, entschluesseln |
| geheim | `src/geheim/caesar.yaml` | `caesar-verschluesselung` | b-wird, caesar-verschluesseln, caesar-entschluesseln (CaesarScheibe), schluessel-finden, z-wird-c, entschluesseln-schritte |
| geheim | `src/geheim/sicherheit.yaml` | `verschluesselung-bewerten` | caesar-knacken (CaesarScheibe), caesar-schluessel-zahl, verfahren-ordnen, geheimes-verfahren, am-besten-schuetzen, verfahren-schluessel |
| texte | `src/texte/zeichen.yaml` | `zeichencodierung` | wie-gespeichert, buchstabe-legen (BitKarten {c}), code-ueben, bytes-decodieren, bits-eines-worts, umlaut-ascii |
| texte | `src/texte/analog.yaml` | `analog-und-digital` | welche-uhr, analog-oder-digital, stufen-aus-bits, bits-pro-sekunde, mbit-und-mb, mehr-messpunkte (Abtasten) |

Keine Seite braucht eine Wiederholung (`recap`): Jede Voraussetzung wird auf einer früheren Seite geübt.

## Content structure

- Kapitel: `information`, `bits`, `bilder`, `geheim` (5-6), `texte` (7-8, Welle 2). Eine Seite je Baustein.
- Abschnitte einer Seite, feste ids, Titel je Seite passend: `einstieg` (Szene der Klassenfahrt und eine erste,
  leichte Aufgabe), `idee` (das Neue, mit Bild), `beispiel` (ein `example`-Kasten), `ausprobieren` (nur, wo eine
  Komponente bedient wird), `uebung` (die Übungen von leicht zu schwer; am Ende ein kurzer Text: was du jetzt
  kannst, was als Nächstes kommt).
- Länge: höchstens 350 Wörter Lesetext, höchstens 4 Textblöcke hintereinander, etwas zum Ansehen oder Tun in den
  ersten 4 Blöcken. Mindestens 4 Übungen, höchstens die Hälfte Auswahlfragen.
- Geschichte (fest, gemeinsam mit den anderen Explainern des Epics): Die Klasse 6b fährt am Montag, 11. Mai, um 8 Uhr
  mit dem Zug ab dem Bahnhof drei Tage zur Jugendherberge „Am Seeberg“ (erfunden, an einem See). Klassenlehrerin ist
  Frau Berg. **Jona** (11), **Selin** (11) und **Mia** (11), Aussehen aus #490 (`src/images/szene-*.svg`, defs aus
  lernapps/informatik-computer `klasse-6b.svg`, nicht ändern). Namen bleiben im Englischen gleich.
- Zeitfolge der Seiten: Kapitel 1 vor der Fahrt (Zettel, Plan, Abstimmung als Rückblick, Zimmerplan); Kapitel 2
  Ankunft (Weg vom Bahnhof, Zimmertüren mit Bit-Karten), Dienstag Ausflug mit Bus 27, Fotos; Kapitel 3 Plakat;
  Kapitel 4 Überraschung für die Parallelklasse 6c, die auch in der Jugendherberge wohnt.
- Kapitel 5 (7-8): ein Jahr später, Klasse 7b, alle 12, wieder Fahrt an den Seeberg; die Geschichte steht als Chat
  im Text (**Name:** Nachricht), ohne Szenenbild.
- Zimmer: 13 Jona und Tom, 22 Selin und Mia, 9 Ben und Ali (Baum, Bit-Karten-Türen). Jona und Selin schlafen in
  verschiedenen Zimmern (Morsen mit der Taschenlampe). Abstimmung: Seeberg 11, Falkenburg 7, Bärenhöhle 5,
  Lindenzoo 3 von 26 Kindern. Tagesplan Montag: Ankunft 11, Wanderung 14-17 (18 Kinder), Boot 15 (8), Nachtwanderung
  21 (21).
- Klassenfahrt-Nachricht: Klartext „TREFFEN MONTAG ACHT UHR AM BAHNHOF“ / „MEET ON MONDAY AT EIGHT AT THE STATION“;
  Zettel „6b · 11.5. · 8:00 · Bahnhof“ / „6b · 11 May · 8:00 · station“; Caesar, Schlüssel 3: „WUHIIHQ PRQWDJ DFKW
  XKU DP EDKQKRI“ / „PHHW RQ PRQGDB DW HLJKW DW WKH VWDWLRQ“.
- Sprachen `[de, en]`: jeder Text eine Karte `{ de: …, en: … }`; Deutsch ist die Ausgangssprache, Englisch eine
  vollständige Übersetzung.

## Terminology

- Deutsch: einfache Sprache, „du“. Englisch: Plain English, „you“.
- Begriffe (de / en): Information / information; Daten / data; Code, codieren, decodieren / code, encode, decode;
  Bit / bit; Byte / byte; Binärzahl / binary number; Dezimalzahl / decimal number; Stellenwert / place value;
  Bit-Karten / bit cards; Pixel / pixel; Pixelgrafik / bitmap image (raster image); Vektorgrafik / vector image;
  Baum, Wurzel, Knoten, Kante, Blatt / tree, root, node, edge, leaf; Verschlüsselung, Schlüssel, Klartext,
  Geheimtext / encryption, key, plaintext, ciphertext.
- Einheiten: 1 Byte = 8 Bit; 1 Kilobyte (kB, kleines k nach SI) = 1000 Byte, 1 MB = 1000 kB, 1 GB = 1000 MB. Kibibyte nicht.
- Binärzahlen ohne Index, mit Wort: „die Binärzahl 01101“. Fünf Stellen in Kapitel 2 (Karten 16, 8, 4, 2, 1), acht
  auf „Bit und Byte“.
- Glossar (`definition`): Daten, Information, Code, Bit, Byte, Binärzahl, Pixel, Vektorgrafik, Baum, Schlüssel …

## Exercise patterns

- **Bits lesen** (`binaersystem`): `generated`, gegeben `b4 … b0` je `int: [0, 1]`, Antwort `16*b4+8*b3+4*b2+2*b1+b0`;
  Fehler: von der falschen Seite gelesen (`16*b0+…`), Einsen gezählt (`b4+…+b0`). Beispiel `bits-lesen-ueben` in
  `src/bits/binaersystem.yaml`.
- **Karte legen** (`binaersystem`, `dezimal-in-binaer`, `bit-und-byte`): Komponente `BitKarten`, Prop `cards` (5
  oder 8), `min`, `max`, Aufgabentext mit `{n}`. Richtig: Summe der offenen Karten = n.
- **Zahl → Binärzahl** (`dezimal-in-binaer`): `generated` mit `pick: 1` aus `src/data/zahlen.yaml` (3-31; Felder
  `dez`, `bin`, `binZahl`, `gespiegelt`, `karten`, `teilen` je Sprache); Fehler „Reste von oben gelesen“
  (`gespiegelt`). Die Datei ist mit einem kleinen Python-Skript erzeugt: für n von 3 bis 31 Binärdarstellung ohne
  führende Nullen, umgekehrt, und die Teilungskette.
- **Einheiten umrechnen** (`bit-und-byte`): `generated`/`number` mit Fehlern ·10 und ·1024.
- **Pixelbild malen** (`pixelgrafik`): Komponente `PixelEditor` (6 × 6, Code `bits` oder `zahl`), Bilder aus
  `src/data/bilder.yaml` (Feld `zeilen`: sechs Zahlen, je 6 Bits, links das Bit 32). Fehler: gespiegelt, 0/1
  vertauscht, Zeilen und Spalten vertauscht.
- **Caesar** (`caesar-verschluesselung`, `verschluesselung-bewerten`): Komponente `CaesarScheibe`, Prop `mode`
  `verschluesseln`, `entschluesseln` oder `knacken`, Wörter aus `src/data/woerter.yaml` (je Sprache eigene Wörter,
  nur A-Z), Schlüssel `min`..`max` ohne 13. Fehler: falsche Richtung, eine Stelle daneben.
- **Bits erkunden** (`binaersystem`): Komponente `BitReihe` (keine Übung), zeigt Bitfolge und Zahl.
- Gemeinsame Hilfen der Bit-Karten: `src/components/Bits.ts`.
- **Zeichen zum Code** (`zeichencodierung`): BitKarten mit 8 Karten, `min: 66`, `max: 90`, Aufgabe mit `{c}` (das
  Zeichen zum Code); generated `code-ueben` aus `src/data/buchstaben.yaml` (A-Z: `z`, `code`, `bin`), Fehler Stelle
  im Alphabet (code − 64) und A als 0 (code − 65).
- **Digitalisieren** (`analog-und-digital`): Komponente `Abtasten` (keine Übung): Kurve, Regler Messpunkte 2-32 und
  Bit 1-4, Ansage per `aria-live`; generated Stufen = `pow(2, n)`, Bits pro Sekunde = Messungen × Bit; Mbit/s gegen
  MB (÷ 8).
- **Bit → Byte** (`bit-und-byte`): generated `bit-in-byte`, n in Achterschritten, Fehler · 8.
- Fragen: jede falsche Option mit `info`, das sagt, warum sie nicht passt; Zahlaufgaben mit 2-3 `mistakes`.

## Figures

- Eigene SVG in `src/images/`, `source: { de: eigene Zeichnung, en: own drawing }`, `licence: CC-BY-4.0`, erzeugt
  mit kleinen Python-Skripten. `image` ist eine Datei für beide Sprachen: **keine Wörter im Bild**, nur Zahlen und
  Namen (Kinder, Orte). Wörter stehen in `caption`, `alt` oder als Marker einer `labelled-figure` (Baum).
- Unten in jedem Bild 44 px frei: Das Lizenz-Abzeichen der Runtime liegt unten rechts.
- **Bit-Karten** (wiederkehrendes Bild, auch für #492): Karten nebeneinander, die größte links; über jeder Karte ihr
  Wert (16, 8, 4, 2, 1). Offen: weiße Karte mit so vielen schwarzen Punkten, darunter „1“. Verdeckt: graue Rückseite
  mit Streifen, darunter „0“.
- **Baum** (wiederkehrendes Bild, auch für #492, #496): Wurzel oben, Kanten als Linien nach unten, Knoten als
  abgerundete Rechtecke, Blätter mit gestricheltem Rand; Beschriftung als Marker 1-4 einer `labelled-figure` (`baum-zimmer.svg`).
- Farben: Umrisse `#333`, Punkte `#222`, verdeckt `#9aa0a6` mit Streifen, Fläche weiß; Bilder haben einen eigenen
  weißen Hintergrund, damit sie im Dark Mode lesbar bleiben.
- `caption`: wohin schauen; `alt`: was das Bild zeigt, nie die Lösung einer Aufgabe.

## Sources

- Lernlandkarte Informatik: https://lernapps.net/apps/map/informatik.json (gelesen 2026-11-26).
- GI: Bildungsstandards Informatik für die Sekundarstufe I (2025), doi:10.18420/rec2025_052, S. 16 (Begriffe
  Information und Daten).
- Binärsystem, Bit und Byte, Pixel- und Vektorgrafik, Caesar, Skytale: Fakten, die keine Quelle brauchen, außer
  wo genannt; Einheiten nach den gemeinsamen Regeln des Epics (Kilobyte = 1000 Byte).

## Adding a chapter or round

1. Baustein-ids und „Ich kann …“ aus `informatik.json`, Strang `daten`, prüfen; `requires` sagt die Reihenfolge.
2. Ordner `src/<kapitel>/` mit `chapter.yaml` (`title`, `summary`, `pages`), in `chapters` von `src/app.yaml`
   eintragen.
3. Je Baustein eine Seite nach „Content structure“, mit Szene der Klassenfahrt; Übungen nach „Exercise patterns“,
   jeder Text `{ de, en }`.
4. 1 bis 3 ihrer Übungen in `selfAssessment` der `chapter.yaml` aufnehmen, wie Skill
   `lernapps-explainer-self-assessment` sagt (nur Übungen, die ohne ihre Seite verständlich sind).
5. `npx vp build`, `npx vp check --fix`, `npx --no -- lernapps check`, dann committen.
## Rules learned from mistakes

- `image` ist eine Datei für alle Sprachen: keine Wörter in Bildern (Fund beim Baum).
- Mehrheit nicht mit „die meisten“ verwechseln: 11 von 26 sind die meisten Stimmen, nicht die meisten Kinder.
- Eine 3 × 3-Skytale ist ihre eigene Umkehrung: Entschlüssel-Aufgaben mit 12 Buchstaben (3 Spalten, 4 Zeilen).
- Viele Schlüssel sind nötig, aber nicht genug: das gemischte Alphabet nie „sicher“ nennen.
- Einheit kB mit kleinem k (SI).
- Die Geschichte über alle Seiten prüfen (Zug, Zimmer, Zeitfolge): Funde der Prüfung als Lernende.
