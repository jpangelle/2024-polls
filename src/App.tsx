import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

type Joke = {
  msg: string;
};

function App() {
  const [data, setData] = useState<Joke>();

  const getDadJoke = async () => {
    const response = await axios('/.netlify/functions/polls');
    setData(response.data);
  };

  return (
    <div className="App">
      <button onClick={() => getDadJoke()}>Get Dad Joke</button>
      <div>{data && data.msg}</div>
    </div>
  );
}

export default App;
