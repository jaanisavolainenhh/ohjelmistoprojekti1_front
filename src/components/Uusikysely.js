import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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
    const [valmisKysely, setValmiskysely] = React.useState({});
    const [kyselynKysymykset, setKyselynKysymykset] = React.useState([{ tyyppi: "Radio", kysymys: "Tämä on testikysymys", vaihtoehdot: ["asd", "asdqweqweqwef"] }]); // Tähän listana kaikki kyselyyn tulevat kysymykset

    //lisättävän kysymyksen tietoa
    const [uusiKysymys, setUusikysymys] = React.useState(""); //tallennetaan nykyisen luotavan kysymyksen vaihtoehdot
    const [kysymyksenVaihtoehdot, setKysymyksenVaihtoehdot] = React.useState(["Vaihtoehto 1", "Vaihtoehto 2"]); //lisättävän kysymyksen vaihtoehdot
    const [kysymyksenTyyppi, setKysymyksentyyppi] = React.useState(""); //textfield, radio blabla, bindaa vetovalikkoon
    //uusi vaihtoehto kysymykseen
    const [uusiVaihtoehto, setUusivaihtoehto] = React.useState("asd");

    const classes = useStyles();


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
        setKysymyksenVaihtoehdot([]);
    };

    const lisaaVaihtoehto = (event) => {
        if (uusiVaihtoehto == "") //tyhjää ei lisätä
            return;
        setKysymyksenVaihtoehdot([...kysymyksenVaihtoehdot, uusiVaihtoehto]);
        setUusivaihtoehto("");
    };


    const tallennaKysely = () => {
        

        setValmiskysely({name: "Kyselynnimi", kysymykset: kyselynKysymykset})
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
                        {vaihtoehto} <Button variant="contained">-</Button>
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
                        onChange={handleChangeKysymykysenTyyppi}
                    >
                        <MenuItem hidden selected value={0}>-</MenuItem>
                        <MenuItem value={10}>Radio</MenuItem>
                        <MenuItem value={20}>Tekstikenttä</MenuItem>
                        <MenuItem value={30}>Skaala</MenuItem>
                        <MenuItem value={40}>Monivalinta</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={tallennaKysymys}>Tallenna kysymys</Button>
            </div>)
    }

    function Kysymykset() {
        return (
            kyselynKysymykset.map((kysymys, index) => {
                return (
                    <div>
                        {kysymys.kysymys} <Button variant="contained">Poista</Button>
                        {
                            kysymys.vaihtoehdot.map((vaihtoehto, index2) => {
                                return (<div>{vaihtoehto} <Button variant="contained">Poista</Button></div>)
                            })
                        }
                    </div>)
            })
        )
    }

    return (

        <div>
            <TextField label="Kysymys" value={uusiKysymys} onChange={handgleChangeKysymysChanged} />
            <Vetovalikko />
            <br></br>
            <div>
                <TextField label="Uusi vaihtoehto" value={uusiVaihtoehto} onChange={handleChangeVaihtoehtoChanged} />
                <Button variant="contained" onClick={lisaaVaihtoehto}>Lisää uusi vaihtoehto</Button>
            </div>
            <NykyinenKysymys />
            <br></br>
            <br></br>
            ________________________________________________________
            <br></br>
            <Button variant="contained" onClick={tallennaKysely}>Tallenna kysely</Button>
            <br></br>
             _______________________________________________________
            <br></br>
            {/* <Testi1 viesti="viestiteksti" /> */}
            <h1>Kyselyn kysymykset:</h1>
            <Kysymykset />
        </div>
    )
}