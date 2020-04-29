import React from 'react';
// import React, { useState } from 'react'; //niin ei tarvis statessa käyttää React.usestate vaan usestate pelkästään
import 'react-table-v6/react-table.css'
import ReactTable from 'react-table-v6';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

export default function EditointiKompo() {

    const [open, setOpen] = React.useState(false);
    const [msg, setmsg] = React.useState('')

    const [kyselynKysymykset, setKyselynKysymykset] = React.useState([{ kysymys: "uusiKysymys", vaihtoehdot: ["123", "234", "tosipitkäteksti"], tyyppi: "Radio" }, { kysymys: "uusiKysymys", vaihtoehdot: ["123", "234", "tosipitkäteksti"], tyyppi: "Radio" }]); // Tähän listana kaikki kyselyyn tulevat kysymykset
    //const [kyselynKysymykset, setKyselynKysymykset] = React.useState([{ kysymys: "uusiKysymys", vaihtoehdot: ["123", "234", "tosipitkäteksti"], tyyppi: "Radio" }]); // Tähän listana kaikki kyselyyn tulevat kysymykset
    const [kyselynNimi, setKyselynnimi] = React.useState('je ejee kysssäri');
    const [kyselynID, setKyselynID] = React.useState("-1")
    const [, forceUpdate2] = React.useReducer(x => x + 1, 0);  // Tämä triggeraa rerenderin Buttonin OnClickissä koska siinä on nyt custombindi

    React.useEffect(() => {
        JaaninUseEffecti();
    }, [])

    function JaaninUseEffecti() {
        fetch('https://salenpalikatback.herokuapp.com/kyselyt', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(res => {
                console.log(res[0].kysymykset)
                setKyselynID(res[0].kysely_id)
                setKyselynKysymykset(res[0].kysymykset)
            })
            .catch(err => console.log(err))
    }



    function TallennaKysely() {

        console.log({ kyselynNimi }.kyselynNimi)
        //let kysNimi = {kyselynNimi}; 
        let postattavaKysely = { kysely_id: { kyselynID }.kyselynID, name: { kyselynNimi }.kyselynNimi, kysymykset: { kyselynKysymykset }.kyselynKysymykset }
        console.log(JSON.stringify(postattavaKysely))
        //return;

        try {
            fetch('https://salenpalikatback.herokuapp.com/kysely/'+{kyselynID}.kyselynID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(postattavaKysely)
            })
                .catch(err => console.error(err));
            setmsg("Vastaus lähetetty!");
            setOpen(true);
            //console.log(JSON.stringify(postattavaKysely));
        } catch (e) {
            setOpen(true);
            setmsg("Lähettäminen epäonnistui!");
            console.log(e)
        }
        //setValue();

    }

    const handleClose = () => {
        console.log("sulkeudu paska");
        setOpen(false);
    }
    //    <Button onClick={poistaVaihtoehto.bind(this, { index2 }.index2).bind(this, { index }.index)} color="default" startIcon={<RemoveIcon />} ></Button>
    function onChangeText(e, c) {
        let uusi = kyselynKysymykset;
        uusi[c.row.original.olio].vaihtoehdot[c.row.index] = { vaihtoehto: e.target.value };
        setKyselynKysymykset(uusi);
        forceUpdate2();
    }

    function PoistaVaihtoehto(row) {
        let temp = { kyselynKysymykset }.kyselynKysymykset;
        temp[row.row.original.olio].vaihtoehdot.splice(row.row.index, 1);
        setKyselynKysymykset(temp);
        forceUpdate2();
    }

    function PoistaKysymys(e) {
        let temp = { kyselynKysymykset }.kyselynKysymykset;
        temp.splice(e, 1);
        setKyselynKysymykset(temp);
        forceUpdate2();

    }

    function VaihdaKysymyksenTyyppi(e,row)
    {
        let temp = { kyselynKysymykset }.kyselynKysymykset
        temp[row].tyyppi = e.target.value;
        forceUpdate2();

    }

    function VaihdaKysymyksenNimi(e, row) {
        let temp = { kyselynKysymykset }.kyselynKysymykset
        temp[row].kysymys = e.target.value;
        forceUpdate2();
    }

    function LisaaVaihtoehto(row) {
        let temp = { kyselynKysymykset }.kyselynKysymykset;
        temp[row].vaihtoehdot.push({ vaihtoehto: "" })
        setKyselynKysymykset(temp);
        console.log(temp[row].vaihtoehdot)
        forceUpdate2();
        console.log("hei")
    }

    function LisaaKysymys() {
        setKyselynKysymykset([...kyselynKysymykset, { kysymys: "", vaihtoehdot: [{ vaihtoehto: "" }], tyyppi: "Radio" }])
    }


    return (
        <div>

            <br></br>
            <Button variant="contained" onClick={TallennaKysely}>Tallenna Kysely</Button>
            <RenderaaKysymys key="lol" onChangeText={onChangeText} kyselynKysymykset={kyselynKysymykset} PoistaVaihtoehto={PoistaVaihtoehto} VaihdaKysymyksenNimi={VaihdaKysymyksenNimi} LisaaVaihtoehto={LisaaVaihtoehto} PoistaKysymys={PoistaKysymys} VaihdaKysymyksenTyyppi={VaihdaKysymyksenTyyppi} />
            <Button variant="contained" onClick={LisaaKysymys}>Lisää kysymys</Button>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
            />
        </div>
    )
}

