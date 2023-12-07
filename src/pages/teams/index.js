import { Box, Button, Divider } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Layout as DashboardLayout} from '../../layouts/layout'
import { useState, useEffect } from "react";
import { index, destroy } from "../../api/agendar/teams";
import {  useRouter } from "next/router";
import { toast } from 'react-toastify';


const Page = () => {
    const [teams, setTeams] = useState([])
    const router = useRouter()

    useEffect(() => {
        index().then((response) => {
            setTeams(response.data)
        })
    }, [])

    const handleDelete = (r) => {
        destroy(r.id).then((response) => {
            toast.success('Successfully deleted team')
            setTeams(teams.filter(t => t.id !== r.id))
        }).catch((error) => {
            sessionStorage['errorMessage'] = 'Something went wrong'
            router.push('/teams')
        })
        
    }
    return <Box>
                <Button variant="contained" color='primary' onClick={() => {router.push("/teams/new")}}>Add Team</Button>
                <Divider sx={{m: 4}}/>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right"># of Users</TableCell>
                            <TableCell align="right"># of Requests</TableCell>
                            <TableCell colSpan={2}></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {teams.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Button color='inherit' variant='contained' onClick={() => router.push(`/teams/${row.id}/`)}>
                                            {row.name}
                                        </Button>
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="right">
                                        {row.users}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="right">
                                        {row.requests}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button color='secondary' variant='contained' onClick={() => router.push(`/teams/${row.id}/edit`)}>Configure</Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button color='error' variant='contained' onClick={() => handleDelete(row)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
}

Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;