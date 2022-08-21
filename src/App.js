
import React, { useState } from "react"
import { Button, TextField, Alert, AlertTitle } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './App.css'
import Appointment from "./pages/Appointment";
import Table from "./components/Table/React-Table";


function App() {
    const columnsTextLine = React.useMemo(
    () => [

          {
            Header: 'Name',
            accessor: 'Name',
            width: 50,
          },
          {
            Header: 'Message',
            accessor: 'Message',
            width: 150,
          },
          {
            Header: 'Timestamp',
            accessor: 'Timestamp',
            width: 100,
          },

    ],
    []
  )
      const columnsAcuity = React.useMemo(
    () => [

          {
            Header: 'First Name',
            accessor: 'First Name',
          },
          {
            Header: 'Last Name',
            accessor: 'Last Name',
          },
          {
            Header: 'Date Time',
            accessor: 'Date Time',
          },          {
            Header: 'Type',
            accessor: 'Type',
          },
          {
            Header: 'Location',
            accessor: 'Location',
          },
          {
            Header: 'Notes',
            accessor: 'Notes',
          },          {
            Header: 'Phone',
            accessor: 'Phone',
          },
          {
            Header: 'Email',
            accessor: 'Email',
          },
          {
            Header: 'Amount Paid in Car',
            accessor: 'Amount Paid in Car',
          },          {
            Header: 'Calendar',
            accessor: 'Calendar',
          },
          {
            Header: 'Confirmation Page',
            accessor: 'Confirmation Page',
          },


    ],
    []
  )
      const columnsAirTable = React.useMemo(
    () => [

          {
            Header: 'First Name',
            accessor: 'First Name',
          },
          {
            Header: 'Last Name',
            accessor: 'Last Name',
          },
          {
            Header: 'Date',
            accessor: 'Date',
          },          
          {
            Header: 'Tier',
            accessor: 'Tier',
          },
          {
            Header: 'Booking Status',
            accessor: 'Booking Status',
          },
          {
            Header: 'Phone Number',
            accessor: 'Phone Number',
          },          
          {
            Header: 'Test Date',
            accessor: 'Test Date',
          },
          {
            Header: 'Test Time',
            accessor: 'Test Time',
          },
          {
            Header: 'Test Location',
            accessor: 'Test Location',
          },          
          {
            Header: 'Notification Status',
            accessor: 'Notification Status',
          },
          {
            Header: 'Notes',
            accessor: 'Notes',
          },
          {
            Header: 'Will you be needing one of our cars to take you to your test',
            accessor: 'Will you be needing one of our cars to take you to your test',
          },          
          {
            Header: 'Permit Number',
            accessor: 'Permit Number',
          },          {
            Header: 'Date Of Birth',
            accessor: 'Date Of Birth',
          },

    ],
    []
  )

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
          <Table tableName={"Acuity"} data={data.Acuity} columns={columnsAcuity} />
        </div>

        <h2 id="toShow2" className="toShow tb-header">TEXT LINE </h2>
        <div id="toShow3" className="tb-table-container toShow">
          <Table tableName={"TextLine"} data={data.Textline} columns={columnsTextLine} />
        </div>

        <h2 id="toShow4" className="toShow tb-header">AIR-TABLE </h2>
        <div id="toShow5" className="tb-table-container toShow">
          {/* <Table data={data.Airtable} columns={columnsAirTable} /> */}
        </div>
        <div id="toShow6" className="toShow">
          <Appointment />
        </div>
      </>}

    </div >
  )
}
export default App;
