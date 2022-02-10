import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import {
  CloseIcon,
  ColorPen,
  ColorRound,
  ImageIcon,
  TransparentImg,
} from "../../../assets";
import BtnWithLoader from "../../../components/ModalComponents/BtnWithLoader";
import Cropper from "react-cropper";
import { baseUrl } from "../../../config/config.json";

const CropImgModal = ({
  isShowModal,
  setIsShowModal,
  onSave,
  originalImage,
}) => {
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState("");

  useEffect(() => {
    if (isShowModal) {
      setImage(`${baseUrl}${originalImage}`);
    }
  }, [isShowModal]);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const _getCropData = () => {
    if (typeof cropper !== "undefined") {
      // const aaa = cropper.getCroppedCanvas().toDataURL();
      // fetch(aaa)
      //   .then((res) => res.blob())
      //   .then((blob) => {
      //     // console.log(URL.createObjectURL(blob));
      //     const file = new File([blob], "File name",{ type: "image/png" })
      //     console.log(file)
      //   });
      console.log(cropper.getCroppedCanvas());
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const _closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Edit Title Modal"
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
        <div className="modal all-modal parent-class-modal-6 parent-class-modal-7">
          <div className="modal-dialog">
            <div
              className="modal-content"
              // crop-image-modal
            >
              <button className="close-btn" type="button" onClick={_closeModal}>
                <span>
                  <img src={CloseIcon} />
                </span>
              </button>

              <div className="row">
                <div className="col-lg-12 mb-4">
                  <div className="chnge-title title-bold-size editmetrics">
                    <h3>Crop Image</h3>
                  </div>
                  <button
                    className="btn btn-sm btn-primary mb-2"
                    onClick={_getCropData}
                  >
                    Crop
                  </button>
                </div>
                <div className="col-lg-6 col-md-6">
                  <h6 style={{ color: "#1c005b", fontWeight: "bold" }}>
                    Actual Image
                  </h6>
                  <div className="crop-image-modal">
                    <Cropper
                      // style={{ height: "auto", width: "100%" }}
                      initialAspectRatio={1}
                      src={image}
                      viewMode={1}
                      preview=".img-preview"
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      zoomable={false}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      onInitialized={(instance) => {
                        setCropper(instance);
                        console.log({ instanceeeeeeeeeeeeeeee: instance });
                      }}
                      guides={false}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <h6 style={{ color: "#1c005b", fontWeight: "bold" }}>
                    Cropped Image
                  </h6>
                  <div style={{ width: "100%", height: "100%" }}>
                    {cropData !== "" ? (
                      <img
                        style={{ width: "70%", height: "auto" }}
                        src={cropData}
                        alt="cropped"
                      />
                    ) : (
                      <img
                        style={{
                          width: "50%",
                          height: "auto",
                          display: "block",
                          margin: "auto",
                        }}
                        src={ImageIcon}
                        alt="cropped"
                      />
                    )}
                    {/* <div
                      className="box"
                      style={{ width: "50%", float: "right" }}
                    >
                      <div
                        className="img-preview"
                        style={{
                          width: "100%",
                          float: "left",
                          height: "300px",
                        }}
                      />
                    </div>
                  </div> */}
                  </div>
                </div>
                {/* </div> */}
                <div className="col-lg-12">
                  <div className="btns-change-title text-right">
                    <BtnWithLoader
                      label="Cancel"
                      onClickBtn={() => {
                        _closeModal();
                      }}
                    />
                    <BtnWithLoader
                      label="Save"
                      onClickBtn={() => {
                        onSave(cropData);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* <img style={{ width: "100%" }} src={cropData} alt="cropped" /> */}
    </>
  );
};

export default CropImgModal;
