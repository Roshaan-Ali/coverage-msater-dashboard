import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import { CloseIcon } from "../../../assets";
import { isNumber } from "../../../utils";

/**
 * isShowModal --- (state for show/hide modal - Required)
 * setIsShowModal --- (function for closing modal - Required)
 * onSave --- (Function for action on save button)
 */

const EditMetricsModal = ({
  isShowModal,
  setIsShowModal,
  onSave,
  piecesOfCoverage,
  monthlyVisit,
}) => {
  const [estCoveragePieces, setEstCoveragePieces] = useState("");
  const [estCoverageViews, setEstCoverageViews] = useState("");
  const [noError, setNoError] = useState(false);

  const _closeModal = () => {
    setEstCoverageViews("");
    setEstCoveragePieces("");
    setIsShowModal(false);
  };
  const _onSaveMetrics = () => {
    onSave(estCoveragePieces, estCoverageViews);
    _closeModal();
  };
  
  useEffect(() => {
    if (isShowModal) {
      setEstCoveragePieces(piecesOfCoverage);
      setEstCoverageViews(monthlyVisit);
    }
  }, [isShowModal]);

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
                    <div className="input-common input-change-title input-color my-3">
                      <input
                        type="text"
                        value={estCoveragePieces}
                        onChange={(e) => {
                          if (noError) {
                            setEstCoveragePieces(e.target.value);
                          }
                        }}
                        onKeyPress={(e) => {
                          setNoError(isNumber(e));
                        }}
                        placeholder="Estimated pieces of coverage"
                      />
                      {/* {!noError && (
                        <small className="ml-3 text-danger">
                          Accept Only Numbers
                        </small>
                      )} */}
                    </div>
                    <div className="input-common input-change-title input-color my-3">
                      <input
                        type="text"
                        value={estCoverageViews}
                        onChange={(e) => {
                          if (noError) {
                            setEstCoverageViews(e.target.value);
                          }
                        }}
                        onKeyPress={(e) => {
                          setNoError(isNumber(e));
                        }}
                        placeholder="Estimated monthly visits"
                      />
                      {/* {!noError && (
                        <small className="ml-3 text-danger">
                          Accept Only Numbers
                        </small>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="btns-change-title text-right">
                    <button className="btn-reg" onClick={_closeModal}>
                      Cancel
                    </button>
                    <button className="btn-reg" onClick={_onSaveMetrics}>
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

export default EditMetricsModal;
