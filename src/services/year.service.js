import Axios from './axios.service'

let getUnivercityYears = () => {
    return Axios.get("/years-list/")
}

export const YearService = {
    getUnivercityYears,
}