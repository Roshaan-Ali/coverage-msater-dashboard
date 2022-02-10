import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/Actions/Index";
import { useHistory } from "react-router";
import Modal from "react-modal";
import { CloseIcon } from "../../../assets";

const EditFolderModal = ({
  isShowModal,
  setIsShowModal,
  editFolderData,
  setEditFolderData,
  onUpdateFolder,
}) => {
  const [updatedFolderName, setUpdatedFolderName] = useState("");

  const _closeModal = () => {
    setIsShowModal(false);
    setEditFolderData("");
    setUpdatedFolderName("");
  };
  const _onUpdateFolder = () => {
    onUpdateFolder(updatedFolderName);
    _closeModal()
  };

  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Edit Folder"
        onAfterOpen={() => {
          setUpdatedFolderName(editFolderData.folders_name);
        }}
      >
        <div className="modal all-modal parent-class-modal-6">
          <div className="modal-dialog create-folder-dialog">
            <div className="modal-content">
              <button className="close-btn" type="button" onClick={_closeModal}>
                <span>
                  <img loading="lazy" src={CloseIcon} />
                </span>
              </button>
              <div className="row">
                <div className="col-lg-12">
                  <div className="chnge-title title-bold-size editmetrics">
                    <h3>Edit Folder</h3>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-color-label-img">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        _onUpdateFolder()
                      }}
                    >
                      <div className="input-common input-change-title my-3">
                        <input
                          //   name="url"
                          placeholder="Enter Folder Name"
                          value={updatedFolderName}
                          onChange={(e) => setUpdatedFolderName(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div className="col-lg-12">
                        <div className="btns-change-title text-right">
                          <button
                            className="btn-reg"
                            onClick={_closeModal}
                            // disabled={reducerData?.isTakingScreenShots}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn-reg"
                            type="submit"
                            disabled={updatedFolderName === "" ? true : false}
                            // disabled={reducerData?.isTakingScreenShots}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
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

export default EditFolderModal;
