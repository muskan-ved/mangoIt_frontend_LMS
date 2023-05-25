import { LoginHeader } from "@/common/Tokens/authToken";
import { API } from "@/config/config";
import axios from "axios";
import { toast } from "react-toastify";
import { HandleLogout } from "./auth";

export const HandleSubscriptionPayment = async (reqData: any) => {
  //console.log("reqdata", reqData);
  return await axios({
    method: "POST",
    url: `${API.acceptpayment}`,
    headers: LoginHeader(),
    data: reqData,
  })
    .then((responce) => {
      return responce?.data?.returnurl;
    })
    .catch((error) => {
      if (error.response.status === 401) HandleLogout();
      else return error;
    });
};
