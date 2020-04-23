
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

  const [kysymys, setKysymys] = React.useState([]);    // Käytetään kysymyksen esittämiseen.
  const [vaihtoehtoA, setVaihtoehtoA] = React.useState('');
  const [vaihtoehtoB, setVaihtoehtoB] = React.useState('');
  const [vaihtoehtoC, setVaihtoehtoC] = React.useState('');  // and the options if/when needed.
  const [vaihtoehdot, setVaihtoehdot] = React.useState([]);
  const [value, setValue] = React.useState([]); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
  const [vastaus, setVastaus] = React.useState({ vastaus: '', kysymys: { id: -1 } }); //Raakile versio vastaus oliosta, olennainen löytyy.

  //Snackbariin statet
  const [open, setOpen] = React.useState(false);
  const [msg, setmsg] = React.useState('')
  React.useEffect(() => {
    fetch(props.urlit + 'api/kysymyses')
      .then(result => result.json())
      .then(jsonresult => {

        setKysymys(jsonresult._embedded.kysymyses[0].kysymys);
        //Tällä saadaan kysymyksen ID selville, vähän kömpelö mutta menköön alkuun
        let saato = jsonresult._embedded.kysymyses[0]._links.self.href;
        saato = parseInt(saato.replace(props.urlit + 'api/kysymyses/', ""));  //otetaan hreffistä pois alkuurli jotta jäljelle jää vain ID
        setVastaus({ ...vastaus, kysymys: { id: saato } });
        //console.log(props.urlit)
      })
      .catch(err => console.error(err))
  }, [])

  //skaalan merkit 1-5 + en osaa vastata
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




  React.useEffect(() => {

    fetch(props.urlit + 'api/kysymyses/1/vaihtoehdot')  // toimii demoa varten yhden kysymyksen tapauksessa. ( next lvl, korvaa /1/ --> haetun kysymyksen id:llä)
      .then(result => result.json())                              // jatkossa varmaan täytyisi tehdä function joka pystyisy yksilöimään vaihtoehdot -> kysymykseen
      .then(jsonresult => {                                       // ...mahdollisesti state, joka mapin avulla 'printtaisi' oikeat vaihtoehdot oikeiden kysymysten yhteyteen

        let lista = jsonresult._embedded.vaihtoehtoes;
        let lista2 = new Array();
        lista.forEach(itemi => {
          lista2.push(itemi.vaihtoehto);
        })
        setVaihtoehdot(lista2);

        //console.log(vaihtoehdot)

        setVaihtoehtoA(jsonresult._embedded.vaihtoehtoes[0].vaihtoehto);
        setVaihtoehtoB(jsonresult._embedded.vaihtoehtoes[1].vaihtoehto);
        setVaihtoehtoC(jsonresult._embedded.vaihtoehtoes[2].vaihtoehto);
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

  function GeneroiVastaukset() { //Tätä ei nyt käytetä missään, kuiteskin mielenkiintonen toiminta

    return LuoVaihtoehdot();
    return (
      vaihtoehdot.map((value, index => {
        return <FormControlLabel value={index} control={<Radio />} label={index} key={index} />  //miks helvetissä index näyttää oikeasti vastausarvoa tässä ja ei anna vaihtaa  mapin valueta johonkin muhun? ## Note taitaa olla sen takia kun on  " index => {" eikä "index) => {" kuten Genervoivaihtoehdoissa()
      }))
    )
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

  function TextFieldVastausJotain(props) {
    const [BBB, AAA] = React.useState('');
    return (
      
      <div>
        <TextField id="outlined-basic" label="Nimi" variant="outlined" /> <br />
        <TextField id="outlined-basic" label="Sähköposti" variant="outlined" />< br />
      </div>

    )
  }

  function RadioGroupVastaus(props) {

    return (

      <div> 

        <RadioGroup aria-label="kys" name="kys" value={value} onChange={handleChange}>
          <LuoVaihtoehdot />
          {/* 
                    <FormControlLabel value={vaihtoehtoA} control={<Radio />} label={vaihtoehtoA} />
                    <FormControlLabel value={vaihtoehtoB} control={<Radio />} label={vaihtoehtoB} />
                    <FormControlLabel value={vaihtoehtoC} control={<Radio />} label={vaihtoehtoC} /> */}
        </RadioGroup><br />

      </div>

import React, { useState, useEffect, Divider } from 'react';
import Kysymys from './Kysymys';
export default function Kysely(props) {

    const [kysely, setKysely] = useState([]);

    useEffect(() => {
        JaaninUseEffecti();
    }, [])


    function JoelionUseEffecti() {
        fetch('http://localhost:8080/api/kysymyses') // en saanut meidän apia auki (/kysely), joten hieman testi dataa generoidun kautta.
            .then(response => response.json())
            .then(res => {
                console.log("haetaan kysely")
                setKysely(res._embedded.kysymyses)
            })
            .catch(err => console.log(err))

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

    //setKysely(...kysely, )
    //55 divi ja 56 sulku on esim turha potentiaalisesti, testin takia mukana
    function PrinttaaKysymyksetJaVastaukset() {
        return (
            <div>
                {
                    kysely.map((tulos, index) => {
                        console.log(tulos)
                        return (
                            <div> 
                                {/* <Divider light /> */}
                                < PrinttaaKysymys kysymykset={tulos.kysymykset} />
                                {/* <Divider light /> */}
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


    //Jaanin Testailua
    function Testi1(props) {
        return (<div><Testi2 /> <Testi3 /> {props.viesti} </div>)
    }
    //Jaanin Testailua

    function Testi2() {
        return (<div> Testi 2 func</div>)
    }
    //Jaanin Testailua

    function Testi3() {
        return (<div> Testi 3 func</div>)
    }

    //Megahärpäke miten ei ihan kannata tehdä. Jos lisää divejä ja {} niin sitten tääkin lopulta toimis. Pilkottu paloihin
    function LuoKysymykset() {
        return (
            kysely.map((item, index) => {
                console.log(item);
                return (
                    item.kysymykset.map((kysymys, index2) => {
                        console.log(kysymys.kysymys)
                        return (
                            kysymys.vaihtoehdot.map((vastaus, index3) => {
                                return <div>{vastaus.vaihtoehto}</div>
                                console.log(vastaus.vaihtoehto)
                            })
                        )
                        return <div>{kysymys.kysymys}</div>
                    }))
            }
            )
        )
        // return (<div> jotain </div>);
    }
    // jKysely mapin avulla hakee kysely statelta jokaisen kysymyksen käyttäen indexiä yksilöllistämiseen
    // Selkeyden vuoksi tulostuu päällekkäisiin elementteihin (viimeinen tr+br kikkailua, jotta ei turhia varoituksia selaimessa)
    // const jKysely = kysely.map((item, index) =>
    //     <tbody>
    //         <tr key={index}>
    //             <td>{item.kysymys} (kys)</td>
    //         </tr>
    //         <tr>
    //             <td>{item.tyyppi} (vaihtoehdot)</td>
    //         </tr>
    //         <tr>
    //             <td> (VastausElementti) </td>
    //         </tr>
    //         <tr>
    //             <td> <br /> </td>
    //         </tr>
    //     </tbody>
    // )

    return (

        // <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>

            {/* <Testi1 viesti="viestiteksti" /> */}
            <KokoRoska />
        </div>

    )
  }

  function SliderVastaus(props) {
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

  function MonivalintaVastaus(props){
    return(
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