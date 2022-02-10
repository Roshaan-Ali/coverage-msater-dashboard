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

const AddOfflineCoverage = ({
  isShowModal,
  setIsShowModal,
  create_offline_coverage,
  UserReducer,
  isFetchCoverBooks,
  FoldersReducer,
}) => {
  const [folderName, setFolderName] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [isApiCall, setIsApiCall] = useState(false);
  let [timer, setTimer] = useState(0);
  const { user_id } = UserReducer;
  const launchTimer = useRef();
  const uploadImgRef = useRef();

  let loadingLinesArr = [
    "Please wait...",
    "Processing...",
    "Taking Screenshots...",
    "Let's grab some coffee...",
    "Loading...",
  ];
  const [punchLines, setPunchLines] = useState(loadingLinesArr[timer]);

  useEffect(() => {
    setPunchLines(loadingLinesArr[timer]);
    if (timer === loadingLinesArr.length - 1) {
      setTimer(0);
    }
  }, [timer]);

  const counter = () => {
    launchTimer.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 5000);
  };

  const _closeModal = () => {
    setIsShowModal(false);
    setIsApiCall(false);
    setImageFiles([]);
    clearInterval(launchTimer.current);
  };

  const uploadImages = (files) => {
    let copyImages = [...imageFiles];
    for (const item in files) {
      if (Object.hasOwnProperty.call(files, item)) {
        copyImages.push(files[item]);
      }
    }
    setImageFiles(copyImages);
  };

  const _addOfflineCoverage = () => {
    if (folderName === "") {
      toast.error("Kindly select folder.", {
        containerId: "modal-toast",
      });
    } else if (imageFiles.length === 0) {
      toast.error("Kindly upload images.", {
        containerId: "modal-toast",
      });
    } else {
      setIsApiCall(true);
      counter();
      let offline_coverage_data = new FormData();
      offline_coverage_data.append("user_id", user_id);
      offline_coverage_data.append("folder_id", folderName);
      for (var i = 0; i < imageFiles.length; i++) {
        offline_coverage_data.append("fileScreen", imageFiles[i]);
      }
      create_offline_coverage(offline_coverage_data, !isFetchCoverBooks).then(
        () => {
          setIsApiCall(false);
          _closeModal();
        }
      );
    }
  };

  const _removeUploadedScreenShot = (index) => {
    let data = [...imageFiles];
    data.splice(index, 1);
    setImageFiles(data);
  };

  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Create Folder"
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
          <div className="modal-dialog create-folder-dialog">
            <div className="modal-content">
              {!isApiCall ? (
                <>
                  <button
                    className="close-btn"
                    type="button"
                    onClick={_closeModal}
                  >
                    <span>
                      <img loading="lazy" src={CloseIcon} />
                    </span>
                  </button>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="chnge-title title-bold-size editmetrics">
                        <h3>
                          Add offline coverage{" "}
                          <span className="text-danger">*</span>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div>
                       <span onClick={()=>{uploadImgRef.current.click()}} className="custom-drop">
                          {/* <input
                            type="file"
                            class="form-control-file text-primary font-weight-bold offiline-cov-input"
                            id="inputFile"
                            accept="image/*"
                            data-title="Drag and drop a file"
                            multiple=""
                            onChange={(e) => {
                              uploadImages(e.target.files);
                            }}
                          /> */}
                          <div  className="form-control-file text-primary font-weight-bold offiline-cov-input"></div>
                        </span> 
                        <input
                        style={{display:"none"}}
                          type="file" accept="image/*" ref={uploadImgRef} multiple onChange={(e) => {
                            uploadImages(e.target.files);
                          }}/>


                        {/* <input
                          type="file"
                          className="form-control-file text-primary font-weight-bold offiline-cov-input"
                          id="inputFile"
                          accept="image/*"
                          onChange={(e) => {
                            uploadImages(e.target.files);
                          }}
                          data-title="Drag and drop a file"
                          multiple
                        />  */}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-group mb-3">
                        <select
                          className="custom-select"
                          id="inputGroupSelect01"
                          onChange={(e) => {
                            console.log(e.target.value);
                            setFolderName(e.target.value);
                          }}
                        >
                          <option value="" selected>
                            Choose folder...
                          </option>
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
                    </div>
                    <div className="col-lg-12">
                      {imageFiles.map((item, i) => {
                        return (
                          <div key={i} className="upload-offline-screenshots">
                            <p className="mb-0">
                              {item.name.length <= 15
                                ? item.name
                                : `${item.name.substr(0, 15)}...`}
                            </p>
                            <i
                              className="fas fa-times float-right"
                              onClick={() => _removeUploadedScreenShot(i)}
                            ></i>
                          </div>
                        );
                      })}
                    </div>
                    <div className="col-lg-12">
                      <div className="btns-change-title text-right">
                        <button
                          className="btn-reg"
                          onClick={() => _closeModal()}
                          disabled={isApiCall}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn-reg"
                          onClick={() => _addOfflineCoverage()}
                          disabled={isApiCall}
                        >
                          {isApiCall ? <Spinner /> : "Save"}
                          {/* Save */}
                        </button>
                      </div>
                    </div>
                  </div>{" "}
                </>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = ({
  UserReducer,
  CoverBooksReducer,
  FoldersReducer,
}) => {
  return {
    UserReducer,
    isFetchCoverBooks: CoverBooksReducer.isFetchCoverBooks,
    FoldersReducer,
  };
};

export default connect(mapStateToProps, actions)(AddOfflineCoverage);
