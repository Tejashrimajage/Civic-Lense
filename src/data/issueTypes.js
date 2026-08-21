/**
 * The issue taxonomy. Each entry carries the human label shown to the
 * reporter, and the officer the complaint is routed to.
 */
export const ISSUE_TYPES = {
  garbage_dump: {
    id: 'garbage_dump',
    label: 'Garbage dump',
    pickerLabel: 'Rubbish or garbage',
    desc: 'Waste piled at the roadside and spilling onto the footpath.',
    officer: 'Sanitary Inspector',
    desig: 'Solid Waste Management, Ward 14 (Aundh–Baner)',
    department: 'Solid Waste Management, PMC',
  },
  illegal_dumping_debris: {
    id: 'illegal_dumping_debris',
    label: 'Dumped debris',
    pickerLabel: 'Building debris dumped',
    desc: 'Building debris left on public land beside the road.',
    officer: 'Junior Engineer',
    desig: 'Solid Waste Management, Ward 14 (Aundh–Baner)',
    department: 'Solid Waste Management, PMC',
  },
  pothole: {
    id: 'pothole',
    label: 'Broken road',
    pickerLabel: 'Broken road or pothole',
    desc: 'A pothole across the left lane of the road.',
    officer: 'Junior Engineer',
    desig: 'Roads Department, Ward 14 (Aundh–Baner)',
    department: 'Roads Department, PMC',
  },
  streetlight_out: {
    id: 'streetlight_out',
    label: 'Street light out',
    pickerLabel: 'Street light not working',
    desc: 'A street light that stays dark after sunset.',
    officer: 'Junior Engineer',
    desig: 'Electrical Department, Ward 14 (Aundh–Baner)',
    department: 'Electrical Department, PMC',
  },
  traffic_signal_fault: {
    id: 'traffic_signal_fault',
    label: 'Traffic signal fault',
    pickerLabel: 'Traffic signal not working',
    desc: 'A signal that is off at a busy four-way junction.',
    officer: 'Police Inspector',
    desig: 'Traffic Division, Chatushrungi Chowky',
    department: 'Traffic Division, Pune Police',
  },
  water_leak_sewage: {
    id: 'water_leak_sewage',
    label: 'Water leak',
    pickerLabel: 'Water leak or drain',
    desc: 'Water running continuously from a broken line onto the road.',
    officer: 'Section Engineer',
    desig: 'Water Supply, Ward 14 (Aundh–Baner)',
    department: 'Water Supply, PMC',
  },
};

export const DEFAULT_ISSUE_ID = 'garbage_dump';

/** Order and emphasis of the manual picker list. */
export const PICKER_ORDER = [
  { id: 'garbage_dump', emphasis: 'likely' },
  { id: 'illegal_dumping_debris', emphasis: 'soft' },
  { id: 'pothole', emphasis: 'plain' },
  { id: 'streetlight_out', emphasis: 'plain' },
  { id: 'traffic_signal_fault', emphasis: 'plain' },
  { id: 'water_leak_sewage', emphasis: 'plain' },
];

export function getIssue(id) {
  return ISSUE_TYPES[id] || ISSUE_TYPES[DEFAULT_ISSUE_ID];
}
