import Axios from './axios.service'

let setStudent = (formData) => {
    return Axios.post("/students/", formData)
}

export const StudentService = {
    setStudent,
}