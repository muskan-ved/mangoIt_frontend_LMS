import { LoginHeader } from "@/common/Tokens/authToken";
import { authHeader } from "@/common/Tokens/authToken";
import { API } from "@/config/config";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./auth";

export const HandleSubscriptionGet = async () => {
  const API_URL = `${API.getSubscription}`;
  return await axios({
    method: "GET",
    url: API_URL,
    headers: LoginHeader(),
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("Something went wrong");
      }
      return error;
    });
};

export const HandleSubscriptionGetByID = async (subId: any) => {
  return await axios({
    method: "GET",
    url: `${API.getSubsById}/${subId}`,
    headers: LoginHeader(),
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("subscription failed");
      }
      return error;
    });
};
export const HandleSubscriptionGetByUserID = async (subId: any) => {
  return await axios({
    method: "GET",
    url: `${API.getSubscription}/${subId}`,
    headers: LoginHeader(),
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("subscription failed");
      }
      return error;
    });
};

export const HandleSubscriptionPayment = async (reqData: any) => {
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

export const HandlePaymentDetails = async (reqData: any) => {
  return await axios({
    method: "POST",
    url: `${API.getpaymentdetails}`,
    headers: LoginHeader(),
    data: reqData,
  })
    .then((responce) => {
      return responce?.data;
    })
    .catch((error) => {
      if (error.response.status === 401) HandleLogout();
      else return error;
    });
};

export const GetallSubsctions = async () => {
  return await axios({
    method: "GET",
    url: `${API.allsubscriptions}`,
    headers: authHeader(),
  })
    .then((responce) => {
      return responce?.data;
    })
    .catch((error) => {
      if (error.response.status === 401) HandleLogout();
      else return error;
    });
};

export const GetSubsctionsPlansDet = async (id: any) => {
  return await axios({
    method: "GET",
    url: `${API.getsubscriptionplandet}/${id}`,
    headers: authHeader(),
  })
    .then((responce) => {
      return responce?.data;
    })
    .catch((error) => {
      if (error.response.status === 401) HandleLogout();
      else return error;
    });
};

export const CreateUserSubsction = async (reqData: any) => {
  return await axios({
    method: "POST",
    url: `${API.createsubscription}`,
    headers: LoginHeader(),
    data: reqData,
  })
    .then((responce) => {
      return responce?.data;
    })
    .catch((error) => {
      if (error.response.status === 401) HandleLogout();
      else return error;
    });
};

export const UpdaUserSubscription = async (
  reqData: any,
  subscription_id: any
) => {
  return await axios({
    method: "PUT",
    url: `${API.updatesubscription}/${subscription_id}`,
    headers: authHeader(),
    data: reqData,
  })
    .then((responce) => {
      return responce?.data;
    })
    .catch((error) => {
      if (error.response.status === 401) HandleLogout();
      else return error;
    });
};
