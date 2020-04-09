import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function Kysely (){

const[Kysymys, setKysymys] = React.useState([]);
const [value, setValue] = React.useState('Yes');

const getKysymys = () => {
    fetch('url/haekysymykset') // apin url tulee tänne /haekysymykset
    .then(response => response.json())
    .then(data => setKysymys(data.array.json)) // Korvaa array.json -> api
    .catch(err => console.error(err))
}

const handleChange = (event) => {
    setValue(event.target.value);
  };

return (
    <div>
        <FormControl component="fieldset">
            <FormLabel component="legend">Onko hänellä?</FormLabel>
                <RadioGroup aria-label="kysymys" name="kysymys" value={value} onChange={handleChange}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
        </FormControl>
    </div>
)
}