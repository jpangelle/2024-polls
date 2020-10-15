import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Biden } from './Biden';
import { National } from './National';
import { Trump } from './Trump';
import './App.css';

export type StatePolling = {
  leader: string;
  margin: number;
  state: string;
};

type Margins = {
  margins: StatePolling[];
};

type NationalPoll = {
  leader: string;
  margin: number;
};

function App() {
  const [bidenStates, setBidenStates] = useState<StatePolling[]>();
  const [trumpStates, setTrumpStates] = useState<StatePolling[]>();
  const [nationalPoll, setNationalPoll] = useState<NationalPoll>();

  const sortPollsByCandidate = (polls: Margins) => {
    const bidenStatesFiltered = polls.margins
      .filter(margin => {
        if (margin.state === 'National') {
          setNationalPoll({ leader: margin.leader, margin: margin.margin });
          return false;
        } else {
          return margin.leader === 'Biden';
        }
      })
      .sort((a, b) => {
        return b.margin - a.margin;
      });
    const trumpStatesFiltered = polls.margins
      .filter(margin => {
        if (margin.state === 'National') {
          setNationalPoll({ leader: margin.leader, margin: margin.margin });
          return false;
        } else {
          return margin.leader === 'Trump';
        }
      })
      .sort((a, b) => {
        return b.margin - a.margin;
      });

    setBidenStates(bidenStatesFiltered);
    setTrumpStates(trumpStatesFiltered);
  };

  const { status } = useQuery(
    'polls',
    async () => {
      const response = await axios('/.netlify/functions/polls');
      return response.data;
    },
    { onSuccess: sortPollsByCandidate },
  );

  return (
    <div className="App">
      <div className="header">538 Latest Polls</div>
      {status === 'loading' && 'Loading...'}
      {status === 'success' && nationalPoll && (
        <>
          <National leader={nationalPoll.leader} margin={nationalPoll.margin} />
          <div className="candidates">
            {bidenStates && <Biden states={bidenStates} />}
            {trumpStates && <Trump states={trumpStates} />}
          </div>
        </>
      )}
      <div className="footer">
        <a href="https://fivethirtyeight.com/">
          <img src="https://i.imgur.com/izo5MjD.png" alt="538 logo" />
        </a>
        <a href="https://github.com/jpangelle/2020-polls">
          <img src="https://i.imgur.com/uOxQVYw.png" alt="github logo" />
        </a>
      </div>
    </div>
  );
}

export default App;
