import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

export default function Kysely (){

const [kysymys, setKysymys] = React.useState('');    // state for the question... 
const [vaihtoehto, setVaihtoehto] = React.useState(''); // and the options if needed.
const [value, setValue] = React.useState('');


React.useEffect(() => {
    fetch('https://randomuser.me/api')  // Using random api for testing (didn't know to drive ours)
    .then(result => result.json())      // https://randomuser.me/api
    .then(jsonresult => {
        setKysymys(jsonresult.results[0].name.first); // ._embedded.kysymyses[0].kysymys | results[0].name.first
    })
    .catch(err => console.error(err))
},[])

const handleChange = (event) => {
    setValue(event.target.value);
  };
 
            // Returns "question" above simple radio option with yes/no 
return (
    <div>
        <FormControl component="fieldset">
            <p>{kysymys}</p>
                <RadioGroup aria-label="kysymys" name="kysymys" value={value} onChange={handleChange}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
        </FormControl>

        <br/><br/><Button variant="contained" color="primary">Vastaa</Button>

    </div>
)
}