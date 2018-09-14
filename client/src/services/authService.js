import axios from 'axios'
import {baseUrl} from '../app.config'

export const signup = (form)=>{
    axios.post(baseUrl+'user/signup', {...form, name: form.userName})
    .then(res => console.log(res))
}

export const signin = (form)=>{
    return axios.post(baseUrl+'user/signin', {...form, name: form.userName})
}
