import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

export default function Adminlogin(props) {


    React.useEffect(() => {
       // Testikutsu2();
        Testikutsu();
    }, [])


    function Testikutsu() {
        const formData = new FormData();
        formData.append('username', 'admi2n');
        formData.append('password', 'turvallinensalasana')
        try {
            fetch('http://localhost:8080/login', {
                //credentials: 'same-origin',
                credentials: 'include',
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: formData
            })
                .then(response => console.log(response))
                .then(response => response.json())
                .then(res => {
                    console.log(res)
                })
                .catch(err => console.log(err))

            // console.log(JSON.stringify(postattavaKysely));
        } catch (e) {
            console.log(e)
        }
        console.log("Ok?")
    }

    function Testikutsu2() {

        try {
            fetch('http://localhost:8080/rest/lainat', {
                //credentials: 'same-origin',
               // credentials: 'include',
                method: 'GET',
                //mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                // body: JSON.stringify({
                //     username: "admin",
                //     password: "turvallinensalasana",
                // })
            })
                //.then(response => console.log(response))
                .then(response => response.json())
                .then(res => {
                    if (res.success) {
                        console.log("jee")
                    }
                    else { console.log("ei jee") }
                    console.log(res)
                })
                .catch(err => console.log(err))

        } catch (e) {
            console.log(e)
        }
        console.log("Ok?")
    }

    return (
        <div>

        </div>
    )
}
