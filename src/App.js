import React from 'react';
import './App.css';
import Kysely from './components/Kysely';
import Vastaus from './components/Vastaus';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Kysely kysely kysely!
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Router>
        <div>
          <Link to="/">Kysely</Link>{' '}
          <Link to="/vastaukset">Vastaukset</Link>{' '}
          <Switch>
            <Route exact path="/" component={Kysely}/>
            <Route path="/vastaukset"component={Vastaus}/>
          </Switch>
        </div>
      </Router>
        <br/>
        <br/>
    </div> 
  );
}

export default App;
