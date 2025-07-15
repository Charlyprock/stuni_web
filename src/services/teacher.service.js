import Axios from './axios.service'
import { useUnivercityYearStore } from '@/stores/yearStore'

let setTeacher = (formData) => {
    return Axios.post("/teachers/", formData)
}

let getTeachers = (option = {
    level: null,
    speciality: null,
    department: null,
    classe: null,
    search: null
}) => {
    // /teachers/?year=2024/2025&level=1&speciality=1&department=1&classe=1 &search=charly
    const yearStore = useUnivercityYearStore()
    return Axios.get("/teachers/", {
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

let deleteTeachersIDS = (formData) => {
    return Axios.delete("/teachers/teachers-ids-delete/", {
        data: formData
    })
}

let deleteTeacher = (id) => {
    return Axios.delete(`/teachers/${id}/`)
}

export const TeacherService = {
    setTeacher,
    getTeachers,
    deleteTeachersIDS,
    deleteTeacher,
}