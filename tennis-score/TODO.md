# TODO

Offene Punkte und zurückgestellte Features für die Tennis-Score-App.

## Querformat / Landscape

### Status

Zurückgestellt mit Version 1.3 (2026-05-17). Vollständig entfernt aus beiden Plattform-Dateien (`btv_u9_score_android.html`, `btv_u9_score_ios.html`), Stand zuvor: Version 1.2.

### Begründung

Das Querformat-Layout verursachte mehrere Probleme:

- Komplexes CSS-Grid mit 5 Spalten (Sidebar | Heim | Net | Gast | Buttons), das auf kleinen Geräten zu engen Spalten und unleserlichen Schriftgrößen führte
- Abweichende Spieler-Slot-Logik im Doppel (`isLandscape`-Abzweigungen in `slotSidesForTeam` und `slotLabel`), die bei Seitenwechsel zusätzliche Verwirrung erzeugte
- Pfeil-Richtungs-Logik (`▲▼` vs. `◀▶`) musste an zwei Stellen synchron gehalten werden
- iOS-Safari-Grid-Kompatibilität erforderte zusätzliche `-webkit-`-Prefixes

Entscheidung: Hochformat zuerst stabilisieren und testen. Querformat zu einem späteren Zeitpunkt sauber wieder aufnehmen.

### Wiederaufnahme-Checkliste

- [ ] In beiden Dateien (Android + iOS) parallel re-applizieren
- [ ] `<div id="net-divider"></div>` im Score-Markup wieder einfügen (zwischen `#side-banner` und `#court-area`)
- [ ] Doppel-Slot-Logik muss `visualSwapped` weiterhin berücksichtigen
- [ ] Tests auf realem Gerät: Android Chrome, iOS Safari (PWA-Modus)
- [ ] iOS-Safari-Grid-Kompatibilität prüfen (Webkit-Prefixes beibehalten)
- [ ] Regeln-Text in Rules-Screen wiederherstellen (Rule-Items mit Querformat-Hinweis)
- [ ] HTML-Kommentare in Score-Markup wiederherstellen
- [ ] `orientationchange`-Listener wieder hinzufügen
- [ ] Pfeil-Richtungen in Tap-Hints und Doppel-Slot-Labels orientierungsabhängig setzen

### Gesicherte Code-Snippets (Version 1.2 Original)

Alle Zeilennummern beziehen sich auf den Stand vor dem Entfernen in Version 1.2.

#### CSS Block 1 — Hauptlayout Landscape Einzel (Zeilen 303–467)

