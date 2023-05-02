import { LoginHeader } from "@/common/Tokens/authToken"
import { authHeader } from "@/common/Tokens/authToken"
import { API } from "@/config/config"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./auth"

export const HandleSessionCreate = async(reqData:any) =>{
    return await axios({
      method: "post",
      url: `${API.createSession}`,
      headers: LoginHeader(),
      data:reqData,
    }).then((request) => {
      toast.success("Session Created")
        return request;
      }).catch((error) => {
        if(error.response.status === 401){
          HandleLogout()
        }else{
          toast.error("Session added failed")
        }
        return error;
      })
  }

  export const HandleSessionGet = async() =>{
    return await axios({
      method: "GET",
      url: `${API.getAllSessions}`,
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

  export const HandleSessionBySearch = async(reqData:any) =>{
// console.log("daaataaaa",reqData)
    return await axios({
      method: "GET",
      url: `${API.getSessionBySearch}`,
      headers: LoginHeader(),
      data:reqData  
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

