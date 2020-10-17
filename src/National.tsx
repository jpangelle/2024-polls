import React from 'react';

type Props = {
  leader: string;
  margin: string;
};

export const National = ({ leader, margin }: Props) => {
  return (
    <h3 className={`national ${leader === 'democratic' ? 'blue' : 'red'}`}>
      <span>National </span>
      <span>+{margin}</span>
    </h3>
  );
};
