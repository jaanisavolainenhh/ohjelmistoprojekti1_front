
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

export default function Kysely(props) {

  const [kysely, setKysely] = React.useState([{ kysymykset: [] }]);
  //const [kysymys, setKysymys] = React.useState([]);    // Käytetään kysymyksen esittämiseen.
  const [vaihtoehdot, setVaihtoehdot] = React.useState([]);
  const [value, setValue] = React.useState([]); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
  const [vastaus, setVastaus] = React.useState({ vastaus: '', kysymys: { id: -1 } }); //Raakile versio vastaus oliosta, olennainen löytyy.

  //Snackbariin statet
  const [open, setOpen] = React.useState(false);
  const [msg, setmsg] = React.useState('')
  React.useEffect(() => {
    JaaninUseEffecti();
  }, [])

  //skaalan merkit 1-5 + en osaa vastata



  React.useEffect(() => {
    //return; Tää menee nyt ruskea oranssi pinkkiin jee
    fetch(props.urlit + 'api/kysymyses/1/vaihtoehdot')  // toimii demoa varten yhden kysymyksen tapauksessa. ( next lvl, korvaa /1/ --> haetun kysymyksen id:llä)
      .then(result => result.json())                              // jatkossa varmaan täytyisi tehdä function joka pystyisy yksilöimään vaihtoehdot -> kysymykseen
      .then(jsonresult => {                                       // ...mahdollisesti state, joka mapin avulla 'printtaisi' oikeat vaihtoehdot oikeiden kysymysten yhteyteen

        let lista = jsonresult._embedded.vaihtoehtoes;
        let lista2 = new Array();
        lista.forEach(itemi => {
          lista2.push(itemi.vaihtoehto);
        })
        setVaihtoehdot(lista2);

      })
      .catch(err => console.error(err))
  }, [])
  //console.log(vaihtoehtoB);

  const handleChange = (event) => {
    setValue(event.target.value);
    //Asetetaan myös vastaukseen jotta voidaan stringifytä tämä suoraan restillä postattavaksi
    setVastaus({ ...vastaus, vastaus: event.target.value });
  };
  // checkboxit alkaa
  const handlaaCheckboxei = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [state, setState] = React.useState({
    vastaus1: false,
    vastaus2: false,
    vastaus3: false
  });

  const { vastaus1, vastaus2, vastaus3 } = state;
  //checkboxit loppuu


  function postAnswer() {
    try {
      fetch(props.urlit + 'palautakysymys', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(vastaus)
      })
        .catch(err => console.error(err));
      setmsg("Vastaus lähetetty!");
      setOpen(true);
      //console.log(JSON.stringify(vastaus));
    } catch (e) {
      setOpen(true);
      setmsg("Lähettäminen epäonnistui!");
      console.log(e)
    }
    setValue();
  }

  function LuoVaihtoehdot() {
    return (
      vaihtoehdot.map((jotain, index) => {
        return <FormControlLabel value={jotain} control={<Radio />} label={jotain} key={index} />
      })

    )
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
    fetch('http://localhost:8080/kyselyt')
    .then(response => response.json())
    .then(res => {
      setKysely(res)
    })
    .catch(err => console.log(err))
  }
  
  
  function KokoRoska() {
    return (
      <div>
        Kyselyn otsikko vaikka
        <PrinttaaKysymyksetJaVastaukset />
                Kyselyn päättyminen
      </div>
    )
    
  }
  
  function PrinttaaKysymyksetJaVastaukset() {
    return (
      <div>
        {
          kysely.map((tulos, index) => {
            console.log(tulos)
            return (
              <div>
                < PrinttaaKysymys kysymykset={tulos.kysymykset} />
              </div>
            )
          })
        }
      </div>

)

}

function PrinttaaKysymys(props) {
  return (
    props.kysymykset.map((kysymys, index) => {
      return (
        <div>
            {kysymys.kysymys}
            <PrinttaaVaihtoehdot vaihtoehdot={kysymys.vaihtoehdot} kysymystyyppi={kysymys.tyyppi} />
          </div>)
      })
      )
    }
    
    function PrinttaaVaihtoehdot(props) { //tyyppi propilla voidaan valita elinen componentti tähän switchin kautta.
      
      return (
        props.vaihtoehdot.map((vaihtoehto, index) => {
          return (
            <div>
            {vaihtoehto.vaihtoehto}
          </div>)
      })
      )
    }
    
    function RadioGroupVastaus(props) {
      return (
        <div>
        <RadioGroup aria-label="kys" name="kys" value={value} onChange={handleChange}>
          <LuoVaihtoehdot />
        </RadioGroup><br />
      </div>
    )
  }
  
  function SliderVastaus(props) {
    const marks = [
      {
        value: 1,
        label: '1',
      },
      {
        value: 2,
        label: '2',
      },
      {
        value: 3,
        label: '3',
      },
      {
        value: 4,
        label: '4',
      },
      {
        value: 5,
        label: '5',
      },
      {
        value: 6,
        label: 'En osaa vastata',
      },
    ];
    return (
      <div>
        <Slider
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={1}
          max={6}
          color='primary'
          />
      </div>
    )
  }
  
  function TextFieldVastausJotain(props) {
    const [BBB, AAA] = React.useState(''); //vittu, näähän toimii. JEE!
  
    const handleCloseTFC = (event) => {
      AAA(event.target.value);
    }
  
    return (
  
      <div>
        <TextField id="outlined-basic" label="Vastauksesi" variant="outlined" value={BBB} onChange={handleCloseTFC} /> <br />
        {/* <TextField id="outlined-basic" label="Sähköposti" variant="outlined" />< br /> */}
      </div>
  
    )
  }

  function MonivalintaVastaus(props) { //tähän mapilla formcontrollabelit
    return (
      <div>
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={vastaus1} onChange={handlaaCheckboxei} name='vastaus1' />}
              label="Haluatko tämän"
              />
            <FormControlLabel
              control={<Checkbox checked={vastaus2} onChange={handlaaCheckboxei} name='vastaus2' />}
              label="Ja tämän"
            />
            <FormControlLabel
              control={<Checkbox checked={vastaus3} onChange={handlaaCheckboxei} name='vastaus3' />}
              label="Ja lisäksi tämän?"
            />
          </FormGroup>
        </FormControl>
      </div>
    )
  }

  // Returns "question" as fetch result, radio with 2 options and button to post value of the answer
  return (
    <div>
      <FormControl component="fieldset">
        <KokoRoska />
        < TextFieldVastausJotain />
        < RadioGroupVastaus />
        <SliderVastaus />
        <MonivalintaVastaus />
        <br /><br /><Button variant="contained" color="primary" onClick={() => postAnswer()}>Vastaa</Button>
        < SnackBarCompo />
      </FormControl>
    </div>
  )

}
