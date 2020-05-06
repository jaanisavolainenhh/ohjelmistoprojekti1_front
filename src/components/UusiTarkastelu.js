import React, { Component } from 'react';
import {
    BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceArea,
    XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList, Label
} from 'recharts';


export default function UusiTarkastelu(props) {

    const [vastaukset, setVastaukset] = React.useState([]);

    const [data, setData] = React.useState([
        { name: "gym", uv: 150 },
        { name: "jogging", uv: 120 },
        { name: "blabla", uv: 50 },

    ]);


    React.useEffect(() => {
        getVastaukset();

    }, [])

    const getVastaukset = () => {
        fetch(props.urlit + 'kyselytadmin')
            .then(response => response.json())
            .then(
                data => {

                    let vastaukset = new Array();
                    let setti = new Set();
                    let tempcount = {};


                    
                    data.map((kysely, index) => {
                        let kyselyntulos = { kysely: kysely.name, tulokset: [] }
                        kysely.kysymykset.map((kysymys, index2) => {
                            console.log("###########")


                            kysymys.vaihtoehdot.map((vaihtoehto) => {
                                setti.add(vaihtoehto.vaihtoehto);
                            })

                            let numbah = { vastaukset: [] };
                            setti.forEach((a) => {

                                tempcount[a] = 0
                            })
                            numbah.kysymys = kysymys.kysymys;

                            kysymys.vastaus.map((kys, index3) => {
                                tempcount[kys.vastaus] = tempcount[kys.vastaus] + 1
                                // numbah[kys.vastaus] = numbah[kys.vastaus]+1;
                                //numbah.vastaukset[kys.vastaus] = numbah.vastaukset[kys.vastaus]+1
                            })



                            Object.keys(tempcount).forEach((looper) => {
                               
                                let uusstring = [looper] + ": " + tempcount[looper]
                                numbah.vastaukset.push(uusstring);
                                
                            kyselyntulos.tulokset.push(numbah)
                            vastaukset.push({ name: looper, uv: tempcount[looper] })
                        })

                        setData(vastaukset)



                    }
                    )
                }
            )
    }
                    
            
            )
}

return (


    <div className="area-chart-wrapper">
        <BarChart
            width={700}
            height={400}
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            layout="vertical"
        >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="uv" fill="#ff7300" maxBarSize={20} label radius={[10, 10, 10, 10]} />
            <Bar dataKey="pv" fill="#387908" />
        </BarChart>
    </div>
)

                } 