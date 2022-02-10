import React, { useEffect, useRef, useState } from "react";
// Modal
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import { CloseIcon } from "../../../assets";
import { connect } from "react-redux";
import * as actions from "../../../store/Actions/Index";
import { useHistory } from "react-router";
import Spinner from "../../../components/Spinner";
import Lottie from "lottie-react";
import generatingSSAnimation from "../../../lottie/generate-ss-animation.json";
import loadingAnimation from "../../../lottie/loadingAnimation.json";

const AddOnlineCoverageModal = ({
  reducerData,
  isShowModal,
  setIsShowModal,
  onSave,
  UserReducer,
  FoldersReducer,
}) => {
  const [urlsList, setUrlsList] = useState([{ url: "" }]);
  const [isApiCall, setIsApiCall] = useState(false);
  const [selected_folder_id, setselected_folder_id] = useState("");
  let [timer, setTimer] = useState(0);
  const history = useHistory();
  const launchTimer = useRef();
  // add input field button ref
  const addBtnRef = useRef();

  let loadingLinesArr = [
    "Please wait...",
    "Processing...",
    "Taking Screenshots...",
    "Let's grab some coffee...",
    "Loading...",
  ];
  const [punchLines, setPunchLines] = useState(loadingLinesArr[timer]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...urlsList];
    list[index][name] = value;
    setUrlsList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...urlsList];
    list.splice(index, 1);
    setUrlsList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    if (urlsList[urlsList.length - 1].url !== "") {
      setUrlsList([...urlsList, { url: "" }]);
    } else {
      toast.error("Kindly fill the provided input first.", {
        containerId: "modal-toast",
      });
    }
  };

  useEffect(() => {
    setPunchLines(loadingLinesArr[timer]);
    if (timer === loadingLinesArr.length - 1) {
      setTimer(0);
    }
  }, [timer]);

  // useEffect(() => {
  //   return(
  //     clearInterval(launchTimer.current)
  //   )
  // }, []);

  const counter = () => {
    launchTimer.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 5000);
  };

  const _onSave = async (e) => {
    e.preventDefault();
    const isAllFieldsFilled = urlsList.every((item) => {
      return item.url !== "" ? true : false;
    });
    if (isAllFieldsFilled && selected_folder_id !== "") {
      setIsApiCall(true);
      counter();
      try {
        // await urlsList.map((item) => {
        //   new URL(item.url);
        // });
        await urlsList.forEach((item) => {
          new URL(item.url);
        });
        onSave(urlsList,selected_folder_id, setIsApiCall, _closeModal);
        // history.push("/create-cover");
      } catch (error) {
        toast.error("Kindly provide valid urls.", {
          containerId: "modal-toast",
        });
        setIsApiCall(false);
      }
    } else {
      toast.error("Kindly fill all the fields.", {
        containerId: "modal-toast",
      });
      setIsApiCall(false);
    }
  };

  // useEffect(() => {
  //   // console.log(
  //   //   "reducerData.isTakingScreenShots=====================",
  //   //   reducerData
  //   // );
  //   // console.log(reducerData.isTakingScreenShots || !reducerData.isApiCall)
  //   // if (reducerData.isTakingScreenShots && reducerData.isApiCall === false) {
  //   //   console.log("called")
  //   //   _closeModal();
  //   //   history.push("/create-cover");
  //   // }
  // }, [reducerData]);

  const _closeModal = () => {
    setUrlsList([{ url: "" }]);
    setIsShowModal(false);
    clearInterval(launchTimer.current);
  };

  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Add Coverage Modal"
        // onAfterOpen={() => {
        //   counter();
        // }}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          enableMultiContainer
          containerId="modal-toast"
        />

        <div className="modal all-modal parent-class-modal-6">
          <div className="modal-dialog">
            <div className="modal-content">
              {!isApiCall && (
                <button
                  className="close-btn"
                  type="button"
                  onClick={_closeModal}
                >
                  <span>
                    <img loading="lazy" src={CloseIcon} />
                  </span>
                </button>
              )}
              {isApiCall ? (
                <div
                  style={{
                    position: "relative",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "flexStart",
                  }}
                >
                  <Lottie
                    animationData={generatingSSAnimation}
                    style={{
                      width: "50%",
                      position: "absolute",
                    }}
                  />
                  <Lottie
                    animationData={loadingAnimation}
                    style={{
                      position: "absolute",
                      width: "50%",
                    }}
                  />
                  <h6
                    className="text-center position-absolute"
                    style={{ bottom: 0 }}
                  >
                    {punchLines}
                  </h6>
                </div>
              ) : (
                <>
                  <div className="row">
                    <div className="col-lg-12 mb-4">
                      <div className="chnge-title title-bold-size editmetrics">
                        <h3>
                          Paste the URLs to your coverage in here{" "}
                          <span className="text-danger">*</span>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="input-color-label-img">
                        <form onSubmit={(e) => _onSave(e)}>
                          {urlsList.map((x, i) => {
                            return (
                              <div
                                key={i}
                                className="input-common input-change-title input-color my-3 d-flex align-items-center urls-modal"
                              >
                                <input
                                  name="url"
                                  placeholder="Enter Url"
                                  value={x.url}
                                  onChange={(e) => handleInputChange(e, i)}
                                  autoFocus
                                  autoComplete="off"
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addBtnRef.current.click();
                                      // console.log(
                                      //   "workign",
                                      //   addBtnRef.current.click()
                                      // );
                                      // addBtnRef.click()
                                    }
                                  }}
                                />
                                {urlsList.length !== 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveClick(i)}
                                    className="btn btn-md btn-danger rounded-circle ml-1"
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                )}
                                {urlsList.length - 1 === i && (
                                  <button
                                    type="button"
                                    onClick={handleAddClick}
                                    className="btn btn-md btn-primary rounded-circle ml-1"
                                    ref={addBtnRef}
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                )}
                              </div>
                            );
                          })}
                          <div className="input-group mb-3">
                            <select
                              className="custom-select"
                              id="inputGroupSelect01"
                              onChange={(e) =>
                                setselected_folder_id(e.target.value)
                              }
                            >
                              <option selected>Choose folder...</option>
                              {/* <option value={"all"}>All</option> */}
                              {FoldersReducer.map((item, i) => {
                                return (
                                  <option value={item.folders_id} key={i}>
                                    {item.folders_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="col-lg-12">
                            {reducerData?.isTakingScreenShots && (
                              <p className="text-info text-center">
                                Please wait generating screenshots
                              </p>
                            )}
                            <div className="btns-change-title text-right">
                              <button
                                className="btn-reg"
                                onClick={_closeModal}
                                disabled={reducerData?.isTakingScreenShots}
                              >
                                Cancel
                              </button>
                              <button
                                className="btn-reg"
                                type="submit"
                                disabled={reducerData?.isTakingScreenShots}
                              >
                                {reducerData?.isTakingScreenShots ? (
                                  <Spinner />
                                ) : (
                                  "Save"
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
const mapStateToProps = ({ UserReducer, FoldersReducer }) => {
  return { UserReducer, FoldersReducer };
};

export default connect(mapStateToProps, actions)(AddOnlineCoverageModal);
