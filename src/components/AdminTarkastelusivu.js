
import React from 'react';

export default function AdminTarkasteluSivu(props) {

    const [kysely, setKysely] = React.useState();

    //const [vaihtoehdot, setVaihtoehdot] = React.useState([]); //tää lähtee pois ja menee jokaiseen childi compoon omanaan
    //const [value, setValue] = React.useState([]); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.

    const [open, setOpen] = React.useState(false);
    const [msg, setmsg] = React.useState('')
    React.useEffect(() => {
        JaaninUseEffecti();
    }, [])

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
                SorttaaData(res)
            })
            .catch(err => console.log(err))
    }


    function SorttaaData(data) { //tää näyttää nyt montako kappaletta on
        console.log(data)
        data.map((kysely, index) => {
            let kyselyntulos = { kysely: "", tulokset: [] }
            //let kyselyntulos = Array();
            kysely.kysymykset.map((kysymys, index2) => {
                console.log("###########")
                let setti = new Set();
                kysymys.vaihtoehdot.map((vaihtoehto) => {
                    setti.add(vaihtoehto.vaihtoehto);
                })
                let tempcount = {};
                let numbah = { vastaukset: [] };
                if(kysymys.tyyppi == "Radio")
                {
                    setti.forEach((a) => {
                        //numbah[a] = 0
                        //numbah.vastaukset.push({[a]:0})
                        //numbah.vastaukset[a] =0
                        tempcount[a] = 0
                    })
                    numbah.kysymys = kysymys.kysymys;
                    //console.log(kysymys.vastaus)
                    kysymys.vastaus.map((kys, index3) => {
                        tempcount[kys.vastaus] = tempcount[kys.vastaus] + 1
                        // numbah[kys.vastaus] = numbah[kys.vastaus]+1;
                        //numbah.vastaukset[kys.vastaus] = numbah.vastaukset[kys.vastaus]+1
                    })
                    console.log("Numbah: ")
                    console.log(numbah)
                    //console.log(numbah.vastaukset.length)
                    console.log(Object.keys(tempcount))
                    Object.keys(tempcount).forEach((looper) => {
                        //numbah.vastaukset.push({ [looper]: tempcount[looper] })
                        let uusstring = [looper]+": "+tempcount[looper]
                        numbah.vastaukset.push(uusstring);

                    }
                    )
                    console.log("Numbah: ")
                    console.log(numbah)
                    kyselyntulos.tulokset.push(numbah)
                }

                if(kysymys.tyyppi == "Teksti")
                {
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
            console.log("@@@@@@@")
            console.log(kyselyntulos)
            setKysely(kyselyntulos)
        }

        )
    }







    return (
        <div>

        </div>
    )
}


