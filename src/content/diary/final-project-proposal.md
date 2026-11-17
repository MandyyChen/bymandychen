---
date: 2026-11-17
title: final project proposal
category: hardware for people
---

## final project proposal: movement lightsticks


### concept + motivation

i spent all of last week in showcase dance, and one of the most common things in korean pop culture is the lightstick. every group has its own, and fans hold them during concerts so the whole crowd becomes part of the show. right now, k-pop lightsticks mostly sync to the music and turn on and off. the audience holds them, but they don't really get to say anything with them.

i want to design a lightstick for my dance group, movement, that lets the audience take part. it's inspired by our guest speaker hayeon hwang and the way she talked about simple interactions: you don't need a complicated system for something to feel alive.

the question i want to explore: **what if the crowd's lights responded to the crowd, not just the stage?**

### intended interaction

the audience holds the lightstick. i'm exploring three directions that can layer on top of each other:

💡 **central sync**
one controller (a web page, or a stick held by a dancer) sends color changes to every lightstick at once, like official k-pop lightsticks. the whole crowd changes color together on the beat drop or with the choreography. this is the base layer.

🙌 **shake to cheer**
an accelerometer senses how hard each person is waving their stick. waving harder makes it brighter. every stick sends its energy to the server, which averages it into one crowd energy level and sends it back, so the whole room glows brighter as everyone gets louder.

🤝 **tap to share color**
bump two lightsticks together and they swap or blend colors. as people tap each other, color spreads through the crowd like a contagion. it turns the audience into a network.

### physical form + interface

- clear globe on top, with the movement logo inside to diffuse the light
- small mascot on top of the globe
- handle with an on/off switch, holding the board and battery
- fabrication idea: a clear fillable plastic ornament ball for the globe (the midterm taught me clear material is hard to find), with the logo printed on vellum inside

### hardware + software

per lightstick:

- seeed studio xiao esp32c6 (wi-fi)
- neopixel led ring inside the globe
- mpu6050 accelerometer (shake + tap detection)
- lipo battery + on/off switch

system:

- websocket server (render, the setup from class) connecting every stick
- a controller web page for central sync, built on the same setup as my symposium hair clips, where one page sends messages to multiple boards
- phone hotspot for wi-fi, so it works in any venue

```
shake / tap (mpu6050)
      ↓
xiao esp32c6 ──wifi──▶ websocket server ◀── controller page (central sync)
      ▲                      │
      └──── color + crowd energy ◀┘
      ↓
neopixel ring (light output)
```

**how tap-to-share could work without extra hardware:** each stick reports a sharp accelerometer spike. if two sticks report a spike at almost the same moment, the server pairs them and swaps their colors.

### feasibility + technical risks

- **shake vs. tap:** waving and tapping both show up on the accelerometer. a tap is one sharp spike, a shake is sustained motion, so the code needs to tell them apart.
- **latency:** wi-fi round trips might make central sync feel slightly behind the music.
- **render free tier:** the server can go to sleep and take a while to wake up, so i need to wake it before the demo.
- **power:** neopixels draw a lot of current, so battery life and brightness on a small lipo need testing.
- **fabrication:** fitting the board, battery, and wiring into a handle that's comfortable to hold.

### milestones

- **nov 18:** functional electronics on the breadboard: one stick brightens when shaken
- **nov 30 / dec 2 (ceid):** two sticks talking through the server: central sync + crowd energy working, tap-to-share tested; fabricate globe + handle
- **dec 2:** user test with people holding the sticks
- **dec 7 / 9:** final presentation: two (or more) finished lightsticks + controller page

### references

- k-pop official lightsticks and stadium central control
- hayeon hwang (guest speaker): simple interactions
- drift, *shylight*: a performative light sculpture made for the new york city ballet art series (from my are.na references)
- my symposium hair clips: one web page controlling multiple wearable displays over wi-fi

### questions for tiri

1. is two lightsticks enough to show the crowd interactions, or should i aim for three or more?
2. should i focus on one interaction (shake to cheer) and treat the others as stretch goals?
3. for tap-to-share, is pairing by timing on the server a reasonable approach, or would physical contact (copper pads) read more clearly?
4. could the final crit include the class holding the sticks as the audience?
