const axios = require('axios');
const { BATTLEGROUND_STATES } = require('./constants');

exports.handler = async function () {
  try {
    const { data } = await axios(
      'https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-2016-presidential-election-by-states&q=&rows=100&facet=state&facet=winner',
    );

    // filter for polls in battleground states
    const results = data.records.filter(({ fields }) =>
      BATTLEGROUND_STATES.includes(fields.state),
    );

    /**
     * @param {{democratic: number, republican: number }} percents - the percentage of each candidate in a give state
     * @returns {string} leader of the given state
     */
    const computeLeader = percents =>
      percents.democratic > percents.republican ? 'democratic' : 'republican';

    /**
     * @param {{democratic: number, republican: number }} percents - the percentage of each candidate in a give state
     * @returns {number} margin between the candidates
     */
    const computeMargin = percents =>
      Math.abs(percents.democratic - percents.republican).toFixed(1);

    /*
     * reduces the individual state objects into a single state object that
     * contains democratic and republican's poll percentage
     */
    const statePercentages = results.reduce((results, stateResult) => {
      const state = stateResult.fields.state;
      const democratic = stateResult.fields.democratic;
      const republican = stateResult.fields.republican;

      if (results[state]) {
        results[state] = {
          ...results[state],
          republican,
          democratic,
        };
      } else {
        results[state] = {
          republican,
          democratic,
        };
      }

      return results;
    }, {});

    /*
     * reduces the state percentages into objects containing the leader, the margin
     * and the corresponding state
     */
    const polls = Object.entries(statePercentages).reduce(
      (results, stateResult) => {
        const [state, percentages] = stateResult;

        results[state] = {
          leader: computeLeader(percentages),
          margin: computeMargin(percentages),
        };

        return results;
      },
      {},
    );

    polls.National = { leader: 'democratic', margin: '2.1' };

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
