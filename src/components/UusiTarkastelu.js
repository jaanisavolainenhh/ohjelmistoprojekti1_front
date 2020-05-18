import React, { Component } from 'react';
import {
    BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceArea,
    XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList, Label
} from 'recharts';


export default function UusiTarkastelu(props) {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        //getVastaukset();
        DataPropsista();

    }, [])

    function DataPropsista() {

        let chartindatat = new Array();

        props.kysely.map((kysely, index) => {

            kysely.kysymykset.map((kysymys, index2) => {
                let setti = new Set();
                let tempcount = {};
                let tarkein = { kysymys: "", lista: [] }
                tarkein.kysymys = kysymys.kysymys;
                console.log("###########")


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
                    let blaablaa = new Array;

                    Object.keys(tempcount).forEach((looper) => {


                        blaablaa.push({
                            name: [looper], uv: tempcount[looper]
                        })

                        tarkein.lista.push({
                            name: [looper], uv: tempcount[looper]
                        })
                    })
                    chartindatat.push(tarkein)
                }
            })
        })
        setData(chartindatat)
        console.log(data)

    }


    function ChartitaData(data) {

        let chartindatat = new Array();

        data.map((kysely, index) => {

            kysely.kysymykset.map((kysymys, index2) => {
                let setti = new Set();
                let tempcount = {};
                let tarkein = { kysymys: "", lista: [] }
                tarkein.kysymys = kysymys.kysymys;
                console.log("###########")


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
                    let blaablaa = new Array;

                    Object.keys(tempcount).forEach((looper) => {


                        blaablaa.push({
                            name: [looper], uv: tempcount[looper]
                        })

                        tarkein.lista.push({
                            name: [looper], uv: tempcount[looper]
                        })
                    })
                    chartindatat.push(tarkein)
                }
            })
        })
        setData(chartindatat)
        console.log(data)

    }


    const getVastaukset = () => {
        fetch(props.urlit + 'kyselytadmin')
            .then(response => response.json())
            .then(
                data => {
                    ChartitaData(data);
                })
    }




    return (
        <div className="container">
            {
                //vaihdetaan tää että käyttää propin dataa
                data.map((blaablaa) => {
                    // props.data.map((blaablaa) => {

                    return (
                        <div className="area-chart-wrapper" style={{ marginTop: 20 }}>
                            <h3> {blaablaa.kysymys} </h3>
                            <BarChart
                                width={700}
                                height={200}
                                data={blaablaa.lista}
                                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                                layout="vertical"
                            >
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Bar dataKey="uv" fill="#3A799B" maxBarSize={20} label radius={[10, 10, 10, 10]} label={{ fill: '#ffffff' }} />
                            </BarChart>

                        </div>
                    )
                })
            }

        </div>
    )

} 
