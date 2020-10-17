import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Loader } from './Loader';
import { National } from './National';
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

type NationalPoll = {
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
  const [nationalPoll, setNationalPoll] = useState<NationalPoll>();
  const [polls2020, setPolls2020] = useState<StatePolling[]>();
  const [tableData, setTableData] = useState<States>();

  const sortPolls = ({ polls }: Polls) => {
    const statePolls = polls
      .filter(poll => {
        if (poll.state === 'National') {
          setNationalPoll(poll);
          return false;
        }

        return poll;
      })
      .sort((a, b) => {
        // @ts-ignore
        return b.margin - a.margin;
      });

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

  const { data: results2016, status: results2016Status } = useQuery(
    'results-2016',
    async () => {
      const response = await axios('/.netlify/functions/results-2016');
      return response.data.polls;
    },
  );

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
        if (transformedPolls2020) {
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
      {polls2020Status === 'success' &&
        results2016Status === 'success' &&
        nationalPoll &&
        tableData && (
          <>
            <National
              leader={nationalPoll.leader}
              margin={nationalPoll.margin}
            />
            <Table tableData={tableData} />
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
