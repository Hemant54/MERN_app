import actions from "./actions";

const initState = {
  user: {},
  token: null,
  loading: false,
  message: null,
  errorData: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        token: null,
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        message: null,
        user: action.payload,
        token: action.token,
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        token: null,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
      };
    case actions.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        message: null,
        action: action.type,
      };
    case actions.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: null,
        action: action.type,
      };
    case actions.REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
      };
    case actions.LOGOUT:
      return { ...state };
    case actions.LOGOUT_SUCCESS:
      return { ...initState };
    case actions.LOGOUT_ERROR:
      return { ...state };
    default:
      return state;
  }
};
