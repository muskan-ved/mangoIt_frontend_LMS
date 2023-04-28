import { LoginHeader } from "@/common/Tokens/authToken"
import { authHeader } from "@/common/Tokens/authToken"
import { API } from "@/config/config"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./auth"

export const HandleCourseGet = async() =>{ 
    return await axios({
      method: "GET",
      url: `${API.getAllCourses}`,
      headers: LoginHeader(),
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