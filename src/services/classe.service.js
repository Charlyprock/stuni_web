import Axios from './axios.service'
import { useUnivercityYearStore } from '@/stores/yearStore'

let get_classe = (option={
    id:null,
    search:null,
    department: null,
}) => {
    
    let url = '/classes/' + (option.id ? option.id : '')
    const yearStore = useUnivercityYearStore()
    return Axios.get(url, {
        params: {
            search: option.search,
            department: option.department,
            year: yearStore.currentYear,
        }
    })
}

let set_classe = (form) => {
    return Axios.post("/classes/", form)
}

let update_classe = (form) => {
    return Axios.put(`/classes/${form.id}/`, form)
}

let get_students = (id) => {
    return Axios.get(`/classes/${id}/students/`)
}

let set_delegate = (id, data) => {
    return Axios.post(`/classes/${id}/delegate/`, data)
}

export const ClasseService = {
    get_classe,
    set_classe,
    update_classe,
    get_students,
    set_delegate
}