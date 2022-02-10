import React, { useState } from "react";
// Redux
import { connect } from "react-redux";
import * as actions from "../../store/Actions/Index";
import { Folder_pupr } from "../../assets";
import { numFormatter } from "../../utils";
// import ChatNowComp from "../../components/ChatNowComp";
import AddMetricModal from "./modals/AddMetricModal";
import Modal from "react-modal";
import VerticalFlipableComp from "../../components/VerticalFlipableComp";
import { v4 as uuidv4 } from "uuid";
// import AddCustomMetricModal from "./AddCustomMetricModal";
// import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

Modal.setAppElement(document.getElementById("modal-root"));

const MetricsSec = React.forwardRef(
  ({ MetricsReducer, addNewMetric, updateMetric }, ref) => {
    // states
    // const [metricsData, setMetricsData] = useState([
    //   { quantityNo: 60, label: "Pieces Of Coverage" },
    //   { quantityNo: 328511, label: "Estimate Coverage Views" },
    //   { quantityNo: 6359669, label: "Social Share" },
    //   { quantityNo: 4000, label: "Revenue" },
    // ]);
    const [isShowAddMetricModal, setIsShowAddMetricModal] = useState(false);
    const [isSocialMetricShow, setIsSocialMetricShow] = useState(true);
    const [isMetricEdit, setIsMetricEdit] = useState(false);
    const [editMetricId, setEditMetricId] = useState("");
    const { cover_id } = useParams();

    // const saveMetric = (metricNo, metricLabel, metricDesrcp, savingDone) => {
    //   setTimeout(() => {
    //     let data = [
    //       ...metricsData,
    //       {
    //         quantityNo: Number(metricNo),
    //         label: metricLabel,
    //         descrptn: metricDesrcp,
    //       },
    //     ];
    //     console.log({ data: data });
    //     setMetricsData(data);
    //     savingDone();
    //     setIsShowAddMetricModal(false);
    //   }, 2000);
    // };

    // const _closeAddMetricModal = () => {
    //   setIsShowAddMetricModal(false);
    // };
    const _closeMetricModal = () => {
      setIsShowAddMetricModal(false);
      setIsMetricEdit(false);
      setEditMetricId("");
    };
    const _addMetric = (data) => {
      !isMetricEdit
        ? addNewMetric(`/api/covermetric/create?cover_id=${cover_id}`, data)
        : updateMetric(
            `/api/covermetric/update?cover_id=${cover_id}&cover_metric_id=${data.cover_metric_id}`,
            data
          );
    };
    const _editMetric = (data) => {
      setIsShowAddMetricModal(true);
      setIsMetricEdit(true);
      setEditMetricId(data);
    };

    return (
      <>
        {/* <main> */}
        <section
          ref={ref}
          data-ref="metric111"
          className="section-1 padding-mine min-height-top"
        >
          <div className="container-1200 min-height-container-row">
            <div className="row min-height-container-row">
              <div className="col-lg-12">
                <div className="h3-head">
                  <h3>Metrics</h3>
                </div>
              </div>
              {/* {MetricsReducer.map((item, i) => {
              return item.metricLabel === "Social Share" ? (
                isSocialMetricShow && (
                  <>
                    <div className="col-lg-4 col-md-6 col-sm-mine" key={i}>
                      <div className="metrics-card">
                        <img src={Folder_pupr} loading="lazy" />
                        <div className="card-text-metrics">
                          <h3>{numFormatter(item.metricNo)}</h3>
                          <span>{item.metricLabel}</span>
                        </div>
                        {item.metricLabel === "Social Share" && (
                          <div className="ref-blind">
                            <button
                              className="btn"
                              onClick={() => {
                                console.log("Refresh");
                              }}
                            >
                              <span>
                                <i className="fas fa-sync-alt"></i>
                              </span>
                            </button>
                            <button
                              className="btn"
                              onClick={() => {
                                setIsSocialMetricShow(false);
                              }}
                            >
                              <span>
                                <i className="far fa-eye-slash"></i>
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )
              ) : (
                <div className="col-lg-4 col-md-6 col-sm-mine" key={i}>
                  <div className="metrics-card">
                    <img src={Folder_pupr} loading="lazy" />
                    <div className="card-text-metrics">
                      <h3>{numFormatter(item.metricNo)}</h3>
                      <span>{item.metricLabel}</span>
                    </div>
                    {item.metricLabel === "Social Share" && (
                      <div className="ref-blind">
                        <button
                          className="btn"
                          onClick={() => {
                            console.log("Refresh");
                          }}
                        >
                          <span>
                            <i className="fas fa-sync-alt"></i>
                          </span>
                        </button>
                        <button
                          className="btn"
                          onClick={() => {
                            console.log("Hide/Unhide");
                          }}
                        >
                          <span>
                            <i className="far fa-eye-slash"></i>
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })} */}
              {MetricsReducer.map((item, i) => {
                return item.cover_metric_label.toLowerCase() ===
                  "social shares" ? (
                  isSocialMetricShow && (
                    <>
                      <div
                        className="col-lg-4 col-md-6 col-sm-mine"
                        key={item.id}
                      >
                        <div className="metrics-card">
                          <img src={Folder_pupr} loading="lazy" />
                          <div className="card-text-metrics">
                            <h3>{numFormatter(item.cover_metric_count)}</h3>
                            <span>{item.cover_metric_label}</span>
                          </div>
                          {/* {item.cover_metric_label.toLowerCase() ===
                          "social shares" && ( */}
                          <div className="ref-blind">
                            <button
                              className="btn"
                              onClick={() => {
                                console.log("Refresh");
                              }}
                            >
                              <span>
                                <i className="fas fa-sync-alt"></i>
                              </span>
                            </button>
                            <button
                              className="btn"
                              onClick={() => {
                                setIsSocialMetricShow(false);
                              }}
                            >
                              <span>
                                <i className="far fa-eye-slash"></i>
                              </span>
                            </button>
                          </div>
                          {/* // )} */}
                        </div>
                      </div>
                    </>
                  )
                ) : (
                  <div
                    className="col-lg-4 col-md-6 col-sm-mine metric-card-col"
                    key={i}
                  >
                    <VerticalFlipableComp
                      data={item}
                      openEditModal={_editMetric}
                    />
                  </div>
                );
              })}
              {/* remove old */}
              {/* {metricsData.map((item, i) => {
              return item.label === "Social Share" ? (
                isSocialMetricShow ? (
                  <>
                    <div className="col-lg-4 col-md-6 col-sm-mine" key={i}>
                      <div className="metrics-card">
                        <img src={Folder_pupr} />
                        <div className="card-text-metrics">
                          <h3>{numFormatter(item.quantityNo)}</h3>
                          <span>{item.label}</span>
                        </div>
                        {item.label === "Social Share" && (
                          <div className="ref-blind">
                            <button
                              className="btn"
                              onClick={() => {
                                console.log("Refresh");
                              }}
                            >
                              <span>
                                <i className="fas fa-sync-alt"></i>
                              </span>
                            </button>
                            <button
                              className="btn"
                              onClick={() => {
                                setIsSocialMetricShow(false);
                              }}
                            >
                              <span>
                                <i className="far fa-eye-slash"></i>
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : null
              ) : (
                <div className="col-lg-4 col-md-6 col-sm-mine" key={i}>
                  <div className="metrics-card">
                    <img src={Folder_pupr} />
                    <div className="card-text-metrics">
                      <h3>{numFormatter(item.quantityNo)}</h3>
                      <span>{item.label}</span>
                    </div>
                    {item.label === "Social Share" && (
                      <div className="ref-blind">
                        <button
                          className="btn"
                          onClick={() => {
                            console.log("Refresh");
                          }}
                        >
                          <span>
                            <i className="fas fa-sync-alt"></i>
                          </span>
                        </button>
                        <button
                          className="btn"
                          onClick={() => {
                            console.log("Hide/Unhide");
                          }}
                        >
                          <span>
                            <i className="far fa-eye-slash"></i>
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })} */}
              <div className="col-lg-4 col-md-6 col-10 col-sm-mine-last-item margin-sm-settings">
                <div className="metrics-card">
                  <img src={Folder_pupr} loading="lazy" />
                  <div className="card-text-metrics text-center">
                    <h3>+</h3>
                    <button
                      onClick={() => {
                        setIsShowAddMetricModal(true);
                      }}
                    >
                      Add Custom Metrics
                    </button>
                  </div>
                </div>
              </div>
              {!isSocialMetricShow && (
                <div className="col-12">
                  <div
                    className="alert alert-primary custom-alert-cls"
                    role="alert"
                    onClick={() => setIsSocialMetricShow(true)}
                  >
                    <p>Show hidden Metric</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        {/* </main> */}
        {isShowAddMetricModal && (
          <AddMetricModal
            isShowModal={isShowAddMetricModal}
            closeModal={_closeMetricModal}
            onSave={_addMetric}
            isEdittingMetric={isMetricEdit}
            editModalData={editMetricId}
          />
        )}
      </>
    );
  }
);

// const ChildOne = (props) => {
//   return (
//     <div className="metrics-card" onClick={()=>props.onClick()}>
//       <img src={Folder_pupr} loading="lazy" />
//       <div className="card-text-metrics">
//         <h3>{`numFormatter(item.metricNo)`}</h3>
//         <span>{`item.metricLabel`}</span>
//       </div>
//     </div>
//   );
// };

// const ChildTwo = (props) => {
//   return (
//     <div onMouseOut={()=>props.onOut()}>
//       <h1>asdasd</h1>
//     </div>
//   );
// };

// export default MetricsSec;

const mapStateToProps = ({ MetricsReducer }) => {
  return { MetricsReducer };
};

export default connect(mapStateToProps, actions, null, { forwardRef: true })(
  MetricsSec
);
