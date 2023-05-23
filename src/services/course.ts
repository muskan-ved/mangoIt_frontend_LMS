import { LoginHeader } from "@/common/Tokens/authToken"
import { authHeader } from "@/common/Tokens/authToken"
import { API } from "@/config/config"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./auth"

export const HandleCourseGet = async(searchData:any,filterData:any) =>{ 
    // return await axios({
    //   method: "POST",
    //   url: `${API.getAllCourses}`,
    //   headers: LoginHeader(),
    // }).then((request) => {
    //     return request;
    //   }).catch((error) => {
    //     if(error.response.status === 401){
    //       HandleLogout()
    //     }else{
    //       toast.error("Something went wrong")
    //     }
    //     return error;
    //   })

    const API_URL = searchData ? `${API.getAllCourses}/${searchData}` : `${API.getAllCourses}`
    return await axios({
      method: "POST",
      url: API_URL,
      headers: LoginHeader(),
      data: filterData,
    }).then((request) => {
        return request;
      }).catch((error) => {
        if(error.response.status === 401){
          HandleLogout()
        }else{
          toast.error("Something went wrong")
        }
        return error;
      })
  }