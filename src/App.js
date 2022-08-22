
import React, { useState } from "react"
import { Button, TextField, Alert, AlertTitle, Autocomplete, Box } from '@mui/material';

import './App.css'
import Appointment from "./pages/Appointment";
import Table from "./components/Table/React-Table";


function App() {

  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async () => {

    const options2 = await fetch('http://localhost:3001')
    if (options2.ok) {
      options2.json().then((value) => {
        setSuggestions([...value])
        console.log(suggestions)
      })
    }
  }

  React.useEffect(() => { getSuggestions() }, [])

  // getSuggestions()


  const [data, setData] = useState({ Airtable: [], Acuity: [], Textline: [] });
  const [err, setErr] = useState(false);
  const [array, setArray] = useState([]);
  const Header = () => {

    const [phoneOrEmail, setPhoneOrEmail] = useState('');
    const handlePhoneChange = (e) => { setPhoneOrEmail(e.target.value) }
    const [isDisable, setIsDisable] = useState(false);

    function formatDate(string) {

      let date = new Date(string.substring(0, 10)).toLocaleDateString('en-US') + " "
      let time = new Date(string.substring(0, 10) + " " + string.substring(11, 18)).toLocaleTimeString('en-US', { hour12: true })

      return date + "\n" + time.substring(0, time.length - 6) + time.substring(time.length - 3, time.length);
    }

    const handleSubmitClick = async (e) => {

      console.log("Phone " + phoneOrEmail)
      setIsDisable(true);
      try {
        // change this string/text and press Ctrl + S to save the file and then press Ctrl + ` to open the terminal 3478131929
        const response = await fetch('https://hook.us1.make.com/der2itrt38fuk2rsmpclth7qohnaivj1?phone=' + phoneOrEmail.trim());

        if (!response.ok) {
          setErr(true)
        }

        response.json().then((value) => {
          if (value.Airtable.Date == undefined && value.Acuity[0].Phone == undefined && value.Textline[0].Name == undefined) {
            setErr(true)
            hideTables();
            return
          }
          setErr(false)
          var Textlinelength = value.Textline.length;
          var Acuitylength = value.Acuity.length;
          var len = 0;
          if (Textlinelength > Acuitylength) {
            len = Textlinelength;
          }
          else {
            len = Acuitylength;
          }
          for (var i = 0; i < len; i++) {
            if (i < Textlinelength) {
              value.Textline[i].Timestamp = formatDate(value.Textline[i].Timestamp);
            }
            if (i < Acuitylength) {
              value.Acuity[i].DateTime = formatDate(value.Acuity[i].DateTime);
            }

            if (i == len - 1) {
              setArray([...array, value.Airtable]);

              setData(value);
            }
          }

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
        <Autocomplete
          id="country-select-demo"
          sx={{ width: "80%" }}
          options={suggestions}
          autoHighlight
          getOptionLabel={(option) => {
            // option.phone.replace('(',"").replace(')', "").replace('-', "")
            setPhoneOrEmail(option.phone.replace('(', "").replace(')', "").replace('-', "").replace(' ', "").replace('+', ""))
            return option.phone
          }}
          // isOptionEqualToValue={(option, value) => {
          //   console.log(option.phone === value.phone)
          //   console.log(value.phone)
          // }}
          renderOption={(props, option) => (
            <Box style={{ flexDirection: "column" }} component="li" key={option.phone} {...props}>
              <h2>{option.first_name + " " + option.last_name}</h2>
              {/* <br></br> */}
              <h3> {option.email} </h3>
              {/* <br></br> */}
              <h4> {option.phone}</h4>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              value={phoneOrEmail}
              onChange={handlePhoneChange}
              label="Email or Phone"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
        <Button style={{ marginLeft: '1rem' }} className="App-Button" disabled={isDisable} variant="contained" onClick={handleSubmitClick}>Submit</Button>
      </>

    );

  }

  return (
    <div >

      <div className="App-header">
        <h1 > {"Please enter an email or phone number (digits only)"} </h1>
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
          <Table tableName={"Acuity"} columns={columnsAcuity} data={data.Acuity} />
        </div>

        <h2 id="toShow2" className="toShow tb-header">TEXT LINE </h2>
        <div id="toShow3" className="tb-table-container toShow">
          <Table tableName={"Textline"} data={data.Textline} columns={columnsTextLine} />
        </div>

        <h2 id="toShow4" className="toShow tb-header">AIR-TABLE </h2>
        <div id="toShow5" className="tb-table-container toShow">
          <Table tableName={"AirTable"} data={array} columns={columnsAirTable} />
        </div>
        <div id="toShow6" className="toShow">
          <Appointment />
        </div>
      </>}

    </div >
  )
}

const columnsAcuity = [

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
    accessor: 'DateTime',
  }, {
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
  }, {
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
  }, {
    Header: 'Calendar',
    accessor: 'Calendar',
  },
  {
    Header: 'Confirmation Page',
    accessor: 'Confirmation page',
  },

]

const columnsTextLine = [

  {
    Header: 'Name',
    accessor: 'Name',
    width: 15,
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

]

const columnsAirTable = [

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
  }, {
    Header: 'Date Of Birth',
    accessor: 'Date Of Birth',
  },

]

export default App;
