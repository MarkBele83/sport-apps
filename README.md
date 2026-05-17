# Sport Apps

Web-Apps für den Einsatz bei Sportturnieren — optimiert für die mobile Nutzung vor Ort.

## tennis-score — BTV U9 Kleinfeld Score

Punktezähler für Tennisturniere im BTV-Format U9 Kleinfeld (Südbayern 2026).

Entwickelt für Eltern, die während eines Spiels mitzählen und andere Eltern ohne Tennis-Kenntnisse unterstützen möchten.

### Dateien

- [tennis-score/btv_u9_score_ios.html](tennis-score/btv_u9_score_ios.html) — für iPhone / iPad optimiert (Version 1.4)
- [tennis-score/btv_u9_score_android.html](tennis-score/btv_u9_score_android.html) — für Android optimiert (Version 1.4)

### Funktionen

- Einzel und Doppel (mit vollständiger Aufschlag-Rotation nach BTV-Regeln)
- Automatische Zählweise nach BTV U9-Regeln: Kurzsätze, No-Ad, Satz-Tiebreak, Match-Tiebreak
- Seitenwechsel-Anzeige mit Hinweisfenster
- Aufschlag-Anzeige (Deuce/Ad) und manuelle Korrekturmöglichkeit
- Rückgängig-Funktion für Fehleingaben
- Hochformat-Layout für mobile Geräte (Querformat zurückgestellt, siehe [tennis-score/TODO.md](tennis-score/TODO.md))
- Ergebnis als PDF drucken/teilen
- Eingebauter Regelguide mit detaillierten Team-Aufstellungsregeln und Bedienungsanleitung
- In-Spiel-Menü für Zugriff auf Regelguide und Bedienung ohne Spielunterbrechung

### Changelog

**Version 1.4** (2026-05-17)

- Bugfix: Seitenwechsel im Match-Tiebreak findet nun korrekt nach jeweils 6 gespielten Punkten in Summe statt (6, 12, 18, …) — vorher nur einmal bei 6
- Modal-Text beim Seitenwechsel zeigt nun die tatsächlich gespielten Punkte (`12 Punkte gespielt` statt fest `6 Punkte gespielt`)
- Neuer Querformat-Hinweis: Vollbild-Overlay erscheint im Querformat mit Aufforderung, das Gerät ins Hochformat zu drehen (CSS-only, kein JS)

**Version 1.3** (2026-05-17)

- Querformat-Layout vollständig entfernt (zurückgestellt für spätere Wiederaufnahme)
- Fokus auf Stabilisierung und Test des Hochformat-Layouts
- Vereinfachte Doppel-Slot-Berechnung (keine Orientierungs-Abzweigungen mehr)
- Entfernung des `orientationchange`-Event-Listeners
- Bisherige Querformat-Implementierung dokumentiert in [tennis-score/TODO.md](tennis-score/TODO.md) mit vollständigen Code-Snippets und Wiederaufnahme-Checkliste

**Version 1.2** (2026-05-16)

- Bugfix: 40:40-Punkt-Eintrag funktioniert jetzt korrekt — Tap auf Spieler bei 40:40 gewinnt Spiel sofort
- Bugfix: No-Ad und Satz-Tiebreak-Seitenwahl tauschen nicht mehr die Spielhälften, sondern setzen nur die Aufschlagseite innerhalb der Spielhälfte
- Feature: Regelguide und Bedienung sind jetzt über In-Spiel-Menü zugänglich, ohne das Spiel zu unterbrechen
- Erweitert: Neue Sektion „Aufstellung der Teams" im Regelguide mit detaillierten Regeln zu Spieler-Positionen und Aufschlag-Rotation
- Dokumentation: Bedienungsanleitung aktualisiert mit Erklärungen zu 40:40-Regel, Deuce/Ad-Anzeige und in-Spiel-Menü-Nutzung

**Version 1.0** (2026-04-24)

- Initiale Version mit Einzel-, Doppel- und Match-Tiebreak-Unterstützung

### Regeln

Es gelten die BTV-Ausschreibungsregeln für U9 Kleinfeld Südbayern 2026 (Stand 24.04.2026):

- 2 Kurzsätze mit mindestens 2 Spielen Vorsprung
- No-Ad bei 40:40 — Rückschläger wählt Einschlagseite
- Bei 4:4 → Satz-Tiebreak bis 7 (Rückschläger wählt Seite)
- Bei 1:1 Sätzen → Match-Tiebreak bis 10
- Seitenwechsel nach Spielstand 1, 3, 5, 7 sowie nach jedem Satz und bei 6 Punkten im Match-Tiebreak

### Installation (als Web-App)

**iOS:** Safari → Teilen-Symbol → „Zum Home-Bildschirm"

**Android:** Chrome → Menü (⋮) → „Zum Startbildschirm hinzufügen"

Die App läuft dann ohne Browser-Leiste im Vollbild.

## Lizenz

© 2026 Markus Ströbele — Nutzung ohne Gewähr. Nur für private, nicht-kommerzielle Nutzung.
