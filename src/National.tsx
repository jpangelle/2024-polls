import React from 'react';

type Props = {
  leader: string;
  margin: number;
};

export const National = ({ leader, margin }: Props) => {
  return (
    <h3
      className={`national ${
        leader === 'Trump' ? 'national-trump' : 'national-biden'
      }`}
    >
      <span>National </span>
      <span>+{margin}</span>
    </h3>
  );
};
