import React from 'react';
import { StatePolling } from './App';

type Props = {
  states: StatePolling[];
};

export const Trump = ({ states }: Props) => {
  return (
    <div className="trump">
      <h2>Trump</h2>
      {states.map(({ margin, state }: StatePolling) => (
        <p>
          <div>
            {state} +{margin}
          </div>
        </p>
      ))}
    </div>
  );
};
