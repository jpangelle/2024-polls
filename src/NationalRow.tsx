import React from 'react';
import { National } from './App';

type Props = {
  national: National;
};

export const NationalRow = ({ national }: Props) => (
  <div className="national-row">
    <span className="state">National</span>
    <span className="margin">
      +{national.margin}
      <span
        className={`circle-2020 ${
          national.leader === 'democratic'
            ? 'blue-background'
            : 'red-background'
        }`}
      />
    </span>
    <span className="margin">
      +2.1
      <span className="circle-2020 blue-background" />
    </span>
  </div>
);
