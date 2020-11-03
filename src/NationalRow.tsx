import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { State } from './App';
import { SHORT_NAMES } from './constants';

type Props = {
  nationalTableData: State;
};

export const NationalRow = ({ nationalTableData }: Props) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 500px)',
  });

  const computeStateName = (state: string) =>
    isMobile ? SHORT_NAMES[state] : state;

  return (
    <>
      <span className="state national-row">{computeStateName('National')}</span>
      <span className="margin national-row">
        +{nationalTableData.polls2020.margin}
        <span
          className={`circle-2020 ${
            nationalTableData.polls2020.leader === 'democratic'
              ? 'blue-background'
              : 'red-background'
          }`}
        />
      </span>
      <span className="margin national-row">
        +{nationalTableData.results2016.margin}
        <span
          className={`circle-2020 ${
            nationalTableData.results2016.leader === 'democratic'
              ? 'blue-background'
              : 'red-background'
          }`}
        />
      </span>
      <span className="margin national-row">
        +{nationalTableData.polls2016.margin}
        <span
          className={`circle-2020 ${
            nationalTableData.polls2016.leader === 'democratic'
              ? 'blue-background'
              : 'red-background'
          }`}
        />
      </span>
    </>
  );
};
