//SERVER API URL
export const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

// FRONTEND SERVER URL
export const FRONTEND_BASE_URL = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}`;

// //FRONTEND LOCAL URL
// export const FRONTEND_BASE_URL = `${process.env.NEXT_PUBLIC_LOCAL_FRONTEND_BASE_URL}`;

// // LOCAL API URL
// export const BASE_URL = `${process.env.NEXT_PUBLIC_LOCAL_BASE_URL}`;

export const API = {
  authToken: `${BASE_URL}/${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
  register: `${BASE_URL}/${process.env.NEXT_PUBLIC_REGISTER}`,
  login: `${BASE_URL}/${process.env.NEXT_PUBLIC_LOGIN}`,
  forgotPassword: `${BASE_URL}/${process.env.NEXT_PUBLIC_FORGOT_PASSWORD}`,
  resetPassword: `${BASE_URL}/${process.env.NEXT_PUBLIC_RESET_PASSWORD}`,
  // User
  userAllUsers: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_ALL_USERS}`,
  userInfoById: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_USER_BY_ID}`,
  userUpdateById: `${BASE_URL}/${process.env.NEXT_PUBLIC_UPDATE_USER_BY_ID}`,
  deleteUser: `${BASE_URL}/${process.env.NEXT_PUBLIC_DELETE_USER}`,
  //Courses
  getCourses: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_COURSES}`,
  getCoursesByCouseId: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_COURSES_BY_COURSE_ID}`,
  getCoursesByUserId: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_COURSES_BY_USER_ID}`,
  createCourse: `${BASE_URL}/${process.env.NEXT_PUBLIC_CREATE_COURSE}`,
  updateCourse: `${BASE_URL}/${process.env.NEXT_PUBLIC_UPDATE_COURSE}`,
  deleteCourse: `${BASE_URL}/${process.env.NEXT_PUBLIC_DELETE_COURSE}`,
  //Modules
  getAllModules: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_ALL_MODULES}`,
  createModule: `${BASE_URL}/${process.env.NEXT_PUBLIC_CREATE_MODULE}`,
  updateModule: `${BASE_URL}/${process.env.NEXT_PUBLIC_UPDATE_MODULE}`,
  deleteModule: `${BASE_URL}/${process.env.NEXT_PUBLIC_DELETE_MODULE}`,
  //Sessions
  getSessions: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_SESSION}`,
  createSession: `${BASE_URL}/${process.env.NEXT_PUBLIC_CREATE_SESSION}`,
  deleteSession: `${BASE_URL}/${process.env.NEXT_PUBLIC_DELETE_SESSION}`,
  updateSession: `${BASE_URL}/${process.env.NEXT_PUBLIC_UPDATE_SESSION}`,
  //Site Options
  getSite: `${BASE_URL}/${process.env.NEXT_PUBLIC_SITE_CONFIG_GET}`,
  createSite: `${BASE_URL}/${process.env.NEXT_PUBLIC_SITE_CONFIG_CREATE}`,
  deleteSite: `${BASE_URL}/${process.env.NEXT_PUBLIC_SITE_CONFIG_DELETE}`,
  updateSite: `${BASE_URL}/${process.env.NEXT_PUBLIC_SITE_CONFIG_UPDATE}`,

  getAllSubscription: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_SUBSCRIPTION}`,
  deleteSubscription: `${BASE_URL}/${process.env.NEXT_PUBLIC_DELETE_SUBSCRIPTION}`,
  getSubscription: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_SUBSCRIPTION_BY_URSEID}`,
  getSubsById: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_SUBSCRIPTION_BY_ID}`,

  downloadPDF: `${BASE_URL}/${process.env.NEXT_PUBLIC_DOWNLOAD_RECEIPT}`,

  getEmailContent: `${BASE_URL}/${process.env.NEXT_PUBLIC_EMAIL_CONTENT_GET}`,
  createEmailContent: `${BASE_URL}/${process.env.NEXT_PUBLIC_EMAIL_CONTENT_CREATE}`,
  updateEmailContent: `${BASE_URL}/${process.env.NEXT_PUBLIC_EMAIL_CONTENT_UPDATE}`,

  getEmailType: `${BASE_URL}/${process.env.NEXT_PUBLIC_EMAIL_TYPE_GET}`,
  createEmailType: `${BASE_URL}/${process.env.NEXT_PUBLIC_EMAIL_TYPE_CREATE}`,
  updateEmailType: `${BASE_URL}/${process.env.NEXT_PUBLIC_EMAIL_TYPE_UPDATE}`,

  getOrder: `${BASE_URL}/${process.env.NEXT_PUBLIC_GET_ORDER_BY_USER_ID}`,

  //accept payment
  acceptpayment: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_PAYMENT}`,
  getpaymentdetails: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_PAYMENTDETAILS}`,
  //get all subscriptions
  allsubscriptions: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_ALLSUBSCRIPYIONS}`,
  getsubscriptionplandet: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_SUBSCRIPTIONPLANDET}`,

  //grt user by email
  getuserdetbyemail: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_GETUSERBYEMAIL}`,

  //create user subscription
  createsubscription: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_CREATESUBSCRIPTION}`,
  updateSubscription: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_UPDATESUBSCRIPTION}`,

  //create order
  createsubscriptionorder: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_CREATEORDER}`,
  //update order
  updateorder: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_UPDATEORDER}`,
  //create order for subscription
  createorderforsubscription: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_CREATETORDERFORSUBSCRIPTION}`,

  //create transaction
  createtransaction: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_CREATETRANSACTION}`,
  //GET TRANSACTION BY OD
  getTransaction: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_TRANSACTIONDET}`,

  //create enrolled courses
  createenrollcourse: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_CREATETENROLLEDCOURSE}`,
  markascomplete: `${BASE_URL}/${process.env.NEXT_PUBLIC_MARK_AS_COMPLETE}`,

  //check enrolled courses
  checenrollcourses: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_CHECKENROLLEDCOURSE}`,
  //get top enrolled courses
  topenrolledcourses: `${BASE_URL}/${process.env.NEXT_PUBLIC_ACCEPT_TOPENROLLEDCOURSE}`,
};
