import React, { useState, useEffect } from "react"
import { Button, Alert, AlertTitle, } from '@mui/material';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { BounceLoader, CircleLoader } from "react-spinners";

import './App.css'
import Table from "./components/Table/React-Table";


function App() {

  const [data, setData] = useState({ Airtable: [], Acuity: [], Textline: [] });
  const [pastAp, setPastAp] = useState([]);
  const [futureAp, setFutureAp] = useState([]);
  const [err, setErr] = useState(false);
  const [isTableDataLoading, setIsTableDataLoading] = useState(false);


  let acuityState = JSON.parse(localStorage.getItem("Acuity"))
  const columnsAcuity = [

    {
      Header: 'First Name',
      accessor: 'First Name',
      Cell: ({ value }) => <p style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}>{value}</p>,
      width: Object.keys(acuityState).length !== 0 && acuityState["First Name"] ? acuityState["First Name"] : 150,



    },
    {
      Header: 'Last Name',
      accessor: 'Last Name',
      width: Object.keys(acuityState).length !== 0 && acuityState["Last Name"] ? acuityState["Last Name"] : 150,
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

  const AcuityFuture = () => {
    if (futureAp.length !== 0) {
      return (
        <>
          <h2 id="toShow0" className="tb-header">ACUITY Future Appointments</h2>
          <div id="toShow01" className="tb-table-container">
            <Table tableName={"Acuity"} columns={columnsAcuity} data={futureAp} />
          </div>
        </>
      )
    } else return (
      <h2 id="toShow00" className="tb-header">No Future Appointments</h2>
    )
  }
  const AcuityPast = () => {
    console.log(acuityState)

    console.log(Object.keys(acuityState).length)
    // console.log(localStorage.getItem("AcuityPast")["First Name"])
    if (pastAp.length !== 0) {
      return (
        <>
          <h2 id="toShow" className="tb-header">ACUITY Past Appointments</h2>
          <div id="toShow1" className="tb-table-container">
            <Table tableName={"Acuity"} columns={columnsAcuity} data={pastAp} />
          </div>
        </>
      )
    } else return (
      <h2 id="toShow00" className="tb-header">No Past Appointments</h2>
    )
  }
  const Textline = () => {
    if (data.Textline.length !== 0) {
      return (
        <>
          <h2 className="tb-header">TEXT LINE </h2>
          <div id="toShow3" className="tb-table-container">
            <Table tableName={"Textline"} data={data.Textline} columns={columnsTextLine} />
          </div>
        </>
      )
    } else return (
      <h2 id="toShow00" className="tb-header">No TEXT LINE Data</h2>
    )
  }

  const Airtable = () => {
    if (data.Textline.length !== 0) {
      return (
        <>
          <h2 id="toShow4" className="tb-header">AIR-TABLE </h2>
          <div id="toShow5" className="tb-table-container">
            <Table tableName={"AirTable"} data={data.Airtable} columns={columnsAirTable} />
          </div>
        </>
      )
    } else return (
      <h2 id="toShow00" className="tb-header">No Airtable Data</h2>
    )
  }

  return (
    <div >
      <div className="App-search-container">
        <Header setFutureAp={setFutureAp} setPastAp={setPastAp} setData={setData} setErr={setErr} setIsTableDataLoading={setIsTableDataLoading} />
      </div>
      {err &&
        <Alert sx={{ width: '70%', margin: 'auto' }} severity="info">
          <AlertTitle>Such Empty</AlertTitle>
          Sorry, it seems this contact has no entries at Airtable, Acuity & Textline
        </Alert>
      }
      {isTableDataLoading ? <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", margin: 150 }}>
        <CircleLoader color="#1574c7" />
      </div>
        : <>
          <div id="toShow" className="toShow">
            <AcuityFuture />
            <AcuityPast />
            <Textline />
            <Airtable />
            {/* <div id="toShow6" className="toShow">
          <Appointment />
        </div> */}
          </div>
        </>}
    </div >
  )


}


const Header = ({ setPastAp, setFutureAp, setData, setErr, setIsTableDataLoading }) => {
  const [suggestions, setSuggestions] = useState([])
  const [isDisable, setIsDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let phone1 = ""
  let email = ""

  // declare the data fetching function
  const fetchData = async () => {
    // debugger
    let arr = []
    const data = await fetch('https://mousa-web-api.herokuapp.com/textline')
    const data2 = await fetch('https://mousa-web-api.herokuapp.com/acuity')
    const data3 = await fetch('https://mousa-web-api.herokuapp.com/airtable')
    data.json().then((value) => {
      arr.push(...value)

    })

    data2.json().then((value) => {
      arr.push(...value)

    })
    data3.json().then((value) => {
      arr.push(...value)
      setSuggestions(arr)
      setIsLoading(false)
    })
  }
  useEffect(() => {
    // call the function
    fetchData().catch(console.error);
  }, [])

  function formatDate(string) {

    let date = new Date(string.substring(0, 10)).toLocaleDateString('en-US') + " "
    let time = new Date(string.substring(0, 10) + " " + string.substring(11, 18)).toLocaleTimeString('en-US', { hour12: true })

    return date + "\n" + time.substring(0, time.length - 6) + time.substring(time.length - 3, time.length);
  }

  const handleSubmitClick = async (e) => {

    phone1 = phone1.replace('(', "").replace(')', "").replace('+', "").replace(' ', "").replace('-', "").replace('-', "")
    setIsDisable(true);
    setIsTableDataLoading(true)
    try {

      // change this string/text and press Ctrl + S to save the file and then press Ctrl + ` to open the terminal 3478131929
      const response = await fetch(`https://hook.us1.make.com/der2itrt38fuk2rsmpclth7qohnaivj1?phone=${phone1}&email=${email}`);

      if (!response.ok) {
        setErr(true)
        hideTables();
        return
      }
      response.json().then((value) => {
        // debugger
        if (value.Airtable[0]["First Name"] === undefined && value.Acuity[0]["First Name"] === undefined) {
          setErr(true)
          hideTables();
          return
        }
        setErr(false)
        var Textlinelength = value.Textline.length;
        var Acuitylength = value.Acuity.length;
        var len = 0;
        let pastArray = []
        let futureArray = []
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

          if (i === len - 1) {
            setData(value);
          }
        }
        let todayDate = new Date()
        value.Acuity.map((v, index) => {

          let date = new Date(v.DateTime.split(" ")[0])
          if (date.getTime() < todayDate.getTime())
            pastArray.push(v)
          else
            futureArray.push(v)
        })

        setPastAp(pastArray)
        setFutureAp(futureArray)

        showTables();

      });

    } catch (err) {
      setErr(true);
    } finally {
      setIsDisable(false);
      setIsTableDataLoading(false)
    }
  };

  const showTables = () => {

    document.getElementById("toShow").style.display = "block";

  }

  const hideTables = () => {
    document.getElementById("toShow").style.display = "none";
  }
  const formatResult = (item) => {

    return (
      <div >
        <span style={{ display: 'block', fontWeight: "bold", textAlign: 'left' }}>{item.name}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.phone}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.email}</span>
      </div>
    )
  }
  const handleOnSelect = (item) => {

    phone1 = item.phone;
    email = item.email;
  }

  return (
    isLoading ? <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", margin: 150 }}>
      <BounceLoader color="#1574c7" />
    </div>
      : <div>
        <div className="App-header">
          <h1 style={{ textAlign: "center" }}> {"Please enter an email or phone number (digits only)"} </h1>
        </div>
        <div style={{ flexDirection: "row", display: "flex", flex: 1, }}>
          <div style={{ width: "80%", zIndex: 4, }}>

            <ReactSearchAutocomplete

              items={suggestions}
              fuseOptions={{
                keys: ["phone", "email"],
                minMatchCharLength: 3,
                includeScore: true,
                includeMatches: true,
                findAllMatches: true,
                threshold: 0.3,
                distance: 0
              }}
              resultStringKeyName="phone"
              maxResults="5"
              showItemsOnFocus={true}
              formatResult={formatResult}
              onSelect={handleOnSelect}
              placeholder="Phone or Email"
              styling={
                {
                  height: "50px",
                }
              }
            />
          </div>
          <Button style={{ marginLeft: "1vw" }} className="App-Button" disabled={isDisable} variant="contained" onClick={handleSubmitClick}>Submit</Button>
        </div>
      </div>

  );

}



export default App;