---
date: 2026-11-02
title: symposium
category: hardware for people
---

## symposium: fashion × hardware technology

physical computing on the body.

### the question

fashion already communicates: identity, taste, affiliation, mood, status, approachability. i opened by showing six outfits and asking what each one says about the person. none of them said anything, but everyone still had an answer.

so: what happens when fashion becomes computational? hardware lets clothing sense the body or environment, respond to an input, transform its physical form, display new visual information, and express something updatable.

### three ways hardware enters fashion

an analytical lens i found useful for asking where the hardware lives and what role it plays. it's not an official taxonomy, and the categories overlap.

1. **wearable technology:** hardware on the body (body + device)
2. **smart textiles / e-textiles:** hardware in the material (textile = interface)
3. **creative / expressive tech:** hardware as a medium (hardware = expression)

### a short history

**1801, jacquard loom.** before computers programmed pixels, we programmed thread. punched cards carried information into a mechanism that produced a textile.

**1980s–90s, wearable technology.** the computer leaves the desk: computer, battery, camera, head-mounted display, and input, all on the body. this brought new constraints: weight, power, comfort, size, visibility, and social acceptability.

**1997, mit media lab musical jacket.** a levi's denim jacket with a conductive embroidered keypad, a midi synthesizer, and speakers. touch the embroidery and it makes sound. the embroidery became the keyboard. what if the garment becomes the interface?

**2000, hussein chalayan, *remote control*.** hardware doesn't have to make fashion more "useful." not "what can my clothing do for me?" but "what can hardware allow clothing to express?"

**2022, gentle monster.** kinetic and robotic store installations, and the moncler × gentle monster swipe lcd eyewear with animated graphics on the temples. the hardware (lcd displays, motors, robotics, kinetic mechanisms) creates an experience (movement, spectacle, dynamic graphics) in service of a purpose (expression, identity, emotion, brand world). hardware isn't just function. hardware can be expression.

| | what it does | example |
|---|---|---|
| mechanism | program the pattern | 1801 jacquard |
| sensor | understand body / environment | smart textiles |
| actuator | physically transform | chalayan |
| display | change what people see | gentle monster |
| network | change it remotely | my project |

### now: 2025–2026

fashion-tech is back, and it's wearing eyewear. meta sold 7m+ smart glasses in 2025, about 3× the year before, and essilorluxottica now calls smart glasses a "new core business."

there are two directions: **hide the tech** (ai + camera glasses designed to look like ordinary frames) or **show the tech** (gentle monster's visible lcds and robotics, and this project).

### gender + design

- **whose body is the default?** in 2014, apple's health app launched tracking almost everything except menstrual cycles. reproductive health arrived in 2015.
- **who gets to build?** 65% of documented lilypad (sewable e-textile) projects were by women, vs. 2% of standard arduino projects. change the material, change who participates.
- **who gets watched?** in 2025–26 there were repeated reports of camera smart glasses being used to film women without consent, leading to warnings, venue bans, and a retailer pulling stock.

### my project: programmable self-expression

remember when i asked who seemed approachable? you were guessing. what if the wearer could just tell you?

what if a fashion accessory could communicate your current social state? it's not fitness tracking, biometrics, notifications, or emotion detection. it's identity, mood, boundaries, invitation, social signaling. the wearer decides what to reveal, when to reveal it, and when to change it.

COME SAY HI :) · SOCIAL BATTERY: 20% · NEED SOME SPACE · ASK ME ABOUT MY PROJECT

### one small board, most of the system

requirements:

- wearable, untethered
- glanceable, high contrast
- changeable without re-uploading code
- wireless, user-controlled
- prototypable in a class timeframe

the lilygo t-display covers almost all of it:

- esp32 → computation
- st7789 tft → visual output
- wi-fi → communication
- lipo → portable power
- usb-c → programming

i also considered an led matrix, e-ink, a full e-textile, and just using a phone.

### how it works: from keyboard to screen

```
phone hotspot (local wi-fi)
laptop website → type message → SAY IT → javascript → http request
   → esp32 web server → new string → screen redraws
   (display 01, display 02, display 03)
```

1. **website** (index.html, html + css + javascript): you type a message (max 40 characters) and press **say it**. javascript sends an http request straight to that display's local ip. colors are fixed per display.
2. **arduino code** (esp32, c++ in the arduino ide): the esp32 joins the phone hotspot and runs a tiny web server. when `/set` is called, it reads the text and colors, stores them, and redraws.
3. **screen** (st7789, 240 × 135, tft_espi): the screen fills with the background color, then the firmware tries the biggest bold font and steps down until the words fit: a tiny poster.

```cpp
WiFi.begin(WIFI_NAME, WIFI_PASSWORD);
server.on("/set", handleSetMessage);
currentMessage = server.arg("text");
drawMessage(currentMessage);
```

each esp32 has a local ip and runs a small http server. no cloud database or external server is needed for this prototype.

### where it works, where it doesn't (yet)

**applications**

- social: approachability, boundaries
- events: dynamic badges, networking
- performance: dance, costume, stage
- fashion: programmable visual identity
- communication: explicit preferences, low-verbal social signaling

**what worked**

- dynamic messages
- glanceability
- wireless updates
- portable hardware
- simple authoring
- visible hardware aesthetic

**limitations**

- rigid pcb and battery bulk
- improvised attachment
- network dependence
- small display, finite battery
- attached, not integrated

### closing

clothing has always said something. now it can change its mind. the question is who gets to change it.

### references

- computer history museum. "1801: punched cards control jacquard loom." *timeline of computer history.*
- computer history museum. "the punched card's pedigree."
- mit news. "'wearables' combine fashion, high-tech." 1997.
- mit media lab. wearable computing research.
- the metropolitan museum of art. hussein chalayan, *remote control*, 2000.
- gentle monster. "moncler genius" collaboration story, swipe lcd, 2022. gentlemonster.com
- levi strauss & co. google atap × levi's, project jacquard.
- "a systematic literature review on computational fashion wearables." *international journal of human–computer interaction.*
- baek, e., et al. "defining digital fashion: reshaping the field via a systematic review." *computers in human behavior*, 2022.
- lilygo. t-display (esp32, st7789) official documentation.
