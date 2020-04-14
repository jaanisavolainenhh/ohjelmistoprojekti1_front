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

            setResults(jsonresult._embedded.vastauses[0].vastaus); 
            // Eli hakee tällä backendistä ensimmäisen kovakoodatun vastauksen, mutta halutaan taulun viimeisin vastaus
        })
        .catch(err => console.error(err))
    }

    return ( 
        <div>
            <p>Kysymys: </p>
           <p>{results}</p> 
        </div>
    )
    
}