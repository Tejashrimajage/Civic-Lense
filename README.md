# CivicLens

Take one photo. We work out what it is, who is responsible, and send it for you.

A React front end for reporting civic issues — potholes, garbage, broken street
lights — with no form and no login. The reporter takes a photo; the app proposes
what the issue is, pins the ward, names the officer it will reach, and keeps a
receipt that escalates on its own if nobody replies.

Built from the `cl.html` design prototype.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script            | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Dev server with hot reload                |
| `npm run build`   | Production bundle into `dist/`             |
| `npm run preview` | Serve the built bundle                    |
| `npm run lint`    | ESLint over `src/`                        |

Browsers only grant camera access on `https` or `localhost`, so the live
viewfinder works on the dev server but not from a `file://` copy. Where the
camera is unavailable or denied, the shutter falls back to the photo picker, and
you can drag an image straight onto the viewfinder to rehearse the flow.

## The flow

```
camera ──shutter──▶ analysing ──▶ confirm ──▶ identity ──▶ sending ──▶ receipt ──▶ follow up
                        │            │            ▲
                        │            └─"something else"─┐
                        └─low confidence──▶ picker ─────┘
                                     confirm ──▶ duplicate ──▶ identity
```

Eight screens, one action each. The rail on the left jumps between them and
carries two switches that change how the flow branches:

- **Low confidence** — analysis hands off to the manual picker instead of
  proposing a guess.
- **Duplicate nearby** — offer to join a neighbour's open report before sending.

Below 900px the bezel drops away and the app fills the viewport; the rail is
hidden.

## Layout

```
src/
├── main.jsx                  entry point
├── App.jsx                   screen router + demo switches
├── constants/screens.js      the nine flow states, nav order, timings
├── data/
│   ├── issueTypes.js         issue taxonomy → responsible officer
│   └── reportFixtures.js     stand-ins for anything a backend would serve
├── hooks/
│   ├── useCamera.js          getUserMedia, frame capture, file fallback
│   ├── useImageDrop.js       drag an image onto the viewfinder
│   └── useReportFlow.js      the state machine
├── components/
│   ├── device/               iOS frame: bezel, island, status bar
│   ├── layout/Sidebar.jsx    the walkthrough rail
│   └── ui/                   Screen, Button, PhotoBackdrop, MiniMap
├── screens/                  one file + one stylesheet per screen
└── styles/
    ├── tokens.css            every colour, radius and font in the design
    ├── animations.css        the cl-* keyframes
    └── global.css            reset + base
```

Styling is CSS Modules over the custom properties in `tokens.css` — no CSS
framework. Nothing reaches for a colour or radius that is not a token.

## Wiring up a backend

The app is front end only; everything a server would provide is isolated so it
can be swapped without touching the screens:

- `src/data/reportFixtures.js` — ward and location, the duplicate cluster, the
  receipt reference and timestamps, the follow-up timeline.
- `src/data/issueTypes.js` — the taxonomy and the officer each issue routes to.
- `useReportFlow.startAnalysis` — replace the staged timers with the real
  classify/redact/route call.
- `useReportFlow.send` — replace the timer with the submit request; the reference
  on the receipt should come from its response.
