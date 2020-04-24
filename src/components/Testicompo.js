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


export default function TextfieldVastaus(props) {

  return (
    <div>
        <TextField key="Textfieleedijee"  label="Vastauksesi" variant="outlined" value={props.parentvalue} onChange={props.parenthandleChange} />
     </div>
  )
}