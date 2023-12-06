import { Box, Button, Container, Divider, TextField, Typography } from "@mui/material"
import {Layout as DashboardLayout} from '../../layouts/layout'
import { useState } from "react";
import { create } from "../api/agendar/teams";
import { useRouter } from "next/router";



const Page = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const handleCreate = () => {
        create(name).then((response) => {
            router.push("/teams")
            sessionStorage['successMessage'] = 'Successfully created team'
        }).catch((error) => {

        })
    }
    return <Box>
                <Button color='inherit' variant="contained" onClick={() => {router.push('/teams')}}>Back</Button>
                <Divider sx={{m: 4}}/>
                <Typography variant="h6">Create a new Team</Typography>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box>
                        <TextField name='name' label={'Name'} onChange={(e) => {setName(e.target.value)}}/>
                    
                        <Button color='primary' variant="contained" onClick={handleCreate} sx={{marginLeft: 5}}>Create</Button>
                    </Box>
                </Box>
                
            </Box>
}

Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;