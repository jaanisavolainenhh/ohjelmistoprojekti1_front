import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Kysymys from './Kysymys';
import KysymysTextfield from './KysymysTextfield'
import KysymysRadio from './KysymysRadio'
import KysymysSkaala from './KysymysSkaala'
import KysymysMonivalinta from './KysymysMonivalinta'
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const muiTheme = createMuiTheme({
  overrides: {
      MuiStepIcon: {
          root: {
              color: '#73A7B8', // or 'rgba(0, 0, 0, 1)'
              '&$active': {
                  color: '#3A799B',
              },
              '&$completed': {
                  color: '#045A89',
              },
          },
      },
  }
});


export default function KyselyOneByOne(props) {

  const [kysely, setKysely] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [msg, setmsg] = React.useState('')
  const [kyssäri, setKyssäri] = React.useState([]);
  const [kyssy, setKyssy] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  //const [dis, setDis] = React.useState(['k1','y2','s3','y4','m4','y5','s6']);  //stepper test state
  const classes = useStyles();


  React.useEffect(() => {
    JaaninUseEffecti();

  }, [])


  function postAnswer() {
    try {
      fetch(props.urlit + 'kyselyt', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(kysely[0]) //Tässä kovakoodattu että lähettää vain ekan kyselyn
      })
        .catch(err => console.error(err));
      setmsg("Vastaus lähetetty!");
      setOpen(true);
      console.log(JSON.stringify(kysely[0]));
    } catch (e) {
      setOpen(true);
      setmsg("Lähettäminen epäonnistui!");
      console.log(e)
      
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  function SnackBarCompo() {
    return (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={msg}
      />
    )
  }

  function JaaninUseEffecti() {
    console.log(props.urlit + 'kyselyt')
    fetch(props.urlit + 'kyselyt', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(res => {
        jotai(res)
        asiaa(res)
        setKysely(res)
      })
      .catch(err => console.log(err))
  }


  function MuokkaaKyselynVastauksia(kysymys, kysymyksenvastaus) //palautetaan kysymyksenvastauksessa suoraan olio.
  {
    console.log(kysymyksenvastaus)
    let muokattavakysely = kysely;

    muokattavakysely.map((tulos, index) => {
      tulos.kysymykset.map((kysymysloop, index2) => {
        console.log(kysymysloop)
        //console.log(kysymys.)
        if (kysymysloop.kysymys_id == kysymys.kysymys_id) //verrataan että IDt on sama, sitten palautetaan
        {
          let loopvastaukset = [{ vastaus: kysymyksenvastaus.vaihtoehto }];
          kysymysloop.vastaus = loopvastaukset;
          console.log("löytyi!")
        }
      })
    })
    setKysely(muokattavakysely);
  }

  function MuokkaaKyselynVastauksiaTextfield(kysymys, kysymyksenvastaus) {

    console.log(kysymyksenvastaus)
    let muokattavakysely = kysely;

    muokattavakysely.map((tulos, index) => {
      tulos.kysymykset.map((kysymysloop, index2) => {
        console.log(kysymysloop)
        //console.log(kysymys.)
        if (kysymysloop.kysymys_id == kysymys.kysymys_id) //verrataan että IDt on sama, sitten palautetaan
        {
          let loopvastaukset = [{ vastaus: kysymyksenvastaus }];
          kysymysloop.vastaus = loopvastaukset;
          console.log("löytyi!")
        }
      })
    })
    setKysely(muokattavakysely);

  }

  // tekee arrayn kyselyn kysymyksistä (sis. vain kysymykset)
  
  function jotai(vastauslista) {
    //console.log(vastauslista)
    let arra = new Array();
    vastauslista.map(kaksi => {

      kaksi.kysymykset.map(kysymys => {
        arra.push(kysymys.kysymys)
      })
      //console.log(arra)
      setKyssäri(arra);
    })
  }

  function asiaa(kysOliot) {
    let kot = new Array();
    kysOliot.map(olio =>{

      olio.kysymykset.map(kysymys =>{
        kot.push(kysymys)
      })
      // console.log(kot)
      setKyssy(kot)
    })
    
  }

  // moves to the next question
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // goes to previous question
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // resets stepper back to starting point
  const handleReset = () => {
    setActiveStep(0);
  };

  // antaa viestin stepperin ja buttoneiden väliin väliin, --> riippuen monesko step on aktiivinen
  // entiedä onko käyttöä meille...
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'much wow';
      case 1:
        return 'pls stop';
      default:
        return 'vieläkö...';
    }
  }

  const curry = kyssy // päivittää vaikkei ehkä pitäisi? lol
  .map(kyssy => (
    <div key={kyssy.kysymys_id} /* style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white'}}*/>
      <div>{ (() => {
            switch (kyssy.tyyppi){

              case "Radio":
                  return (<KysymysRadio kysymys={kyssy} MuokkaaKyselynVastauksia={MuokkaaKyselynVastauksia} />)
              case "Teksti":
                  return (<KysymysTextfield vastaus={kyssy.vaihtoehdot[0]} kysymys={kyssy} MuokkaaKyselynVastauksiaTextfield={MuokkaaKyselynVastauksiaTextfield} />)
              case "Skaala":
                   return (<KysymysSkaala key={kyssy.kysymys_id} kysymys={kyssy.kysymys} />)
              case "Monivalinta":
                   return (<KysymysMonivalinta key={kyssy.kysymys_id} kysymys={kyssy.kysymys} />)
              default:
                   return (<div> Default </div>)  
            }
          })()}</div>
      {/* <div>{
            kyssy.vaihtoehdot.map(vaahto => {
             
            })
          }</div> */}
    </div>
  ))

  // <div>{current}</div>
  // <div>{curry[itku]}</div>
  // <button onClick={() => {setItku(itku + 1);}}>next</button>
 
  // <div>{curry[itku]}</div>
  // <button onClick={() => {setItku(itku + 1);}}>next</button>

  return (
    <div>

      <div>{curry[activeStep]}</div>

      <div className={classes.root}>
        <MuiThemeProvider theme={muiTheme}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {kyssäri.map((label) => (
            <Step key={label}>
              <StepLabel ></StepLabel>
            </Step>
          ))}
        </Stepper>
        </MuiThemeProvider>
        <div>
          {activeStep === kyssäri.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
              <Button variant="contained" onClick={() => postAnswer()} style={{backgroundColor:'#045A89', color: 'white', outline: 'none'}}>Submit</Button>
            </div>
          ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
              </Button>
                  <Button variant="contained" style={{backgroundColor: '#04688A', color:'white'}} onClick={handleNext}>
                    {activeStep === kyssäri.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}