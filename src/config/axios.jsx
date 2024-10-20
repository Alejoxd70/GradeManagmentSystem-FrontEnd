import axios from "axios"


const axiosClient = axios.create( {
    baseURL: "https://www.app-grades-managment.somee.com/api",
    
});

export default axiosClient;