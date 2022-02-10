import { FORGET_PASSWORD } from "../Actions/actionType";

const INITIAL_STATE = {
  forgetPassUiFlow: "enterEmail",
};

export function ForgetAuthReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FORGET_PASSWORD:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
