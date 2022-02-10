import {
  GET_METRICS,
  ADD_NEW_METRIC,
  UPDATE_METRIC,
} from "../Actions/actionType";

const INITIAL_STATE = [
  // {
  //   cover_metric_id: 1,
  //   cover_metric_count: 60,
  //   cover_metric_label: "Pieces Of Coverage",
  //   cover_metric_description: "",
  //   cover_metric_is_edit: 0,
  //   cover_metric_hide: 0,
  // },
];

export function MetricsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_METRICS:
      return action.payload;
    case ADD_NEW_METRIC:
      return [
        ...state,
        {
          ...action.payload,
        },
      ];
    case UPDATE_METRIC:
      let data = [...state];
      const updatedObj = action.payload;
      data.map((item, index) => {
        if (item.cover_metric_id == updatedObj.cover_metric_id) {
          data[index] = updatedObj;
        }
      });
      return data;
    default:
      return state;
  }
}
