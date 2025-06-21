import axiosInstance from "../components/AxiosInstance/Instance";

let empServices={
    regiUser:async(payload)=>{
        try {
        let data=await axiosInstance.post("/register",payload)
    //   console.log(data);
    return data
        } catch (error) {
            console.log(error);
            return error
        }
    }
}

export default empServices