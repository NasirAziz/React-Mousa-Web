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

export default function AcuityTable({ data }) {

    function renderTableHeader() {
        const header2 = ['DateTime', 'Paid', 'Type', 'Email', 'Notes', 'Phone', 'Calendar', 'Location', 'First Name', 'LastName', 'Confirmation Page', 'Amount Paid in Car'];
        return header2.map((key, index) => {
            return <StyledTableCell>{key}</StyledTableCell>
        })

    }

    return (
        <TableContainer sx={{ height: 500 }} component={Paper}>
            <Table sx={{ minWidth: 700, height: "max-content" }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {renderTableHeader()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <StyledTableRow key={row.DateTime}>
                            <StyledTableCell component="th" scope="row">
                                {row.DateTime}
                            </StyledTableCell>
                            <StyledTableCell>{row.Paid}</StyledTableCell>
                            <StyledTableCell>{row.Type}</StyledTableCell>
                            <StyledTableCell>{row.Email}</StyledTableCell>
                            <StyledTableCell>{row.Notes}</StyledTableCell>
                            <StyledTableCell>{row.Phone}</StyledTableCell>
                            <StyledTableCell>{row.Calendar}</StyledTableCell>
                            <StyledTableCell>{row.Location}</StyledTableCell>
                            <StyledTableCell>{row['First Name']}</StyledTableCell>
                            <StyledTableCell>{row['Last Name']}</StyledTableCell>
                            <StyledTableCell>{row['Confirmation page']}</StyledTableCell>
                            <StyledTableCell>{row['Amount Paid in Car']}</StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
