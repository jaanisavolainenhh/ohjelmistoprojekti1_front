
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

  const [kysely, setKysely] = React.useState([{ kysymykset: [] }]);
  //const [kysymys, setKysymys] = React.useState([]);    // Käytetään kysymyksen esittämiseen.
  //const [vaihtoehdot, setVaihtoehdot] = React.useState([]); //tää lähtee pois ja menee jokaiseen childi compoon omanaan
  //const [value, setValue] = React.useState([]); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
  const [vastaus, setVastaus] = React.useState({ vastaus: '', kysymys: { id: -1 } }); //Raakile versio vastaus oliosta, olennainen löytyy.

  //Snackbariin statet
  const [open, setOpen] = React.useState(false);
  const [msg, setmsg] = React.useState('')
  React.useEffect(() => {
    JaaninUseEffecti();
  }, [])


  function postAnswer() { //Tätä pitää muokata että lähettää kysely olion eikä vastaus oliota
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
    fetch(props.urlit + 'kyselyt')
      .then(response => response.json())
      .then(res => {
        setKysely(res)
      })
      .catch(err => console.log(err))
  }



  function MappaaKysymykset() {
    return (
      <div key="MapatutKysymykset">
        {
          kysely.map((tulos, index) => {
            return (
              tulos.kysymykset.map((kysymys, index2) => {
                switch (kysymys.tyyppi) {

                  case "Radio":
                    return (<KysymysRadio key={index2} kysymys={kysymys} />)
                  case "Teksti":
                    return (<KysymysTextfield key={index2} kysymys={kysymys} />)
                  case "Skaala":
                    return (<KysymysSkaala key={index2} kysymys={kysymys} />)
                  case "Monivalinta":
                    return (<KysymysMonivalinta key={index2} kysymys={kysymys} />)
                  default:
                    return (<div> Default </div>)
                }
                // <KysymysTextfield key={index2} kysymys={kysymys} />

              })

            )
          })
        }
      </div>
    )
  }

  // Returns "question" as fetch result, radio with 2 options and button to post value of the answer
  return (
    <div>
      <FormControl component="fieldset">

        <MappaaKysymykset />
        <br /><br /><Button variant="contained" color="primary" onClick={() => postAnswer()}>Vastaa</Button>
        < SnackBarCompo />
      </FormControl>
    </div>
  )

}
