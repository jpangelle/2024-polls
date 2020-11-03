import React, { Fragment } from 'react';
import { State, States } from './App';
import { NationalRow } from './NationalRow';

type Props = {
  nationalTableData: State;
  stateTableData: States;
};

export const Table = ({ nationalTableData, stateTableData }: Props) => (
  <div className="table">
    <h3 className="table-header year-2020">2020 Polling</h3>
    <h3 className="table-header year-2016">2016 Results</h3>
    <h3 className="table-header year-2016">2016 Polling</h3>
    <NationalRow nationalTableData={nationalTableData} />
    {stateTableData.map(({ results2016, polls2020, polls2016, state }) => (
      <Fragment key={state}>
        <span className="state">{state}</span>
        <span className="margin">
          +{polls2020.margin}
          <span
            className={`circle-2020 ${
              polls2020.leader === 'democratic'
                ? 'blue-background'
                : 'red-background'
            }`}
          />
        </span>
        <span className="margin">
          +{results2016.margin}
          <span
            className={`circle-2020 ${
              results2016.leader === 'democratic'
                ? 'blue-background'
                : 'red-background'
            }`}
          />
        </span>
        <span className="margin">
          +{polls2016.margin}
          <span
            className={`circle-2020 ${
              polls2016.leader === 'democratic'
                ? 'blue-background'
                : 'red-background'
            }`}
          />
        </span>
      </Fragment>
    ))}
  </div>
);
