import {
  GENERATE_COVERAGE,
  UPDATE_COVERAGE_TITLE,
  // TAKING_SCREEN_SHOTS,
  UPDATE_COVERAGE_REDUCER,
  UPDATE_SCREENSHOTS_DATA,
} from "../Actions/actionType";

const INITIAL_STATE = {
  isTakingScreenShots: false,
  isApiCall: false,
  data: [],
};

export function CoverageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GENERATE_COVERAGE:
      return {
        ...state,
        data: [...action.payload],
      };
    case UPDATE_SCREENSHOTS_DATA:
      let data = [...state.data];
      const updatedObj = action.payload;
      data.map((item, index) => {
        if (item.website_metric_id == updatedObj.website_metric_id) {
          data[index] = { ...item, ...updatedObj };
        }
      });
      return { ...state, data };
    // const newState = state.data.map((obj) =>
    //   obj.website_metric_id === action.payload.website_metric_id ? { ...obj, ...action.payload } : obj
    // );
    // return {
    //   ...state,
    //   data: [...newState],
    // };
    // -------------------
    // case UPDATE_COVERAGE_REDUCER:
    //   console.log("UPDATE_COVERAGE_REDUCER-------------------------", {
    //     ...state,
    //     ...action.payload,
    //   });
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    default:
      return state;
  }
}
