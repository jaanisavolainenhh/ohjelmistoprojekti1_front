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

export default function KysymysTextfield(props) {


   const [value, setValue] = React.useState(""); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
  // const [vastaus, setVastaus] = React.useState({ vastaus: '', kysymys: { id: -1 } }); //Raakile versio vastaus oliosta, olennainen löytyy.


   const handleChange = (event) => {
      setValue(event.target.value)
      props.MuokkaaKyselynVastauksiaTextfield(props.kysymys, event.target.value)
      //props.df(event);
  //   console.log(event.target.value);
  //   //setValue(event.target.value);
  //   //props.df(event);
  //   //setVastaus({ ...vastaus, vastaus: event.target.value });

   };

  function RenderKysymys() {
    return (<div> {props.kysymys.kysymys} </div>)
  }
  return (
    <div>
      <RenderKysymys />
      <TextField key="Textfieleedijee" label="Vastauksesi" variant="outlined" value={value} onChange={handleChange} />
    </div>
  )
}

