/**
 * Stand-in values for everything a real backend would supply: the ward the
 * reporter is standing in, the duplicate cluster nearby, and the follow-up
 * timeline. Swap these for API calls when wiring up a server.
 */

export const LOCATION = {
  ward: 'Ward 14',
  area: 'Aundh',
  wardLabel: 'Aundh, Ward 14',
  landmark: 'Near Parihar Chowk, Aundh Road',
};

export const DUPLICATE_CLUSTER = {
  neighbours: 3,
  distanceMetres: 40,
  daysOpen: 2,
  title: 'Garbage dump, Ward 14',
  escalationSegments: 4,
  segmentsElapsed: 3,
};

export const RECEIPT = {
  reference: 'CL-2291',
  date: '21 Aug 2026',
  time: '9:14 pm',
  escalationDate: '24 August',
};

export const TRACKING = {
  reference: 'CL-2291',
  status: 'Waiting for reply',
  neighbours: 14,
  daysToEscalation: '2 days',
  timeline: [
    {
      id: 'emailed',
      title: 'Emailed to Sanitary Inspector',
      meta: '21 Aug, 9:14 pm',
      state: 'done',
    },
    {
      id: 'joined',
      title: '11 neighbours added their voice',
      meta: '21–23 Aug',
      state: 'past',
    },
    {
      id: 'escalation',
      title: 'Goes up to the Zonal Officer',
      meta: '24 Aug, automatic',
      state: 'pending',
    },
  ],
};

export const IDENTITY_DEFAULTS = {
  name: 'Aarti Deshmukh',
  email: 'aarti.d@gmail.com',
};
