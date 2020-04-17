import React, {useState, useEffect} from 'react';

export default function Kysely(props) {

const[kysely, setKysely] = useState([]);

useEffect(() => {
fetch('http://localhost:8080/api/kysymyses') // en saanut meidän apia auki (/kysely), joten hieman testi dataa generoidun kautta.
.then(response => response.json())
.then(res => {
    console.log("haetaan kysely")
    setKysely(res._embedded.kysymyses)
})
.catch(err => console.log(err))
}, [])


// jKysely mapin avulla hakee kysely statelta jokaisen kysymyksen käyttäen indexiä yksilöllistämiseen
// Selkeyden vuoksi tulostuu päällekkäisiin elementteihin (viimeinen tr+br kikkailua, jotta ei turhia varoituksia selaimessa)
const jKysely = kysely.map((item, index) =>
    <tbody>
    <tr key={index}>
        <td>{item.kysymys} (kys)</td>
    </tr>
    <tr>
        <td>{item.tyyppi} (vaihtoehdot)</td>
    </tr>
    <tr>
        <td> (VastausElementti) </td>
    </tr>
    <tr>
        <td> <br/> </td>
    </tr>
    </tbody>
)

return(
    
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <table>            
                {jKysely}
        </table>
    </div>
)
}