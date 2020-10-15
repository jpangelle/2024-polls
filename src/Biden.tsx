import React from 'react';
import { StatePolling } from './App';

type Props = {
  states: StatePolling[];
};

export const Biden = ({ states }: Props) => {
  return (
    <div className="biden">
      <h2>Biden</h2>
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
