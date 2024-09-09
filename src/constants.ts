export const SHORT_NAMES: { [key: string]: string } = {
  Arizona: "AZ",
  Georgia: "GA",
  Michigan: "MI",
  National: "Nat",
  Nevada: "NV",
  "North Carolina": "NC",
  Pennsylvania: "PA",
  Wisconsin: "WI",
};

export const BATTLEGROUND_STATES = [
  "Arizona",
  "Georgia",
  "Michigan",
  "National",
  "Nevada",
  "North Carolina",
  "Pennsylvania",
  "Wisconsin",
] as const;

export const CANDIDATES_PARTY = {
  Harris: "democratic",
  Trump: "republican",
} as const;
