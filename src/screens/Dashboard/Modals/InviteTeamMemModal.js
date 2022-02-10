import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/Actions/Index";
import { useHistory } from "react-router";
import Modal from "react-modal";
import { CloseIcon } from "../../../assets";
import { toast, ToastContainer } from "react-toastify";

const InviteTeamMemModal = ({
  isShowModal,
  setIsShowModal,
  onInvite,
  UserReducer,
}) => {
  const [userName, setUserName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const _closeModal = () => {
    setIsShowModal(false);
  };
  const { user_id } = UserReducer;
  const re_email =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const send_invite = (e) => {
    e.preventDefault();
    if (userName === "" || inviteEmail === "") {
      toast.error("User Name and Email is required!", {
        containerId: "invite-modal-toast",
      });
    } else if (!re_email.test(inviteEmail)) {
      toast.error("Provide a valid email!", {
        containerId: "invite-modal-toast",
      });
    } else {
      onInvite({ userName, inviteEmail, userId: user_id }).then(() =>
        _closeModal()
      );
    }
  };

  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Create Folder"
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
          <div className="modal-dialog invite-member-dialog">
            <div className="modal-content">
              <button className="close-btn" type="button" onClick={_closeModal}>
                <span>
                  <img loading="lazy" src={CloseIcon} />
                </span>
              </button>
              <div className="row invite-member-email">
                <div className="col-lg-12">
                  <div className="chnge-title title-bold-size">
                    <h3>
                      Invite your team members to your Coverage Master account.
                    </h3>
                  </div>
                </div>
                <div className="col-lg-12">
                  {/* -------------- */}
                  {/* <div className="input-color-label-img"> */}
                  <form
                    onSubmit={(e) => {
                      send_invite(e);
                      // onCreateFolder({ id: 4, name: folderName });
                      // _closeModal();
                    }}
                  >
                    <div className="input-common input-change-title my-3">
                      <input
                        placeholder="Enter User Name *"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="input-common input-change-title my-3">
                      <input
                        placeholder="Email *"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
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
                          // disabled={reducerData?.isTakingScreenShots}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* </div> */}

                  {/* -------------- */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ UserReducer }) => {
  return { UserReducer };
};

export default connect(mapStateToProps, actions)(InviteTeamMemModal);
