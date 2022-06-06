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
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function AirTable({ data }) {

    function renderTableHeader() {
        let header = ['First Name', 'Last Name', 'Tier', 'Notes', 'Phone Number', 'Time', 'Date', 'Date of Birth', 'Notification Status', 'Permit Number', 'Booking Status', 'Will you be needing one of our cars to take you to your test'];
        return header.map((key, index) => {
            return <StyledTableCell>{key}</StyledTableCell>
        })

    }

    return (
        <TableContainer sx={{ height: 500 }} component={Paper}>
            <Table sx={{ minWidth: 700, height: 'max-content' }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {renderTableHeader()}
                    </TableRow>
                </TableHead>
                <TableBody>

                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {data["Booking Status"]}
                        </StyledTableCell>
                        <StyledTableCell >{data["First Name"]}</StyledTableCell>
                        <StyledTableCell >{data["Last Name"]}</StyledTableCell>
                        <StyledTableCell >{data["Test Date"]}</StyledTableCell>
                        <StyledTableCell >{data["Notes"]}</StyledTableCell>
                        <StyledTableCell >{data["Tier"]}</StyledTableCell>
                        <StyledTableCell >{data["Phone Number"]}</StyledTableCell>
                        <StyledTableCell >{data["Test Time"]}</StyledTableCell>
                        <StyledTableCell >{data["Date of Birth"]}</StyledTableCell>
                        <StyledTableCell >{data["Notification Status"]}</StyledTableCell>
                        <StyledTableCell >{data["Permit Number"]}</StyledTableCell>
                        <StyledTableCell >{data["Will you be needing one of our cars to take you to your test"]}</StyledTableCell>


                    </StyledTableRow>

                </TableBody>
            </Table>
        </TableContainer>
    );
}
