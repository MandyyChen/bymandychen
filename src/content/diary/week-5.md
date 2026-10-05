---
date: 2026-10-04
title: week 5
category: hardware for people
---

## week 5 — coming home

this week i took the three switches from week 4 and turned them into one physical interaction: a small cardboard house that recreates arriving at someone's door.

**light off → step on the doormat → ring the doorbell → knock on the door → light on**

### building the house

i built it out of cardboard and mounted the electronics around and behind it. i kept the construction simple on purpose instead of trying to hide every component.

- cardboard front and walls
- a small window opening
- a cardboard fence
- an led inside the window as the house light
- the xiao and breadboard tucked mostly behind/inside

### the three steps

**doormat (D0)** — the pressure switch became the welcome mat. two copper surfaces sit separated inside the cardboard mat, and stepping on it presses them together.

**doorbell (D2)** — the arcade button became the doorbell, mounted on the house so pressing it feels like ringing a bell, not poking a breadboard.

**door / knock (D1)** — the hinged flap became the door. knocking against it makes the copper contacts meet.

after all three happen in order, the window lights up. the code remembers each step, so you can step on the mat, let go, ring the bell, and then knock. it feels way more natural than holding everything down at once.

### electronics

the circuit stayed almost exactly the same as week 4:

```
D0 ── doormat ── GND
D1 ── door ───── GND
D2 ── doorbell ─ GND
D3 ── resistor ── led ── GND
```

the main change wasn't the electronics, it was giving the switches a context. in week 4 they were *press, close, push*. now they're *step on a doormat, ring a doorbell, knock on a door*. same circuit, but now it communicates an idea instead of just proving the wiring works.

### challenges

the hardest part was fitting all the wires into a tiny cardboard model. the circuit worked before the house existed, so i tried not to rebuild it, and kept the breadboard and wiring toward the back and top so the front stays readable.

copper contacts were also finicky. the tape either touches by accident or misses completely if the cardboard doesn't line up, so i adjusted the spacing a bunch of times.

### final result

a tiny ritual of coming home. the house starts dark. you step on the mat, ring the bell, knock, and the window lights up. it was interesting to see the exact same circuit from last week feel completely different once it lived inside an object and had a story.
