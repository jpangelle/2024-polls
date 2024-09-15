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

export const polls2020Data = {
  Arizona: { leader: "democratic", margin: "2.6" },
  Georgia: { leader: "democratic", margin: "1.2" },
  Michigan: { leader: "democratic", margin: "7.9" },
  National: { leader: "democratic", margin: "8.4" },
  Nevada: { leader: "democratic", margin: "5.3" },
  "North Carolina": { leader: "democratic", margin: "1.8" },
  Pennsylvania: { leader: "democratic", margin: "4.7" },
  Wisconsin: { leader: "democratic", margin: "8.4" },
} as const;

export const results2020Data = {
  Arizona: { leader: "democratic", margin: "0.3" },
  Georgia: { leader: "democratic", margin: "0.2" },
  Michigan: { leader: "democratic", margin: "2.8" },
  National: { leader: "democratic", margin: "2.1" },
  Nevada: { leader: "democratic", margin: "2.4" },
  "North Carolina": { leader: "republican", margin: "1.4" },
  Pennsylvania: { leader: "democratic", margin: "1.2" },
  Wisconsin: { leader: "democratic", margin: "0.6" },
} as const;
