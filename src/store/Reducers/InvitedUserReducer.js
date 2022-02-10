import {
    GET_INVITED_USER_EMAIL
} from "../Actions/actionType";

const INITIAL_STATE = {};

export function InvitedUserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_INVITED_USER_EMAIL:
      return action.payload;
    default:
      return state;
  }
}
