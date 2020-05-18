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
                    data.map((kysely, index) => {

                        kysely.kysymykset.map((kysymys, index2) => {
                            let setti = new Set();
                            let tempcount = {};
                            let tarkein = { kysymys: "", lista: [] }
                            tarkein.kysymys = kysymys.kysymys;
                            tarkein.kysymys_id = kysymys.kysymys_id;
                            tarkein.tyyppi = kysymys.tyyppi;
                            tarkein.textfieldi = "";
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
                                Object.keys(tempcount).forEach((looper) => {
                                    tarkein.lista.push({
                                        name: [looper], uv: tempcount[looper]
                                    })
                                })
                                chartindatat.push(tarkein)
                            }
                            else {
                                kysymys.vastaus.map((kys, index3) => {

                                    tarkein.textfieldi = kys.vastaus;
                                })
                                chartindatat.push(tarkein)
                            }
                        })
                    })
                    setData(chartindatat)
                })
    }

    const [kayttajanVastaus, setKayttajanVastaus] = React.useState({
        kysely_id: 1,
        name: "Kysely1",
        kysymykset: [
            {
                kysymys_id: 14,
                tyyppi: "Radio",
                kysymys: "Tämä on kysymys 1, mistä väristä pidät?",
                pakollinen: false,

                vastaus: [
                    {
                        vastaus_id: 9,
                        vastaus: "Pinkki3",
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

        return kayttajanVastaus.kysymykset.map((kysymys, index) => {
            if (kysymys.kysymys_id == vastausData.kysymys_id) {
                return kysymys.vastaus[0].vastaus;
            }
        })
        console.log("mitään ei löytynyt")
        return "";
    }


    return (
        <div>
            {
                data.map((kysymys) => {
                    let annettuVastaus = etsiVastaus(kysymys);
                    if (kysymys.lista.length > 0) {

                        return (
                            <div className="area-chart-wrapper" >
                                <h1> {kysymys.kysymys} </h1>
                                <br></br>
                                <BarChart
                                    width={700}
                                    height={200}
                                    data={kysymys.lista}
                                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                    layout="vertical"
                                >
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" />
                                    <Tooltip />
                                    <Bar dataKey="uv" fill={"#17a3c2"} maxBarSize={20} label radius={[10, 10, 10, 10]} />

                                </BarChart>
                                <h3>Vastasit: {annettuVastaus} </h3>
                                <br></br>
                                <br></br>

                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="area-chart-wrapper" >
                                <h1> {kysymys.kysymys} </h1>
                                <h3>Vastasit: {kysymys.textfieldi} </h3>
                                <br></br>
                                <br></br>

                            </div>
                        )

                    }
                })
            }

        </div>
    )

}