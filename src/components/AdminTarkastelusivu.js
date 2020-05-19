
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
    const [sessionKysely, setSessionKysely] = React.useState([]);
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
    // const [sessioToShow, setSessionToShow] = React.useState('');

    // const handleChange = (event) => {
    //     setSessionToShow(event.target.value);
    // };

    const kyselynValinta = (event) => {
        //    setSessionToShow("");
        setValittuKyselyID(event.target.value);
        setKyselynSessioIDt(origData[event.target.value].sessioidt);
        setValittuSessioID(-1);
        setKysely([origData[event.target.value]])
    };

    const sessionValinta = (event) => {
        setValittuSessioID(event.target.value);
        return;

    }

    React.useEffect(() => {
        
        console.log("Use effect")
        let valikysely = {  kysymykset: [] };
        if (valittuSessioID == -1) {
            setSessionKysely([])
            return;
        }
        //let tempdata = origData;
        origData.map((k) => {
            k.sessioidt.map((sessio) => {
                if (valittuSessioID == sessio.id) { //onko sessio id kyselyssä'
                    console.log("Kysely löydetty sesiolla"+sessio.id)
                    console.log(k)
                    valikysely.kysely_id = k.kysely_id; //ok
                    console.log()
                    k.kysymykset.map((wa) =>{
                        let tempvaihtoehdot = new Array();
                        let tempvastaukset;

                        wa.vastaus.map((va,i) => {
                            if(va.sessioid == sessio.id)
                            {
                                wa.vaihtoehdot.map((x,i) => {
                                    // if(va.sessioid == sessio.id)
                                     {
                                        tempvaihtoehdot.push ({vaihtoehto : x.vaihtoehto, vaihtoehto_id: x.vaihtoehto_id})
                                         //valikysely.vaihtoehdot.push(tempvaihtoehdot )
                                         console.log("HALOOOO")
                                         //valikysely.kysymykset.push(wa);
                                     }
         
                                  })
                                tempvastaukset =  {kysymys: wa.kysymys, tyyppi: wa.tyyppi,vaihtoehdot: tempvaihtoehdot, vastaus: [{sessioid: va.sessioid, vastaus: va.vastaus, vastaus_id : va.vastaus_id}]};
                                valikysely.kysymykset.push(tempvastaukset)

                                //valikysely.kysymykset.push(wa);
                            }

                        })
          
                        console.log("Pushing---")
                        //console.log(wa)

                    })
                    //valikysely.sessioidt = k.sessioidt;
                    return;
                }
            })
        })
        console.log(valikysely)
                setSessionKysely([valikysely]);

        return;
        valikysely.kysymykset.map((kysymys,i) => {
            let karsittuvastaus = new Array();
            kysymys.vastaus.map((vastaus,z) => {
                if (vastaus.sessioid == valittuSessioID) {
                    console.log("Täsmää")
                    karsittuvastaus.push(vastaus.vastaus);
                }
            })
            console.log(karsittuvastaus)
            //valikysely.kysymykset[i].vastaus=karsittuvastaus;
            //kysymys.vastaus = karsittuvastaus;
        })
        //setSessionKysely([valikysely]);
        //  }
    }, [valittuSessioID])

 


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
                        <UusiTarkastelu key={index} kysely={kysely} />
                    )
                })
            )
        }
        else {
            return (
                // <div></div>
                sessionKysely.map((kys3, index) => {
                    return (
                        <div>
                            <Kysely key={index} esitysdata={kys3} lukittu={true} />
                        </div>
                    )
                })
            )
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
                            origData.map((sess, index) => {
                                return (<MenuItem value={index}>{sess.name}</MenuItem>)
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

            <RenderValittuKysely />
        </div>
    )
}


