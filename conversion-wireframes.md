# ConvergeIST Conversion Wireframes

## Purpose

These wireframes define the conversion path for two distinct audiences while retaining one Arrival Notebook system. They are implementation blueprints, not a visual reset: **student arrivals** should feel personally supported and low-pressure; **business visitors** should feel prepared, credible, and oriented toward decisions and handoffs.

## A. Shared conversion rules

| Element | Rule | Implementation consequence |
| --- | --- | --- |
| Header action | Match the visitor’s route. | Student routes use **Start your plan**; Business Visits uses **Plan a business visit**. |
| Outcome proof | Show the tangible result before asking for information. | Use a short three-part outcome strip immediately under the hero action. |
| Form burden | Ask only for the smallest useful next step. | Three stages; one decision per row; visible save/progress state. |
| Trust cue | State what happens after submission and what is not required. | Place response timing and data-use note beside the submit action. |
| Escape route | Offer a simple alternate contact route. | Email/WhatsApp link below form, never hidden in the footer. |

## B. Student arrival conversion path

### Desktop wireframe

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ [ConvergeIST mark]  Journey / Support / Business / Guides     [Start plan →] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ARRIVAL NOTE · FOR STUDENTS                                                  │
│  Your first day in China should feel like an arrival, not a test.             │
│  Practical support for the first week, with a route matched to your city.     │
│                                                                              │
│  [Map my arrival ↘]   [See how support works ↗]        ┌─────────────────┐   │
│                                                        │ arrival image   │   │
│  ── BEFORE YOU GO ── LANDING DAY ── FIRST WEEK         │ field note      │   │
│                                                        └─────────────────┘   │
├──────────────────────────────────────────────────────────────────────────────┤
│  YOU LEAVE WITH                                                              │
│  [A clearer first day] [A local support route] [A person to ask]              │
├──────────────────────────────────────────────────────────────────────────────┤
│  [Short arrival form]                   [What happens next]                  │
│  1. Tell us city + timing                01 We read your route                │
│  2. Name the first uncertainty            02 We reply through your channel     │
│  3. Choose email / WhatsApp                03 You choose support, no pressure  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile wireframe

```text
┌──────────────────────────────┐
│ [Mark] CONVERGEIST      [Menu]│
├──────────────────────────────┤
│ ARRIVAL NOTE · STUDENTS       │
│ Your first day in China       │
│ should feel like an arrival.  │
│ [Map my arrival ↘]            │
│                               │
│ 01 Before you go              │
│ 02 Landing day                │
│ 03 First week                 │
├──────────────────────────────┤
│ YOU LEAVE WITH                │
│ ○ A clearer first day         │
│ ○ A local support route       │
│ ○ A person to ask             │
├──────────────────────────────┤
│ [Start your arrival note]     │
│ Takes about 2 minutes         │
└──────────────────────────────┘
```

## C. Business Visits conversion path

### Desktop wireframe

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ [ConvergeIST mark] Journey / Support / Business / Guides  [Plan business →]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  商旅与贸易 · BUSINESS VISITS                                                 │
│  A China trip that moves your business forward.                               │
│  For founders, buyers, and teams: source, visit, verify, hand off.           │
│                                                                              │
│  [Plan a business visit ↘] [Explore shipping handoff ↗]  ┌────────────────┐  │
│                                                          │ supplier visit │  │
│  ┌─────────────────────────┐                             │ + route brief  │  │
│  │ ARRIVE — VISIT — MOVE   │                             └────────────────┘  │
│  └─────────────────────────┘                                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│  THE ROUTE LEAVES YOU WITH                                                     │
│  [Meeting sequence] ─ [Decision note] ─ [Shipment-ready handoff]              │
├──────────────────────────────────────────────────────────────────────────────┤
│  01 PREPARE       02 VISIT          03 HAND OFF                               │
│  Supplier shortlist Factory context Packing / document owners                 │
├──────────────────────────────────────────────────────────────────────────────┤
│  BUSINESS BRIEF                         RESPONSE ROUTE                        │
│  ┌──────────────────────────────────┐  ┌──────────────────────────────────┐  │
│  │ [01 Visit] [02 Work] [03 Handoff] │  │ 01 We read your route             │  │
│  │                                    │  │ 02 We reply with the next useful │  │
│  │ Question set for current step     │  │    conversation                   │  │
│  │ [Back]              [Continue →]  │  │ 03 Email or WhatsApp works        │  │
│  └──────────────────────────────────┘  └──────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile wireframe

```text
┌──────────────────────────────┐
│ [Mark] CONVERGEIST      [Menu]│
├──────────────────────────────┤
│ 商旅与贸易                    │
│ A China trip that moves       │
│ your business forward.        │
│ [Plan a business visit ↘]     │
│                               │
│ ARRIVE · VISIT · MOVE         │
├──────────────────────────────┤
│ THE ROUTE LEAVES YOU WITH     │
│ 01 Meeting sequence           │
│ 02 Decision note              │
│ 03 Shipment-ready handoff     │
├──────────────────────────────┤
│ BUSINESS BRIEF                │
│ [01] ━━━ [02] ━━━ [03]        │
│ Your visit                    │
│ Full name                     │
│ Work email                    │
│ Travel window                 │
│ [Continue →]                  │
│                               │
│ We reply with a useful next   │
│ conversation—not a sales maze.│
└──────────────────────────────┘
```

## D. Detailed Business Brief progression

| Stage | User question | Inputs | Guidance panel | Progress result |
| --- | --- | --- | --- | --- |
| **01 · Visit** | “When and where will the route begin?” | Name, work email, travel window | “Share only route basics. No passport, payment, or sensitive documents.” | `01 / 03` marked complete; summary line names timing. |
| **02 · Work** | “What needs attention on the ground?” | Sourcing hub, primary focus | “A city is a starting point, not a commitment. You can choose another route.” | `02 / 03` marked complete; summary line names city and focus. |
| **03 · Handoff** | “What should still be moving once you leave?” | Stage, optional notes | “One decisive question is more useful than a long brief.” | Prepared route note shows visit + work + handoff summary. |
| **Completion** | “What happens now?” | No extra input | “We read the route, then respond through the contact method you chose.” | Confirmation card, clear prototype/live-service state, alternate contact link. |

## E. Interaction and motion rules

| Surface | Motion | Constraint |
| --- | --- | --- |
| Hero | Copy enters in three short beats; image has a very shallow scroll drift. | Keep the initial interaction fully visible with no opacity-dependent layout. |
| Outcome proof strip | Route line draws once as it crosses the viewport. | Do not animate on reduced-motion preference. |
| Business Brief | Stage card advances with a 180–220ms horizontal transition; focus lands on the next heading. | Keyboard advance must be instant and focus-safe. |
| Form completion | Route card receives a brief stamped-state transition. | Never substitute animation for confirmation text. |
| Cards and links | 120–180ms translate/ink transition on hover and active press. | Use clear focus rings; no hover-only affordance. |

## F. Accessibility acceptance checks

1. A skip link reaches each route’s main content.
2. Every conversion action, selector, and mobile-menu control has a visible focus state and an accessible label.
3. Mobile navigation closes with `Escape`, restores focus to the trigger, and has no hidden focusable content while closed.
4. Body copy and small labels remain legible against their rendered background; route color is never the only state indicator.
5. Reduced-motion mode leaves all route content visible and disables nonessential reveals and parallax.
