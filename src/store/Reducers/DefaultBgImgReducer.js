import { GET_DEFAULT_BG_IMAGES } from "../Actions/actionType";

const INITIAL_STATE = [];

export function DefaultBgImgReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DEFAULT_BG_IMAGES:
      return action.payload ;
    default:
      return state;
  }
}