```css
/* ══════════ QUERFORMAT / LANDSCAPE ══════════
   Layout:
   ┌──────────────────────────────────────┐
   │         score-header (voll)          │
   ├──────────┬───────────────────┬───────┤
   │Scoreboard│   court-area      │ Btns  │
   │+ banner  │  [Heim] [Gast]    │       │
   └──────────┴───────────────────┴───────┘
══════════════════════════════════════════ */
@media (orientation: landscape) {

  /* ─────────────────────────────────────────
     Landscape layout — Blick von der Seite übers Netz:
     ┌──────────────────────────────────────────────────┐
     │               Header (voll)                      │
     ├────────┬──────────────┬───┬──────────────┬───────┤
     │Scorebrd│   HEIM       │ N │   GAST       │ Btns  │
     │+Banner │   (links)    │ E │   (rechts)   │       │
     └────────┴──────────────┴───┴──────────────┴───────┘
  ───────────────────────────────────────────────────── */

  #score {
    display: -webkit-grid;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 100px 1fr 6px 1fr 64px;
    grid-template-areas:
      "header  header  header  header  header"
      "sidebar heimcrt net     gastcrt btns";
    overflow: hidden;
  }

  /* Header */
  .score-header {
    grid-area: header;
    padding: 5px 10px;
  }
  .score-header .title { font-size: 11px; }
  .score-header .status { font-size: 10px; }
  .btn-header { font-size: 10px; padding: 3px 7px; }

  /* Scoreboard sidebar */
  .scoreboard {
    grid-area: sidebar;
    border-right: 1px solid var(--border);
    border-bottom: none;
    padding: 6px 6px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .scoreboard-header {
    grid-template-columns: 1fr 22px 22px 22px 32px;
    gap: 2px; margin-bottom: 2px; padding-bottom: 2px;
  }
  .scoreboard-row {
    grid-template-columns: 1fr 22px 22px 22px 32px;
    gap: 2px; padding: 2px 0;
  }
  .player-name-sb { font-size: 10px; }
  .player-side-tag { font-size: 7px; }
  .set-score { font-size: 13px; }
  .game-score { font-size: 17px; padding: 1px 2px; }

  /* Phase banner + side-change in sidebar */
  .phase-banner {
    grid-area: unset;
    font-size: 7px; letter-spacing: 0.5px; padding: 3px 3px;
    border-radius: 5px; margin-top: 4px; border: 1px solid #f0d070;
  }
  .phase-banner.tiebreak { border-color: #f5c090; }
  .phase-banner.matchtb { border-color: #f0a0a0; }
  .side-change-banner {
    grid-area: unset;
    font-size: 10px; padding: 3px 2px;
    letter-spacing: 1px; border-radius: 5px; margin-top: 3px;
  }

  /* NET divider — now a real div #net-divider in HTML */
  #net-divider {
    grid-column: 3; grid-row: 2;
    background: linear-gradient(to bottom,
      transparent 0%, rgba(180,220,200,0.3) 10%,
      rgba(100,160,130,0.7) 50%,
      rgba(180,220,200,0.3) 90%, transparent 100%);
    border-left: 2px solid rgba(46,125,82,0.5);
    border-right: 2px solid rgba(46,125,82,0.5);
    display: none;
  }
  @media (orientation: landscape) {
    #net-divider { display: block; }
  }

  /* Court areas: use flexbox instead of display:contents (iOS Safari compat) */
  .court-area {
    grid-area: 2 / 2 / 3 / 5; /* span columns 2-4 (heimcrt through gastcrt) */
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    gap: 4px;
    padding: 6px 4px;
    min-height: 0;
  }

  .court-area #zone-home,
  .court-area #zone-guest {
    flex: 1;
    border-radius: 10px;
    margin: 0;
  }

  /* Swapped: reverse flex order */
  .court-area.swapped {
    -webkit-flex-direction: row-reverse;
    flex-direction: row-reverse;
  }

  /* Doppel court */
  #court-doppel {
    grid-column: 2 / 5; grid-row: 2;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    gap: 4px;
    padding: 6px 4px;
    min-height: 0;
  }

  #court-doppel #dbl-zone-home,
  #court-doppel #dbl-zone-guest {
    flex: 1;
    border-radius: 10px;
  }

  #court-doppel.swapped {
    -webkit-flex-direction: row-reverse;
    flex-direction: row-reverse;
  }

  /* Buttons sidebar */
  .bottom-bar {
    grid-area: btns;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 6px 5px 6px 2px;
    justify-content: center;
  }
  .btn-undo { padding: 7px 2px; font-size: 9px; text-align: center; }
  .btn-serve-manual { padding: 5px 2px; font-size: 8px; }
  .btn-side-change { padding: 5px 2px; font-size: 8px; }

  /* Player zones styling */
  .player-zone { border-radius: 10px; }
  .zone-name { font-size: 13px; margin-top: 22px; margin-bottom: 2px; }
  .point-display { font-size: 54px; }
  .tap-hint { font-size: 7px; bottom: 5px; }
  .zone-top-row { top: 5px; left: 6px; right: 22px; }
  .zone-heim-gast { font-size: 7px; padding: 1px 3px; }
  .zone-side-label { font-size: 7px; }
  .serve-dot { width: 9px; height: 9px; top: 7px; right: 7px; }
  .zone-label { display: none; }
}
```

#### CSS Block 2 — Portrait-only Order Hack (Zeilen 470–474)

```css
/* Visual side swap in court (Portrait-only; Landscape uses row-reverse) */
@media (orientation: portrait) {
  .court-area.swapped #zone-home { order: 2; }
  .court-area.swapped #zone-guest { order: 1; }
}
```

Hinweis: Mit der Hochformat-Sperre wurde diese Media Query in einen normalen Selektor umgewandelt (ohne `@media`-Wrapper).

#### CSS Block 3 — Doppel Players Landscape (Zeilen 548–566)

```css
/* ── Landscape: players stacked top/bottom (Seitenansicht) ── */
@media (orientation: landscape) {
  .dbl-players-row {
    flex-direction: column;  /* landscape: übereinander */
  }
  /* Portrait vertical divider → landscape horizontal divider */
  .dbl-player-slot + .dbl-player-slot {
    border-left: none;
    border-top: 1px solid rgba(46,125,82,0.25);
  }
  .dbl-player-slot.is-server {
    border-bottom: none;
    border-left: 3px solid var(--yellow);
  }
  .dbl-player-name { font-size: 11px; }
  .dbl-player-pos  { font-size: 7px; }
  .dbl-point { font-size: 32px !important; }
  .dbl-serve-info { font-size: 8px; }
}
```

