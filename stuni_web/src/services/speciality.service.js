import Axios from './axios.service'

let get_speciality = (id=null) => {
    let url = '/specialitys/' + (id ? id : '')
    return Axios.get(url)
}

export const SpecialityService = {
    get_speciality,
}