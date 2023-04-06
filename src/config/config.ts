//client work
export const BASE_URL = "https://api-mangoit-lms.mangoitsol.com";

// local server
// export const BASE_URL = "http://localhost:6030";

export const API = {

 authToken: `${BASE_URL}/generatetoken`,
 register: `${BASE_URL}/registration`,
 login: `${BASE_URL}/loginuser`,
 forgotPassword: `${BASE_URL}/sendgmail`,
 resetPassword: `${BASE_URL}/resetpassword`,

 userProfile:`${BASE_URL}/`,
};