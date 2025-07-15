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
    search: null,
    id: null,
}) => {
    // /students/?year=2024/2025&level=1&speciality=1&department=1&classe=1 &search=charly
    const yearStore = useUnivercityYearStore()
    const student_id = option.id ?? ''
    return Axios.get(`/students/${student_id}`, {
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
    return Axios.delete("/students/students-ids-delete/", {
        data: formData
    })
}

let deleteStudent = (id) => {
    return Axios.delete(`/students/${id}/`)
}

let updateStudent = (id, formData) => {
    return Axios.patch(`/students/${id}/`, formData)
}

export const StudentService = {
    setStudent,
    getStudents,
    deleteStudentsIDS,
    deleteStudent,
    updateStudent,
}