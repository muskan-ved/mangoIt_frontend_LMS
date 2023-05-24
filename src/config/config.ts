// fronend local server\
export const FRONTEND_BASE_URL = "http://localhost:3000";

//client work
export const BASE_URL = "https://api-mangoit-lms.mangoitsol.com";

// local server
// export const BASE_URL = "http://localhost:6030";

export const API = {
 authToken: `${BASE_URL}/${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
 register: `${BASE_URL}/${process.env.NEXT_PUBLIC_REGISTER}`,
 login: `${BASE_URL}/${process.env.NEXT_PUBLIC_LOGIN}`,
 forgotPassword: `${BASE_URL}/${process.env.NEXT_PUBLIC_FORGOT_PASSWORD}`,
 resetPassword: `${BASE_URL}/${process.env.NEXT_PUBLIC_RESET_PASSWORD}`,

 userInfoById:`${BASE_URL}/${process.env.NEXT_PUBLIC_GET_USER_BY_ID}`,
 userUpdateById: `${BASE_URL}/${process.env.NEXT_PUBLIC_UPDATE_USER_BY_ID}`,

 getAllCourses: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_ALL_COURSES}`,
 deleteCourse: `${BASE_URL}/${process.env.NEXT_PUBLIC_DELETE_COURSE}`,
 getAllModules: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_ALL_MODULES}`,
 getAllSessions: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_ALL_SESSIONS}`,
 createSession: `${BASE_URL}/${process.env.NEXT_PUBLIC_CREATE_SESSION}`,
 createModule: `${BASE_URL}/${process.env.NEXT_PUBLIC_CREATE_MODULE}`,

 deleteSession: `${BASE_URL}/${process.env.NEXT_PUBLIC_DELETE_SESSION}`,
 updateSession: `${BASE_URL}/${process.env.NEXT_PUBLIC_UPDATE_SESSION}`,
 getSessionBYID: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_SESSION_BY_ID}`
};