import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Kysely from './components/Kysely';
import KyselyOneByOne from './components/KyselyOneByOne';
import Vastaus from './components/Vastaus';
import Drawer from './components/Drawer';
import Uusikysely from './components/Uusikysely';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminTarkasteluSivu from './components/AdminTarkastelusivu';
import EditointiKompo from './components/EditointiKompo'
import Adminlogin from './components/Adminlogin'
import Palaute from './components/Palaute'
import Container from '@material-ui/core/Container';

import UusiTarkastelu from './components/UusiTarkastelu'
export default function App() {

  //passataan tää propsinsa niin voidaan käyttää ilman 30 eri paikan muokkaamista. Ehkä joku global variable tms
  const [urlit, setUrlit] = React.useState('https://salenpalikatback.herokuapp.com/'); //http://localhost:8080/
  // const [urlit, setUrlit] = React.useState('http://localhost:8080/'); //http://localhost:8080/


  return (
    <div className="App">
      <Adminlogin />
      
      <div className="container">

        {/* <Kysely urlit={urlit} /> */}
        <Container maxWidth="md">

          <Router>
            <Drawer>
              <Switch>
                {/* <Route exact path="/" component={Kysely}/>
            <Route path="/vastaukset"component={Vastaus}/> */}
                {/* <Route exact path="/"
                  render={(props) => <Kysely {...props} urlit={urlit} />} /> */}
                <Route exact path="/kysely/:id"
                  render={(props) => <Kysely {...props} urlit={urlit} lukittu={false} />} />
                <Route exact path="/KyselyOneByOne/:id"
                  render={(props) => <KyselyOneByOne {...props} urlit={urlit} />} />
                <Route exact path="/vastaukset"
                  render={(props) => <Vastaus {...props} urlit={urlit} />} />
                <Route exact path="/uusikysely"
                  render={(props) => <Uusikysely {...props} urlit={urlit} />} />
                <Route exact path="/tarkastelu"
                  render={(props) => <AdminTarkasteluSivu {...props} urlit={urlit} />} />
                <Route exact path="/kyselynmuokkaus"
                  render={(props) => <EditointiKompo {...props} urlit={urlit} />} />
                <Route exact path="/uusitarkastelu"
                  render={(props) => <UusiTarkastelu {...props} urlit={urlit} />} />
                  <Route exact path="/palaute"
                  render={(props) => <Palaute {...props} urlit={urlit} kyselyid={1} />} />
              </Switch>
            </Drawer>
          </Router>
        </Container>
      </div>
    </div>
  )


 // export default App;

}
// // https://medium.com/alturasoluciones/how-to-pass-props-to-routes-components-29f5443eee94
// /* <Route exact path="/props-through-render"
//   render={(props) => <Kysely {...props} urlit={urlit} />} />
//   <Route exact path="/props-through-render"
//     render={(props) => <Vastaus {...props} urlit={urlit} />} /> */