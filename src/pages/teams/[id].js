import { Box, Button,  Divider, Tabs, Tab,Typography } from "@mui/material"
import {Layout as DashboardLayout} from '../../layouts/layout'
import { useState } from "react";
import {Users, Requests, Settings} from '../../sections/teams/'
import { useRouter } from "next/router";


function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Page = () => {
    const router = useRouter()
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return <Box>
                <Button color='inherit' variant="contained" onClick={() => {router.push('/teams')}}>Back</Button>
                <Divider sx={{m: 4}}/>
                <Typography variant="h6">Teams Configure</Typography>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Users" {...a11yProps(0)} />
                                <Tab label="Requests" {...a11yProps(1)} />
                                <Tab label="Settings" {...a11yProps(2)} />
                            </Tabs>
                            <Users value={value} index={0}/>
                            <Requests value={value} index={1}/>
                            <Settings value={value} index={2}/>
                        </Box>
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