
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

  const [kysely, setKysely] = React.useState({ kysymykset: [] });

  //const [vaihtoehdot, setVaihtoehdot] = React.useState([]); //tää lähtee pois ja menee jokaiseen childi compoon omanaan
  //const [value, setValue] = React.useState([]); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
  //const [dummystate, SetDummystate] = React.useState("DUMMYSTATE");
  const [open, setOpen] = React.useState(false);
  const [msg, setmsg] = React.useState('')
  React.useEffect(() => {
    if (!props.lukittu)
      JaaninUseEffecti();
    else
      setKysely(props.esitysdata)
  }, [])


  function postAnswer() {
    try {
      fetch(props.urlit + 'kyselyt', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(kysely) //Tässä kovakoodattu että lähettää vain ekan kyselyn
      })
        .catch(err => console.error(err));
      setmsg("Vastaus lähetetty!");
      setOpen(true);
      console.log(JSON.stringify(kysely));
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
    console.log(props.urlit + 'kysely' + props.match.params.id)
    fetch(props.urlit + 'kysely/' + props.match.params.id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(res => {
        setKysely(res)
        console.log(props.match.params.id)
      })
      .catch(err => console.log(err))
  }


  function MuokkaaKyselynVastauksia(kysymys, kysymyksenvastaus) //palautetaan kysymyksenvastauksessa suoraan olio.
  {
    if(props.lukittu)
     return;
    console.log(kysymyksenvastaus)
    let muokattavakysely = kysely;

    // muokattavakysely.map((tulos, index) => {
    muokattavakysely.kysymykset.map((kysymysloop, index2) => {
      console.log(kysymysloop)
      //console.log(kysymys.)
      if (kysymysloop.kysymys_id == kysymys.kysymys_id) //verrataan että IDt on sama, sitten palautetaan
      {
        let loopvastaukset = [{ vastaus: kysymyksenvastaus.vaihtoehto }];
        kysymysloop.vastaus = loopvastaukset;
        console.log("löytyi!")
      }
    })
    // })
    setKysely(muokattavakysely);
  }

  function MuokkaaKyselynVastauksiaTextfield(kysymys, kysymyksenvastaus) {
    if (props.lukittu)
      return;
    console.log(kysymyksenvastaus)
    let muokattavakysely = kysely;

    // muokattavakysely.map((tulos, index) => {
    muokattavakysely.kysymykset.map((kysymysloop, index2) => {
      console.log(kysymysloop)
      //console.log(kysymys.)
      if (kysymysloop.kysymys_id == kysymys.kysymys_id) //verrataan että IDt on sama, sitten palautetaan
      {
        let loopvastaukset = [{ vastaus: kysymyksenvastaus }];
        kysymysloop.vastaus = loopvastaukset;
        console.log("löytyi!")
      }
    })
    // })
    setKysely(muokattavakysely);

  }

  return (
    <div>
      <FormControl component="fieldset">
        <MappaaKysymykset2 lukittu={props.lukittu} kysely={kysely} MuokkaaKyselynVastauksiaTextfield={MuokkaaKyselynVastauksiaTextfield} MuokkaaKyselynVastauksia={MuokkaaKyselynVastauksia} />
        <br /><br /><Button hidden={true} disabled={props.lukittu} variant="contained" color="primary" onClick={() => postAnswer()}>Vastaa</Button>
        < SnackBarCompo />
      </FormControl>
    </div>
  )
}


function MappaaKysymykset2(props) {

  return (
    <div key="MapatutKysymykset">
      {
        props.kysely.kysymykset.map((kysymys, index2) => {
          switch (kysymys.tyyppi) {

            case "Radio":
              return (<KysymysRadio kysymys={kysymys} MuokkaaKyselynVastauksia={props.MuokkaaKyselynVastauksia} lukittu={props.lukittu} />)
            case "Teksti":
              return (<KysymysTextfield vastaus={kysymys.vaihtoehdot} kysymys={kysymys} MuokkaaKyselynVastauksiaTextfield={props.MuokkaaKyselynVastauksiaTextfield} lukittu={props.lukittu} />)
            case "Skaala":
              return (<KysymysSkaala key={index2} kysymys={kysymys} />)
            case "Monivalinta":
              return (<KysymysMonivalinta key={index2} kysymys={kysymys} />)
            default:
              return (<div> Default </div>)
          }
        })


      }

    </div>
  )
}