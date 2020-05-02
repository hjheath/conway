import React, { useState } from 'react';
import './App.css';
import Grid from './Grid';
import Player from './Player';

const usePlay = (): [boolean, () => void] => {
  const [playing, setPlaying] = useState(false);
  const togglePlay = () => {
    setPlaying(!playing)
  }
  return [playing, togglePlay]
}

const initialAliveCells = new Set(["2,1", "3,2", "1,3", "2,3", "3,3"])


function App() {
  const [playing, togglePlay] = usePlay()

  return (
    <div className="App">
      <h1>Conway&apos;s Game of Life</h1>
      <Player playing={playing} togglePlay={togglePlay}></Player>
      <Grid initialAliveCells={initialAliveCells} playing={playing} />
    </div>
  );
}

export default App;
