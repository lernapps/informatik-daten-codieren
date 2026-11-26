# Skizzen der Komponenten (Schritte, was Lernende sehen)

## BitReihe (Ausprobieren, "Die Bit-Karten")
1. Start: fünf Karten nebeneinander, Werte darüber 16 · 8 · 4 · 2 · 1, alle verdeckt (grau, "0" darunter).
   Darunter: "Bitfolge: 00000 · Zahl: 0".
2. Tippen auf die Karte 4: sie wird weiß mit 4 Punkten, darunter "1". Unten: "00100 · Zahl: 4".
3. Tippen auf 1: "00101 · Zahl: 5". Knopf "Alle umdrehen" (verdeckt) auf eigener Zeile.
- Mit `pixel: true` (Kapitel 3): statt Punkten ist eine offene Karte ein schwarzes Quadrat, die Werte darüber fehlen;
  unten nur "Pixelzeile: 00101".

## BitKarten (Übung, "Zahlen in Bits", "Bit und Byte", auch auf der Musterseite)
1. Aufgabe Nr. 1: "Lege die Zahl 13." Fünf (oder acht) verdeckte Karten, keine Summe.
2. Tippen dreht Karten. Unter den Karten nur die Bitfolge ("01101"), nicht die Zahl.
3. "Prüfen" (vom Explainer): richtig → "Richtig: 8 + 4 + 1 = 13". Falsch, gespiegelt (10110) → "Du hast die Karten
   von der falschen Seite gelegt: Die größte Karte liegt links." Falsch, Summe 12 → "Es fehlt noch 1."

## PixelEditor (Übung, "Bilder aus Pixeln")
1. Aufgabe: Code in 6 Zeilen links ("001100", …), rechts ein 6×6-Raster, alle weiß, Felder 44 px.
2. Tippen färbt ein Feld schwarz und zeigt eine kleine "1", nochmals Tippen macht es weiß ("0").
3. "Prüfen": richtig → "Das Bild ist ein Zelt." Gespiegelt → "Lies jede Zeile von links nach rechts." Vertauscht
   0/1 → "1 heißt schwarz, 0 heißt weiß."
- Mit `code: zahl`: statt "001100" steht "12" (Bit-Karten 32 16 8 4 2 1).

## CaesarScheibe (Übung, "Die Caesar-Scheibe", "Wie sicher ist das?")
1. Außenring A–Z (Klartext), Innenring A–Z (Geheimtext), beide gleich gestellt (Schlüssel 0). Knöpfe "−1", "+1",
   Anzeige "Schlüssel: 0". Bei 360 px: Scheibe 300 px; daneben bzw. darunter die Zeile "A→A, B→B, …" als Liste.
2. Aufgabe: "Verschlüssle ZELT mit dem Schlüssel 3." Lernende drehen auf 3, lesen ab, tippen "CHOW" ins Feld.
3. "Prüfen": falsch "WBIQ" → "Du hast in die falsche Richtung gedreht."
- Modus knacken: "Dieses Wort ist mit Caesar verschlüsselt: HXO. Finde den Schlüssel." Eingabe: Zahl.
