import { NoUserNavigation } from '@/components/navigation'
import { Box } from '@mui/material'
import {Calendar} from '../../components/calendar'
import LoggedInNavigation from '@/components/navigation/LoggedInNavigation'
export default () => {
    return <Box>
            <LoggedInNavigation>
                <Calendar/>
            </LoggedInNavigation>
        </Box>
}