import { LoginHeader } from "@/common/Tokens/authToken";
import { API } from "@/config/config";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./auth";

export const UserEnrolledCourses = async (reqData: any) => {
  return await axios({
    method: "POST",
    url: `${API.createenrollcourse}`,
    headers: LoginHeader(),
    data: reqData,
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      }
      return error;
    });
};

export const CheckEnrolledCourses = async (reqData: any) => {
  return await axios({
    method: "post",
    url: `${API.checenrollcourses}`,
    headers: LoginHeader(),
    data: reqData,
  })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        HandleLogout();
      }
      return error;
    });
};
