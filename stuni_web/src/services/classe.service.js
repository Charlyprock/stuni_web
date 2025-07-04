import Axios from './axios.service'

let test = (id=null) => {
    let url = '/levels/' (id ? id : '')
    return Axios.get(url)
}

export const ClasseService = {
    test
}