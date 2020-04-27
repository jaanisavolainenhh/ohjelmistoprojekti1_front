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

export default function KysymysSkaala(props) {


  const [value, setValue] = React.useState(""); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
  const [vastaus, setVastaus] = React.useState({ vastaus: '', kysymys: { id: -1 } }); //Raakile versio vastaus oliosta, olennainen löytyy.


  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
    setVastaus({ ...vastaus, vastaus: event.target.value });
  };


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

 





  function RenderKysymys() {
    return (<div> {props.kysymys.kysymys} </div>)
  }
  return (
    <div>
      <RenderKysymys />
      <SliderVastaus />
    </div>
  )
}