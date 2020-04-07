import React from 'react';
import logo from './logo.svg';
import './App.css';
import Kysely from './components/Kysely';
import Vastaus from './components/Vastaus';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Kysely kysely kysely
          </Typography>
        </Toolbar>
      </AppBar>

      <Kysely />
      <Vastaus />
    </div>
  );
}

export default App;
