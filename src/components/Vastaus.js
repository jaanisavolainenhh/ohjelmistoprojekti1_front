import React, {useState, useEffect} from 'react';

export default function Vastaus() {

    const [results, setResults] = useState([]);

    useEffect(() => {
        getResults();
    },[])

    const getResults = () => {
        fetch('http://localhost:8080/api/vastauses') //https://salenpalikatback.herokuapp.com/api/vastauses
        .then(response => response.json())
        .then(jsonresult => {
          //  console.log(jsonresult) // Tarkistin että toi harjoitusapi toimii
            setResults(jsonresult._embedded.vastauses[1].vastaus); // jsonresult._embedded.vastauses.vastaus
        })
        .catch(err => console.error(err))
    }

    return ( 
        <div>
           <p>{results}</p> 
        </div>
    )
    
}