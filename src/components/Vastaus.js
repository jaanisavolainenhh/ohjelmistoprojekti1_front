import React, {useState, useEffect} from 'react';
import Kysely from './Kysely';

export default function Vastaus() {

    const [results, setResults] = useState([]);

    useEffect(() => {
        getResults();
    },[])

    const getResults = () => {
        fetch('http://localhost:8080/api/vastauses') //https://salenpalikatback.herokuapp.com/api/vastauses
        .then(response => response.json())
        .then(jsonresult => {

            setResults(jsonresult._embedded.vastauses[0].vastaus); 
            // Eli hakee tällä backendistä ensimmäisen kovakoodatun vastauksen, mutta halutaan taulun viimeisin vastaus
        })
        .catch(err => console.error(err))
    }

    return ( 
        <div>
           <p>{results}</p> 
        </div>
    )
    
}