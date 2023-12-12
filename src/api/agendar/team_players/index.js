import axios from "axios"
import { payloadHeaders } from "@/api"
export const index = (id) => {
    return axios.get(`http://localhost:3001/teams/${id}/team_players`, payloadHeaders())
}