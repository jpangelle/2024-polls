import React from 'react';
import { State } from './App';

type Props = {
  tableData: State[];
};

export const Table = ({ tableData }: Props) => (
  <div className="table">
    <h4 className="state-header">State</h4>
    <h4 className="year">2020 Polling</h4>
    <h4 className="year">2016 Result</h4>
    {tableData.map(({ results2016, polls2020, state }) => (
      <>
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
      </>
    ))}
  </div>
);
