import React, {useState, useEffect}from 'react';

export default function Vastaus() {

    const [results, setResults] = useState([]);

    useEffect(() => {
        getResults();
    },[])

    const getResults = () => {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php') //https://salenpalikatback.herokuapp.com/api/vastauses
        .then(response => response.json())
        .then(jsonresult => {
          //  console.log(jsonresult) // Tarkistin että toi harjoitusapi toimii
            setResults(jsonresult.drinks.strInstructions); // jsonresult._embedded.vastauses.vastaus
        })
        .catch(err => console.error(err))
    }

    return ( // MUT MIKS TÄÄ EI TULOSTU
        <div>
           <p>{results}</p> 
        </div>
    )
}