#### JS Snippet 1 — Tap-Hint-Pfeile in `renderAll()` (Zeilen 1689–1694)

```javascript
// Update tap hints based on orientation
const isLandscape = window.innerWidth > window.innerHeight;
const tapHome = document.querySelector('#zone-home .tap-hint');
const tapGuest = document.querySelector('#zone-guest .tap-hint');
if (tapHome) tapHome.textContent = isLandscape ? '◀ Tippen für Punkt' : '▲ Tippen für Punkt';
if (tapGuest) tapGuest.textContent = isLandscape ? 'Tippen für Punkt ▶' : '▼ Tippen für Punkt';
```

#### JS Snippet 2 — Doppel-Slot-Berechnung in `renderDoppel()` (Zeilen 2196–2224)

```javascript
const isLandscape = window.innerWidth > window.innerHeight;

// Slot→Tennis-Seite: Deuce ist immer rechts vom jeweiligen Team aus dessen
// Spielperspektive → diagonale Anordnung auf dem Bildschirm. Nach Seitenwechsel
// (visualSwapped) tauschen p1/p2 ihre Tennis-Seiten je Team.
const slotSidesForTeam = (team) => {
  let sides;
  if (team === 'home') {
    sides = isLandscape ? { p1: 'left',  p2: 'right' }
                        : { p1: 'right', p2: 'left'  };
  } else {
    sides = isLandscape ? { p1: 'right', p2: 'left'  }
                        : { p1: 'left',  p2: 'right' };
  }
  if (ds.visualSwapped) {
    return { p1: sides.p2, p2: sides.p1 };
  }
  return sides;
};

// Pfeil zeigt zur Außenkante des Slots; Wort hängt von der Tennis-Seite ab.
const slotLabel = (slotNum, tennisSide) => {
  const word = tennisSide === 'right' ? 'Deuce' : 'Ad';
  if (isLandscape) {
    return slotNum === 1 ? `▲ ${word}` : `${word} ▼`;
  } else {
    return slotNum === 1 ? `◀ ${word}` : `${word} ▶`;
  }
};
```

#### JS Snippet 3 — orientationchange Listener (Zeile 1772)

```javascript
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    if (document.getElementById('score').classList.contains('active')) renderCurrent();
  }, 100);
});
```

#### HTML Snippet 1 — Net-Divider Element (Zeilen 706–707)

```html
<!-- Landscape net divider (real element for iOS Safari compat) -->
<div id="net-divider"></div>
```

Position: Im Score-Screen, zwischen `<div class="side-change-banner">` und `<div class="court-area">`.

#### HTML Snippet 2 — Rules-Item Querformat-Hinweis (Zeile 972)

```html
<div class="rule-item"><div class="rule-dot"></div><div>Im Querformat: <strong>linke Hälfte</strong> = Heim, <strong>rechte Hälfte</strong> = Gast.</div></div>
```

Position: In der Rule-Card „Punkte zählen", direkt nach dem Hochformat-Hinweis.

#### HTML Snippet 3 — Plattform-Tipp Querformat (Zeile 1053)

Android-Variante:

```html
<div class="rule-item"><div class="rule-dot"></div><div>Das <strong>Querformat</strong> (Handy drehen) zeigt das Spielfeld wie beim Blick von der Seite übers Netz.</div></div>
```

iOS-Variante:

```html
<div class="rule-item"><div class="rule-dot"></div><div>Das <strong>Querformat</strong> (iPhone drehen) zeigt das Spielfeld wie beim Blick von der Seite übers Netz.</div></div>
```

Position: In der Rule-Card „Android-Tipps" bzw. „iOS-Tipps", als drittes Rule-Item.

#### HTML Snippet 4 — Kommentare im Score-Markup (Zeilen 737, 746, 769)

```html
<!-- Landscape: nebeneinander (Heim links, Gast rechts), je Zone oben/unten aufgeteilt -->
<!-- U9: beide an der Grundlinie — Portrait: links/rechts, Landscape: oben/unten -->
<!-- U9: beide Spieler an der Grundlinie — Portrait: links/rechts, Landscape: oben/unten -->
```
