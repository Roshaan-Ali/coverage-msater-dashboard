import React, { useEffect, useRef, useState } from "react";
// Modal
import Modal from "react-modal";

const ConfirmDelCoverbookModal = ({ setIsShowModal, isShowModal,onClickOk,isApiCall }) => {
  const _closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Confirm Delete Cover"
      >
        <div className="modal all-modal parent-class-modal-6">
          <div className="modal-dialog alert-delete-cover-modal-dialog">
            <div className="modal-content">
              <h5>
                <i class="fas fa-exclamation-triangle"></i> Warning
              </h5>
              <p className="mb-0">
                Are you sure, you want to delete these coverbooks?
              </p>
              <p className="mb-0">This action is not revertable!</p>
              <div className="col-lg-12">
                <div className="btns-change-title">
                  <button
                    className="btn-reg"
                    onClick={_closeModal}
                    disabled={isApiCall}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-reg"
                    onClick={()=>{onClickOk()}}
                    disabled={isApiCall}
                  >
                    Delete
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

export default ConfirmDelCoverbookModal;
