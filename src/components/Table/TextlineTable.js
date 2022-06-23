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

export default function TextlineTable({ data }) {

    function renderTableHeader() {
        const header2 = ['Name', 'Message', 'Timestamp'];
        return header2.map((key, index) => {
            return <StyledTableCell style={{ fontWeight: 'bold', fontSize: 18 }} >{key}</StyledTableCell>
        })

    }

    function formatDate(string) {
        //var options = { year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date(string.substring(0, 10)).toLocaleDateString('en-US') + " "
        let time = new Date(string.substring(0, 10) + " " + string.substring(11, 18)).toLocaleTimeString('en-US', { hour12: true })
        // console.log("TextLine " + string)

        // console.log(date + "\n" + time.substring(0, time.length - 6) + time.substring(time.length - 3, time.length))
        return date + "\n" + time.substring(0, time.length - 6) + time.substring(time.length - 3, time.length);
    }

    return (
        <TableContainer sx={{ height: 500 }} component={Paper}>
            <Table stickyHeader sx={{ minWidth: 700, height: "max-content" }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {renderTableHeader()}
                    </TableRow>
                </TableHead>
                {data.map((row, index) => (
                    <TableBody style={index % 2 == 0 ? { backgroundColor: "#e6eff5" } : { backgroundColor: "#fff" }}>
                        <StyledTableRow key={row.Timestamp}>
                            <StyledTableCell component="th" scope="row">{row.Name}</StyledTableCell>
                            <StyledTableCell>{row.Message}</StyledTableCell>
                            <StyledTableCell sx={{ width: 80 }}>{formatDate(row.Timestamp)}</StyledTableCell>

                        </StyledTableRow>
                    </TableBody>
                ))}
            </Table>
        </TableContainer>
    );
}
