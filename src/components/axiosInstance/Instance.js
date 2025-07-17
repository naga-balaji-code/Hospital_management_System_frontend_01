import axios from "axios";

// ✅ Use your deployed backend URL
const BASEURL = "https://hospital-management-system-backend-01.onrender.com";

const axiosInstance= axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;