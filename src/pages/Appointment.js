import React, { useState, useEffect } from "react"
import { Button, TextField, TextareaAutosize } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import './Appointment.css'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#104a7c',
        color: theme.palette.common.white,
        border: '1px solid #e6eff5',

    },
    [`&.${tableCellClasses.body}`]: {
        // backgroundColor: 'white',
        fontSize: 14,
        border: '1px solid #e6eff5',
    },

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    // '&:last-child td, &:last-child th': {
    //     border: 0,
    // },
}));


export default function Appointment() {
    function renderTableHeader() {
        const header = ['First Name', 'Last Name', 'Date Time', 'Type', 'Location', 'Notes', 'Phone', 'Email', 'Paid', 'Amount Paid in Car', 'Calendar', 'Confirmation Page'];
        return header.map((key, index) => {
            return <StyledTableCell style={{ fontWeight: 'bold', fontSize: 18 }}>{key}</StyledTableCell>
        })

    }
    const handleClick = (e) => {
        setIsDisable(true);
        // setTimeout(() => {
        //     console.log("clicked")
        // }, 3000);
        try {
            // showTables();
        } catch (err) {
            // setErr(err.message);
        } finally {
            // setIsLoading(false);
            setIsDisable(false);

        }
    };

    const [SMS, setSMS] = useState('');
    const [FirstN, setFirstN] = useState('');
    const [LastN, setLastN] = useState('');
    const [DateTime, setDateTime] = useState('');
    const [Type, setType] = useState('');
    const [Location, setLocation] = useState('');
    const [Notes, setNotes] = useState('');
    const [Phone, setPhone] = useState('');
    const [Email, setEmail] = useState('');
    const [Paid, setPaid] = useState('');
    const [PaidInCar, setPaidInCar] = useState('');
    const [Calendar, setCalendar] = useState('');
    const [CPage, setCPage] = useState('');

    const [isDisable, setIsDisable] = useState(true);

    useEffect(() => {
        if (SMS.length <= 0) {
            setIsDisable(true);
        }
        else {
            setIsDisable(false);
        }
    }, [SMS]);

    return (

        < div className="Appointment_container Appointment_heading">
            <h2>Enter Details to send SMS</h2>
            <div>

                <TableContainer sx={{ height: 'auto' }} component={Paper}>
                    <Table stickyHeader sx={{ width: 'max-content', height: "max-content" }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {renderTableHeader()}
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row"> <TextField style={{ width: 150 }} multiline onChange={(e) => { setFirstN(e.target.value) }} label="First Name" /></StyledTableCell>
                                <StyledTableCell> <TextField style={{ width: 150 }} multiline onChange={(e) => { setLastN(e.target.value) }} label="Last Name" /></StyledTableCell>
                                <StyledTableCell >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            label="Date & Time"
                                            value={DateTime}
                                            onChange={(newValue) => {
                                                setDateTime(newValue);
                                            }}
                                            renderInput={(params) => <TextField style={{ width: 150 }} {...params} />}
                                        />
                                    </LocalizationProvider>
                                </StyledTableCell>
                                <StyledTableCell> <TextField style={{ width: 150 }} multiline onChange={(e) => { setType(e.target.value) }} label="Type" /></StyledTableCell>
                                <StyledTableCell> <TextField style={{ width: 120 }} multiline onChange={(e) => { setLocation(e.target.value) }} label="Location" /></StyledTableCell>
                                <StyledTableCell> <TextField style={{ width: 200 }} multiline onChange={(e) => { setNotes(e.target.value) }} label="Notes" /></StyledTableCell>
                                <StyledTableCell> <TextField style={{ width: 120 }} multiline onChange={(e) => { setPhone(e.target.value) }} label="Phone" /></StyledTableCell>
                                <StyledTableCell> <TextField style={{ width: 220 }} multiline onChange={(e) => { setEmail(e.target.value) }} label="Email" /></StyledTableCell>
                                <StyledTableCell> <TextField style={{ width: 80 }} multiline onChange={(e) => { setPaid(e.target.value) }} label="Paid" /></StyledTableCell>
                                <StyledTableCell style={{ width: 80 }} > <TextField multiline onChange={(e) => { setPaidInCar(e.target.value) }} label="Amount Paid in Car" /></StyledTableCell>
                                <StyledTableCell> <TextField style={{ width: 150 }} multiline onChange={(e) => { setCalendar(e.target.value) }} label="Calendar" /></StyledTableCell>
                                <StyledTableCell style={{ width: 850 }}> <TextField multiline fullWidth={true} onChange={(e) => { setCPage(e.target.value) }} label="Confirmation Page" /></StyledTableCell>

                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="Appointment-search-container">
                <TextareaAutosize minRows={3} style={{ margin: "1rem auto", width: '60%' }} onChange={(e) => {
                    setSMS(e.target.value)
                }} label="SMS" />

                <Button style={{ display: 'block', margin: "0rem auto" }} disabled={isDisable} variant="contained" onClick={handleClick}>Submit</Button>
            </div>

        </div >
    )
}
