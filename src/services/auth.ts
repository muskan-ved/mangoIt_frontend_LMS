import { authHeader } from "@/common/authToken"
import { API } from "@/config/config"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export const GenerateToken = async() =>{

  return await axios({
        method: "GET",
        url: `${API.authToken}`,
      }).then((request) => {
        localStorage.setItem("authToken", request.data.authToken)
      }).catch((error) => {
        return error;
      })
}

export const HandleRegister = async(reqData:any) =>{
  
  return await axios({
    method: "POST",
    url: `${API.register}`,
    data: reqData,
    headers: authHeader(),
  }).then((request) => {
    toast.success("User added")
    console.log("tru")
      return request;
    }).catch((error) => {
      if(error.response.status === 400){
        toast.error("Email already exists")
      }else if(error.response.status === 401){
        HandleLogout()
      }else{
        toast.error("User added failed")
      }
      return error;
    })
}

export const HandleLogin = async(reqData:any) =>{
  
  return await axios({
    method: "POST",
    url: `${API.login}`,
    data: reqData,
    headers: authHeader(),
  }).then((request) => {
      return request;
    }).catch((error) => {
      if(error.response.status === 400){
        toast.error(error.response.data)
      }else if(error.response.status === 404){
        toast.error(error.response.data)
      }else if(error.response.status === 401){
        HandleLogout()
      }else{
        toast.error("User added failed")
      }
      return error;
    })
}

export const HandleForgotPassword = async(reqData:any) =>{
  
  return await axios({
    method: "POST",
    url: `${API.forgotPassword}`,
    data: reqData,
    headers: authHeader(),
  }).then((request) => {
    if(request.status === 200){
      toast.success("Check your mail");
      localStorage.setItem('forgotPasswordToken',request.data)
    }
      return request;
    }).catch((error) => {
      if(error.response.status === 400){
        toast.error(error.response.data)
      }else if(error.response.status === 404){
        toast.error(error.response.data)
      }else if(error.response.status === 401){
        HandleLogout()
      }else{
        toast.error("Failed to send mail")
      }
      return error;
    })
}

export const HandleResetPassword = async(reqData:any) =>{
  
  return await axios({
    method: "POST",
    url: `${API.resetPassword}`,
    data: reqData,
    headers: authHeader(),
  }).then((request) => {
      toast.success("Password changed");
      return request;
    }).catch((error) => {
      if(error.response.status === 401){
        HandleLogout()
      }else{
        toast.error("Failed to reset password")
      }
      return error;
    })
}

export const HandleLogout = () => {

  localStorage.clear()
  window.location.replace("/login");
  GenerateToken()

};
 

