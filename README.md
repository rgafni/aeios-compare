# AEIOS Today: compare versions

https://rgafni.github.io/aeios-compare/

Tabs: Mine (copy of the live site, clock-controlled) · James (his mockup; his "now" markers moved to the demo time) · A · Calm · B · Focus · C · Timeline · D · Chat · E · Bubbles · F · Coach.

The **Preview time** bar at the top sets the demo time with one tap: Now, Morning 7:15, School 10:00, Lunch 11:30, After school 3:10, Homework 3:45, Dinner 6:30, Evening 8:30, Bedtime 9:30 (arrows step earlier/later; arrow keys work too). No dragging. Time is kept in the URL hash, e.g. `#a/t=10:00`; `#bubbles/t=15:45` opens Bubbles directly. Installable: "Install app" in the bar (manifest + service worker; install.js + install.css).

All content is the showcase's sample data. No real student data.

**Shared menu** (`shared/drawer.js` + `drawer.css`): the same left drawer in A–E (edge tab, or each variant's own menu button): checklists, calendar, messages, crash courses, brain teaser, playable chess, grades, clubs, goals, journal, settings. All screens work; state saves on this device.

**E · Bubbles** (`variants/e-bubbles/`): five big top-level bubbles (My day, Now, Calendar, Messages, Everything else). My day opens into sub-bubbles (Homework, Schedule, Checklist, What's due, Responsibilities) with an "All" back button; Everything else opens the shared drawer. Tap one and it grows into a full page (one circle scaled with a CSS transform, FLIP for the title), the rest drift aside; Back (or Esc / Android back) shrinks it home. No popups, no external fonts or scripts, honors reduced motion.

**F · Coach** (`coach/`): the landing page is the AI coach's latest text, not a dashboard. Time-aware message with quick-reply chips, one big "Talk to coach" (voice call) / "Text coach" action plus the coach's own phone number (fictional (512) 555-0147; voice line powered by Bland) so Maya can just call or text it from her phone, Today's plan as a tappable day-block strip "planned with coach", a 5-minute talk-it-out Thinking practice with a streak, and a Noticed strip of teacher/parent voice-note transcripts plus check-in points. Evening shows the night wrap-up check-in. The call and text sheets are simulated (nothing is dialed or sent). `#coach/t=15:45` opens it directly; standalone it has its own Morning / Afternoon / Evening preview toggle. No external fonts or scripts, honors reduced motion.
