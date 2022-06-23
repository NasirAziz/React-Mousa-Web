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

export default function AirTable({ data }) {
    //Airtable
    //First Name - Last Name - Date - Tier - Booking Status - Phone Number - Test Date - Test Time - Notification Status - Notes - Will you be needing one of our cars to take you to your test - Permit Number - Date of Birth
    //
    function renderTableHeader() {
        let header = ['First Name', 'Last Name', 'Date', 'Tier', 'Booking Status', 'Phone Number', 'Test Date', 'Test Time', 'Test Location', 'Notification Status', 'Notes', 'Will you be needing one of our cars to take you to your test', 'Permit Number', 'Date of Birth'];
        return header.map((key, index) => {
            return <StyledTableCell style={{ fontWeight: 'bold', fontSize: 18 }} >{key}</StyledTableCell>
        })

    }

    return (
        <TableContainer sx={{ height: 'auto', overflowX: 'auto' }} component={Paper}>
            <Table stickyHeader sx={{ width: 'max-content', height: 'max-content' }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {renderTableHeader()}
                    </TableRow>
                </TableHead>
                <TableBody style={{ backgroundColor: "#e6eff5" }}>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {data["First Name"]}
                        </StyledTableCell>
                        <StyledTableCell >{data["Last Name"]}</StyledTableCell>
                        <StyledTableCell >{data["Date"]}</StyledTableCell>
                        <StyledTableCell style={{ width: 100 }} >{data["Tier"]}</StyledTableCell>
                        <StyledTableCell >{data["Booking Status"]}</StyledTableCell>
                        <StyledTableCell >{data["Phone Number"]}</StyledTableCell>
                        <StyledTableCell >{data["Test Date"]}</StyledTableCell>
                        <StyledTableCell >{data["Test Time"]}</StyledTableCell>
                        <StyledTableCell >{data["Test Location"]}</StyledTableCell>
                        <StyledTableCell >{data["Notification Status"]}</StyledTableCell>
                        <StyledTableCell style={{ width: 400 }}>{data["Notes"]}</StyledTableCell>
                        <StyledTableCell >{data["Will you be needing one of our cars to take you to your test"]}</StyledTableCell>
                        <StyledTableCell >{data["Permit Number"]}</StyledTableCell>
                        <StyledTableCell >{data["Date of Birth"]}</StyledTableCell>


                    </StyledTableRow>

                </TableBody>
            </Table>
        </TableContainer>
    );
}
