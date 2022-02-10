import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import { CloseIcon } from "../../../assets";

/**
 * isShowModal --- (state for show/hide modal - Required)
 * setIsShowModal --- (function for closing modal - Required)
 * onSave --- (Function for action on save button)
 */

const AddCommentModal = ({
  isShowModal,
  setIsShowModal,
  onSave,
  commentSingleLinkMetrics,
}) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (isShowModal) {
      setComment(commentSingleLinkMetrics);
    }
  }, [isShowModal]);

  const _closeModal = () => {
    setComment("");
    setIsShowModal(false);
  };
  const _onSaveComment = () => {
    onSave(comment);
    _closeModal();
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
        <div className="modal all-modal parent-class-modal-6">
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
                    <h3>Change Metrics For :</h3>
                  </div>
                  <p>
                    {"https://fontawesome.com/v5.15/how-to-use/on-the-web/using-assadasd".substr(
                      0,
                      58
                    )}
                    ...
                  </p>
                </div>
                <div className="col-lg-12">
                  <div className="input-color-label-img">
                    <small
                      className={`float-right ${
                        comment.length >= 250 && "text-danger"
                      }`}
                    >
                      {comment.length}/250
                    </small>
                    <div className="input-common text-area-mine input-color my-3">
                      <textarea
                        type="text"
                        name=""
                        placeholder="Type your comment"
                        onChange={(e) => {
                          if (comment.length < 250) {
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
                    <button className="btn-reg" onClick={_onSaveComment}>
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
