import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

type Joke = {
  margins: [];
};

function App() {
  const [data, setData] = useState<Joke>();

  useEffect(() => {
    (async () => {
      const response = await axios('/.netlify/functions/polls');
      setData(response.data);
    })();
  }, []);

  return (
    <div className="App">
      <h1>Latest Poll Averages</h1>
      {data &&
        data.margins.map(({ state, leader, margin }) => (
          <p>
            <div>
              <strong>{state}</strong>
            </div>
            <div>
              {leader}: {margin}
            </div>
          </p>
        ))}
    </div>
  );
}

export default App;
