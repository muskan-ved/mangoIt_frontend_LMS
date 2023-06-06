import { LoginHeader } from "@/common/Tokens/authToken";
import { authHeader } from "@/common/Tokens/authToken";
import { API } from "@/config/config";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./auth";

export const HandleUserGet = async (searchData: any, filterData: any) => {
  const API_URL = searchData
    ? `${API.userAllUsers}/${searchData}`
    : `${API.userAllUsers}`;
  return await axios({
    method: "POST",
    url: API_URL,
    headers: authHeader(),
    data: filterData,
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

export const HandleProfile = async (userId: any) => {
  return await axios({
    method: "GET",
    url: `${API.userInfoById}/${userId}`,
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

export const GetUserByemail = async (reqdata: any) => {
  return await axios({
    method: "POST",
    url: `${API.getuserdetbyemail}`,
    headers: LoginHeader(),
    data: reqdata,
  })
    .then((request) => {
      return request?.data;
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
  export const HandleUserDelete = async (rowID: any) => {
    return await axios({
      method: "DELETE",
      url: `${API.deleteUser}/${rowID}`,
      headers: LoginHeader(),
    })
      .then((request) => {
        toast.success("User Deleted Successfully");
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

export const HandleUpdateProfile = async (userId: number, reqData: any) => {
  return await axios({
    method: "PUT",
    url: `${API.userUpdateById}/${userId}`,
    headers: LoginHeader(),
    data: reqData,
  })
    .then((request) => {
      toast.success("Profile updated");
      return request;
    })
    .catch((error) => {
      if (error.response.status === 400) {
        toast.error("Email already exists");
      } else if (error.response.status === 401) {
        HandleLogout();
      } else {
        toast.error("User added failed");
      }
      return error;
    });
};
