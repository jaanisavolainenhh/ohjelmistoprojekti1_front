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

export default function Kysymys(props) {


  const [value, setValue] = React.useState(""); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
  const [vastaus, setVastaus] = React.useState({ vastaus: '', kysymys: { id: -1 } }); //Raakile versio vastaus oliosta, olennainen löytyy.


  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
    setVastaus({ ...vastaus, vastaus: event.target.value });
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
        return <FormControlLabel key={index} value={jotain.vaihtoehto} control={<Radio />} label={jotain.vaihtoehto} />
      })

    )
  }
  //Tarvitaan jokin slideriin bindattu shitti että saadaan vastaus
  function SliderVastaus() {
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

  function TextFieldVastausJotain() {
    //Tää nyt menettää focuksen aina jokaisen kirjaimen jälkeen?
    return (
      <div>

      </div>
        // <TextfieldVastaus parentvalue={value} parenthandleChange={handleChange} />
    )
  }

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


  function SelectCorrectCompo() //switchillä elinan componentit
  {
    //switch (props.kysymys.tyyppi) {
    switch ("Teksti") {

      case "Radio":
        return (<RadioGroupVastaus />)
      case "Teksti":
        return (<TextFieldVastausJotain/>)
        
      case "Skaala":
        return (<SliderVastaus />)
      case "Monivalinta":
        return (<MonivalintaVastaus />)
      default:
        return (<div> Default </div>)
    }
  }

  function RenderKysymys() {
    return (<div> {props.kysymys.kysymys} </div>)
  }
  return (
    <div>
      TÄTÄ COMPOA EI PITÄISI NYT KÄYTTÄÄ MISSÄÄN , SOO SOO
      <RenderKysymys />
      {/* <SelectCorrectCompo  key="selectCompo"/> */}
      <TextField key="Textfieleedijee" label="Vastauksesi" variant="outlined" value={value} onChange={handleChange} />
      <TextFieldVastausJotain />
    </div>
  )
}