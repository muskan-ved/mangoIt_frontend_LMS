import { authHeader } from "@/app/common/authToken"
import { API } from "@/config/config"
import axios from "axios"

export const GenerateToken = async() =>{
    await axios({
        method: "get",
        url: `${API.authToken}`,
      }).then((request) => {
        console.log(request,"666666666")
        return request;
      }).catch((error) => {
        return error;
      })
}

