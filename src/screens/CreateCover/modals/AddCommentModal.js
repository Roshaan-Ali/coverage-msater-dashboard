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
// import { SketchPicker } from "react-color";
/**
 * isShowModal --- (state for show/hide modal - Required)
 * setIsShowModal --- (function for closing modal - Required)
 * onSave --- (Function for action on save button)
 */

const AddCommentModal = ({
  isShowModal,
  setIsShowModal,
  onSave,
  CoverPageReducer,
}) => {
  const [textClr, setTextClr] = useState("");
  const [textBgClr, setTextBgClr] = useState("");
  const [commentTitle, setCommentTitle] = useState("");
  const [comment, setComment] = useState("");

  const [displayTxtColorPicker, setDisplayTxtColorPicker] = useState(false);
  const [displayTxtBgColorPicker, setDisplayTxtBgColorPicker] = useState(false);
  const textColorRef = useRef();
  const textBgColorRef = useRef();
  const _pickupTxtColor = () => {
    textColorRef.current.click();
  };
  const _pickupTxtBgColor = () => {
    textBgColorRef.current.click();
  };
  const { cover_id } = useParams();

  useEffect(() => {
    if (isShowModal) {
      setTextClr(CoverPageReducer?.cover_comment_text_color);
      setTextBgClr(CoverPageReducer?.cover_comment_bg_color);
      setCommentTitle(CoverPageReducer?.cover_comment_title);
      setComment(CoverPageReducer?.cover_comment);
    }
  }, [isShowModal]);

  const _closeModal = () => {
    setTextClr("");
    setTextBgClr("");
    setCommentTitle("");
    setComment("");
    setDisplayTxtColorPicker(false);
    setDisplayTxtBgColorPicker(false);
    setIsShowModal(false);
  };
  const _onSaveCommnet = () => {
    onSave(`/api/cover/updatecovercomment?cover_id=${cover_id}`,{
      cover_comment_text_color: textClr,
      cover_comment_bg_color: textBgClr,
      cover_comment_title: commentTitle,
      cover_comment: comment,
    });
    _closeModal();
  };
  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Add Comment Modal"
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
            // console.log(e.target.closest(".color-picker"));
            if (
              e.target.closest(".color-picker") === null &&
              (displayTxtColorPicker || displayTxtBgColorPicker)
            ) {
              setDisplayTxtColorPicker(false);
              setDisplayTxtBgColorPicker(false);
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
                    <h3>Add a comment to your front cover.</h3>
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
                      color={textClr}
                      setColor={setTextClr}
                      pickClrRef={textColorRef}
                    />
                    <div
                      className="input-common input-color mb-mine"
                      onClick={_pickupTxtColor}
                    >
                      <div className="bd-input-color">
                        <div
                          className="display-color"
                          style={{ backgroundColor: textClr }}
                        />
                        {/* <input
                          type="text"
                          value={rgbToHex(textClr)}
                          id="colorki1"
                          onChange={(e) => {
                            setTextClr(e.target.value);
                          }}
                          disabled
                        /> */}
                        <input
                          type="text"
                          value={rgbToHex(textClr)}
                          id="colorki1"
                          onChange={(e) => {
                            setTextClr(e.target.value);
                            console.log("textcolor----------------------",e.target.value)
                          }}
                          disabled
                        />
                      </div>
                      {/* <label htmlFor="colorki1">
                        {textClr === "" ? "Text Background Color" : textClr}
                      </label> */}
                    </div>
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
                      color={textBgClr}
                      setColor={setTextBgClr}
                      pickClrRef={textBgColorRef}
                      isShowTransparentBtn={true}
                    />
                    <div
                      className="input-common input-color mb-mine"
                      onClick={_pickupTxtBgColor}
                    >
                      <div className="bd-input-color">
                        {/* {textBgClr === "" && <img src={TransparentImg} />} */}
                        <div
                          className="display-color"
                          style={{ backgroundColor: textBgClr }}
                        />
                        <input
                          type="text"
                          id="colorki2"
                          onChange={(e) => setTextBgClr(e.target.value)}
                          value={rgbToHex(textBgClr)}
                          // style={{
                          //   visibility: textBgClr === "" ? "hidden" : "visible",
                          // }}
                          disabled
                        />
                      </div>
                      {/* <label
                        htmlFor="colorki2"
                        className="d-flex align-items-center justify-content-between"
                      >
                        {textBgClr === "" ? "Background Color" : textBgClr}
                        <button
                          className="btn btn-sm"
                          onClick={() => setTextBgClr("")}
                        >
                          clear
                        </button>
                      </label> */}
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="input-color-label-img">
                    <div className="input-common input-change-title input-color my-3">
                      <div className="input-flex-head">
                        <h3>Comment Title</h3>
                        <p>(145 characters)</p>
                      </div>
                      <input
                        type="text"
                        onChange={(e) => {
                          if (commentTitle.length <= 145) {
                            setCommentTitle(e.target.value);
                          } else {
                            toast.error("You reached the character limit.", {
                              containerId: "modal-toast",
                            });
                          }
                        }}
                        placeholder="Your Title"
                        value={commentTitle}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="input-color-label-img">
                    <div className="input-common text-area-mine input-color my-3">
                      <div className="input-flex-head">
                        <h3>Comment</h3>
                        <p>(750 characters)</p>
                      </div>
                      <textarea
                        type="text"
                        name=""
                        placeholder="Type your comment"
                        onChange={(e) => {
                          if (comment.length <= 750) {
                            setComment(e.target.value);
                          } else {
                            toast.error("You reached the character limit.", {
                              containerId: "modal-toast",
                            });
                          }
                        }}
                        value={comment}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="btns-change-title text-right">
                    <button className="btn-reg" onClick={_closeModal}>
                      Cancel
                    </button>
                    <button className="btn-reg" onClick={_onSaveCommnet}>
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

export default AddCommentModal;
