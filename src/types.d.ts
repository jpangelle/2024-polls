type StatePollData = {
  state: string;
  polls2024: {
    leader: string;
    margin: string;
  };
  results2020: {
    leader: string;
    margin: string;
  };
  polls2020: {
    leader: string;
    margin: string;
  };
};

type PartyPercentages = {
  republican: number;
  democratic: number;
};

type BattlegroundStates =
  | "Arizona"
  | "Georgia"
  | "Michigan"
  | "National"
  | "Nevada"
  | "North Carolina"
  | "Pennsylvania"
  | "Wisconsin";

type StateData = Record<BattlegroundStates, PartyPercentages>;

type Poll = {
  leader: "republican" | "democratic" | "tie";
  margin: string;
};

type PollData = Record<BattlegroundStates, Poll>;

type CSVPollingData = {
  candidate: "Harris" | "Trump";
  date: string;
  pct_estimate: string;
  state: BattlegroundStates;
};
