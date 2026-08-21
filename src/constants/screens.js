/** The nine states the report flow can be in. */
export const SCREENS = {
  CAMERA: 'camera',
  ANALYZING: 'analyzing',
  CONFIRM: 'confirm',
  PICKER: 'picker',
  DUPLICATE: 'dup',
  IDENTITY: 'identity',
  SENDING: 'sending',
  RECEIPT: 'receipt',
  TRACK: 'track',
};

/** Sidebar entries — the numbered walkthrough from the prototype. */
export const SCREEN_NAV = [
  { screen: SCREENS.CAMERA, label: '1. Camera' },
  { screen: SCREENS.ANALYZING, label: '2. Checking' },
  { screen: SCREENS.CONFIRM, label: '3. Is this right?' },
  { screen: SCREENS.PICKER, label: '4. Choose yourself' },
  { screen: SCREENS.DUPLICATE, label: '5. Already reported' },
  { screen: SCREENS.IDENTITY, label: '6. Your name' },
  { screen: SCREENS.RECEIPT, label: '7. Sent' },
  { screen: SCREENS.TRACK, label: '8. Follow up' },
];

/** Screens that render over a camera feed / photo, so the frame goes dark. */
export const DARK_SCREENS = [SCREENS.CAMERA, SCREENS.ANALYZING];

/** Milestones of the fake analysis pass, in order. */
export const ANALYSIS_STEPS = [
  'Looking at your photo',
  'Hiding faces and number plates',
  'Finding the officer for your area',
];

/** Timings (ms) for the analysis pass and the send animation. */
export const TIMING = {
  ANALYSIS_STEP_1: 700,
  ANALYSIS_STEP_2: 1350,
  ANALYSIS_STEP_3: 1950,
  ANALYSIS_DONE: 2350,
  SENDING: 1500,
  CAMERA_WARMUP: 500,
};
