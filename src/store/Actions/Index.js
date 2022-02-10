import * as types from "./actionType";
import { baseUrl, secret_key } from "../../config/config.json";
import axios from "axios";
import { toast } from "react-toastify";
import axios_instance from "../../axios/axios_config";
import { v4 as uuidv4 } from "uuid";
import { PostReq } from "../../config/axios";
import Dashboard from "../../screens/Dashboard/Dashboard";

// Auth Actions
//** User Signup @params -> name, email, password */
export const userSignup = (name, email, password) => async (dispatch) => {
  dispatch({
    type: types.IS_API_CALL,
    payload: { isApiCall: true },
  });
  try {
    const response = await axios.post(`${baseUrl}/register`, {
      name,
      email,
      password,
    });
    if (response.data.status) {
      dispatch({
        type: types.USER_SIGNUP,
        payload: { ...response.data.data, isUserLogin: response.data.status },
      });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Error");
  }
  dispatch({
    type: types.IS_API_CALL,
    payload: { isApiCall: false },
  });
};

//** User Login @params -> email, password */
export const userLoggedIn = (email, password) => async (dispatch) => {
  dispatch({
    type: types.USER_LOGIN,
    payload: { isApiCall: true },
  });
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      email,
      password,
    });
    if (response.data.status) {
      dispatch({
        type: types.USER_LOGIN,
        payload: { isUserLogin: response.data.status, ...response.data.data },
      });
      console.log(response.data.data, "lllloggiiinnnn");
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    console.log(error);
    toast.error("Network Error");
  }
  dispatch({
    type: types.USER_LOGIN,
    payload: { isApiCall: false },
  });
};

//** User Logout @param empty */
export const userLogOut = () => async (dispatch) => {
  dispatch({
    type: types.USER_LOGOUT,
    payload: { isUserLogin: false, isApiCall: false },
  });
  dispatch({
    type: types.GET_METRICS,
    payload: [],
  });
};

//** Forget Password @params -> {email} */
export const forgetPassword = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/forgetpassword`, data);
    if (response.data.status) {
      toast.success(response.data.msg);
      dispatch({
        type: types.FORGET_PASSWORD,
        payload: { forgetPassUiFlow: "enterVerification" },
      });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    console.log(error);
    toast.error("Network Error");
  }
};

//** Verify Code @params -> {email , verification code} */
export const checkVerificationCode = (data) => async (dispatch) => {
  console.log("checkVerificationCode");
  try {
    const response = await axios.post(`${baseUrl}/verify`, data);
    if (response.data.status) {
      toast.success(response.data.msg);
      console.log(response.data);
      dispatch({
        type: types.FORGET_PASSWORD,
        payload: { forgetPassUiFlow: "enterNewPassword" },
      });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    console.log(error);
    toast.error("Network Error");
  }
};

//** Get All Coverbooks on dashboard @params -> user_id */
export const getAllCoverBooks = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/cover/getcovers?user_id=${userId}`
    );
    if (response.data.status) {
      if (response.data.data.length === 0) {
        toast.warn(response.data.msg);
      }
      dispatch({
        type: types.GET_ALL_COVERBOOKS,
        payload: response.data.data,
      });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    console.log(error);
    toast.error("Network Error");
  }
};

