import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';
import { useRouter } from 'next/router';

const TeamMenu = ({user}) => {
    const router = useRouter()
    const handleSchedule = (user) => {
        router.push({
            pathname: '/teams/users/schedule',
            query: { user: user.id}
        }, '/teams/users/schedule')
    }
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="secondary" aria-label="edit">
        <Tooltip title="Edit Schedule" onClick={() => handleSchedule(user)}>
            <EditIcon />
        </Tooltip>
      </Fab>
    </Box>
  );
}

export default TeamMenu