import { GET_ALL_SUBSCRIPTIONS } from "../Actions/actionType";

const INITIAL_STATE = [];

export function SubscriptionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_SUBSCRIPTIONS:
        // console.log([...action.payload])
      return [...action.payload];
    // case ADD_NEW_METRIC:
    //   return [
    //     ...state,
    //     {
    //       ...action.payload,
    //     },
    //   ];
    // case UPDATE_METRIC:
    //   let data = [...state];
    //   const updatedObj = action.payload;
    //   data.map((item, index) => {
    //     if (item.cover_metric_id == updatedObj.cover_metric_id) {
    //       data[index] = updatedObj;
    //     }
    //   });
    //   return data;
    default:
      return state;
  }
}
