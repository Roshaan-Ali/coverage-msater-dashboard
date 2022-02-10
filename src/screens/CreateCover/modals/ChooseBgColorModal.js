import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import {
  CloseIcon,
  ColorPen,
  ColorRound,
  TransparentImg,
} from "../../../assets";
import PickColorComp from "../../../components/ModalComponents/PickColorComp";
import { rgbToHex } from "../../../utils";
import { useParams } from "react-router-dom";


const ChooseBgColorModal = ({
  isShowModal,
  setIsShowModal,
  onSave,
  CoverPageReducer,
}) => {
  const [displayBgColorPicker, setDisplayBgColorPicker] = useState(false);
  const [bgColor, setBgColor] = useState("");

  const bgColorRef = useRef();

  const _pickupBgColor = () => {
    bgColorRef.current.click();
  };
  const { cover_id } = useParams();

  useEffect(() => {
    if (isShowModal) {
      setBgColor(CoverPageReducer?.cover_bg_color);
    }
  }, [isShowModal]);

  const _closeModal = () => {
    console.log("close");
    setIsShowModal(false);
  };

  const _onSaveBgColor = () => {
    onSave(`/api/cover/updatecoverbgcolor?cover_id=${cover_id}`,{ cover_bg_color: bgColor });
    _closeModal();
  };

  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Add Background Color Modal"
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
        <div
          className="modal all-modal parent-class-modal-6"
          onClick={(e) => {
            if (
              e.target.closest(".color-picker") === null &&
              displayBgColorPicker
            ) {
              setDisplayBgColorPicker(false);
            }
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <button className="close-btn" type="button" onClick={_closeModal}>
                <span>
                  <img loading="lazy" src={CloseIcon} />
                </span>
              </button>
              <div className="row">
                <div className="col-lg-12 mb-4">
                  <div className="chnge-title title-bold-size editmetrics">
                    <h3>Choose a background colour.</h3>
                  </div>
                  <p>You can do this instead of, or as well as an image...</p>
                </div>
                <div className="col-lg-12">
                  <div className="input-color-label-img">
                    <div className="labeled-text-img">
                      <span>
                        <img src={ColorRound} />
                      </span>
                      <span>Background Color</span>
                    </div>
                    <PickColorComp
                      displayColorPicker={displayBgColorPicker}
                      setDisplayColorPicker={setDisplayBgColorPicker}
                      color={bgColor}
                      setColor={setBgColor}
                      pickClrRef={bgColorRef}
                      isShowTransparentBtn={true}
                    />
                    <div
                      className="input-common input-color mb-mine"
                      onClick={_pickupBgColor}
                    >
                      <>
                        <div className="bd-input-color">
                          <div
                            className="display-color bg-display-color"
                            style={{
                              backgroundColor: bgColor,
                            }}
                          />
                          <input
                            type="text"
                            value={rgbToHex(bgColor)}
                            id="colorkid1"
                            onChange={(e) => {
                              setBgColor(e.target.value);
                            }}
                            disabled
                          />
                        </div>
                      </>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="btns-change-title text-right">
                    <button className="btn-reg" onClick={_closeModal}>
                      Cancel
                    </button>
                    <button className="btn-reg" onClick={_onSaveBgColor}>
                      Save
                    </button>
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

export default ChooseBgColorModal;
