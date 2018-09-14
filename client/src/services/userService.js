import axios from 'axios'
import { baseUrl } from '../app.config'

const userUrl = baseUrl + 'user/'


export let getUser = () => {
    return axios.post(userUrl+'get_user/',{}, {headers: {authorization: localStorage.Auth}})
}