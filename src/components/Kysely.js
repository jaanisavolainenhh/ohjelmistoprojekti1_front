import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

export default function Kysely (){

const [kysymys, setKysymys] = React.useState('');    // state for the question... 
// const [vaihtoehto, setVaihtoehto] = React.useState('');  ---> and the options if/when needed.
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

async function postAnswer() {

    try{
        let result = await fetch('https://webhook.site/21c707ff-73c5-48a1-848e-6c4b7356a1db', {     // Test api for posting, change to ours (where we want to store the answers)
            method: 'post',
            mode: 'no-cors',
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                vastaus: {value}     // value refers to the value of our radio down below   
            })                       // posting now json:  { "vastaus": {"value": "No/Yes" } } 
        });
        console.log('Result: ' + result)
    } catch(e) {
        console.log(e)
    }
}
 
            // Returns "question" as fetch result, radio with 2 options and button to post value of the answer
return (
    <div>
        <FormControl component="fieldset">
            <p>{kysymys}</p>
                <RadioGroup aria-label="kys" name="kys" value={value} onChange={handleChange}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
        </FormControl>

        <br/><br/><Button variant="contained" color="primary" onClick={ () => postAnswer() }>Vastaa</Button>

    </div>
)
}