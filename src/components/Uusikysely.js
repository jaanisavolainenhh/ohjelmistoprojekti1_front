import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function Uusikysely(props) {
    //kysely
    //const [valmisKysely, setValmiskysely] = React.useState({name: 'kyselyn nimi', kysymykset:[]});
    const [kyselynKysymykset, setKyselynKysymykset] = React.useState([{ kysymys: "uusiKysymys", vaihtoehdot: ["123", "234", "tosipitkäteksti"], tyyppi: "Radio" }]); // Tähän listana kaikki kyselyyn tulevat kysymykset
    const [kyselynNimi, setKyselynnimi] = React.useState('je ejee kysssäri');

    //lisättävän kysymyksen tietoa
    const [uusiKysymys, setUusikysymys] = React.useState(""); //tallennetaan nykyisen luotavan kysymyksen vaihtoehdot
    const [kysymyksenVaihtoehdot, setKysymyksenVaihtoehdot] = React.useState([]); //lisättävän kysymyksen vaihtoehdot
    const [kysymyksenTyyppi, setKysymyksentyyppi] = React.useState("10"); //textfield, radio blabla, bindaa vetovalikkoon
    //uusi vaihtoehto kysymykseen
    const [uusiVaihtoehto, setUusivaihtoehto] = React.useState("");

    const [testaus, setTestaus] = React.useState(0);
    const [, forceUpdate2] = React.useReducer(x => x + 1, 0);  // Tämä triggeraa rerenderin Buttonin OnClickissä koska siinä on nyt custombindi

    const [open, setOpen] = React.useState(false);
    const [msg, setmsg] = React.useState('')
    const classes = useStyles();

    function postUusikysely() { //Tätä pitää muokata että lähettää kysely olion eikä vastaus oliota
        console.log({ kyselynNimi }.kyselynNimi)
        //let kysNimi = {kyselynNimi};
        let postattavaKysely = { name: { kyselynNimi }.kyselynNimi, kysymykset: { kyselynKysymykset }.kyselynKysymykset }

        try {
            fetch(props.urlit + 'tallennauusikysely', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(postattavaKysely)
            })
                .catch(err => console.error(err));
            setmsg("Vastaus lähetetty!");
            setOpen(true);
            console.log(JSON.stringify(postattavaKysely));
        } catch (e) {
            setOpen(true);
            setmsg("Lähettäminen epäonnistui!");
            console.log(e)
        }
        //setValue();
    }

    const handleChangeKysymykysenTyyppi = (event) => {
        setKysymyksentyyppi(event.target.value);
    };


    const handleChangeVaihtoehtoChanged = (event) => {
        setUusivaihtoehto(event.target.value);
    };


    const handgleChangeKysymysChanged = (event) => {
        setUusikysymys(event.target.value);
    };
    const tallennaKysymys = (event) => {
        if (uusiKysymys == "")
            return;

        let kysymys;
        switch (kysymyksenTyyppi) {
            case 0:
                kysymys = "";
                break;
            case 10:
                kysymys = "Radio";
                break;
            case 20:
                kysymys = "Teksti";
                break;
            case 30:
                kysymys = "Skaala";
                break;
            case 40:
                kysymys = "Monivalinta";
                break;
        }


        let kyssari = { kysymys: uusiKysymys, vaihtoehdot: kysymyksenVaihtoehdot, tyyppi: kysymys };
        setKyselynKysymykset([...kyselynKysymykset, kyssari]);
        setUusikysymys("")
        setKysymyksentyyppi('');
        setKysymyksenVaihtoehdot([]);
    };

    const lisaaVaihtoehto = (event) => {
        if (uusiVaihtoehto == "") //tyhjää ei lisätä
            return;
        setKysymyksenVaihtoehdot([...kysymyksenVaihtoehdot, uusiVaihtoehto]);
        setUusivaihtoehto("");
    };


    const tallennaKysely = () => {
        postUusikysely();
    };

    // ## Komponentti funktioita
    function NykyinenKysymys() {
        return (
            <div>
                <ListaaVaihtoehdot />
            </div>
        )
    }

    function ListaaVaihtoehdot() {
        return (
            kysymyksenVaihtoehdot.map((vaihtoehto, index) => {
                return (
                    <div>
                        <table id="vaihtarit">
                            <tr>
                                <td>
                                    <Button color="secondary" startIcon={<RemoveIcon />}></Button>
                                </td>
                                <td>
                                    {vaihtoehto}
                                </td>
                            </tr>
                        </table>
                    </div>)
            })
        )
    }

    function Vetovalikko() {
        return (
            <div>
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-filled-label">Kysymystyyppi</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={kysymyksenTyyppi}
                        onChange={handleChangeKysymykysenTyyppi}>

                        {/* <MenuItem hidden selected value={0}>-</MenuItem> */}
                        <MenuItem selected value={10}>Radio</MenuItem>
                        <MenuItem value={20}>Tekstikenttä</MenuItem>
                        <MenuItem value={30}>Skaala</MenuItem>
                        <MenuItem selected value={40}>Monivalinta</MenuItem>
                    </Select>
                </FormControl>

            </div>)
    }

    function poistaVaihtoehto(Vaihtoehto, Olio) {
        //console.log(Olio + " " + Vaihtoehto)
        let temp = { kyselynKysymykset }.kyselynKysymykset;
        console.log(temp);
        console.log(temp[Olio])
        console.log(temp[parseInt(Olio)].vaihtoehdot[parseInt(Vaihtoehto)])
        temp[parseInt(Olio)].vaihtoehdot.splice(Vaihtoehto, 1);
        // delete    temp[parseInt(Olio)].vaihtoehdot[parseInt(Vaihtoehto)];
        console.log(temp[Olio])
        setKyselynKysymykset(temp);
        //setTestaus({testaus}*-1);
        forceUpdate2()
        //kyselynKysymykset[parseInt(olio)].kysmykset[parseInt(Vaihtoehto)]
    }

    function lel(e, c) {
        console.log(e + " " + c)
    }

    function toinenTesti(props) {
        setTestaus({ testaus } + 1)
        console.log(props.paska)
    }
    //<Button onClick={poistaVaihtoehto.bind(this,{index2}.index2).bind(this, {index}.index)} color="default" startIcon={<RemoveIcon />} ></Button>

    // onClick={() => PoistaVaihtoehto({index}.index, {index2}.index2)} 
    function Kysymykset() {
        // En keksinyt vielä miten nämä olisi saanut järkevästi näkymään sivulla... ja jotenkin onnistuin saamaan ne renderöitymään vierekkäin (rivi: -kysymys -vaih -toe -hto)
        return (
            //käytetään dellissä tablerowin indexiä jne
            kyselynKysymykset.map((kysymys, index) => {

                return (
                    <div>
                        <div >
                            <h1> <Button color="secondary" startIcon={<RemoveIcon />}></Button> {kysymys.kysymys} </h1>
                        </div>
                        {
                            kysymys.vaihtoehdot.map((vaihtoehto, index2) => {
                                return (<div>
                                    <Button onClick={poistaVaihtoehto.bind(this, { index2 }.index2).bind(this, { index }.index)} color="default" startIcon={<RemoveIcon />} ></Button>
                                    {vaihtoehto}
                                </div>)
                            })
                        }

                    </div>)
            }
            )
        )

    }

    return (

        <div>
            <br></br><br></br>
            <TextField label="Kysymys" value={uusiKysymys} onChange={handgleChangeKysymysChanged} />
            <br></br><br></br>
            <Vetovalikko />
            <br></br>
            <div>
                <TextField label="Uusi vaihtoehto" value={uusiVaihtoehto} onChange={handleChangeVaihtoehtoChanged} />
                <Button variant="contained" color="primary" startIcon={<AddIcon />}
                    style={{ marginTop: '10px', marginLeft: '30px', paddingLeft: '10px', paddingRight: '0px' }} onClick={lisaaVaihtoehto}></Button>
            </div>
            <br></br><br></br>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><NykyinenKysymys /></div>
            <br></br><br></br>
            <Button variant="contained" color="primary" onClick={tallennaKysymys} style={{ marginRight: '20px' }}>Tallenna kysymys</Button>
            <Button variant="contained" color="primary" onClick={tallennaKysely}>Tallenna kysely</Button>
            <br></br>
            <br></br>
            {/* <Testi1 viesti="viestiteksti" /> */}
            <h1>Kyselyn kysymykset:</h1>
            <Kysymykset />

        </div>
    )
}
            // <Kysymykset/> renderöityy ennen kuin yhtään kysymystä annetaan --> "ylimääräinen button näkyvissä"