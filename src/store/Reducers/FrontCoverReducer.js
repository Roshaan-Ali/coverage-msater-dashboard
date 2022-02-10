import {
  // SAVE_COMMENT,
  // SAVE_DATA,
  // SAVE_CLIENT_LOGO,
  GET_FRONT_COVER,
  ON_LOGOUT_FRONT_COVER,
  // SAVE_TITLE,
  // SAVE_BG_COLOR,
  UPDATE_COVER_LOGO,
  UPDATE_FRONT_COVER,
  UPDATE_COVER_TITLE,
  UPDATE_COVER_COMMENT_SEC,
  UPDATE_COVER_BG_IMG,
  UPDATE_COVER_BG_COLOR,
} from "../Actions/actionType";

const INITIAL_STATE = {
  // cover_logo: "",
  frontCoverBgImagePreview: null,
  // cover_bg_image: "",
  // cover_comment_text_color: "rgba(0,0,0,1)",
  // cover_comment_bg_color: "rgba(0,0,0,0)",
  // cover_comment_title: "",
  // cover_comment: "",
  // cover_title: "I Made This Coverage Report in 2 mins",
  // cover_title_bg_color: "rgba(0,0,0,0)",
  // cover_title_color: "rgba(0,0,0,1)",
  // cover_bg_color: "rgba(0,0,0,0)",
  // cover_hide: 0,
};

export function FrontCoverReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // case SAVE_DATA:
    //   return {
    //     ...state,
    //     frontCoverBgImagePreview: action.payload.bgImageForPreview,
    //     cover_bg_image: action.payload.bgImageForApi,
    //   };
    // final single
    case GET_FRONT_COVER:
      return { ...state,...action.payload };
    case UPDATE_FRONT_COVER:
      return { ...state, ...action.payload };
    case UPDATE_COVER_LOGO:
      return { ...state, ...action.payload };
    case UPDATE_COVER_TITLE:
      return { ...state, ...action.payload };
    case UPDATE_COVER_COMMENT_SEC:
      return { ...state, ...action.payload };
    case UPDATE_COVER_BG_IMG:
      return { ...state, ...action.payload };
    case UPDATE_COVER_BG_COLOR:
      return { ...state, ...action.payload };
    case ON_LOGOUT_FRONT_COVER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
