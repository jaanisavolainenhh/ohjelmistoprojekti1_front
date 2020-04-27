
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Kysymys from './Kysymys';
import KysymysTextfield from './KysymysTextfield'
import KysymysRadio from './KysymysRadio'
import KysymysSkaala from './KysymysSkaala'
import KysymysMonivalinta from './KysymysMonivalinta'

export default function Kysely(props) {

  const [kysely, setKysely] = React.useState([]);

  //const [vaihtoehdot, setVaihtoehdot] = React.useState([]); //tää lähtee pois ja menee jokaiseen childi compoon omanaan
  //const [value, setValue] = React.useState([]); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
  const [dummystate, SetDummystate] = React.useState("DUMMYSTATE");
  const [open, setOpen] = React.useState(false);
  const [msg, setmsg] = React.useState('')
  React.useEffect(() => {
    JaaninUseEffecti();
  }, [])


  function postAnswer() { //Tätä pitää muokata että lähettää kysely olion eikä vastaus oliota
    try {
      fetch(props.urlit + 'kyselyt', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(kysely[0])
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
    //setValue();
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
        setKysely(res)
      })
      .catch(err => console.log(err))
  }

  const TestiEventti = (event) => {
    //console.log(event.target.value)
    //   SetDummystate(event.target.value)
    //SetDummystate(event.target.value)

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
          let loopvastaukset = [{vastaus: kysymyksenvastaus.vaihtoehto}];
          kysymysloop.vastaus = loopvastaukset;
          console.log("löytyi!")
        }
      })
    })
    setKysely(muokattavakysely);
  }

  function MuokkaaKyselynVastauksiaTextfield(kysymys, kysymyksenvastaus)
  {

    console.log(kysymyksenvastaus)
    let muokattavakysely = kysely;

    muokattavakysely.map((tulos, index) => {
      tulos.kysymykset.map((kysymysloop, index2) => {
        console.log(kysymysloop)
        //console.log(kysymys.)
        if (kysymysloop.kysymys_id == kysymys.kysymys_id) //verrataan että IDt on sama, sitten palautetaan
        {
          let loopvastaukset = [{vastaus: kysymyksenvastaus}];
          kysymysloop.vastaus = loopvastaukset;
          console.log("löytyi!")
        }
      })
    })
    setKysely(muokattavakysely);

  }

  // Returns "question" as fetch result, radio with 2 options and button to post value of the answer
  //Mappaakysymykset2 pitää syöttää proppeina kaikki funkkarit joita tarvitaan lopullisen kyselyn täyttämiseen. 
  //Pääpointti kai   vielä luomattoman kysely-staten  vastausten manipulointi.
  return (
    <div>
      <FormControl component="fieldset">
        <MappaaKysymykset2 kysely={kysely}  MuokkaaKyselynVastauksiaTextfield={MuokkaaKyselynVastauksiaTextfield} MuokkaaKyselynVastauksia={MuokkaaKyselynVastauksia} />

        <br /><br /><Button variant="contained" color="primary" onClick={() => postAnswer()}>Vastaa</Button>
        < SnackBarCompo />
      </FormControl>
    </div>
  )
}


function MappaaKysymykset2(props) { //miks helvetissä nää ei toimi
  return (
    <div key="MapatutKysymykset">
      {
        props.kysely.map((tulos, index) => {
          return (
            tulos.kysymykset.map((kysymys, index2) => {
              switch (kysymys.tyyppi) {

                case "Radio":
                  return (<KysymysRadio kysymys={kysymys} MuokkaaKyselynVastauksia={props.MuokkaaKyselynVastauksia} />)
                case "Teksti":
                  return (<KysymysTextfield vastaus={kysymys.vaihtoehdot[0]} kysymys={kysymys} MuokkaaKyselynVastauksiaTextfield={props.MuokkaaKyselynVastauksiaTextfield} />)
                case "Skaala":
                  return (<KysymysSkaala key={index2} kysymys={kysymys} />)
                case "Monivalinta":
                  return (<KysymysMonivalinta key={index2} kysymys={kysymys} />)
                default:
                  return (<div> Default </div>)
              }
            })

          )
        })
      }
    </div>
  )
}