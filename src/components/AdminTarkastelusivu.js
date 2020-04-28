
import React from 'react';

export default function AdminTarkasteluSivu(props) {

    const [kysely, setKysely] = React.useState();
    const [naytaSessioittain, setNaytaSessioittain] = React.useState(true);

    //const [vaihtoehdot, setVaihtoehdot] = React.useState([]); //tää lähtee pois ja menee jokaiseen childi compoon omanaan
    //const [value, setValue] = React.useState([]); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
    const [open, setOpen] = React.useState(false);
    const [msg, setmsg] = React.useState('')
    React.useEffect(() => {
        JaaninUseEffecti();
    }, [naytaSessioittain])

    function JaaninUseEffecti() {
        console.log(props.urlit + 'kyselytadmin')
        fetch(props.urlit + 'kyselytadmin', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(res => {
                Paata(res)
            })
            .catch(err => console.log(err))
    }

    function Paata(data) {
        if (naytaSessioittain) {
            SorttaaDataSessioittain(data)
        } else {
            SorttaaData(data);
        }
    }


    function SorttaaData(data) { //tää näyttää nyt montako kappaletta on
        //jos halutaan näyttää kaikkien kyselyitten shitti 
        let kaikkiKyselyt = [];
        data.map((kysely, index) => {
            let kyselyntulos = { kysely: kysely.name, tulokset: [] }
            //let kyselyntulos = Array();
            kysely.kysymykset.map((kysymys, index2) => {
                console.log("###########")
                let setti = new Set();
                kysymys.vaihtoehdot.map((vaihtoehto) => {
                    setti.add(vaihtoehto.vaihtoehto);
                })
                let tempcount = {};
                let numbah = { vastaukset: [] };
                if (kysymys.tyyppi == "Radio") {
                    setti.forEach((a) => {
                        //numbah[a] = 0
                        //numbah.vastaukset.push({[a]:0})
                        //numbah.vastaukset[a] =0
                        tempcount[a] = 0
                    })
                    numbah.kysymys = kysymys.kysymys;

                    kysymys.vastaus.map((kys, index3) => {
                        tempcount[kys.vastaus] = tempcount[kys.vastaus] + 1
                        // numbah[kys.vastaus] = numbah[kys.vastaus]+1;
                        //numbah.vastaukset[kys.vastaus] = numbah.vastaukset[kys.vastaus]+1
                    })

                    Object.keys(tempcount).forEach((looper) => {
                        //numbah.vastaukset.push({ [looper]: tempcount[looper] })
                        let uusstring = [looper] + ": " + tempcount[looper]
                        numbah.vastaukset.push(uusstring);
                    })

                    kyselyntulos.tulokset.push(numbah)
                }

                if (kysymys.tyyppi == "Teksti") {
                    setti.forEach((a) => {
                        tempcount[a] = 0
                    })
                    numbah.kysymys = kysymys.kysymys;
                    kysymys.vastaus.map((kys, index3) => {
                        numbah.vastaukset.push(kys.vastaus)
                    })
                    kyselyntulos.tulokset.push(numbah)
                }


            })
            kaikkiKyselyt.push(kyselyntulos)
            console.log("@@@@@@@")
            console.log(kyselyntulos)
            //setKysely(kyselyntulos)
        })
        setKysely(kaikkiKyselyt)
    }


    function SorttaaDataSessioittain(data) { //tästä puuttuu vielä pairaus kysymykseen
        let kaikkiKyselyt = [];
        data.map((kysely, index) => {
            let sessiot = Array();
            kysely.sessioidt.map((sessio) => {
                sessiot.push(sessio.id)
                console.log("####")
                console.log("Sessio: "+sessio.id)
                kysely.kysymykset.map((kysymys) => {
                    kysymys.vastaus.map((vastaus) =>{
                        //console.log(vastaus)
                        if(sessio.id == vastaus.sessioid)
                            console.log(vastaus.vastaus)
                    })

                })

            })
            console.log(sessiot)
        })

    }






    return (
        <div>

        </div>
    )
}


