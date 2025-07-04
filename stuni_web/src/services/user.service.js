import Axios from './axios.service'

let get_noStudent = () => {
    return Axios.get(`/users/no-students/`)
}


export const UserService = {
    get_noStudent,
}