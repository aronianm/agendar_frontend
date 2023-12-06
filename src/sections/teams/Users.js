import { Box, Tabs, Tab, Table, TableCell, TableHead, TableBody, TableRow, TextField, Button } from "@mui/material"
import { useEffect, useState } from "react";

import { toast  } from 'react-toastify';
export default (props) => {
    const { teamId, value, index, ...other } = props;

    const [valueIdx, setValue] = useState('one');
    const [emailCount, setEmailCount] = useState(1)
    const [emails, setEmails] = useState({})

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleEmailNotification = () => {
        toast.success("Sending email")
        console.log(emails)
        console.log('Sending email to', emails)
        setEmails({})
        setEmailCount(1)
    }
    useEffect(() => {
        if(valueIdx === 'one' && value === 0){
          
        }
    }, [valueIdx, value])
    

    return <Box  role="tabpanel"
                  hidden={value !== index} 
                 id={`simple-tabpanel-${index}`}
                 aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
            <Tabs
                value={valueIdx}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value="one" label="Listings" />
                <Tab value="two" label="Add Users" />
                <Button  label="Send Email" sx={{display: valueIdx !== 'one' ? 'block': 'none'}} onClick={handleEmailNotification}>
                    Notify Users
                </Button>
            </Tabs>
            <Box  role="tabpanel"
                  hidden={valueIdx !== 'one'} 
                 id={`simple-tabpanel-${valueIdx}`}
                 aria-labelledby={`simple-tab-${valueIdx}`}
                {...other}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Next Shift</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        </TableBody>
                </Table>
                
            </Box>
            <Box  role="tabpanel"
                  hidden={valueIdx !== 'two'} 
                 id={`simple-tabpanel-${valueIdx}`}
                 aria-labelledby={`simple-tab-${valueIdx}`}
                {...other}
            >    
                <h4>Add users to your team</h4>
                <Box sx={{display: 'flex', flexFlow: 'column', p: 5}}>  
                    {Array.from({ length: emailCount }, (_, index) => index).map((index) => {
                        return <TextField value={emails[index] ?? ''} sx={{marginBottom: 1}} label='Email' onChange={(e) => {emails[index] = e.target.value; setEmails({...emails})}} />
                    })}
                </Box> 
                <Button color='primary' variant="outlined" onClick={() => setEmailCount( emailCount + 1)}>
                    Add Email
                </Button>
                
                
            </Box>
    </Box>  
}