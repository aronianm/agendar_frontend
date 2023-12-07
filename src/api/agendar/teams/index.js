import axios from 'axios'
import { payloadHeaders } from '../..'
export const index = () => {
    return axios.get('http://localhost:3001/teams', payloadHeaders())
}

export const create = (name) => {
    const payload = {}

    payload['teams'] = {
        name
    }
    return axios.post('http://localhost:3001/teams', payload, payloadHeaders())
}

export const destroy = (id) => {
    return axios.delete(`http://localhost:3001/teams/${id}`, payloadHeaders())
}

export const show = (id) => {
    return axios.get(`http://localhost:3001/teams/${id}`, payloadHeaders())
}