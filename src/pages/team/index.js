import { Box } from "@mui/material"
import LoggedInNavigation from '@/components/navigation/LoggedInNavigation'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getRandomDate, formatAsMMDDYYYY } from "@/helpers/time";


function createData(name, age, nextShift) {
  return { name, age,  nextShift };
}

const date = getRandomDate();

const rows = [
  createData('Mike Aronian', 27, new Date('1/13/2023')),
  createData('Danny Shelding', 31, new Date('12/5/2023')),
  createData('Billy Williams', 34, new Date('12/16/2023')),
  createData('Scott Aronian', 29, new Date('1/5/2023')),
  createData('William Liver', 31, new Date('1/30/2023')),
];

export default () => {
    return <Box>
                <LoggedInNavigation>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Next Shift</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" >
                                        {row.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="right">
                                        {row.age}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="right">
                                        {formatAsMMDDYYYY(row.nextShift)}
                                    </TableCell>
                                </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </LoggedInNavigation>
            </Box>
}