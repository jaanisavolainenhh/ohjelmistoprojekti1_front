import React from 'react';
import '../App.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const GreenRadio = withStyles({
  root: {
    color: '#73A7B8',
    "&$checked": {
      color: '#3A799B'
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

export default function KysymysRadio(props) {


  const [value, setValue] = React.useState(""); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
  //const [vastaus, setVastaus] = React.useState({ vastaus: '', kysymys: { id: -1 } }); //Raakile versio vastaus oliosta, olennainen löytyy.
  React.useEffect(() => {
    if (props.lukittu) {
      props.kysymys.vastaus.map((i) => {
        //setValue(props.kysymys.vastaus[0].vastaus)
        setValue(i.vastaus)

      })
    }
  }, [])

  const handleChange = (event) => {
    //console.log(event.target.value);
    setValue(event.target.value);
    //haetaan tässä kohtaa vastaus 
    if(props.lukittu)
     return;
    props.kysymys.vaihtoehdot.map((i) => {
      if (i.vaihtoehto == event.target.value) {
        props.MuokkaaKyselynVastauksia(props.kysymys, i);
      }
    })
    // console.log(event.target.value)
    //#TODO tässä kohtaa lähettää kyselyyn infon että tämä props.kysymys.kysymys_id ja vaihtoehto ID:n.
    //setVastaus({ ...vastaus, vastaus: event.target.value });
  };


  function RadioGroupVastaus() {
    return (
      <div>
        <RadioGroup aria-label="kys" name="kys" value={value} onChange={handleChange}>
          <LuoVaihtoehdot />
        </RadioGroup><br />
      </div>
    )
  }

  function LuoVaihtoehdot() {
    return (
      //vaihtoehdot.map((jotain, index) => {
      props.kysymys.vaihtoehdot.map((jotain, index) => {
        //console.log(jotain.vaihtoehto_id)
        return <FormControlLabel disabled={props.lukittu} key={jotain.vaihtoehto_id} id={jotain.vaihtoehto_id} value={jotain.vaihtoehto} control={<GreenRadio />} label={jotain.vaihtoehto} />
      })

    )
  }


  function RenderKysymys() {
    return (<div style={{ marginTop: 40 }}>{props.kysymys.kysymys} </div>)
  }



  return (
    <div>
      <div><RenderKysymys /></div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
        <RadioGroupVastaus /></div>
    </div>
  )
}