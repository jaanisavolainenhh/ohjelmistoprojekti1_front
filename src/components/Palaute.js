import React, { Component } from 'react';
import {
    BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceArea,
    XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList, Label
} from 'recharts';


export default function Palaute(props) {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        getVastaukset();

    }, [])


    const getVastaukset = () => {
        fetch(props.urlit + 'kyselytadmin')
            .then(response => response.json())
            .then(
                data => {

                    let chartindatat = new Array();
                    //let haettuData = props.kysely;
                    //console.log(haettuData);

                    data.map((kysely, index) => {

                        kysely.kysymykset.map((kysymys, index2) => {
                            let setti = new Set();
                            let tempcount = {};
                            let tarkein = { kysymys: "", lista: [] }
                            tarkein.kysymys = kysymys.kysymys;
                            tarkein.kysymys_id = kysymys.kysymys_id;
                            //  console.log("###########")


                            kysymys.vaihtoehdot.map((vaihtoehto) => {
                                setti.add(vaihtoehto.vaihtoehto);
                            })

                            if (kysymys.tyyppi == "Radio") {
                                setti.forEach((a) => {

                                    tempcount[a] = 0
                                })

                                kysymys.vastaus.map((kys, index3) => {
                                    tempcount[kys.vastaus] = tempcount[kys.vastaus] + 1
                                    console.log(kys.vastaus)

                                })
                                //  let blaablaa = new Array;

                                Object.keys(tempcount).forEach((looper) => {


                                    /*       blaablaa.push({
                                               name: [looper], uv: tempcount[looper]
                                           })*/

                                    tarkein.lista.push({
                                        name: [looper], uv: tempcount[looper]
                                    })
                                })
                                chartindatat.push(tarkein)
                            }
                        })
                    })
                    setData(chartindatat)
                    // console.log(data)
                })
    }

    const [kayttajanVastaus, setKayttajanVastaus] = React.useState({
        kysely_id: 1,
        name: "Kysely1",
        kysymykset: [
            {
                kysymys_id: 2,
                tyyppi: "Radio",
                kysymys: "Tämä on kysymys 1, mistä väristä pidät?",
                pakollinen: false,
                vaihtoehdot: [
                    {
                        vaihtoehto_id: 4,
                        vaihtoehto: "Ruskea"
                    },
                    {
                        vaihtoehto_id: 5,
                        vaihtoehto: "Oranssi"
                    },
                    {
                        vaihtoehto_id: 6,
                        vaihtoehto: "Pinkki"
                    }
                ],
                vastaus: [
                    {
                        vastaus_id: 9,
                        vastaus: "Pinkki",
                        sessioid: 8
                    }
                ]
            }
        ],
        sessioidt: [
            {
                id: 8
            },
            {
                id: 10
            }
        ]
    });
    function etsiVastaus(vastausData) {
        kayttajanVastaus.kysymykset.map((kysymys, index) => {
            console.log(kysymys)
            if (kysymys.kysymys_id == vastausData.kysymys_id)
                {
                    console.log("löytyy vastaus" + kysymys.vastaus[0].vastaus);
                    return kysymys.vastaus[0].vastaus;
                }
                

        })
        console.log("mitään ei löytynyt")
        return "";

    }


    return (
        <div>
            {
                data.map((blaablaa) => {
                    let annettuVastaus = etsiVastaus(blaablaa);
                    console.log(blaablaa);
                    console.log(annettuVastaus);
                    return (
                        <div className="area-chart-wrapper" >
                            <h1> {blaablaa.kysymys} </h1>
                            <h2>antamasi vastaus: {annettuVastaus}</h2>
                            <BarChart
                                width={700}
                                height={400}
                                data={blaablaa.lista}
                                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                layout="vertical"
                            >
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Bar dataKey="uv" fill="#ff7300" maxBarSize={20} label radius={[10, 10, 10, 10]} />

                            </BarChart>

                        </div>
                    )
                })
            }

        </div>
    )

}
