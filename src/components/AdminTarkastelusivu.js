
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import UusiTarkastelu from './UusiTarkastelu'
export default function AdminTarkasteluSivu(props) {

    const [origData, setOrigdata] = React.useState([]); //sisältää kaikki kyselyt
    const [kysely, setKysely] = React.useState([]);
    const [kyselynSessioIDt, setKyselynSessioIDt] = React.useState(["5", "2"])
    const [valittuKyselyID, setValittuKyselyID] = React.useState("");
    const [valittuSessioID, setValittuSessioID] = React.useState(-1);
    const [sessioittainData, SetSessioittainData] = React.useState([]);
    const [kyselyittainData, SetKyselyittainData] = React.useState([]);

    //const [vaihtoehdot, setVaihtoehdot] = React.useState([]); //tää lähtee pois ja menee jokaiseen childi compoon omanaan
    //const [value, setValue] = React.useState([]); //radiobuttoni säätelee tämän arvoa ja lukee tästä valinnan.
    const [openKysely, setOpenKysely] = React.useState(false);
    const [openSessio, setOpenSessio] = React.useState(false);
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
                setOrigdata(res)
                Paata(res)
            })
            .catch(err => console.log(err))
    }

    function Paata(data) {

        SorttaaDataSessioittain(data)
        SorttaaData(data);
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
            //console.log("@@@@@@@")
            //console.log(kyselyntulos)
        })
        SetKyselyittainData(kaikkiKyselyt)
    }


    function SorttaaDataSessioittain(data) { //tästä puuttuu vielä pairaus kysymykseen
        let kaikkiSessioittain = [];
        data.map((kysely, index) => {

            kysely.sessioidt.map((sessio) => {
                let kysymys_F = { vastaukset: [] };
                let sessiot = Array();
                kysymys_F.kysely = kysely.name
                sessiot.push(sessio.id)
                kysymys_F.sessio = sessio.id
                // console.log("####")
                // console.log("Sessio: " + sessio.id)
                kysely.kysymykset.map((kysymys) => {
                    let kysvas = kysymys.kysymys + " ";
                    kysymys.vastaus.map((vastaus) => {
                        //console.log(vastaus)
                        if (sessio.id == vastaus.sessioid) {
                            kysvas = kysvas + vastaus.vastaus
                            kysymys_F.vastaukset.push(kysvas) //tää jos halutaa yhessä tringissä kysymys ja vastaus
                            // kysymys_F.vastaukset.push({ [kysymys.kysymys]: vastaus.vastaus }) //tää jos halutaan objetkissa, voidaan sitten key valuella extractaa
                            console.log(vastaus.vastaus)

                        }
                    })

                })
                // console.log(sessiot)
                // console.log(kysymys_F)
                kaikkiSessioittain.push(kysymys_F)
            })
        })
        SetSessioittainData(kaikkiSessioittain)
        console.log("Sortted by sessions")
    }


    const useStyles = makeStyles((theme) => ({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }));


    const classes = useStyles();
    const [sessioToShow, setSessionToShow] = React.useState('');

    const handleChange = (event) => {
        setSessionToShow(event.target.value);
    };

    const kyselynValinta = (event) => {
        //    setSessionToShow("");
        setValittuKyselyID(event.target.value);

        setKyselynSessioIDt(origData[event.target.value].sessioidt);
        setValittuSessioID(-1);
        setKysely([origData[event.target.value]])
    };

    const sessionValinta = (event) => {

        setValittuSessioID(event.target.value);
        //setKysely([]);
    }



    const handleClose = () => {
        setOpenSessio(false)
        setOpenKysely(false);

    };

    const handleOpenKysely = () => {
        setOpenKysely(true);
    };

    const handleOpenSessio = () => {
        setOpenSessio(true);
    };



    function KaikkiKyselytDropdown() {
        return (
            <div></div>
        )
    }







    function RenderValittuKysely() {
        if(valittuSessioID == -1)
        {
            return (
                kysely.map((kys3, index) => {
                    return (
                        <UusiTarkastelu kysely={kysely} />
                        )
                    })
                    )
        }
        else {
            return (<div></div>)
        }
                    

    }

    return (
        <div>
            <KaikkiKyselytDropdown />

            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Kysely</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openKysely}
                        onClose={handleClose}
                        onOpen={handleOpenKysely}
                        value={valittuKyselyID}
                        onChange={kyselynValinta}
                    >

                        {
                            kyselyittainData.map((sess, index) => {
                                return (<MenuItem value={index}>{sess.kysely}</MenuItem>)
                            })
                        }

                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label2">Sessio</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label2"
                        id="demo-controlled-open-select2"
                        open={openSessio}
                        onClose={handleClose}
                        onOpen={handleOpenSessio}
                        value={valittuSessioID}
                        onChange={sessionValinta}
                    >
                                                <MenuItem value={-1}> - </MenuItem>

                        {
                            kyselynSessioIDt.map((sess, index) => {
                                return (<MenuItem value={sess.id}> {sess.id} </MenuItem>)
                            })
                        }

                    </Select>
                </FormControl>

            </div>
            {/* <Button onClick={VaihdaFilter} variant="contained" style={{ marginTop: 20, marginBottom: 20, backgroundColor: '#3A799B', color: 'white' }}><Nappulateksti /> </Button> */}
            {/* <DropdownSessioittain /> */}
            {/* <ValitseEsitystapa /> */}
            <RenderValittuKysely />
        </div>
    )
}


