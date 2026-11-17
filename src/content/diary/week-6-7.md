---
date: 2026-10-19
title: week 6 + 7
category: hardware for people
---

## week 6 + 7: chimera, lemon gacha (レモンガチャ)

### concept

a gacha machine you play by squeezing a stress toy. made for studying: when you want to procrastinate, you squeeze, and the machine decides what you do next.

it combines three things that don't normally go together:

- a stress toy (comfort)
- a gacha machine (gambling)
- a productivity tool (discipline)

it turns a physical action into a consequence. the reward might be a break, or it might send you right back to work.

built with chris for the chimera midterm. we both worked on ideation, chris handled the code, i handled fabrication, and we built and troubleshot together.

### the original plan

squeeze the toy to charge the machine (leds fill up). when it's fully charged, the machine "pulls" and lights up a color, and the color triggers an action on your laptop:

- 🟢 green: break time, opens netflix
- 🟡 yellow: random, could be anything
- 🔴 red: back to work, opens your email or a task from your to-do list

### the pivot: kumon, but make it lemon

triggering the laptop meant using bluetooth, which neither of us was familiar with. it also meant that as an installation, a laptop would have to sit next to the machine the whole time.

we had an oled screen in the kit, so we moved the consequence onto the machine itself. instead of opening an app, it gives you a math problem, like the kumon worksheets i did as a kid. the stress toy became a lemon, and the whole machine became a little lemon stand: レモンガチャ (lemon gacha).

### how it works

1. the screen says **SQUEEZE: hold the lemon** for a few seconds
2. while you squeeze, it counts down: **HOLD... 2s left**
3. the three leds spin like a roulette and the buzzer plays a sound while the machine pulls
4. you either get lucky (an easy question) or **UNLUCKY** (a random question)
5. a math problem appears, like **1+3×2 = ?**, and you answer by squeezing the lemon that many times. the **count** on screen tracks your squeezes

### the build

**the lemon:** a squeeze switch made from copper tape, pipe cleaners, and tape, covered in yellow polka-dot fabric we found at the ceid, with green pipe cleaner leaves on top. the pipe cleaners keep the copper apart until you squeeze. it connects to the board with alligator clips.

**the electronics:** seeed studio xiao esp32c6, a 128×64 i2c oled (gnd, vcc, scl, sda), three yellow leds for the roulette, and a buzzer.

**the stand:** cardstock panels painted brown, a paper awning in green and yellow, hand-drawn lemon stickers, and buttons on the front.

### system diagram

```
squeeze lemon (copper tape switch)
        ↓
xiao esp32c6
  → oled: prompt, countdown, lucky/unlucky, math problem, squeeze count
  → 3 leds: roulette spin
  → buzzer: pull sound
```

### challenges + iterations

**the squeezer wore out.** if you squeezed too many times, the pipe cleaners got permanently indented and the switch stopped working. next time i'd try a real pressure sensor.

**the form changed.** at first we wanted it to look like a vending machine, but we couldn't find a clear material for the window. the bare oled also looked messy on its own, so we framed the screen in brown and leaned into the lemon stand.

### final result

レモンガチャ, installed in the green hall gallery. squeeze for a challenge.

### reflection

next iteration, i'd add levels to the questions so people keep playing instead of stopping after one round. a pressure sensor would also let the lemon tell a gentle squeeze from a hard one, which could feed into the difficulty.
