export type State = {
  [key: string]: {
    leader: string;
    margin: string;
  };
};

export const polls2016Data: State = {
  Arizona: { leader: 'republican', margin: '2.8' },
  Florida: { leader: 'democratic', margin: '0.9' },
  Georgia: { leader: 'republican', margin: '4.0' },
  Iowa: { leader: 'republican', margin: '4.3' },
  Michigan: { leader: 'democratic', margin: '3.1' },
  Minnesota: { leader: 'democratic', margin: '8.0' },
  National: { leader: 'democratic', margin: '3.8' },
  Nevada: { leader: 'democratic', margin: '0.5' },
  'North Carolina': { leader: 'democratic', margin: '1.1' },
  Ohio: { leader: 'republican', margin: '3.0' },
  Pennsylvania: { leader: 'democratic', margin: '3.1' },
  Texas: { leader: 'republican', margin: '9.8' },
  Wisconsin: { leader: 'democratic', margin: '5.0' },
};

export const results2016Data = {
  Arizona: { leader: 'republican', margin: '3.5' },
  Florida: { leader: 'republican', margin: '1.2' },
  Georgia: { leader: 'republican', margin: '5.1' },
  Iowa: { leader: 'republican', margin: '9.4' },
  Michigan: { leader: 'republican', margin: '0.2' },
  Minnesota: { leader: 'democratic', margin: '1.5' },
  National: { leader: 'democratic', margin: '2.1' },
  Nevada: { leader: 'democratic', margin: '2.4' },
  'North Carolina': { leader: 'republican', margin: '3.7' },
  Ohio: { leader: 'republican', margin: '8.1' },
  Pennsylvania: { leader: 'republican', margin: '0.7' },
  Texas: { leader: 'republican', margin: '9.0' },
  Wisconsin: { leader: 'republican', margin: '0.8' },
} as State;
