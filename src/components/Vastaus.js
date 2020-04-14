import React, {useState, useEffect} from 'react';
import Kysely from './Kysely';

export default function Vastaus(props) {

    const [results, setResults] = useState([]);

    useEffect(() => {
        getResults();
    },[])

    const getResults = () => {
        fetch( props.urlit + 'api/vastauses') //https://salenpalikatback.herokuapp.com/api/vastauses
        .then(response => response.json())
        .then(jsonresult => {
            console.log("haetaaan vastaukset");
            //setResults(jsonresult._embedded.vastauses[0].vastaus); 
            // Eli hakee tällä backendistä ensimmäisen kovakoodatun vastauksen, mutta halutaan taulun viimeisin vastaus
            let lista = jsonresult._embedded.vastauses;
            let lista2 = new Array();
            lista.forEach(itemi => {
                lista2.push(itemi.vastaus);
            
            })
            setResults(lista2);
        })
        .catch(err => console.error(err))
    }


    function PalautaVastaukset()
    {
        return(
          
            results.map((tulos,index) => {
                return <div>{tulos}</div>
            })

        )
    }

    return ( 
        <div>
            <p>Annetut vastaukset: </p>
  
            <div> <PalautaVastaukset /></div>
        </div>
    )
    
}