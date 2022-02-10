import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-modal";
import {
  CloseIcon,
  Modal1,
  Modal2,
  Modal3,
  Modal4,
  Modal5,
  Modal6,
  Selected,
} from "../../../assets";
import BtnWithLoader from "../../../components/ModalComponents/BtnWithLoader";
import UploadFileComp from "../../../components/UploadFileComp";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../config/config.json";
import * as actions from "../../../store/Actions/Index";
import { connect } from "react-redux";

const ChangeBgImgModal = ({
  isShowModal,
  setIsShowModal,
  CoverPageReducer,
  onSave,
  getDefaultBgImages,
  DefaultBgImgReducer,
}) => {
  // State
  const [bgImgForApi, setbgImgForApi] = useState(""); // to send image to parent satte
  const [selectedBgImage, setSelectedBgImage] = useState(""); // to preview selected image
  const [bgImgData, setBgImgData] = useState([]); // to preview selected image

  // Components Data
  // const bgImgData = [
  //   { id: 1, bgImg: Modal1 },
  //   { id: 2, bgImg: Modal2 },
  //   { id: 3, bgImg: Modal3 },
  //   { id: 4, bgImg: Modal4 },
  //   { id: 5, bgImg: Modal5 },
  //   { id: 6, bgImg: Modal6 },
  // ];

  const hiddenFileInput = useRef();
  const { cover_id } = useParams();

  useEffect(() => {
    // setSelectedBgImage(CoverPageReducer.frontCoverBgImagePreview);
    console.log(CoverPageReducer?.cover_bg_image);
    CoverPageReducer?.cover_bg_image &&
      setSelectedBgImage(
        `${baseUrl}/${CoverPageReducer?.cover_bg_image?.replace(
          "uploads",
          "uploads/"
        )}`
      );
  }, [isShowModal]);

  useEffect(() => {
    // getDefaultBgImages("/api/coverbgimage/get");
    setBgImgData(DefaultBgImgReducer);
  }, [DefaultBgImgReducer]);

  const _closeModal = () => {
    setSelectedBgImage("");
    setbgImgForApi("");
    setIsShowModal(false);
  };

  const _clickOnUploadBg = (event) => {
    hiddenFileInput.current.click();
  };

  const _handleUploadImage = (event) => {
    if (event?.target?.files.length > 0) {
      const imageUploaded = event.target.files[0];
      if (!imageUploaded.name.match(/\.(jpg|jpeg|png|gif|PNG)$/)) {
        toast.error(
          "This file format is not accepted. The accepted file types are .bmp,.jpg,.jpeg,.gif,.png !",
          {
            containerId: "modal-toast",
          }
        );
      } else {
        let reader = new FileReader();
        reader.onloadend = () => {
          setbgImgForApi(imageUploaded);
          setSelectedBgImage(reader.result);
        };
        reader.readAsDataURL(imageUploaded);
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Example Modal"
        onAfterOpen={() => getDefaultBgImages("/api/coverbgimage/get")}
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
        <div className="modal all-modal parent-class-modal-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <button
                className="close-btn"
                type="button"
                data-dismiss="modal"
                onClick={_closeModal}
              >
                <span>
                  <img src={CloseIcon} />
                </span>
              </button>
              <div className="row">
                <div className="col-lg-12">
                  <div className="modal-heading-with-button">
                    <div className="part-1">
                      <h3>Edit Background Image</h3>
                    </div>
                    <div className="part-2">
                      <UploadFileComp
                        hiddenFileRef={hiddenFileInput}
                        handleUpload={_handleUploadImage}
                      />
                      <button
                        className="btn-reg btn-upload-modal"
                        onClick={_clickOnUploadBg}
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-5">
                  {console.log(
                    selectedBgImage,
                    "-------------------------------------"
                  )}
                  {(selectedBgImage !== null || selectedBgImage !== "") && (
                    <div className="current-image">
                      <h4>Current Image</h4>
                      <img src={selectedBgImage} />
                      <BtnWithLoader
                        label="Remove Image"
                        passedStyle="btn-remove-modal"
                        onClickBtn={() => {
                          // onSave("", "");
                          // onSave({
                          //   frontCoverBgImagePreview: "",
                          //   cover_bg_image: "",
                          // });
                          setbgImgForApi("");
                          setSelectedBgImage(null);
                          // _closeModal();
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="col-lg-6 col-md-7 sm-margin">
                  <div className="current-image font-weight">
                    <h4>Or use one of these suggested images</h4>
                    <div className="multiple-images">
                      {bgImgData.map((item, i) => {
                        return (
                          <div key={i}>
                            <button
                              onClick={() => {
                                console.log(
                                  baseUrl +
                                    "/" +
                                    item.cover_bg_image_url.replace(
                                      "uploads",
                                      "uploads/"
                                    )
                                );
                                setSelectedBgImage(
                                  baseUrl +
                                    "/" +
                                    item.cover_bg_image_url.replace(
                                      "uploads",
                                      "uploads/"
                                    )
                                );
                                setbgImgForApi(
                                  baseUrl +
                                    "/" +
                                    item.cover_bg_image_url.replace(
                                      "uploads",
                                      "uploads/"
                                    )
                                );
                              }}
                            >
                              <img
                                src={
                                  baseUrl +
                                  "/" +
                                  item.cover_bg_image_url.replace(
                                    "uploads",
                                    "uploads/"
                                  )
                                }
                                loading="lazy"
                              />
                              {selectedBgImage ===
                                baseUrl +
                                  "/" +
                                  item.cover_bg_image_url.replace(
                                    "uploads",
                                    "uploads/"
                                  ) && (
                                <img className="tick-mark" src={Selected} />
                              )}
                              {/* {selectedBgImage === item.bgImg && (
                                <img className="tick-mark" src={Selected} />
                              )} */}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <BtnWithLoader
                      label="Save Image"
                      onClickBtn={() => {
                        // onSave(bgImgForApi, selectedBgImage);
                        let bgImgFrmData = new FormData();
                        bgImgFrmData.append("cover_bg_image", bgImgForApi);
                        onSave(
                          `/api/cover/updatecoverbgimage?cover_id=${cover_id}`,
                          bgImgFrmData
                        ).then(() => _closeModal());
                        // onSave(`/api/cover/updatecoverbgimage?cover_id=${cover_id}`,{
                        //   cover_bg_image: bgImgForApi,
                        //   frontCoverBgImagePreview: selectedBgImage,
                        // });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

// export default Coverbook;
const mapStateToProps = ({ DefaultBgImgReducer }) => {
  return { DefaultBgImgReducer };
};

export default connect(mapStateToProps, actions)(ChangeBgImgModal);
