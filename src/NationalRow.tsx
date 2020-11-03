import React from 'react';
import { State } from './App';

type Props = {
  nationalTableData: State;
};

export const NationalRow = ({ nationalTableData }: Props) => (
  <div className="national-row">
    <span className="state">National</span>
    <span className="margin">
      +{nationalTableData.polls2020.margin}
      <span
        className={`circle-2020 ${
          nationalTableData.polls2020.leader === 'democratic'
            ? 'blue-background'
            : 'red-background'
        }`}
      />
    </span>
    <span className="margin">
      +{nationalTableData.results2016.margin}
      <span
        className={`circle-2020 ${
          nationalTableData.results2016.leader === 'democratic'
            ? 'blue-background'
            : 'red-background'
        }`}
      />
    </span>
    <span className="margin">
      +{nationalTableData.polls2016.margin}
      <span
        className={`circle-2020 ${
          nationalTableData.polls2016.leader === 'democratic'
            ? 'blue-background'
            : 'red-background'
        }`}
      />
    </span>
  </div>
);
