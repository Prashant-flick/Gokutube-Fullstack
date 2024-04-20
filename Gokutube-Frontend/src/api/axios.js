import axios from 'axios'

export default axios.create({
    baseURL: String(process.env.API_URL)
})