// ########################

function RenderaaKysymys(props) {

    const [pyh, setPyh] = React.useState(0);
    const [, forceUpdate2] = React.useReducer(x => x + 1, 0);  // Tämä triggeraa rerenderin Buttonin OnClickissä koska siinä on nyt custombindi

    function Vammailua(e) {
        console.log("asdasd")
        console.log(e)
        props.LisaaVaihtoehto(e)
        forceUpdate2();
    }

    const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 220,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();


    const columns = [

        {
            Cell: row => (
                <TextField
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    // onChangeText={text => onChangeText(text)}
                    onChange={b => props.onChangeText(b, { row })} //tää lisää nyt  uuden parametrin, toinen ja ehkä fiksumpi tapa?
                    value={row.original.vaihtoehto.vaihtoehto}
                    key={row.index}
                />)
        },

        {
            width: 100,
            Cell: row => (
                <Button onClick={() => props.PoistaVaihtoehto({ row })} color="secondary" size="small" >Poista</Button>)
        }
    ]

    function vetovaihto(e,i) {
        console.log(e.target.value)
        console.log(i)
        props.VaihdaKysymyksenTyyppi(e,i)
    }



    return (
        props.kyselynKysymykset.map((kys, index) => {
            let tempdata = Array();
            console.log(kys.tyyppi)
            kys.vaihtoehdot.map((loope, index2) => {
                tempdata.push({ olio: { index }.index, vaihtoehto: { loope }.loope })
            })

            return (
                <div style={{ margin: 100 }}>
                    <div>
                        <TextField
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChange={b => props.VaihdaKysymyksenNimi(b, { index }.index)}
                            label="Kysymys"
                            value={kys.kysymys}
                        />

                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-filled-label">Kysymystyyppi</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={kys.tyyppi}
                                onChange={b => vetovaihto(b, {index}.index)}
                            >
                                <MenuItem selected value="Radio">Radio</MenuItem>
                                <MenuItem value="Teksti">Tekstikenttä</MenuItem>
                                <MenuItem value="Skaala">Skaala</MenuItem>
                                <MenuItem selected value="Monivalinta">Monivalinta</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ width: 400, display: "inline-block" }}>
                        <ReactTable key={index} data={tempdata} columns={columns}
                            //defaultPageSize={kys.vaihtoehdot.length} 
                            defaultPageSize={5}
                            filterable={false} showPageSizeOptions={false} showPagination={false} />
                        <div>
                            <Button variant="contained" color="primary" size="small" onClick={() => Vammailua({ index }.index)}  >Lisää vaihtoehto </Button>
                            <Button variant="contained" color="secondary" size="small" onClick={() => props.PoistaKysymys({ index }.index)}>Poista kysymys </Button>

                        </div>
                    </div>
                </div>

            )
        })

    )

}