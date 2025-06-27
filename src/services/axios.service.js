import axios from "axios";
import { useUserStore } from "@/stores/userStore";

const Axios = axios.create({
    baseURL: "http://127.0.0.1:8000/api"
})

Axios.interceptors.request.use(requete => {
    const user = useUserStore()
    if (user.token) {
        requete.headers.Authorization = `Bearer ${user.token}`
    }
    
    return requete
})

export default Axios;