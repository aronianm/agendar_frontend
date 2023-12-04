import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Paper } from '@mui/material'
import { Event } from './Event'
const Calendar = (props) => {
    const events = []
    return <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    weekends={true}
                    events={events}
                    contentHeight={'80vh'}
                    eventContent={Event}
                />
           
            
}


export default Calendar