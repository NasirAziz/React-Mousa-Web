import React, { useState } from "react"
import { Button, TextField, Alert, AlertTitle } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import './App.css'
import AirTable from "./components/Table/AirTable";
import AcuityTable from "./components/Table/AcuityTable";
import TextlineTable from "./components/Table/TextlineTable";
import Appointment from "./pages/Appointment";


function App() {

  const [data, setData] = useState({ Airtable: [], Acuity: [], Textline: [] });
  const [err, setErr] = useState(false);
      const [age, setAge] = useState('');

  const Header = () => {

    const [phone, setPhone] = useState('');
    const handlePhoneChange = (e) => { setPhone(e.target.value) }
    const [isDisable, setIsDisable] = useState(false);
 

    const handleSubmitClick = async (e) => {
      setIsDisable(true);
      try {
        // change this string/text and press Ctrl + S to save the file and then press Ctrl + ` to open the terminal 3478131929
        const response = await fetch('https://hook.us1.make.com/der2itrt38fuk2rsmpclth7qohnaivj1?phone=' + phone.trim());

        if (!response.ok) {
          setErr(true)
        }

        response.json().then((value) => {
          if (value.Airtable.Date == undefined) {
            setErr(true)
            hideTables();
            return
          }
          setErr(false)
          setData(value);
          showTables();

        });

      } catch (err) {
        setErr(true);
      } finally {
        setIsDisable(false);
      }
    };

    const showTables = () => {
      document.getElementById("toShow").style.display = "block";
      document.getElementById("toShow1").style.display = "block";
      document.getElementById("toShow2").style.display = "block";
      document.getElementById("toShow3").style.display = "block";
      document.getElementById("toShow4").style.display = "block";
      document.getElementById("toShow5").style.display = "block";
      document.getElementById("toShow6").style.display = "block";
    }

    const hideTables = () => {
      document.getElementById("toShow").style.display = "none";
      document.getElementById("toShow1").style.display = "none";
      document.getElementById("toShow2").style.display = "none";
      document.getElementById("toShow3").style.display = "none";
      document.getElementById("toShow4").style.display = "none";
      document.getElementById("toShow5").style.display = "none";
      document.getElementById("toShow6").style.display = "none";

    }


    return (
      <>
        <TextField value={phone} onChange={handlePhoneChange} style={{ width: '90%' }} label="123-123-123" />
        <Button style={{ marginLeft: '1rem' }} className="App-Button" disabled={isDisable} variant="contained" onClick={handleSubmitClick}>Submit</Button>
      </>

    );
  }
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div >

      <div className="App-header">
        <h1 > Enter Phone No to Get Relevant Data </h1>           
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl>
      </div>
      <div className="App-search-container">
        <Header />
      </div>
      {err &&
        <Alert sx={{ width: '70%', margin: 'auto' }} severity="info">
          <AlertTitle>Such Empty</AlertTitle>
          Sorry, it seems this contact has no entries at Airtable, Acuity & Textline
        </Alert>
      }
      {<>
        <h2 id="toShow" className="toShow tb-header">ACUITY </h2>
        <div id="toShow1" className="tb-table-container toShow">
          <AcuityTable data={data.Acuity} />
        </div>

        <h2 id="toShow2" className="toShow tb-header">TEXT LINE </h2>
        <div id="toShow3" className="tb-table-container toShow">
          <TextlineTable data={data.Textline} />
        </div>

        <h2 id="toShow4" className="toShow tb-header">AIR-TABLE </h2>
        <div id="toShow5" className="tb-table-container toShow">
          <AirTable data={data.Airtable} />
        </div>
        <div id="toShow6" className="toShow">
          <Appointment />
        </div>
      </>}



    </div >
  )
}
export default App;