// Front Cover Actions
export const updateFrontCoverLogo = (ApiUrl, data) => async (dispatch) => {
  try {
    const response = await PostReq(ApiUrl, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // const config = { headers: { "Content-Type": "multipart/form-data" } };
    // const response = await axios.post(
    //   `${baseUrl}/api/cover/updatecoverlogo?cover_id=${cover_id}`,
    //   data,
    //   config
    // );
    if (response.data.status) {
      dispatch({
        type: types.UPDATE_COVER_LOGO,
        payload: { cover_logo: response.data.data },
      });
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Error");
    console.log(error);
  }
};

export const updateFrontCoverTitle = (ApiUrl, data) => async (dispatch) => {
  try {
    const response = await PostReq(ApiUrl, data);
    if (response.data.status) {
      dispatch({
        type: types.UPDATE_COVER_TITLE,
        payload: response.data.data,
      });
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Error");
    console.log(error);
  }
};

export const updateFrontCoverCommentSec =
  (ApiUrl, data) => async (dispatch) => {
    try {
      const response = await PostReq(ApiUrl, data);
      if (response.data.status) {
        dispatch({
          type: types.UPDATE_COVER_COMMENT_SEC,
          payload: response.data.data,
        });
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Network Error");
      console.log(error);
    }
  };

export const updateFrontCoverBgImg = (ApiUrl, data) => async (dispatch) => {
  try {
    const response = await PostReq(ApiUrl, data);
    if (response.data.status) {
      dispatch({
        type: types.UPDATE_COVER_BG_IMG,
        payload: { cover_bg_image: response.data.data },
      });
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Error");
    console.log(error);
  }
};

export const updateFrontCoverBgColor = (ApiUrl, data) => async (dispatch) => {
  try {
    const response = await PostReq(ApiUrl, data);
    if (response.data.status) {
      dispatch({
        type: types.UPDATE_COVER_BG_COLOR,
        payload: response.data.data,
      });
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Error");
    console.log(error);
  }
};

export const updateFrontCover = (ApiUrl, data) => async (dispatch) => {
  try {
    const response = await PostReq(ApiUrl, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    // const response = await axios.post(`${baseUrl}/api/cover/updatecoverlogo?cover_id=${cover_id}`, data, config);
    if (response.data.status) {
      dispatch({
        type: types.USER_SIGNUP,
        payload: { ...response.data.data, isUserLogin: response.data.status },
      });
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Erroraaaaaaaaaaaaaaa");
  }
  // dispatch({
  //   type: types.UPDATE_FRONT_COVER,
  //   payload: data,
  // });
};

export const getDefaultBgImages = (ApiUrl) => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}${ApiUrl}`);
    if (response.data.status) {
      dispatch({
        type: types.GET_DEFAULT_BG_IMAGES,
        payload: response.data.data,
      });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Erroraaaaaaaaaaaaaaa");
  }
};

export const clearFrontCover = () => async (dispatch) => {
  dispatch({
    type: types.ON_LOGOUT_FRONT_COVER,
    payload: {
      frontCoverBgImagePreview: "",
      cover_bg_image: "",
      cover_comment_text_color: "rgba(0,0,0,1)",
      cover_comment_bg_color: "rgba(0,0,0,0)",
      cover_comment_title: "",
      cover_comment: "",
      cover_title: "I Made This Coverage Report in 2 mins",
      cover_title_bg_color: "rgba(0,0,0,0)",
      cover_title_color: "rgba(0,0,0,1)",
      cover_title_bg_color: "rgba(0,0,0,0)",
    },
  });
};

// Metrics Actions

//this wokring as updating
// export const getMetrics =
//   (
//     cover_metric_count,
//     cover_metric_label,
//     cover_metric_description,
//     cover_metric_is_edit,
//     cover_metric_hide
//   ) =>
//   async (dispatch) => {
//     dispatch({
//       type: types.GET_METRICS,
//       payload: {
//         cover_metric_count,
//         cover_metric_label,
//         cover_metric_description,
//         cover_metric_is_edit,
//         cover_metric_hide,
//       },
//     });
//   };
export const addNewMetric = (apiUrl, data) => async (dispatch) => {
  try {
    const response = await PostReq(apiUrl, data);
    if (response.data.status) {
      dispatch({
        type: types.ADD_NEW_METRIC,
        payload: response.data.data,
      });
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Error");
    console.log(error);
  }
};

export const updateMetric = (apiUrl, data) => async (dispatch) => {
  try {
    const response = await PostReq(apiUrl, data);
    if (response.data.status) {
      dispatch({
        type: types.UPDATE_METRIC,
        payload: response.data.data,
      });
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Error");
    console.log(error);
  }
  // dispatch({
  //   type: types.UPDATE_METRIC,
  //   payload: data,
  // });
};

// Coverage
export const generate_coverage =
  (userID, data, selected_folder_id, cb) => async (dispatch) => {
    let linksArray = [];
    data.forEach((item) => linksArray.push(item.url));
    let apiBody = {
      urls: linksArray,
    };
    if (selected_folder_id !== "all") {
      apiBody.folder_id = selected_folder_id;
    }
    try {
      const response = await axios_instance.post(
        `/api/cover/takescreenshots?user_id=${userID}`,
        apiBody
      );
      if (response.data.status) {
        toast.success(response.data.msg);
        dispatch({
          type: types.GET_CREATED_COVER_ID,
          payload: response.data.data.cover_id,
        });
        cb();
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };

export const reset_created_cover_id = () => async (dispatch) => {
  dispatch({
    type: types.RESET_CREATED_COVER_ID,
    payload: "",
  });
};

export const delete_coverbook = (cover_id) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `${baseUrl}/api/admin/deletecover?cover_id=${cover_id}`
    );
    if (response.data.status) {
      toast.success(response.data.msg);
      // dispatch({
      //   type: "GET_ALL_COVERBOOKS",
      //   payload: response.data.data,
      // });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Error");
  }
};

export const delete_multiple_coverbooks = (cover_ids) => async () => {
  try {
    console.log("delete_multiple_coverbooks", cover_ids);
    let response = await axios.delete(`${baseUrl}/api/admin/deletecovers`, {
      data: {
        covers: cover_ids,
      },
    });
    if (response.data.status) {
      toast.success(response.data.msg);
      console.log("tttrrruuueeeee", response.data);
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Error");
    console.log(error);
  }
};

// UPDATE_COVERAGE_TITLE
export const updateSingleCoverageReport =
  (apiUrl, data) => async (dispatch) => {
    try {
      const response = await PostReq(apiUrl, data);
      if (response.data.status) {
        dispatch({
          type: types.UPDATE_SCREENSHOTS_DATA,
          payload: response.data.data,
        });
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Network Error");
      console.log(error);
    }
  };

// Order and sort
export const reorderScreenshotReports =
  (apiUrl, reoderedScreensReport) => async (dispatch) => {
    try {
      const response = await PostReq(apiUrl, reoderedScreensReport);
      if (response.data.status) {
        toast.success(response.data.msg);
        return response;
      } else {
        console.warn("erorrrr");
      }
    } catch (error) {
      console.log({ error });
    }
  };

// Shareable
export const downloadPdf = (apiUrl, data) => async (dispatch) => {
  try {
    // const response = PostReq(apiUrl, data);
    const response = await axios.post(`${baseUrl}${apiUrl}`, data);
    // console.log(callback);
    // callback();
    return response;
    // .then((res) => {
    //   if (res.data.status) {
    //     toast.success(res.data.msg);
    //     console.log(`${baseUrl}${res.data.data.pdf_path}`,":::::::::::::::::::::::::::::")
    //     window.open(`${baseUrl}${res.data.data.pdf_path}`,'_blank');

    //   } else {
    //     console.warn("erorrrr");
    //   }
    // });

    // if (response.data.status) {
    //   dispatch({
    //     type: types.GET_FRONT_COVER,
    //     payload: response.data.data.frontCover,
    //   });
    // } else {
    //   console.warn("erorrrr");
    // }
  } catch (error) {
    console.log({ error });
  }
};

// export const updateSingleCoverageImage = (apiUrl, data) => async (dispatch) => {

//     const response = await PostReq(apiUrl, data);
//     if (response.data.status) {
//       dispatch({
//         type: types.UPDATE_SINGLE_SCREENSHOT,
//         payload: response.data.data,
//       });
//       toast.success(response.data.msg);
//     } else {
//       toast.error(response.data.msg);
//     }
//   } catch (error) {
//     toast.error("Network Error");
//   }
// };

// -------------------------------------------------------------------------------------------------------------------------------------------------------
export const getSingleCoverDetail = (coverId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/cover/getcover?cover_id=${coverId}`
    );
    if (response.data.status) {
      dispatch({
        type: types.GET_FRONT_COVER,
        payload: response.data.data.frontCover,
      });
      console.log(
        response.data.data.coverage,
        "::::::::::::::::::::::::::::::"
      );
      dispatch({
        type: types.GENERATE_COVERAGE,
        payload: response.data.data.coverage,
      });
      let metrics = [...response.data.data.metrics];
      let updated = metrics.map((item, i) => {
        item.id = uuidv4();
        return item;
      });
      dispatch({
        type: types.GET_METRICS,
        payload: updated,
      });
    } else {
      console.warn("erorrrr");
    }
  } catch (error) {
    console.log({ error });
  }
};

// Get ALL Subscription plans
// -------------------------------------WITH PROMISE EXAMPLE --------------------------------------------
// export const getAllSubscriptionPlans = () => async (dispatch) => {
//   let promise = new Promise( async (resolve, reject) =>{
//     try {
//       const response = await axios.get(`${baseUrl}/api/plan`);
//       if (response.data.status) {
//           dispatch({
//             type: types.GET_ALL_SUBSCRIPTIONS,
//             payload: response.data.data,
//           });
//           resolve('Success');
//       } else {
//         toast.error(response.data.msg);
//         reject(response.data.msg)
//       }
//     } catch (error) {
//       toast.error("Network Error");
//       reject("Network Error")
//     }
//   })
//   return promise;
// };
export const getAllSubscriptionPlans = () => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/api/plan`);
    if (response.data.status) {
      dispatch({
        type: types.GET_ALL_SUBSCRIPTIONS,
        payload: response.data.data,
      });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Error");
  }
};

export const cancelSubscription = (data) => async (dispatch) => {
  try {
    const response = await PostReq(
      `/api/plan/unsubscribe?user_id=${data.user_id}&subscription_id=${data.subscription_id}`
    );
    if (response.data.status) {
      toast.success(response.data.msg);
      dispatch({
        type: types.UPDATE_USER_PLAN_ID,
        payload: { plan_id: response.data.data.plan_id, subscription_id: "" },
      });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    toast.error("Network Error");
  }
};

// Profile
export const update_profile = (apiUrl, data) => async (dispatch) => {
  try {
    const response = await PostReq(apiUrl, data);
    if (response.data.status) {
      dispatch({
        type: types.UPDATE_PROFILE,
        payload: response.data.data,
      });
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    console.log({ error });
    toast.error("Network Errorsss");
  }
};

export const update_password = (apiUrl, data) => async (dispatch) => {
  try {
    const response = await PostReq(apiUrl, data);
    if (response.data.status) {
      toast.success(response.data.msg);
      return response;
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    console.log({ error });
  }
};

// Subcription action
export const buy_subscription =
  (plan_id, user_id, data) => async (dispatch) => {
    try {
      const response = await PostReq(
        `/api/plan/purchase?plan_id=${plan_id}&user_id=${user_id}`,
        data
      );
      if (response.data.status) {
        toast.success(response.data.msg);
        dispatch({
          type: types.UPDATE_USER_PLAN_ID,
          payload: response.data.data,
        });
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log({ error });
    }
  };

/** NEXT PHASE WORK */
export const invite_team_member = (data) => async (dispatch) => {
  try {
    const response = await PostReq(`/api/user/invite_members`, {
      user_name: data.userName,
      user_email: data.inviteEmail,
      user_id: data.userId,
    });
    console.log(response);

    // if (response.data.status) {
    //   toast.success(response.data.msg);
    //   dispatch({
    //     type: types.UPDATE_USER_PLAN_ID,
    //     payload: response.data.data,
    //   });
    // } else {
    //   toast.error(response.data.msg);
    // }
  } catch (error) {
    console.log({ error });
  }
};

export const verify_invited_user = (token) => async (dispatch) => {
  try {
    const response = await PostReq(`/api/user/verifyInvited`, {
      token: token,
      key: secret_key,
    });
    // return response;
    if (response.data.status) {
      console.log(response.data.msg.contentToEncrypt.user_email);
      dispatch({
        type: types.GET_INVITED_USER_EMAIL,
        payload: {
          invited_user_email: response.data.msg.contentToEncrypt.user_email,
        },
      });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    console.log({ error });
  }
};

export const set_invited_user_password = (data) => async (dispatch) => {
  try {
    const response = await PostReq(`/api/user/setPassword`, {
      user_email: data.invitedUserEmail,
      password: data.password,
    });
    console.log(response);

    // if (response.data.status) {
    //   console.log(response.data.msg.contentToEncrypt.user_email);
    //   dispatch({
    //     type: types.GET_INVITED_USER_EMAIL,
    //     payload: {
    //       invited_user_email: response.data.msg.contentToEncrypt.user_email,
    //     },
    //   });
    // } else {
    //   toast.error(response.data.msg);
    // }
  } catch (error) {
    console.log({ error });
  }
};

export const create_new_folder = (folder_name, user_id) => async (dispatch) => {
  console.log(folder_name);

  try {
    const response = await PostReq(`/api/folders/createFolder`, {
      folders_name: folder_name,
      user_id: user_id,
    });
    if (response.data.status) {
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    console.log({ error });
  }
};

export const get_all_folders = (user_id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/folders/getByID?user_id=${user_id}`
    );
    if (response.data.status) {
      if (response.data.data.length === 0) {
        response.data.msg !== "Success" && toast.warn(response.data.msg);
      }
      dispatch({
        type: types.GET_ALL_FOLDERS,
        payload: response.data.data,
      });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    console.log(error);
    toast.error("Network Error");
  }
};

export const getCoverBooksByFolder = (userId, folderId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/cover/getCoversByFolder?folder_id=${folderId}&user_id=${userId}`
    );
    if (response.data.status) {
      if (response.data.data.length === 0) {
        toast.warn(response.data.msg);
      }
      dispatch({
        type: types.GET_ALL_COVERBOOKS,
        payload: response.data.data,
      });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    console.log(error);
    toast.error("Network Error");
  }
};

export const get_team_members = (userId, user_invited) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/user/getUserInvited?user_id=${userId}`
    );
    if (response.data.status) {
      if (response.data.data.length === 0 && user_invited !== 1) {
        toast.info("You have not any team members yet.");
      }
      dispatch({
        type: types.GET_ALL_TEAM_MEMBERS,
        payload: response.data.data,
      });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    console.log(error);
    toast.error("Network Error");
  }
};

/** Create Offline Coverage */
export const create_offline_coverage =
  (filesData, data) => async (dispatch) => {
    try {
      const response = await PostReq(`/api/cover/createOffline`, filesData);
      console.log(response, "response offline-------------");
      if (response.data.status) {
        toast.success(response.data.msg);
        dispatch({
          type: types.FETCH_BOOKS,
          payload: data,
        });
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log({ error });
    }
  };

/** Move cover to different folder */
export const move_coverbook_to_folder = (data) => async (dispatch) => {
  try {
    const response = await PostReq(`/api/cover/changeFolder`, data);
    console.log(response, "Chnage folder");
    if (response.data.status) {
      toast.success(response.data.msg);
      dispatch({
        type: "FETCH_BOOKS_AGAIN",
        // payload: [],
      });
    } else {
      toast.error(response.data.msg);
    }
  } catch (error) {
    console.log({ error });
  }
};

/** Edit folder name */
// export const update_folder_name = (data) => async (dispatch) => {
//   try {
//     const response = await PostReq(`/api/cover/changeFolder`, data);
//     console.log(response, "Chnage folder");
//     if (response.data.status) {
//       toast.success(response.data.msg);
//       dispatch({
//         type: "FETCH_BOOKS_AGAIN",
//         // payload: [],
//       });
//     } else {
//       toast.error(response.data.msg);
//     }
//   } catch (error) {
//     console.log({ error });
//   }
// };

