import {
    GET_ALL_FOLDERS
} from "../Actions/actionType";

const INITIAL_STATE = [];

export function FoldersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_FOLDERS:
      return action.payload;
    default:
      return state;
  }
}