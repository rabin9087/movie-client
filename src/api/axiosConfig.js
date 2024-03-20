import axios from 'axios'

const rootAPI = import.meta.env.VITE_ROOT_API
export default axios.create({
    baseURL: rootAPI + "/api/v1",
})