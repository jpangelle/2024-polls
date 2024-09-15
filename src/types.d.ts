type Leader = "republican" | "democratic" | "tie";

type StatePollData = {
  state: string;
  polls2024: {
    leader: Leader;
    margin: string;
  };
  results2020: {
    leader: Leader;
    margin: string;
  };
  polls2020: {
    leader: Leader;
    margin: string;
  };
};
