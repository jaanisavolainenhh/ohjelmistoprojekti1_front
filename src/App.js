import React from 'react';
import './App.css';
import Kysely from './components/Kysely';
import Vastaus from './components/Vastaus';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {

  //passataan tää propsinsa niin voidaan käyttää ilman 30 eri paikan muokkaamista. Ehkä joku global variable tms
 const [urlit, setUrlit] = React.useState('https://salenpalikatback.herokuapp.com/'); //http://localhost:8080/
 // const [urlit, setUrlit] = React.useState('http://localhost:8080/'); //http://localhost:8080/


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
            {/* <Route exact path="/" component={Kysely}/>
            <Route path="/vastaukset"component={Vastaus}/> */}
            <Route exact path="/"
              render={(props) => <Kysely {...props} urlit={urlit} />} />

            <Route exact path="/vastaukset"
              render={(props) => <Vastaus {...props} urlit={urlit}  />} />
          </Switch>
        </div>
      </Router>
      <br />
      <br />
    </div>
  );
}

export default App;


// https://medium.com/alturasoluciones/how-to-pass-props-to-routes-components-29f5443eee94
{/* <Route exact path="/props-through-render"
  render={(props) => <Kysely {...props} urlit={urlit} />} />
  <Route exact path="/props-through-render"
    render={(props) => <Vastaus {...props} urlit={urlit} />} /> */}