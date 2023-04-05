//client work
export const BASE_URL = "api-mangoit-lms.mangoitsol.com";

// mangoit server
// export const BASE_URL = "http://103.127.29.85:6020";

// local server
// export const BASE_URL = "http://localhost:6030";

export const API = {

 authToken: `${BASE_URL}/generatetoken`,
 register: `${BASE_URL}/registration`,
 login: `${BASE_URL}/loginuser`,
 forgotPassword: `${BASE_URL}/sendgmail`,
 resetPassword: `${BASE_URL}/resetpassword`,

};