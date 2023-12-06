import { Box } from "@mui/material"

export default (props) => {
    const { children, value, index, ...other } = props;
    return <Box  role="tabpanel"
                  hidden={value !== index} 
                 id={`simple-tabpanel-${index}`}
                 aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                <h6>Settings</h6>
    </Box>  
}