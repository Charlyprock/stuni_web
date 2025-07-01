import Axios from './axios.service'

let get_department = (option={
    id:null,
    search:null,
}) => {
    
    let url = '/departments/' + (option.id ? option.id : '')
    return Axios.get(url, {
        params: {
            search: option.search
        }
    })
}

let set_department = (form) => {
    return Axios.post("/departments/", form)
}

let update_department = (form) => {
    return Axios.put(`/departments/${form.id}/`, form)
}

export const DepartmentService = {
    get_department,
    update_department,
    set_department,
}