import axios from "axios";
let BASEURL="http://localhost:5000/api/user"
let axiosInstance=axios.create({
    baseURL:BASEURL
})


export default axiosInstance