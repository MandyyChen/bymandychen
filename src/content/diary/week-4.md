---
date: 2026-09-27
title: week 4
category: hardware for people
---

## week 4 — make your own switch

today, i explored three main ideas for this assignment. the goal was to design custom switches using everyday 
objects or actions instead of traditional buttons, then combine three or four of those switches so that activating 
them together turns on a light. i focused on routines that already contain natural moments of pressing, placing, opening, closing, or touching.

### idea 1 — lock in

my first idea was based on my study routine. the light would turn on once i was fully “locked in.”

- phone placed down
- ipad placed down
- drink placed down
- laptop opened

the first three could use pressure switches, while the laptop could use a contact switch 
triggered when it opens. once all four are active, a desk lamp turns on.

### idea 2 — makeup / getting ready

my second idea was based on getting ready at a vanity.

- sit down
- open makeup mirror
- pick up a makeup brush
- smile

i liked this idea because it feels more expressive and personal. 
the physical actions could use pressure or contact switches, while the smile could act as the final signal 
that i’m “ready.” the output would be a lamp turning on. i also tend to forget the close the light of my makeup mirror
so this would be super useful for me.

### idea 3 — light up the house

my third idea was based on a “coming home” routine, 
where completing a few everyday actions would light 
up a small monochrome model house.

- open the door
- put keys down
- take off shoes
- set a bag down

each action could trigger a different custom switch. 
once all four are activated, the lights inside the house turn on.
i liked this direction because the interaction and output are directly connected: 
completing the routine literally makes the house light up.

## the build — three ways to make a switch

i ended up building three switches with a seeed studio xiao esp32c6, cardboard, copper tape, jumper wires, an led, and a breadboard. first i got a single led working on D3 (through a resistor to ground), then built and tested each switch one at a time.

### switch 1 — pressure switch

two pieces of cardboard with copper tape facing each other, separated by a small gap. press down and the copper touches, closing the circuit. one contact goes to D0, the other to GND.

i used `INPUT_PULLUP`, so the pin reads HIGH when open and LOW when the copper touches.

the led stayed on constantly at first. turns out the copper was already touching even when i wasn't pressing. adding small spacers between the cardboard fixed it.

### switch 2 — hinged flap

i wanted an action that wasn't just pressing. two pieces of cardboard taped into a simple hinge, copper on the underside of the flap and another contact on the base. close the flap and the contacts meet. wired to D1 and GND. a nice prototype for a door opening or closing.

### switch 3 — button

one of the big arcade buttons from the kit, placed across the center gap of the breadboard, one side to D2, the other to GND.

the led stayed on constantly again. i'd wired two legs that were already internally connected. moving one wire to the opposite side of the button fixed it.

### putting it together

once each input worked on its own, i programmed them as a sequence:

1. activate the pressure switch
2. press the button
3. close the flap
4. led turns on

the program remembers each completed step, so you don't have to hold all three at once.

```
D0 → pressure switch
D1 → flap switch
D2 → button
D3 → resistor → led → GND
all switches → GND
```

```cpp
const int matSwitch = D0;
const int doorSwitch = D1;
const int doorbell = D2;
const int ledPin = D3;

bool matDone = false;
bool bellDone = false;
bool doorDone = false;

void setup() {
  pinMode(matSwitch, INPUT_PULLUP);
  pinMode(doorSwitch, INPUT_PULLUP);
  pinMode(doorbell, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
}

void loop() {
  if (!matDone && digitalRead(matSwitch) == LOW) {
    matDone = true;
  }
  if (matDone && !bellDone && digitalRead(doorbell) == LOW) {
    bellDone = true;
  }
  if (bellDone && !doorDone && digitalRead(doorSwitch) == LOW) {
    doorDone = true;
  }
  if (matDone && bellDone && doorDone) {
    digitalWrite(ledPin, HIGH);
  }
}
```

### reflection

the biggest thing i learned: a switch is really just two conductive contacts brought together by an action. once that clicked, the physical form could change while the electronics stayed almost identical. the pressure pad, the flap, and the button all feel different in your hand but give the xiao the exact same kind of input.

### reading: the design of implicit interactions (ju & leifer, 2008)

ju and leifer start with a doorman. a good doorman doesn't wait for you to ask. he reads your approach and opens the door. their argument is that interactive systems should behave more like that, and less like something that constantly demands your attention.

they map interactions on two axes:

- attention: foreground (you're focused on it) vs. background (it happens at the edge of your awareness)
- initiative: reactive (you start it) vs. proactive (the system starts it)

an automatic door is the easy example: background and proactive. you never "use" it, you just walk through.

this made my make-your-own-switch assignment click in hindsight. stepping on a doormat isn't operating a device, it's just coming home. the switch hides inside an action you'd do anyway. the challenge is the part they warn about: a proactive system that guesses wrong gets obnoxious fast, so implicit doesn't mean invisible, it still has to be readable.
