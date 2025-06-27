import Axios from './axios.service'
import { useUnivercityYearStore } from '@/stores/yearStore'

let setStudent = (formData) => {
    return Axios.post("/students/", formData)
}

let getStudents = (option = {
    level: null,
    speciality: null,
    department: null,
    classe: null,
    search: null
}) => {
    console.log("sdfd", option)
    // /students/?year=2024/2025&level=1&speciality=1&department=1&classe=1 &search=charly
    const yearStore = useUnivercityYearStore()
    return Axios.get("/students/", {
        params: {
            year: yearStore.currentYear,
            level: option.level,
            speciality: option.speciality,
            department: option.department,
            classe: option.classe,
            search: option.search
        }
    })
}

let deleteStudentsIDS = (formData) => {
    return Axios.delete("/students-ids-delete/", {
        data: formData
    })
}

export const StudentService = {
    setStudent,
    getStudents,
    deleteStudentsIDS,
}