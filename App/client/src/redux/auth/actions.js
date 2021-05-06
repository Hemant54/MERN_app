const actions = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_ERROR: "REGISTER_ERROR",

  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",

  LOGOUT: "LOGOUT",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_ERROR: "LOGOUT_ERROR",

  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (payload = {}) => ({
    type: actions.LOGIN_REQUEST,
    payload,
  }),
  loginSuccess: (payload = {}, token = "") => ({
    type: actions.LOGIN_SUCCESS,
    payload,
    token,
  }),
  loginFailure: (payload = "", errors = {}) => ({
    type: actions.LOGIN_ERROR,
    payload,
    errors,
  }),

  register: (payload = {}) => ({
    type: actions.REGISTER_REQUEST,
    payload,
  }),
  registerSuccess: (payload = {}) => ({
    type: actions.REGISTER_SUCCESS,
    payload,
  }),
  registerFailure: (payload = "", errors = {}) => ({
    type: actions.REGISTER_ERROR,
    payload,
    errors,
  }),

  logout: () => ({
    type: actions.LOGOUT,
  }),
  logoutSuccess: () => ({
    type: actions.LOGOUT_SUCCESS,
  }),
  logoutError: () => ({
    type: actions.LOGOUT_ERROR,
  }),
};
export default actions;
