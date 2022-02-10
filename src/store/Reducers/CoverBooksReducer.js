import {
  GET_ALL_COVERBOOKS,
  GET_CREATED_COVER_ID,
  RESET_CREATED_COVER_ID,
  FETCH_BOOKS
} from "../Actions/actionType";

// const INITIAL_STATE = [];
const INITIAL_STATE = {
  data: [],
  created_cover_id: "",
  isFetchCoverBooks: false,
};

export function CoverBooksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_COVERBOOKS:
      return { ...state, data: [...action.payload] };
    case GET_CREATED_COVER_ID:
      return { ...state, created_cover_id: action.payload };
    case RESET_CREATED_COVER_ID:
      return { ...state, created_cover_id: action.payload };
    case FETCH_BOOKS:
      return { ...state, isFetchCoverBooks: action.payload };
    default:
      return state;
  }
}
