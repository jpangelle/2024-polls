const axios = require('axios');
const csv = require('csvtojson');
const { DateTime } = require('luxon');

exports.handler = async function () {
  const BIDEN = 'Joseph R. Biden Jr.';
  const TRUMP = 'Donald Trump';

  const candidates = [BIDEN, TRUMP];
  const battlegroundStates = [
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

  try {
    const { data } = await axios(
      'https://projects.fivethirtyeight.com/2020-general-data/presidential_poll_averages_2020.csv',
    );

    // convert to JSON
    const pollResults = await csv().fromString(data);

    const date = DateTime.local().toLocaleString();

    const pollResults2020 = pollResults.filter(
      ({ candidate_name, modeldate, state }) =>
        modeldate === date &&
        candidates.includes(candidate_name) &&
        battlegroundStates.includes(state),
    );

    const computeLeader = percents => {
      if (percents.Biden > percents.Trump) {
        return 'Biden';
      } else if (percents.Biden < percents.Trump) {
        return 'Trump';
      }
      return 'Tie';
    };

    const computeMargin = percents =>
      Math.round(Math.abs(percents.Biden - percents.Trump) * 10) / 10;

    const statePercentages = pollResults2020.reduce((acc, cur) => {
      const {
        candidate_name: candidateName,
        pct_trend_adjusted: pctTrendAdjusted,
        state,
      } = cur;
      const pctTrendAdjustedNum = Number(pctTrendAdjusted);

      if (acc[state]) {
        if (candidateName === BIDEN) {
          acc[state] = {
            ...acc[state],
            Biden: pctTrendAdjustedNum,
          };
        } else {
          acc[state] = {
            ...acc[state],
            Trump: pctTrendAdjustedNum,
          };
        }
      } else {
        if (candidateName === BIDEN) {
          acc[state] = {
            Biden: pctTrendAdjustedNum,
          };
        } else {
          acc[state] = {
            Trump: pctTrendAdjustedNum,
          };
        }
      }

      return acc;
    }, {});

    const margins = Object.entries(statePercentages).map(stateData => {
      const [state, percents] = stateData;
      return {
        leader: computeLeader(percents),
        margin: computeMargin(percents),
        state,
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ margins }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
