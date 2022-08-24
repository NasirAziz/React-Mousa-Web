import React, { useState ,useEffect} from "react"
import { Button, TextField, Alert, AlertTitle, Autocomplete, createFilterOptions, Box } from '@mui/material';
import AutoCompleteVirtualize from "./components/AutoComplete";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import './App.css'
import Appointment from "./pages/Appointment";
import Table from "./components/Table/React-Table";


function App() {
 
  // const [suggestions, setSuggestions] = useState([]);

  // const getSuggestions = async () => {

  //   const options2 = await fetch(`https://mousa-web-api.herokuapp.com/`)
  //   if (options2.ok) {
  //     options2.json().then((value) => {
  //       setSuggestions(value)
  //       console.log(suggestions.length)
  //     })
  //   }
  // }

  // React.useEffect(() => { getSuggestions() }, [])

  // getSuggestions()


  const [data, setData] = useState({ Airtable: [], Acuity: [], Textline: [] });
  const [err, setErr] = useState(false);
  const [phone,setPhone] = useState('')

  const Header = () => {
    const [suggestions, setSuggestions] = useState([])
    let phoneOrEmail = "";
    let phone1 = ""
    // let suggestions = [];
    const [isDisable, setIsDisable] = useState(false);

    const getSuggestions = async (phone) => {
      debugger;
      const options2 = await fetch(`https://mousa-web-api.herokuapp.com/suggest?key=${phone}`)
      if (options2.ok) {

        options2.json().then((value) => {
          setSuggestions(value)
        })
      }
    }
    useEffect(() => {
      // declare the data fetching function
      const fetchData = async () => {
        const data = await fetch('https://mousa-web-api.herokuapp.com/');
        data.json().then((value) => {
          setSuggestions(value)
        })
      }
    
      // call the function
      fetchData()
        
        .catch(console.error);
    }, [])

    const handlePhoneChange = (e) => {
      debugger;
      phoneOrEmail = e.target.value

      if (e.target.value.length > 0)
        getSuggestions(phoneOrEmail)

    }
    const handlePhoneChange2 = (e, v) => {
      phoneOrEmail = v.phone
    }

    function formatDate(string) {

      let date = new Date(string.substring(0, 10)).toLocaleDateString('en-US') + " "
      let time = new Date(string.substring(0, 10) + " " + string.substring(11, 18)).toLocaleTimeString('en-US', { hour12: true })

      return date + "\n" + time.substring(0, time.length - 6) + time.substring(time.length - 3, time.length);
    }

    const handleSubmitClick = async (e) => {

      phoneOrEmail = phone1.replace('(', "").replace(')', "").replace('+', "").replace(' ', "").replace('-', "").replace('-', "")

      setIsDisable(true);
      try {
        debugger;
        // change this string/text and press Ctrl + S to save the file and then press Ctrl + ` to open the terminal 3478131929
        const response = await fetch('https://hook.us1.make.com/der2itrt38fuk2rsmpclth7qohnaivj1?phone=' + phoneOrEmail.trim());

        if (!response.ok) {
          setErr(true)
          hideTables();
          return
        }
        response.json().then((value) => {
          if (value.Airtable[0].Date == undefined) {

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
    const formatResult = (item) => {
      return (
        <>
          <span style={{ display: 'block', textAlign: 'left' }}>{item.first_name}</span>
          <span style={{ display: 'block', textAlign: 'left' }}>{item.last_name}</span>
          <span style={{ display: 'block', textAlign: 'left' }}>{item.phone}</span>
        </>
      )
    }
    const handleOnSelect = (item) => {
      debugger;
      phone1 = item.phone;
    }

    return (
      <>
        {/* <AutoCompleteVirtualize phoneOrEmail={phoneOrEmail} options={suggestions} onChange2={handlePhoneChange2} onChange={handlePhoneChange} /> */}
        <div style={{ width: 400 }}>
           <ReactSearchAutocomplete
            items={suggestions}
            fuseOptions={{ keys: ["first_name", "last_name","phone","email"] }}
            resultStringKeyName="first_name"
            maxResults = "8"
            formatResult={formatResult}
            onSelect={handleOnSelect}
          
          /></div>
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
          <Table tableName={"AirTable"} data={data.Airtable} columns={columnsAirTable} />
        </div>
        {/* <div id="toShow6" className="toShow">
          <Appointment />
        </div> */}
      </>}

    </div >
  )
}

const columnsAcuity = [

  {
    Header: 'First Name',
    accessor: 'First Name',
    Cell: ({ value }) => <p style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}>{value}</p>


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
  {
    id: 'appointment_link',
    Header: 'Appointment Link',
    accessor: 'appointment_link',
  },

]

const columnsTextLine = [

  {
    Header: 'Name',
    accessor: 'Name',
    width: 15,
    Cell: ({ value }) => <p style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}>{value}</p>

  },
  {
    Header: 'Message',
    accessor: 'Message',
    width: 100,
  },
  {
    Header: 'Timestamp',
    accessor: 'Timestamp',
    width: 20,
  },
  {
    id: 'conversation_link',
    Header: 'conversation_link',
    accessor: 'conversation_link',
    width: 20,
  }

]

const columnsAirTable = [

  {
    Header: ' First Name',
    accessor: 'First Name',
    Cell: ({ value }) => <p style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}>{value}</p>
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
  {
    id: "airtable_link",
    Header: 'Airtable link',
    accessor: 'airtable_link',
    show: false
  },

]

export default App;