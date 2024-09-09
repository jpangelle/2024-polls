import axios from "axios";
import csv from "csvtojson";
import { BATTLEGROUND_STATES, CANDIDATES_PARTY } from "./constants";
import { polls2020Data, results2020Data } from "./data";

const computeLeader = (percents: {
  democratic: number;
  republican: number;
}) => {
  if (percents.democratic > percents.republican) {
    return "democratic";
  } else if (percents.democratic < percents.republican) {
    return "republican";
  }
  return "tie";
};

const computeMargin = (percents: { democratic: number; republican: number }) =>
  Math.abs(percents.democratic - percents.republican).toFixed(1);

export const getPollData = async () => {
  const { data } = await axios(
    "https://projects.fivethirtyeight.com/polls/data/presidential_general_averages.csv"
  );

  const pollData = (await csv().fromString(data)) as CSVPollingData[];

  const pollData2024 = pollData.filter((result) =>
    result.date.includes("2024")
  );
  const date = pollData2024[0].date;

  const battlegroundStatePolls = pollData2024.filter(
    ({ candidate, date: modeldate, state }) =>
      modeldate === date &&
      ["Harris", "Trump"].includes(candidate) &&
      BATTLEGROUND_STATES.includes(state)
  );

  const statePercentages = battlegroundStatePolls.reduce(
    (results, stateResult) => {
      const { candidate, pct_estimate: pctEstimate, state } = stateResult;
      const pctEstimateNum = Number(pctEstimate);
      const candidateParty = CANDIDATES_PARTY[candidate];

      if (results[state]) {
        results[state] = {
          ...results[state],
          [candidateParty]: pctEstimateNum,
        };
      } else {
        results[state] = {
          republican: 0,
          democratic: 0,
          [candidateParty]: pctEstimateNum,
        };
      }

      return results;
    },
    {} as StateData
  );

  const polls = (
    Object.entries(statePercentages) as [BattlegroundStates, PartyPercentages][]
  ).reduce((results, [state, percentages]) => {
    results[state] = {
      leader: computeLeader(percentages),
      margin: computeMargin(percentages),
    };

    return results;
  }, {} as PollData);

  const mergedData = BATTLEGROUND_STATES.map((state) => ({
    polls2024: polls[state],
    results2020: results2020Data[state],
    polls2020: polls2020Data[state],
    state,
  }));

  const stateData = mergedData
    .filter((data) => data.state !== "National")
    .sort((a, b) => Number(b.polls2024.margin) - Number(a.polls2024.margin));

  const nationalData = mergedData.find((data) => data.state === "National")!;

  return {
    stateData,
    nationalData,
  };
};
