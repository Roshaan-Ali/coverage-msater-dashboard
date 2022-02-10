import {
  AUTH_API_ERROR,
  IS_API_CALL,
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGNUP,
  UPDATE_PROFILE,
  UPDATE_USER_PLAN_ID,
  // FORGET_PASSWORD
} from "../Actions/actionType";

const INITIAL_STATE = {
  isUserLogin: false,
  isApiCall: false,
  // forgetPassUiFlow: "enterEmail",
};

export function UserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_SIGNUP:
      return { ...state, ...action.payload };
    case USER_LOGIN:
      return { ...state, ...action.payload };
    case UPDATE_USER_PLAN_ID:
      return { ...state, ...action.payload };
    case USER_LOGOUT:
      return { ...action.payload };
    case AUTH_API_ERROR:
      return { ...state, ...action.payload };
    case IS_API_CALL:
      return { ...state, ...action.payload };
    case UPDATE_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    // case FORGET_PASSWORD:
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    default:
      return state;
  }
}
