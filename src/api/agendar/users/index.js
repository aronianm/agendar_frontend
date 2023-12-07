import axios from 'axios'
import { payloadHeaders } from '../..'

export const alertUsers = (id, emails) => {
    return axios.post(`http://localhost:3001/teams/${id}/users/new_users`, {emails: emails}, payloadHeaders())
}