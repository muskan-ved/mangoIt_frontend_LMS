import { LoginHeader, authHeader } from "@/common/Tokens/authToken";
import { API } from "@/config/config";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HandleLogout } from "./auth";

export const HandleCourseGetByUserId = async (courseId: any, search?: any) => {
  if (search) {
    return await axios({
      method: "GET",
      url: `${API.getCoursesByUserId}/${courseId}/${search}`,
      headers: LoginHeader(),
    })
      .then((request) => {
        return request;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          HandleLogout();
        } else {
          toast.error("Course added failed");
        }
        return error;
      });
  } else {
    return await axios({
      method: "GET",
      url: `${API.getCoursesByUserId}/${courseId}`,
      headers: LoginHeader(),
    })
      .then((request) => {
        return request;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          HandleLogout();
        } else {
          toast.error("Course added failed");
        }
        return error;
      });
  }
};
