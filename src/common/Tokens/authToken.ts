export function authHeader() {
    const getToken:any = localStorage.getItem("authToken")

    if (getToken) {
      return { Authorization: `Bearer ${getToken}` };
    } else {
      return {};
    }
  }

  export function LoginHeader() {
    const getToken:any = localStorage.getItem("loginToken")
    const authToken:any = localStorage.getItem("authToken")

    if (getToken) {
      return { logintoken: `${getToken}`, Authorization: `Bearer ${authToken}` };
    } else {
      return {};
    }
  }