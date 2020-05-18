
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import UusiTarkastelu from './UusiTarkastelu';
import Kysely from './Kysely';
export default function AdminTarkasteluSivu(props) {

    const [origData, setOrigdata] = React.useState([]); //sisältää kaikki kyselyt
    const [kysely, setKysely] = React.useState([]); //näytetävä kysely jos ei sessioid valittu
    //const [kyselyittainData, SetKyselyittainData] = React.useState([]);
    //const [sessioittainData, SetSessioittainData] = React.useState([]);
    const [kyselynSessioIDt, setKyselynSessioIDt] = React.useState([]); //lista sessionid vetovalikkoon
    const [valittuKyselyID, setValittuKyselyID] = React.useState("");
    const [valittuSessioID, setValittuSessioID] = React.useState(-1);
    

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
            })
            .catch(err => console.log(err))
    }


    function KyselySessionIDsta() {

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
        let valikysely;
        setValittuSessioID(event.target.value);
        origData.map((kysely) => {
            kysely.sessioidt.map((sessio) => {
                if (event.target.value == sessio.id) {
                    valikysely = kysely;
                    return;
                }
            })
        })
        if (valikysely) {

            valikysely.kysymykset.map((kysymys) => {
                let karsittuvastaus = new Array();
                kysymys.vastaus.map((vastaus) => {
                    if (vastaus.sessioid == event.target.value) {
                        karsittuvastaus.push(vastaus);
                    }

                })
                kysymys.vastaus = karsittuvastaus;

            })
            console.log(valikysely.kysely_id)
            console.log("SÄÄTÖ")
            console.log(valikysely)
            setKysely([valikysely]);
        }
     
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
        if (valittuSessioID == -1) {
            return (
                kysely.map((kys3, index) => {
                    return (
                        <UusiTarkastelu kysely={kysely} />
                    )
                })
            )
        }
        else {
            return (
                // <div></div>
                 <Kysely esitysdata={kysely[0]} lukittu={true}  />
            )
        }
    }

    return (
        <div style={{marginTop:30}}>
           <h3>Vastausten tarkastelu</h3>
            <KaikkiKyselytDropdown />

            <div style={{marginTop: 20}}>
                Valitse tarkasteltava kysely
                <br></br>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Kyselyn nimi</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openKysely}
                        onClose={handleClose}
                        onOpen={handleOpenKysely}
                        value={valittuKyselyID}
                        onChange={kyselynValinta}
                        style={{width: 400}}
                    >

                        {
                            origData.map((sess, index) => {
                                return (<MenuItem value={index}>{sess.name}</MenuItem>)
                            })
                        }

                    </Select>
                </FormControl>
                <br></br>
                <br></br>
                Valitse tarkasteltava sessio
                <br></br>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label2">Sessio numero</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label2"
                        id="demo-controlled-open-select2"
                        open={openSessio}
                        onClose={handleClose}
                        onOpen={handleOpenSessio}
                        value={valittuSessioID}
                        onChange={sessionValinta}
                        style={{width:400}}

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

            <RenderValittuKysely />
        </div>
    )
}


