import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

export default function Kysely (){

const [kysymys, setKysymys] = React.useState([]);    // state for the question... 
// const [vaihtoehto, setVaihtoehto] = React.useState('');  ---> and the options if/when needed.
const [value, setValue] = React.useState('');
const [jaanintesti, setjaanintesti] = React.useState({vastaus: 'TESTIVASTAUS', kysymys:{id: 1}});

React.useEffect(() => {
    fetch('https://salenpalikatback.herokuapp.com/api/kysymyses')  
    .then(result => result.json())      
    .then(jsonresult => {
        //console.log(jsonresult) 
        setKysymys(jsonresult._embedded.kysymyses[0].kysymys); // 
    })
    .catch(err => console.error(err))
},[])

const handleChange = (event) => {
    setValue(event.target.value); //muuta olion vastauksen arvoa jaanitestis
};

async function postAnswer() {

    try{
        let result = await fetch('https://salenpalikatback.herokuapp.com/palautakysymys', {     
            method: 'post',     
            mode: 'no-cors',
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                vastauses: value,
                "kysymys": {"id":1}     // here switch 1 to id of kysymys  
            })                        
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
                    <FormControlLabel value="Sininen" control={<Radio />} label="Sininen" />
                    <FormControlLabel value="RUSKEA" control={<Radio />} label="RUSKEA" />
                </RadioGroup>
        </FormControl>

        <br/><br/><Button variant="contained" color="primary" onClick={ () => postAnswer() }>Vastaa</Button>

    </div>
)
}