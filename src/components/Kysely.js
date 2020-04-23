import React, { useState, useEffect, Divider } from 'react';
import Kysymys from './Kysymys';
export default function Kysely(props) {

    const [kysely, setKysely] = useState([]);

    useEffect(() => {
        JaaninUseEffecti();
    }, [])


    function JoelionUseEffecti() {
        fetch('http://localhost:8080/api/kysymyses') // en saanut meidän apia auki (/kysely), joten hieman testi dataa generoidun kautta.
            .then(response => response.json())
            .then(res => {
                console.log("haetaan kysely")
                setKysely(res._embedded.kysymyses)
            })
            .catch(err => console.log(err))

    }


    function JaaninUseEffecti() {
        fetch('http://localhost:8080/kyselyt')
            .then(response => response.json())
            .then(res => {
                setKysely(res)
            })
            .catch(err => console.log(err))
    }


    function KokoRoska() {

        return (
            <div>
                Kyselyn otsikko vaikka
                <PrinttaaKysymyksetJaVastaukset />
                Kyselyn päättyminen

            </div>
        )

    }

    //setKysely(...kysely, )
    //55 divi ja 56 sulku on esim turha potentiaalisesti, testin takia mukana
    function PrinttaaKysymyksetJaVastaukset() {
        return (
            <div>
                {
                    kysely.map((tulos, index) => {
                        console.log(tulos)
                        return (
                            <div> 
                                {/* <Divider light /> */}
                                < PrinttaaKysymys kysymykset={tulos.kysymykset} />
                                {/* <Divider light /> */}
                            </div>
                        )
                    })
                }
            </div>

        )

    }

    function PrinttaaKysymys(props) {
        return (
            props.kysymykset.map((kysymys, index) => {
                return (
                    <div>
                        {kysymys.kysymys}
                        <PrinttaaVaihtoehdot vaihtoehdot={kysymys.vaihtoehdot} kysymystyyppi={kysymys.tyyppi} />
                    </div>)
            })
        )
    }

    function PrinttaaVaihtoehdot(props) { //tyyppi propilla voidaan valita elinen componentti tähän switchin kautta.

        return (
            props.vaihtoehdot.map((vaihtoehto, index) => {
                return (
                    <div>
                        {vaihtoehto.vaihtoehto}
                    </div>)
            })
        )
    }


    //Jaanin Testailua
    function Testi1(props) {
        return (<div><Testi2 /> <Testi3 /> {props.viesti} </div>)
    }
    //Jaanin Testailua

    function Testi2() {
        return (<div> Testi 2 func</div>)
    }
    //Jaanin Testailua

    function Testi3() {
        return (<div> Testi 3 func</div>)
    }

    //Megahärpäke miten ei ihan kannata tehdä. Jos lisää divejä ja {} niin sitten tääkin lopulta toimis. Pilkottu paloihin
    function LuoKysymykset() {
        return (
            kysely.map((item, index) => {
                console.log(item);
                return (
                    item.kysymykset.map((kysymys, index2) => {
                        console.log(kysymys.kysymys)
                        return (
                            kysymys.vaihtoehdot.map((vastaus, index3) => {
                                return <div>{vastaus.vaihtoehto}</div>
                                console.log(vastaus.vaihtoehto)
                            })
                        )
                        return <div>{kysymys.kysymys}</div>
                    }))
            }
            )
        )
        // return (<div> jotain </div>);
    }
    // jKysely mapin avulla hakee kysely statelta jokaisen kysymyksen käyttäen indexiä yksilöllistämiseen
    // Selkeyden vuoksi tulostuu päällekkäisiin elementteihin (viimeinen tr+br kikkailua, jotta ei turhia varoituksia selaimessa)
    // const jKysely = kysely.map((item, index) =>
    //     <tbody>
    //         <tr key={index}>
    //             <td>{item.kysymys} (kys)</td>
    //         </tr>
    //         <tr>
    //             <td>{item.tyyppi} (vaihtoehdot)</td>
    //         </tr>
    //         <tr>
    //             <td> (VastausElementti) </td>
    //         </tr>
    //         <tr>
    //             <td> <br /> </td>
    //         </tr>
    //     </tbody>
    // )

    return (

        // <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>

            {/* <Testi1 viesti="viestiteksti" /> */}
            <KokoRoska />
        </div>
    )
}