export function authHeader() {
    const getToken:any = localStorage.getItem("authToken")
    const token = JSON.parse(getToken);
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }