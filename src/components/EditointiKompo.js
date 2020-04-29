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

// import Addcustomer from './Addcustomer';
// import Editcustomer from './Editcustomer';

export default function EditointiKompo() {
    const [customers, setCustomers] = React.useState([]);
    const [trainings, setTrainings] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setmsg] = React.useState('')

    const [kyselynKysymykset, setKyselynKysymykset] = React.useState([{ kysymys: "uusiKysymys", vaihtoehdot: ["123", "234", "tosipitkäteksti"], tyyppi: "Radio" }]); // Tähän listana kaikki kyselyyn tulevat kysymykset
    const [kyselynNimi, setKyselynnimi] = React.useState('je ejee kysssäri');


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






    const handleClose = () => {
        console.log("sulkeudu paska");
        setOpen(false);
    }

    const columns = [

        {
            // Header: 'Mikä on lempivärisi',
            Cell: row => (
                <TextField
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                   // onChangeText={text => onChangeText(text)}
                    onChange={b => onChangeText(b,{row},{columns})} //tää lisää nyt  uuden parametrin, toinen ja ehkä fiksumpi tapa?
                    value={row.original}
                />)
               // console.log(row.original)
        },

        {
            width: 100,
            Cell: row => (
                <Button color="secondary" size="small" >Poista</Button>)
        }
    ]

//    <Button onClick={poistaVaihtoehto.bind(this, { index2 }.index2).bind(this, { index }.index)} color="default" startIcon={<RemoveIcon />} ></Button>


    function onChangeText(e,c,t) {
        console.log(e)
        console.log(e.target.value)
        console.log(c)
        console.log(t)
    }

    function MuokkaaKysymysta()
    {

    }
    function RenderaaKysymys() {
        return (
            kyselynKysymykset.map((kys, index) => {
                return (
                    <div>
                        <div>
                            <TextField
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                //onChangeText={text => onChangeText(text)}
                                label="Kysymys"
                                value={kys.kysymys}
                            />

                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-filled-label">Kysymystyyppi</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                //value={kysymyksenTyyppi}
                                //onChange={handleChangeKysymykysenTyyppi}
                                >
                                    <MenuItem selected value={10}>Radio</MenuItem>
                                    <MenuItem value={20}>Tekstikenttä</MenuItem>
                                    <MenuItem value={30}>Skaala</MenuItem>
                                    <MenuItem selected value={40}>Monivalinta</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{ width: 400, display: "inline-block" }}>
                            <ReactTable  key={index} data={kys.vaihtoehdot} columns={columns} defaultPageSize={kys.vaihtoehdot.length} filterable={false} showPageSizeOptions={false} showPagination={false} />
                            <div>
                                <Button color="primary" size="large" >Lisää vaihtoehto </Button>
                                <Button color="secondary" size="small" >Poista kysymys </Button>

                            </div>
                        </div>
                    </div>

                )
            })

        )

    }

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <RenderaaKysymys />
            {/* <Addcustomer addCustomer={addCustomer} /> */}

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}

            />

        </div>
    )
}