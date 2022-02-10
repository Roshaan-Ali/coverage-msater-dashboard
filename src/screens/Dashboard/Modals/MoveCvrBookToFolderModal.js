import React, { useEffect, useRef, useState } from "react";
// Modal
import Modal from "react-modal";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const MoveCvrBookToFolderModal = ({
  setIsShowModal,
  isShowModal,
  FoldersReducer,
  coverDetail,
  setCoverDetail,
  onClickMove
}) => {
  const [folder_id, setFolder_id] = useState("");
  const _closeModal = () => {
    setFolder_id("");
    setCoverDetail("");
    setIsShowModal(false);
  };

  const _onMove = () => {
    if (folder_id === "") {
      toast.error("Kindly select folder", {
        containerId: "invite-modal-toast",
      });
    } else {
      onClickMove(folder_id,coverDetail?.cover_id)
    }
  };
  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Confirm Delete Cover"
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
          containerId="invite-modal-toast"
        />
        <div className="modal all-modal parent-class-modal-6">
          <div className="modal-dialog alert-delete-cover-modal-dialog">
            <div className="modal-content">
              <h3 className="font-weight-bold">Move Coverbook</h3>
              <p className="font-weight-bold">
                Cover Title:{" "}
                <span className="font-weight-light">{coverDetail?.title}</span>
              </p>
              <select
                className="custom-select"
                id="inputGroupSelect01"
                onChange={(e) => setFolder_id(e.target.value)}
              >
                <option selected>Choose folder...</option>
                {FoldersReducer.map((item, i) => {
                  return (
                    <option value={item.folders_id} key={i}>
                      {item.folders_name}
                    </option>
                  );
                })}
              </select>
              <div className="col-lg-12">
                <div className="btns-change-title">
                  <button
                    className="btn-reg"
                    onClick={_closeModal}
                    // disabled={isApiCall}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-reg"
                    onClick={() => {
                      _onMove();
                    }}
                    // disabled={isApiCall}
                  >
                    Move
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ FoldersReducer }) => {
  return {
    FoldersReducer,
  };
};
export default connect(mapStateToProps, null)(MoveCvrBookToFolderModal);
