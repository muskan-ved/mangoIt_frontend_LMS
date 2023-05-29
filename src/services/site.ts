import { LoginHeader } from "@/common/Tokens/authToken"
import { API } from "@/config/config"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./auth"

export const HandleSiteConfigCreate = async(reqData:any) =>{
    console.log(reqData,"33333333322222222222222")
    return await axios({
      method: "POST",
      url: `${API.createSite}`,
      headers: LoginHeader(),
      data:reqData,
    }).then((request) => {
        console.log(request,"33333333333333333333 request")
        if(request.status === 200){
            toast.success("Site configuration saved")
        }
        return request;
      }).catch((error) => {
        if(error?.response === 401){
          HandleLogout()
        }else{
          toast.error("Failed to  saved site configuration")
        }
        return error;
      })
  }

//   export const HandleSessionGet = async(searchData:any,filterData:any) =>{
//     // console.log("sercDaTa",searchData)
//     const API_URL = searchData ? `${API.getSessions}/${searchData}` : `${API.getSessions}`
//     return await axios({
//       method: "POST",
//       url: API_URL,
//       headers: LoginHeader(),
//       data: filterData,
//     }).then((request) => {
//         return request;
//       }).catch((error) => {
//         if(error.response.status === 401){
//           HandleLogout()
//         }else{
//           toast.error("Something went wrong")
//         }
//         return error;
//       })
//   }

  export const HandleSiteGetByID = async(userId:any) =>{
    return await axios({
      method: "GET",
      url: `${API.getSite}/${userId}`,
      headers: LoginHeader(),
    }).then((request) => {
        return request;
      }).catch((error) => {
        if(error.response?.status === 401){
          HandleLogout()
        }else{
          toast.error("Something went wrong")
        }
        return error;
      })
  }

  export const HandleSiteConfigUpdate = async(updateData:any) =>{
    return await axios({
      method: "PUT",
      url: `${API.updateSite}`,
      headers: LoginHeader(),
      data: updateData,
    }).then((request) => {
      toast.success("Site configuration will be updated soon")
        return request;
      }).catch((error) => {
        if(error.response.status === 401){
          HandleLogout()
        }else{
          toast.error("Site config updated failed")
        }
        return error;
      })
  }

//   export const HandleSessionDelete = async(rowID:any) =>{
//     return await axios({
//       method: "DELETE",
//       url: `${API.deleteSession}/${rowID}`,
//       headers: LoginHeader(),
//     }).then((request) => {
//       toast.success("Session Deleted Successfully")
//         return request;
//       }).catch((error) => {
//         if(error.response.status === 401){
//           HandleLogout()
//         }else{
//           toast.error("Something went wrong")
//         }
//         return error;
//       })
//   }


