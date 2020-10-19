import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Footer } from './Footer';
import { Loader } from './Loader';
import { Table } from './Table';
import './App.css';

const BATTLEGROUND_STATES = [
  'Arizona',
  'Florida',
  'Georgia',
  'Iowa',
  'Michigan',
  'Minnesota',
  'National',
  'Nevada',
  'North Carolina',
  'Ohio',
  'Pennsylvania',
  'Texas',
  'Wisconsin',
];

export type State = {
  state: string;
  polls2020: {
    leader: string;
    margin: string;
  };
  results2016: {
    leader: string;
    margin: string;
  };
};

export type States = State[];

function App() {
  const [nationalTableData, setNationalTableData] = useState<State>();
  const [stateTableData, setStateTableData] = useState<States>();

  const { data: polls2020Data, status: polls2020Status } = useQuery(
    'polls-2020',
    async () => {
      const response = await axios('/.netlify/functions/polls');
      return response.data.polls;
    },
  );

  const { data: results2016Data } = useQuery('results-2016', async () => {
    const response = await axios('/.netlify/functions/results-2016');
    return response.data.polls;
  });

  useEffect(() => {
    if (polls2020Data && results2016Data) {
      const mergedData = BATTLEGROUND_STATES.map(state => ({
        polls2020: polls2020Data[state],
        results2016: results2016Data[state],
        state,
      }));

      const sortedStateData = mergedData
        .filter(data => data.state !== 'National')
        .sort((a, b) => Number(b.polls2020.margin - a.polls2020.margin));
      const nationalData = mergedData.find(data => data.state === 'National');

      setNationalTableData(nationalData);
      setStateTableData(sortedStateData);
    }
  }, [polls2020Data, results2016Data]);

  return (
    <div className="App">
      <div className="header">fivethirtyeight Latest Polls</div>
      {polls2020Status === 'loading' && <Loader />}
      {nationalTableData && stateTableData && (
        <>
          <Table
            nationalTableData={nationalTableData}
            stateTableData={stateTableData}
          />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
