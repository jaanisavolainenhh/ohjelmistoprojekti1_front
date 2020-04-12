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
const [jaanintesti, setjaanintesti] = React.useState({vastaus: 'TESTIVASTAUS', kysymys:{id: 1}});

React.useEffect(() => {
    fetch('http://localhost:8080/api/kysymyses')  //'https://salenpalikatback.herokuapp.com/api/kysymyses'

      // Using random api for testing (didn't know to drive ours)
    .then(result => result.json())      // https://randomuser.me/api
    .then(jsonresult => {
        setKysymys(jsonresult._embedded.kysymyses[0].kysymys); // ._embedded.kysymyses[0].kysymys | results[0].name.first
    })
    .catch(err => console.error(err))
},[])

const handleChange = (event) => {
    setValue(event.target.value); //muuta olion vastauksen arvoa jaanitestis
};

async function postAnswer() {

    try{
        let result = await fetch('http://salenpalikatback.herokuapp.com/palautakysymys', {     // Test api for posting, change to ours (where we want to store the answers)
            method: 'POST',
            // mode: 'no-cors',
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: 
            JSON.stringify(jaanintesti
    
            )                       // posting now json:  { "vastaus": {"value": "No/Yes" } } 
        });
        console.log('Result: ' + result);
        console.log("Stringify: "+ JSON.stringify(jaanintesti// value refers to the value of our radio down below   
        )); 
        console.log("JEE: ")
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