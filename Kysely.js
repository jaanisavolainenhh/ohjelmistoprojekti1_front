import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

export default function Kysely (){

const [kysymys, setKysymys] = React.useState([]);    // Käytetään kysymyksen esittämiseen.
// const [vaihtoehto, setVaihtoehto] = React.useState('');  ---> and the options if/when needed.
const [value, setValue] = React.useState(''); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
const [vastaus, setVastaus] = React.useState({vastaus: '', kysymys:{id: -1}}); //Raakile versio vastaus oliosta, olennainen löytyy.
//KORJATKAA MAANANTAINA: Postanwerissa pitää asettaa jaanintestiin oikea arvo vastaukseen sekä kysymys olion id:n. Oikean idn saa  use effectissä kysymksestä.
React.useEffect(() => {
    fetch('https://salenpalikatback.herokuapp.com/api/kysymyses')  
    .then(result => result.json())      
    .then(jsonresult => {
        
        setKysymys(jsonresult._embedded.kysymyses[0].kysymys);
        //Tällä saadaan kysymyksen ID selville, vähän kömpelö mutta menköön alkuun
        let saato = jsonresult._embedded.kysymyses[0]._links.self.href;
        saato = parseInt(saato.replace("https://salenpalikatback.herokuapp.com/api/kysymyses/",""));  //otetaan hreffistä pois alkuurli jotta jäljelle jää vain ID
        setVastaus({ ...vastaus, kysymys : { id : saato}}); 
    })
    .catch(err => console.error(err))
},[])

const handleChange = (event) => {
    setValue(event.target.value);
    //Asetetaan myös vastaukseen jotta voidaan stringifytä tämä suoraan restillä postattavaksi
    setVastaus({ ...vastaus, vastaus: event.target.value }); 

};

//Otettu nyt ainakin alkuun tästä asyncronine versio pois,  en ole varma miksi tässä oli. Joel? 
 function postAnswer() {
    try{
        fetch('https://salenpalikatback.herokuapp.com/palautakysymys', {     
            method: 'POST',     
           // mode: 'no-cors', //Miksi tämän poistaminen auttoi? :()
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(vastaus)                        
        });
        console.log(JSON.stringify(vastaus)); 
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