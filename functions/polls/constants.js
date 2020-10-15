const BIDEN_LONG = 'Joseph R. Biden Jr.';
const TRUMP_LONG = 'Donald Trump';

const CANDIDATES_LONG = [BIDEN_LONG, TRUMP_LONG];
const CANDIDATES_SHORT = {
  [BIDEN_LONG]: 'Biden',
  [TRUMP_LONG]: 'Trump',
};
const BATTLEGROUND_STATES = [
  'Arizona',
  'Florida',
  'Georgia',
  'Iowa',
  'Michigan',
  'Minnesota',
  'National',
  'Nevada',
  'North Carolina',
  'Ohio',
  'Pennsylvania',
  'Texas',
  'Wisconsin',
];

module.exports = {
  BATTLEGROUND_STATES,
  CANDIDATES_LONG,
  CANDIDATES_SHORT,
};
