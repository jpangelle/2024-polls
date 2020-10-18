import React from 'react';
import { National, State } from './App';
import { NationalRow } from './NationalRow';

type Props = {
  national: National;
  tableData: State[];
};

export const Table = ({ national, tableData }: Props) => (
  <div className="table">
    <h3 className="table-header year-2020">2020 Polling</h3>
    <h3 className="table-header year-2016">2016 Result</h3>
    <NationalRow national={national} />
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
