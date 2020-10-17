const axios = require('axios');
const csv = require('csvtojson');
const {
  BATTLEGROUND_STATES,
  CANDIDATES_LONG,
  CANDIDATES_PARTY,
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
     * @param {{democratic: number, republican: number }} percents - the percentage of each party in a give state
     * @returns {string} leader of the given state
     */
    const computeLeader = percents => {
      if (percents.democratic > percents.republican) {
        return 'democratic';
      } else if (percents.democratic < percents.republican) {
        return 'republican';
      }
      return 'tie';
    };

    /**
     * @param {{democratic: number, republican: number }} percents - the percentage of each party in a give state
     * @returns {number} margin between the parties
     */
    const computeMargin = percents => {
      return Math.abs(percents.democratic - percents.republican).toFixed(1);
    };

    /*
     * reduces the individual candidate - state objects into a single state
     * object that contains democratic and republican's poll percentage
     */
    const statePercentages = pollResults2020.reduce((results, stateResult) => {
      const {
        candidate_name: candidateName,
        pct_trend_adjusted: pctTrendAdjusted,
        state,
      } = stateResult;
      const pctTrendAdjustedNum = Number(pctTrendAdjusted);
      const candidateParty = CANDIDATES_PARTY[candidateName];

      if (results[state]) {
        results[state] = {
          ...results[state],
          [candidateParty]: pctTrendAdjustedNum,
        };
      } else {
        results[state] = {
          [candidateParty]: pctTrendAdjustedNum,
        };
      }

      return results;
    }, {});

    /*
     * maps the state percentages into objects containing the leader, the margin
     * and the corresponding state
     */
    const polls = Object.entries(statePercentages).map(stateData => {
      const [state, percents] = stateData;
      return {
        leader: computeLeader(percents),
        margin: computeMargin(percents),
        state,
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ polls }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
