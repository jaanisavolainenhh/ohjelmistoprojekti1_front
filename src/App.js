import React from 'react';
import logo from './logo.svg';
import './App.css';
import Kysely from './components/Kysely';
import Vastaus from './components/Vastaus';

function App() {
  return (
    <div className="App">
      <Kysely />
      <Vastaus />
      Moi
    </div>
  );
}

export default App;
