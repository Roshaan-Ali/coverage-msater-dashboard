import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import { CloseIcon } from "../../../assets";
import BtnWithLoader from "../../../components/ModalComponents/BtnWithLoader";
import { v4 as uuidv4 } from "uuid";

/**
 * isShowModal --- (state for show/hide modal - Required)
 * setIsShowModal --- (function for closing modal - Required)
 * onSave --- (Function for action on save button)
 * closeModal --- (Function for closing modal and setting editable to false)
 */

const AddMetricModal = ({
  isShowModal,
  closeModal,
  onSave,
  isEdittingMetric,
  editModalData,
}) => {
  // const [metricNo, setMetricNo] = useState("");
  // const [metricLabel, setMetricLabel] = useState("");
  // const [metricDescptn, setMetricDescptn] = useState("");
  const [metricData, setMetricData] = useState({
    cover_metric_count: "",
    cover_metric_label: "",
    cover_metric_description: "",
    cover_metric_hide: 0,
    cover_metric_is_edit: 1,
    id: uuidv4(),
  });

  const setter = (k, v) => setMetricData({ ...metricData, [k]: v });

  const _closeModal = () => {
    setMetricData({
      cover_metric_count: "",
      cover_metric_label: "",
      cover_metric_description: "",
      cover_metric_hide: 0,
      cover_metric_is_edit: 1,
      id: "",
    });
    closeModal();
  };

  useEffect(() => {
    if (isEdittingMetric) {
      setMetricData(editModalData);
    }
  }, [isShowModal]);

  const _onSaveMetric = () => {
    if (
      metricData.cover_metric_count !== "" &&
      metricData.cover_metric_label !== ""
    ) {
      if (/^[0-9]*$/.test(metricData.cover_metric_count) === false) {
        return toast.error("Metric Number should be number", {
          containerId: "modal-toast",
        });
      }
      // onSave(uuidv4(), metricNo, metricLabel, metricDescptn, 1, 0);
      onSave(metricData);
      // onSave(metricNo, metricLabel, metricDescptn, 0, 1);
      _closeModal();
    } else {
      toast.error("Metric Number and metric label is required", {
        containerId: "modal-toast",
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={isShowModal}
        onRequestClose={_closeModal}
        contentLabel="Add Metrics Modal"
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
        <div className="modal all-modal parent-class-modal-3">
          <div className="modal-dialog">
            <div className="modal-content">
              <button className="close-btn" type="button" onClick={_closeModal}>
                <span>
                  <img src={CloseIcon} />
                </span>
              </button>
              <div className="row">
                <div className="col-lg-12">
                  <div className="chnge-title title-bold-size">
                    <h3>Add your own custom metric to your summary</h3>
                  </div>
                  <div className="input-common input-change-title mb-mine">
                    <label>Metric number</label>
                    <input
                      type="text"
                      // value={metricNo}
                      // onChange={(e) => setMetricNo(e.target.value)}
                      name="cover_metric_count"
                      value={metricData.cover_metric_count}
                      onChange={(e) =>
                        e.target.value.length <= 15 &&
                        setter(e.target.name, e.target.value)
                      }
                      placeholder="e.g. 123,233"
                    />
                  </div>
                  <div className="input-common input-change-title mb-mine">
                    <label>Metric label</label>
                    <input
                      type="text"
                      // value={metricLabel}
                      // onChange={(e) => setMetricLabel(e.target.value)}
                      value={metricData.cover_metric_label}
                      onChange={(e) =>
                        e.target.value.length <= 40 &&
                        setter(e.target.name, e.target.value)
                      }
                      name="cover_metric_label"
                      placeholder="e.g. Retweets"
                    />
                  </div>
                  <div className="input-common input-change-title mb-mine text-area-mine">
                    <label>Description for back of card (optional)</label>
                    <textarea
                      // value={metricDescptn}
                      // onChange={(e) => setMetricDescptn(e.target.value)}
                      value={metricData.cover_metric_description}
                      onChange={(e) => setter(e.target.name, e.target.value)}
                      name="cover_metric_description"
                      placeholder="E.g. Definition of metric, source of data.. or whatever you like."
                    ></textarea>
                  </div>
                  <div className="btns-change-title text-right">
                    <button className="btn-reg" onClick={_closeModal}>
                      Cancel
                    </button>
                    <BtnWithLoader label="Save" onClickBtn={_onSaveMetric} />
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

export default AddMetricModal;
