import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import TextfieldVastaus from './Testicompo'

export default function KysymysMonivalinta(props) {


  const [value, setValue] = React.useState(""); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
  const [vastaus, setVastaus] = React.useState({ vastaus: '', kysymys: { id: -1 } }); //Raakile versio vastaus oliosta, olennainen löytyy.


  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
    setVastaus({ ...vastaus, vastaus: event.target.value });
  };




  function MonivalintaVastaus(props) { //tähän mapilla formcontrollabelit

    const [state, setState] = React.useState({
      vastaus1: false,
      vastaus2: false,
      vastaus3: false
    });


    const { vastaus1, vastaus2, vastaus3 } = state;
    const handlaaCheckboxei = event => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
    //Heitä mappi luomaan formcontrollabelit    
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


  function RenderKysymys() {
    return (<div> {props.kysymys.kysymys} </div>)
  }
  return (
    <div>
      <RenderKysymys />
      <MonivalintaVastaus />
    </div>
  )
}