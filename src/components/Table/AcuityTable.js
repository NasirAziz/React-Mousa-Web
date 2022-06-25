import * as React from 'react';
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


export default function AcuityTable({ data }) {

    //Acuity fields(respectively)(same order)
    //First Name Last Name Date Time Location Notes Phone Email Paid in Car Type Calendar Certificate Confirmation page 'Email', 'Paid', 'Amount Paid in Car',
    function renderTableHeader() {
        const header = ['First Name', 'Last Name', 'Date Time', 'Type', 'Location', 'Notes', 'Phone', 'Email', 'Amount Paid in Car', 'Calendar', 'Confirmation Page'];
        return header.map((key, index) => {
            return <StyledTableCell style={{ fontWeight: 'bold', fontSize: 18 }} >{key}</StyledTableCell>
        })

    }

    function formatDate(string) {
        //var options = { year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date(string.substring(0, 10)).toLocaleDateString('en-US') + " "
        let time = new Date(string.substring(0, 10) + " " + string.substring(11, 18)).toLocaleTimeString('en-US', { hour12: true })
        console.log("Acuity Table " + string)
        // console.log(date + "\n" + time.substring(0, time.length - 6) + time.substring(time.length - 3, time.length))
        return date + time.substring(0, time.length - 6) + time.substring(time.length - 3, time.length);
    }

    return (
        <TableContainer sx={{ height: 'auto' }} component={Paper}>
            <Table stickyHeader sx={{ width: 'max-content', height: "max-content" }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {renderTableHeader()}
                    </TableRow>
                </TableHead>
                {data.map((row, index) => (
                    <TableBody style={index % 2 == 0 ? { backgroundColor: "#e6eff5" } : { backgroundColor: "#fff" }} >
                        <StyledTableRow key={row.DateTime}>
                            <StyledTableCell component="th" scope="row">{row['First Name']}</StyledTableCell>
                            <StyledTableCell>{row['Last Name']}</StyledTableCell>
                            <StyledTableCell >{formatDate(row.DateTime)}</StyledTableCell>
                            <StyledTableCell>{row.Type}</StyledTableCell>
                            <StyledTableCell>{row.Location}</StyledTableCell>
                            <StyledTableCell style={{ width: 200 }}>{row.Notes}</StyledTableCell>
                            <StyledTableCell>{row.Phone}</StyledTableCell>
                            <StyledTableCell>{row.Email}</StyledTableCell>
                            <StyledTableCell style={{ width: 50 }} >{row['Amount Paid in Car']}</StyledTableCell>
                            <StyledTableCell>{row.Calendar}</StyledTableCell>
                            <StyledTableCell>{row['Confirmation page']}</StyledTableCell>

                        </StyledTableRow>
                    </TableBody>
                ))}
            </Table>
        </TableContainer>
    );
}
