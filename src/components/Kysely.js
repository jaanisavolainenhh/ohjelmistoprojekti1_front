import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

export default function Kysely (props){

const [kysymys, setKysymys] = React.useState([]);    // Käytetään kysymyksen esittämiseen.
const [vaihtoehtoA, setVaihtoehtoA] = React.useState('');
const [vaihtoehtoB, setVaihtoehtoB] = React.useState('');
const [vaihtoehtoC, setVaihtoehtoC] = React.useState('');  // and the options if/when needed.
const [vaihtoehdot, setVaihtoehdot] = React.useState([]);
const [value, setValue] = React.useState([]); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
const [vastaus, setVastaus] = React.useState({vastaus: '', kysymys:{id: -1}}); //Raakile versio vastaus oliosta, olennainen löytyy.
//KORJATKAA MAANANTAINA: Postanwerissa pitää asettaa jaanintestiin oikea arvo vastaukseen sekä kysymys olion id:n. Oikean idn saa  use effectissä kysymksestä.
React.useEffect(() => {
    fetch( props.urlit + 'api/kysymyses')  
    .then(result => result.json())      
    .then(jsonresult => {
        
        setKysymys(jsonresult._embedded.kysymyses[0].kysymys);
        //Tällä saadaan kysymyksen ID selville, vähän kömpelö mutta menköön alkuun
        let saato = jsonresult._embedded.kysymyses[0]._links.self.href;
        saato = parseInt(saato.replace(props.urlit + 'api/kysymyses/',""));  //otetaan hreffistä pois alkuurli jotta jäljelle jää vain ID
        setVastaus({ ...vastaus, kysymys : { id : saato}}); 
        //console.log(props.urlit)
    })
    .catch(err => console.error(err))
},[])

React.useEffect(() => {
    
    fetch( props.urlit +'api/kysymyses/1/vaihtoehdot')  // toimii demoa varten yhden kysymyksen tapauksessa. ( next lvl, korvaa /1/ --> haetun kysymyksen id:llä)
    .then(result => result.json())                              // jatkossa varmaan täytyisi tehdä function joka pystyisy yksilöimään vaihtoehdot -> kysymykseen
    .then(jsonresult => {                                       // ...mahdollisesti state, joka mapin avulla 'printtaisi' oikeat vaihtoehdot oikeiden kysymysten yhteyteen

        let lista = jsonresult._embedded.vaihtoehtoes;
        let lista2 = new Array();
        lista.forEach(itemi =>
            {
              lista2.push(itemi.vaihtoehto);
               // setVaihtoehdot(...vaihtoehdot, itemi.vaihtoehto);  // Ei voi for loopilla lisätä itemeitä, ottaa ainoastaan viimeisimmän loopin itemin listaan :()
                // setVaihtoehdot([...vaihtoehdot, itemi.vaihtoehto]);
                console.log(itemi.vaihtoehto)
            }
        )
        setVaihtoehdot(lista2);

        //console.log(vaihtoehdot)

         setVaihtoehtoA(jsonresult._embedded.vaihtoehtoes[0].vaihtoehto);  
         setVaihtoehtoB(jsonresult._embedded.vaihtoehtoes[1].vaihtoehto);
         setVaihtoehtoC(jsonresult._embedded.vaihtoehtoes[2].vaihtoehto);    
    }) 
    .catch(err => console.error(err))
},[])
//console.log(vaihtoehtoB);

const handleChange = (event) => {
    setValue(event.target.value);
    //Asetetaan myös vastaukseen jotta voidaan stringifytä tämä suoraan restillä postattavaksi
    setVastaus({ ...vastaus, vastaus: event.target.value }); 
};

 
 function postAnswer() {
    try{
        fetch( props.urlit + 'palautakysymys', {     
            method: 'POST',     
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

function GeneroiVastaukset()
{

    return(
        vaihtoehdot.map((value, index => {
            return  <FormControlLabel value={index} control={<Radio />} label={index}  key={index} />  //miks helvetissä index toimii, sen pitäs olla numero eikä arvo?
          }))
    )
}

            // Returns "question" as fetch result, radio with 2 options and button to post value of the answer
return (
    <div>

        <FormControl component="fieldset">
            <h3>{kysymys}</h3>
                <RadioGroup aria-label="kys" name="kys" value={value} onChange={handleChange}>
                <GeneroiVastaukset />
{/* 
                    <FormControlLabel value={vaihtoehtoA} control={<Radio />} label={vaihtoehtoA} />
                    <FormControlLabel value={vaihtoehtoB} control={<Radio />} label={vaihtoehtoB} />
                    <FormControlLabel value={vaihtoehtoC} control={<Radio />} label={vaihtoehtoC} /> */}
                </RadioGroup>
        </FormControl>

        <br/><br/><Button variant="contained" color="primary" onClick={ () => postAnswer() }>Vastaa</Button>

    </div>
)
}