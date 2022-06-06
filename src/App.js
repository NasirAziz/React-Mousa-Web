import React from "react"
import { useState } from 'react'
import { Button, TextField } from '@mui/material';


import './App.css'
import './styles/Api.css'
import AirTable from "./components/Table/AirTable";
import AcuityTable from "./components/Table/AcuityTable";
import TextlineTable from "./components/Table/TextlineTable";

function App() {
  const [data, setData] = useState({ Airtable: [], Acuity: [], Textline: [] });
  // const [isLoading, setIsLoading] = useState(false);
  // const [err, setErr] = useState('');
  const [phone, setPhone] = useState('929-423-3651');

  const handleClick = async () => {
    // setIsLoading(true);
    try {
      const response = await fetch('https://hook.us1.make.com/der2itrt38fuk2rsmpclth7qohnaivj1?phone=' + phone);

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.Acuity.map(item => item.id));

      setData(result);
      console.log(data.Acuity.map(item => item.id));
      showTables();
    } catch (err) {
      // setErr(err.message);
    } finally {
      // setIsLoading(false);
    }
  };


  const showTables = () => {
    document.getElementById("toShow").style.display = "block";
    document.getElementById("toShow1").style.display = "block";
    document.getElementById("toShow2").style.display = "block";
    document.getElementById("toShow3").style.display = "block";
    document.getElementById("toShow4").style.display = "block";
    document.getElementById("toShow5").style.display = "block";
  }

  return (
    <div >
      <div className="App-header">
        <h1> Enter Phone No to Get Relevant Data </h1>
      </div>
      <div className="App-search-container">
        <TextField onChange={(e) => { setPhone(e.target.value) }} style={{ width: '90%' }} label="Phone No" />

        <Button style={{ marginLeft: '1rem' }} className="App-Button" variant="contained" onClick={handleClick}>Submit</Button>
      </div>

      <h1 id="toShow" className="toShow tb-header">ACUITY </h1>
      <div id="toShow1" className="tb-table-container toShow">
        <AcuityTable data={data.Acuity} />
      </div>

      <h1 id="toShow2" className="toShow tb-header">TEXT LINE </h1>
      <div id="toShow3" className="tb-table-container toShow">
        <TextlineTable data={data.Textline} />
      </div>

      <h1 id="toShow4" className="toShow tb-header">AIR-TABLE </h1>
      <div id="toShow5" className="tb-table-container toShow">
        <AirTable data={data.Airtable} />
      </div>


    </div >
  )
}
export default App;
