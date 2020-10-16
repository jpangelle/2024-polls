const axios = require('axios');
const csv = require('csvtojson');
const {
  BATTLEGROUND_STATES,
  CANDIDATES_LONG,
  CANDIDATES_SHORT,
} = require('./constants');

exports.handler = async function () {
  try {
    // fetch CSV data from fivethirtyeight
    const { data } = await axios(
      'https://projects.fivethirtyeight.com/2020-general-data/presidential_poll_averages_2020.csv',
    );

    // convert to JSON
    const pollResults = await csv().fromString(data);

    // get current date in the format of mm/dd/yyyy
    const date = pollResults[0].modeldate;

    /*
     * filter for polls:
     *   - today's date
     *   - Biden and Trump
     *   - in battleground states
     */
    const pollResults2020 = pollResults.filter(
      ({ candidate_name: candidateName, modeldate, state }) =>
        modeldate === date &&
        CANDIDATES_LONG.includes(candidateName) &&
        BATTLEGROUND_STATES.includes(state),
    );

    /**
     * @param {{Biden: number, Trump: number }} percents - the percentage of each candidate in a give state
     * @returns {string} leader of the given state
     */
    const computeLeader = percents => {
      if (percents.Biden > percents.Trump) {
        return 'Biden';
      } else if (percents.Biden < percents.Trump) {
        return 'Trump';
      }
      return 'Tie';
    };

    /**
     * @param {{Biden: number, Trump: number }} percents - the percentage of each candidate in a give state
     * @returns {number} margin between the candidates
     */
    const computeMargin = percents =>
      Math.round(Math.abs(percents.Biden - percents.Trump) * 10) / 10;

    /*
     * reduces the individual candidate - state objects into a single state object that
     * contains Biden and Trump's poll percentage
     */
    const statePercentages = pollResults2020.reduce((results, stateResult) => {
      const {
        candidate_name: candidateName,
        pct_trend_adjusted: pctTrendAdjusted,
        state,
      } = stateResult;
      const pctTrendAdjustedNum = Number(pctTrendAdjusted);
      const candidateShortName = CANDIDATES_SHORT[candidateName];

      if (results[state]) {
        results[state] = {
          ...results[state],
          [candidateShortName]: pctTrendAdjustedNum,
        };
      } else {
        results[state] = {
          [candidateShortName]: pctTrendAdjustedNum,
        };
      }

      return results;
    }, {});

    /*
     * maps the state percentages into objects containing the leader, the margin
     * and the corresponding state
     */
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
