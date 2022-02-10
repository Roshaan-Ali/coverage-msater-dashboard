import {
    GET_ALL_TEAM_MEMBERS
} from "../Actions/actionType";

const INITIAL_STATE = [];

export function TeamMembersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_TEAM_MEMBERS:
      return action.payload;
    default:
      return state;
  }
}