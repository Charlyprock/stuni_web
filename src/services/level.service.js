import Axios from './axios.service'

let get_level = (option={
    id:null,
    search:null,
}) => {
    
    let url = '/levels/' + (option.id ? option.id : '')
    return Axios.get(url, {
        params: {
            search: option.search
        }
    })
}

let set_level = (form) => {
    return Axios.post("/levels/", form)
}

let update_level = (form) => {
    return Axios.put(`/levels/${form.id}/`, form)
}

let set_specialitys = (id, specialitys) => {
    return Axios.post(`/levels/${id}/specialitys/`, specialitys)
}

export const LevelService = {
    get_level,
    set_level,
    update_level,
    set_specialitys,
}