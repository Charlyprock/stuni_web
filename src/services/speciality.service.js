import Axios from './axios.service'

let get_speciality = (option={
    id:null,
    search:null,
    department: null,
}) => {
    
    let url = '/specialitys/' + (option.id ? option.id : '')
    return Axios.get(url, {
        params: {
            search: option.search,
            department: option.department
        }
    })
}

let set_speciality = (form) => {
    return Axios.post("/specialitys/", form)
}

let update_speciality = (form) => {
    return Axios.put(`/specialitys/${form.id}/`, form)
}

export const SpecialityService = {
    get_speciality,
    update_speciality,
    set_speciality,
}