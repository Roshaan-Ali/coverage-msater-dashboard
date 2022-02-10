import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/Actions/Index";
import { useHistory } from "react-router";
import Modal from "react-modal";
import { CloseIcon } from "../../../assets";

const AddFolderModal = ({
  isShowModal,
  setIsShowModal,
  onCreateFolder,
  create_new_folder,
  // isEditFolder,
  // setIsEditFolder,
  // editFolderData,
  // setEditFolderData,
}) => {
  const [folderName, setFolderName] = useState("");
  const _closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Create Folder"
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
                    <h3>
                      Create Folder <span className="text-danger">*</span>
                    </h3>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-color-label-img">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        onCreateFolder(folderName);
                        // create_new_folder(folderName).then(() => {
                        //   _closeModal();
                        // });
                      }}
                    >
                      <div className="input-common input-change-title my-3">
                        <input
                          //   name="url"
                          placeholder="Enter Folder Name"
                          value={folderName}
                          onChange={(e) => setFolderName(e.target.value)}
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
                            disabled={folderName === "" ? true : false}
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

export default connect(null, actions)(AddFolderModal);
