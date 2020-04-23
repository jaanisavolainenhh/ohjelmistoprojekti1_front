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

    const [uusiKysymys, setUusikysymys] = React.useState({}); //tallennetaan nykyisen luotavan kysymyksen vaihtoehdot
    const [kyselynKysymykset, setKyselynKysymykset] = React.useState([{ kysymys: "Tämä on testikysymys" }]); // Tähän listana kaikki kyselyyn tulevat kysymykset
    const [kysymyksenVaihtoehdot, setKysymyksenVaihtoehdot] = React.useState(["Vaihtoehto 1", "Vaihtoehto 2"]); //lisättävän kysymyksen vaihtoehdot
    const [kysymyksenTyyppi, setKysymyksentyyppi] = React.useState(""); //textfield, radio blabla, bindaa vetovalikkoon
    const [uusiVaihtoehto, setUusivaihtoehto] = React.useState("asd");

    const classes = useStyles();



    function NykyinenKysymys() {
        return (

            <div>
                <ListaaVaihtoehdot />
            </div>

        )
    }

    const handleChange = (event) => {
        setKysymyksentyyppi(event.target.value);
    };


    const lisaaVaihtoehto = (event) => {
        console.log("ASD")
        setKysymyksenVaihtoehdot([...kysymyksenVaihtoehdot, uusiVaihtoehto]);
        setUusivaihtoehto("");
    };



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
        return (<div>

            <TextField id="standard-basic" label="Kysymys" />
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Kysymystyyppi</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={kysymyksenTyyppi}
                    onChange={handleChange}
                >

                    <MenuItem value={10}>Radio</MenuItem>
                    <MenuItem value={20}>Tekstikenttä</MenuItem>
                    <MenuItem value={30}>Skaala</MenuItem>
                    <MenuItem value={40}>Checkbox</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" >Tallenna kysymys</Button>
        </div>)
    }

    function Kysymykset() {
        return (
            kyselynKysymykset.map((kysymys, index) => {
                return (
                    <div>
                        {kysymys.kysymys} <Button variant="contained">Poista</Button>
                        <div> tähän childina vaihtoehdot</div>
                    </div>)
            })
        )
    }

    return (

        <div>
            <Vetovalikko />
            <br></br>
            <div>
                {/* bindaa tää textfield johonkin */}
                <TextField id="standard-basic" label="Uusi vaihtoehto" />
                <Button variant="contained" onClick={lisaaVaihtoehto}>Lisää uusi vaihtoehto</Button>
                </div>


            <NykyinenKysymys />

            <br></br>
            <br></br>

            __________________________________________________________
            <br></br>
            <Button variant="contained">Tallenna kysely</Button>
            <br></br>
             __________________________________________________________
            <br></br>

            {/* <Testi1 viesti="viestiteksti" /> */}
            <h1>Kyselyn kysymykset:</h1>
            <Kysymykset />

        </div>
    )
}