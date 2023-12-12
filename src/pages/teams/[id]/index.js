import { Box, Button, Typography, ButtonGroup, Card, CardContent, CardMedia, Avatar, Paper } from "@mui/material"
import {Layout as DashboardLayout} from '../../../layouts/layout'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { show } from "@/api/agendar/teams";
import { toast } from "react-toastify";
import { index } from "@/api/agendar/team_players";
import TeamMenu from "@/sections/teams/TeamMenu";
const Page = () => {
    const {id} = useParams();
    const router = useRouter()
    const [showCode, setShowCode] = useState(false)
    const [team, setTeam] = useState({})
    const [teamPlayers, setTeamPlayers] = useState([])

    useEffect(() => {
      show(id).then((response) => {
        setTeam({...response.data})
        index(id).then((response) => {
          setTeamPlayers(response.data)
        })
      }).catch((error) => {
          toast.error("Trouble loading team")
      })
    }, [])
    return <Box>
        <Box>
          <ButtonGroup>
              <Button color='inherit' variant="contained" onClick={() => router.push(`/teams/${id}/edit`)}>Configure</Button>
              <Button color='inherit' variant="contained" onClick={() => router.push(`/teams/`)}>Team Listings</Button>
              <Button color='warning' variant='outlined' onClick={() => setShowCode(showCode === true ? false : true)}>{showCode ? 'Hide' : 'Show'} Code</Button>
          </ButtonGroup>
          <Box sx={{marginTop: 5}}>
            <Box sx={{display: 'flex'}}>
              <Typography variant='h4'>Team Code</Typography>
              <Typography variant='h6' style={{filter: showCode ? '' : 'blur(10px)', marginTop: 6, marginLeft: 10}}>{team.authentification_code}</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          {teamPlayers.map((teamPlayer) => {
            const {user} = teamPlayer;
          
            return <Box sx={{height: 100}} component={Paper} elevation={3}>
                <Typography component="div" variant="h5">
                  {user.fname} {user.lname}
                </Typography>
                <TeamMenu user={user}/>
            </Box>
          })}
          
        </Box>
    </Box>
}


Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;