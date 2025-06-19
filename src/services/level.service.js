import Axios from './axios.service'

let get_level = (id=null) => {
    let url = '/levels/' + (id ? id : '')
    return Axios.get(url)
}

export const LevelService = {
    get_level,
}