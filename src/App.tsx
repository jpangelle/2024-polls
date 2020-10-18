import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Footer } from './Footer';
import { Loader } from './Loader';
import { Table } from './Table';
import './App.css';

type StatePolling = {
  leader: string;
  margin: string;
  state: string;
};

type Polls = {
  polls: StatePolling[];
};

export type National = {
  leader: string;
  margin: string;
};

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

type States = State[];

function App() {
  const [nationalPolls2020, setNationalPolls2020] = useState<National>();
  const [polls2020, setPolls2020] = useState<StatePolling[]>();
  const [tableData, setTableData] = useState<States>();

  const sortPolls = ({ polls }: Polls) => {
    const statePolls = polls
      .filter(poll => {
        if (poll.state === 'National') {
          setNationalPolls2020(poll);
          return false;
        }

        return poll;
      })
      .sort((a, b) => Number(b.margin) - Number(a.margin));

    setPolls2020(statePolls);
  };

  const { status: polls2020Status } = useQuery(
    'polls-2020',
    async () => {
      const response = await axios('/.netlify/functions/polls');
      return response.data;
    },
    { onSuccess: sortPolls },
  );

  const { data: results2016 } = useQuery('results-2016', async () => {
    const response = await axios('/.netlify/functions/results-2016');
    return response.data.polls;
  });

  useEffect(() => {
    if (polls2020 && results2016) {
      const transformedPolls2020 = polls2020.reduce((acc, cur) => {
        return {
          ...acc,
          [cur.state]: {
            polls2020: {
              leader: cur.leader,
              margin: cur.margin,
            },
          },
        };
      }, {});

      results2016.forEach(({ leader, margin, state }: StatePolling) => {
        // @ts-ignore
        if (transformedPolls2020 && transformedPolls2020[state]) {
          // @ts-ignore
          transformedPolls2020[state].results2016 = {
            leader,
            margin,
          };
        }
      });

      const transformedTableData = Object.entries(transformedPolls2020).map(
        stateData => {
          const [state, data] = stateData;
          return {
            polls2020: {
              // @ts-ignore
              ...data.polls2020,
            },
            results2016: {
              // @ts-ignore
              ...data.results2016,
            },
            state,
          };
        },
      );
      setTableData(transformedTableData);
    }
  }, [polls2020, results2016]);

  return (
    <div className="App">
      <div className="header">538 Latest Polls</div>
      {polls2020Status === 'loading' && <Loader />}
      {tableData && nationalPolls2020 && (
        <Table national={nationalPolls2020} tableData={tableData} />
      )}
      <Footer />
    </div>
  );
}

export default App;
