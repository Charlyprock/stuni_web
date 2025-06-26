import Axios from './axios.service'

let setStudent = (formData) => {
    return Axios.post("/students/", formData)
}

let getStudents = (option = {
    year: null,
    level: null,
    speciality: null,
    department: null,
    classe: null,
    search: null
}) => {
    // /students/?year=2024/2025&level=1&speciality=1&department=1&classe=1 &search=charly
    return Axios.get("/students/", {
        params: {
            year: option.year,
            level: option.level,
            speciality: option.speciality,
            department: option.department,
            classe: option.classe,
            search: option.search
        }
    })
}

export const StudentService = {
    setStudent,
    getStudents,
}