import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import {
  CloseIcon,
  ColorPen,
  ColorRound,
  TransparentImg,
} from "../../../assets";
import BtnWithLoader from "../../../components/ModalComponents/BtnWithLoader";
import PickColorComp from "../../../components/ModalComponents/PickColorComp";
import { rgbToHex } from "../../../utils";
import { useParams } from "react-router-dom";

Modal.setAppElement("#modal-root");

const EditTitleModal = ({
  isShowModal,
  setIsShowModal,
  onSave,
  CoverPageReducer,
}) => {
  const [title, setTitle] = useState("");
  const [titleClr, setTitleClr] = useState("#000000");
  const [titleBgClr, setTitleBgClr] = useState("#000000");
  const [displayTxtBgColorPicker, setDisplayTxtBgColorPicker] = useState(false);
  const [displayTxtColorPicker, setDisplayTxtColorPicker] = useState(false);
  const { cover_id } = useParams();

  const _onSaveTitle = () => {
    if (title === "") {
      toast.error("Book Name is required", {
        containerId: "modal-toast",
      });
    } else {
      onSave(`/api/cover/updatecovertitle?cover_id=${cover_id}`, {
        cover_title: title,
        cover_title_color: titleClr,
        cover_title_bg_color: titleBgClr,
      }).then(()=>_closeModal());
    }
  };

  useEffect(() => {
    if (isShowModal) {
      setTitleClr(CoverPageReducer?.cover_title_color);
      setTitleBgClr(CoverPageReducer?.cover_title_bg_color);
      setTitle(CoverPageReducer?.cover_title);
    }
  }, [isShowModal]);

  const _closeModal = () => {
    setTitleClr("");
    setTitleBgClr("");
    setTitle("");
    setDisplayTxtBgColorPicker(false);
    setIsShowModal(false);
  };
  const textBgClr = useRef();
  const textClr = useRef();
  const _pickupTxtBgColor = (event) => {
    textBgClr.current.click();
  };
  const _pickupTxtColor = (event) => {
    textClr.current.click();
  };

  return (
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
      <div
        className="modal all-modal parent-class-modal-6 parent-class-modal-7"
        onClick={(e) => {
          if (
            e.target.closest(".color-picker") === null &&
            (displayTxtBgColorPicker || displayTxtColorPicker)
          ) {
            setDisplayTxtBgColorPicker(false);
            setDisplayTxtColorPicker(false);
          }
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <button className="close-btn" type="button" onClick={_closeModal}>
              <span>
                <img src={CloseIcon} />
              </span>
            </button>
            <div className="row">
              <div className="col-lg-12 mb-4">
                <div className="chnge-title title-bold-size editmetrics">
                  <h3>Name Your Coverage Book</h3>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="input-color-label-img">
                  <div className="labeled-text-img">
                    <span>
                      <img src={ColorPen} />
                    </span>
                    <span>Text Color</span>
                  </div>
                  <PickColorComp
                    displayColorPicker={displayTxtColorPicker}
                    setDisplayColorPicker={setDisplayTxtColorPicker}
                    color={titleClr}
                    setColor={setTitleClr}
                    pickClrRef={textClr}
                  />
                  <div
                    className="input-common input-color mb-mine"
                    onClick={_pickupTxtColor}
                  >
                    <div className="bd-input-color">
                      <div
                        className="display-color"
                        style={{ backgroundColor: titleClr }}
                      />
                      <input
                        type="text"
                        id="colorki1"
                        value={rgbToHex(titleClr)}
                        onChange={(e) => setTitleClr(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  {/* <div className="input-common input-color mb-mine">
                    <div className="bd-input-color">
                      <input
                        type="color"
                        id="colorki1"
                        value={titleClr}
                        onChange={(e) => setTitleClr(e.target.value)}
                      />
                    </div>
                    <label htmlFor="colorki1">
                      {titleClr === "" ? "Text Background Color" : titleClr}
                    </label>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="input-color-label-img">
                  <div className="labeled-text-img">
                    <span>
                      <img src={ColorRound} />
                    </span>
                    <span>Text Background Color</span>
                  </div>
                  <PickColorComp
                    displayColorPicker={displayTxtBgColorPicker}
                    setDisplayColorPicker={setDisplayTxtBgColorPicker}
                    color={titleBgClr}
                    setColor={setTitleBgClr}
                    pickClrRef={textBgClr}
                    isShowTransparentBtn={true}
                  />
                  <div className="input-common input-color mb-mine">
                    <div className="bd-input-color" onClick={_pickupTxtBgColor}>
                      <div
                        className="display-color"
                        style={{ backgroundColor: titleBgClr }}
                      />
                      <input
                        type="text"
                        id="colorki2"
                        value={rgbToHex(titleBgClr)}
                        onChange={(e) => setTitleBgClr(e.target.value)}
                        placeholder="Background Color"
                        disabled
                      />
                      {/* <button className="btn btn-sm btn-light"><small>Transparent</small></button> */}
                    </div>
                  </div>
                  {/* <div className="input-common input-color mb-mine">
                    <div className="bd-input-color">
                      {titleBgClr === "" && <img src={TransparentImg} />}
                      <input
                        type="color"
                        id="colorki2"
                        value={titleBgClr}
                        onChange={(e) => setTitleBgClr(e.target.value)}
                        style={{
                          visibility: titleBgClr === "" ? "hidden" : "visible",
                        }}
                      />
                    </div>
                    <label
                      htmlFor="colorki2"
                      className="d-flex align-items-center justify-content-between"
                    >
                      {titleBgClr === "" ? "Background Color" : titleBgClr}
                      <button
                        className="btn btn-sm"
                        onClick={() => setTitleBgClr("")}
                      >
                        clear
                      </button>
                    </label>
                  </div> */}
                </div>
              </div>

              <div className="col-lg-12">
                <div className="input-color-label-img">
                  <div className="input-common input-change-title input-color my-3">
                    <div className="input-flex-head">
                      <h3>Name My Book</h3>
                    </div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => {
                        title.length < 90 && setTitle(e.target.value);
                      }}
                      placeholder="My Book"
                    />
                    <small
                      className={`float-right mr-4 mt-2 mb-2 ${
                        title.length === 90 && "text-danger"
                      }`}
                    >
                      {title.length}/90
                    </small>
                  </div>
                </div>
              </div>

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
                      _onSaveTitle();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditTitleModal;
