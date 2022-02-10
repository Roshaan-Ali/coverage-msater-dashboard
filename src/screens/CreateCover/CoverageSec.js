import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { One1, ImageIcon, Report, Img3 } from "../../assets";
import moment from "moment";
import CalendarComp from "../../components/CalendarComp";
import EditTitleModal from "./CoverageModals/EditTitleModal";
import EditMetricsModal from "./CoverageModals/EditMetricsModal";
import AddCommentModal from "./CoverageModals/AddCommentModal";
import { connect } from "react-redux";
import * as actions from "../../store/Actions/Index";
import CropImgModal from "./modals/CropImgModal";
import { numFormatter } from "../../utils";
import { baseUrl } from "../../config/config.json";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const CoverageSec = React.forwardRef(
  ({ coverageData, updateSingleCoverageReport }, ref) => {
    const [date, setDate] = useState(new Date());
    const [link, setLink] = useState("link");
    const [linkTitle, setLinkTitle] = useState("Link name");
    const [comments, setComments] = useState("");
    const [estCoveragePieces, setEstCoveragePieces] = useState("");
    const [estCoverageViews, setEstCoverageViews] = useState("");
    // const [draggableItems, setDraggableItems] = useState(
    //   [
    //     { id: "1", img: Report },
    //     { id: "2", img: Report },
    //     { id: "3", img: Report },
    //     { id: "4", img: Report },
    //     { id: "5", img: ImageIcon },
    //     { id: "6", img: Report },
    //   ]
    // );
    const [highestPriorityImg, setHighestPriorityImg] = useState("");
    // draggableItems[0]?.img
    // for date pop up
    const [isDisplayCalendarPopUp, setisDisplayCalendarPopUp] = useState(false);
    // for modal
    const [isShowTitleModal, setIsShowTitleModal] = useState(false);
    const [isShowEditMetricModal, setIsShowEditMetricModal] = useState(false);
    const [isShowAddCommntModal, setIsShowAddCommntModal] = useState(false);
    const [isShowCropImgModal, setIsShowCropImgModal] = useState(false);

    const { cover_id } = useParams();

    // useEffect(() => {
    //   setDate(coverageData.date);
    //   setLink(coverageData.link);
    //   setLinkTitle(coverageData.linkDomainName);
    //   setComments(coverageData.onLinkComment);
    //   setEstCoveragePieces(coverageData.piecesOfCoverage);
    //   setEstCoverageViews(coverageData.estimatedViews);
    //   setHighestPriorityImg(coverageData.selectedImage);
    //   setDraggableItems(coverageData.screenShots);
    // }, [coverageData]);
    useEffect(() => {
      setDate(coverageData.website_metric_date);
      setLink(coverageData.website_metric_url);
      setLinkTitle(coverageData.website_metric_link);
      setComments(coverageData.website_metric_comment);
      setEstCoveragePieces(coverageData.website_metric_monthly_visits);
      setEstCoverageViews(coverageData.website_metric_estimated_views);
      setHighestPriorityImg(coverageData.website_metric_screenshot);
      // setDraggableItems(coverageData.screenShots);
    }, [coverageData]);

    const _onSaveTitle = (title) => {
      updateSingleCoverageReport(
        `/api/websitemetric/updatewebsitelink?cover_id=${cover_id}&website_metric_id=${coverageData.website_metric_id}`,
        {
          website_metric_link: title,
        }
      );
    };

    const _onSaveMetrics = (estCoveragePieces, estCoverageViews) => {
      updateSingleCoverageReport(
        `/api/websitemetric/updatewebsitemetric?cover_id=${cover_id}&website_metric_id=${coverageData.website_metric_id}`,
        {
          website_metric_monthly_visits: estCoveragePieces,
          website_metric_estimated_views: estCoverageViews,
        }
      );
    };

    const _onSelectDate = (date) => {
      updateSingleCoverageReport(
        `/api/websitemetric/updatewebsitedate?cover_id=${cover_id}&website_metric_id=${coverageData.website_metric_id}`,
        {
          website_metric_date: date,
        }
      );
    };

    const _onLinkAddComment = (website_metric_comment) => {
      updateSingleCoverageReport(
        `/api/websitemetric/updatewebsitecomment?cover_id=${cover_id}&website_metric_id=${coverageData.website_metric_id}`,
        {
          website_metric_comment,
        }
      );
    };

    const editRprtsBtnData = [
      {
        btnLabel: "Edit Metric",
        onClick: () => {
          setIsShowEditMetricModal(true);
        },
      },
      ,
      {
        btnLabel: "Add Comment",
        onClick: () => {
          setIsShowAddCommntModal(true);
        },
      },
    ];

    // fake data generator
    // const getItems = (count) =>
    //   Array.from({ length: count }, (v, k) => k).map((k) => ({
    //     id: `item-${k}`,
    //     content: `item ${k}`,
    //   }));

    // a little function to help us with reordering the result
    // const reorder = (list, startIndex, endIndex) => {
    //   const result = Array.from(list);
    //   const [removed] = result.splice(startIndex, 1);
    //   result.splice(endIndex, 0, removed);
    //   return result;
    // };

    // Styling
    // const grid = 8;
    //   item style
    // const getItemStyle = (isDragging, draggableStyle) => ({
    //   // some basic styles to make the items look a bit nicer
    //   userSelect: "none",
    //   margin: `0 ${grid}px ${grid}px 0`,
    //   display: "flex",
    //   flexWrap: "wrap",
    //   alignContent: "center",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   padding: "10px",
    //   // styles we need to apply on draggables
    //   ...draggableStyle,
    // });

    // //   Draggable main container style
    // const getListStyle = (isDraggingOver) => ({
    //   background: "#ffffff",
    //   display: "flex",
    //   padding: grid,
    //   justifyContent: "flex-start",
    //   overflow: "auto",
    //   // width: "80%",
    //   width: "100%",
    // });

    // const onDragEnd = (result) => {
    //   // dropped outside the list
    //   if (!result.destination) {
    //     return;
    //   }

    //   const dummyitems = reorder(
    //     draggableItems,
    //     result.source.index,
    //     result.destination.index
    //   );

    //   setDraggableItems(dummyitems);
    //   setHighestPriorityImg(dummyitems[0].img);
    // };

    const _onEditCoverageTitle = () => {
      setIsShowTitleModal(true);
    };
    const _onSaveCroppedImg = async (updatedImage) => {
      updateSingleCoverageReport(
        `/api/websitemetric/updatewebsitescreenshot?cover_id=${cover_id}&website_metric_id=${coverageData.website_metric_id}`,
        { website_metric_screenshot: updatedImage }
      ).then(() => setIsShowCropImgModal(false));
    };

    const domainNameRef = useRef();
    return (
      <>
        <section ref={ref} className="section-1 padding-mine min-height-top">
          <div className="container-1000 min-height-container-row">
            <div className="row min-height-container-row">
              {/* <div className="col-lg-12 col-md-12">
              <div className="h3-head coverage-head">
                <h3>Edit Coverage</h3>
              </div>
              <div className="buttons-portion buttons-coverage">
                {editCovrgeBtnsData.map((item, i) => {
                  return (
                    <a href="#" key={i}>
                      <button onClick={item.onClickBtnFunc}>
                        <span>
                          <img src={One1} loading="lazy" />
                        </span>
                        <span>{item.label}</span>
                      </button>
                    </a>
                  );
                })}
              </div>
            </div> */}

              <div className="col-lg-12 col-12">
                <div className="row my-5">
                  <div className="col-lg-7 col-md-7">
                    <div>
                      <div className="h3-head coverage-head">
                        <h3>Front Matter</h3>
                      </div>
                      <div className="image-container">
                        <span
                          className="btn btn-sm btn-primary edit-coverage-btn"
                          onClick={() => setIsShowCropImgModal(true)}
                        >
                          <i className="fas fa-crop"></i> Crop
                        </span>
                        {highestPriorityImg === "" ? (
                          <img src={ImageIcon} loading="lazy" />
                        ) : (
                          <img
                            src={
                              highestPriorityImg.startsWith("data:image")
                                ? highestPriorityImg
                                : `${baseUrl}${highestPriorityImg}`
                            }
                            loading="lazy"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-5">
                    <div>
                      <div className="h3-head coverage-head">
                        <h3>Summary</h3>
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="cards-caverage">
                              <h3>{numFormatter(estCoveragePieces)}</h3>
                              <span>Pieces of Coverage</span>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="cards-caverage">
                              <h3>{numFormatter(estCoverageViews)}</h3>
                              <span>Estimated View</span>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 mt-3">
                            <div className="editable-coverage-title">
                              <h3>{linkTitle.substr(0, 10)}...</h3>
                              <span onClick={_onEditCoverageTitle}>
                                <i className="fas fa-edit"></i>
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 mt-3">
                            <div
                              className="editable-coverage-date"
                              onClick={() =>
                                setisDisplayCalendarPopUp(
                                  !isDisplayCalendarPopUp
                                )
                              }
                            >
                              <h3>{moment(date).format("MMMM DD, YYYY")}</h3>
                            </div>
                            {isDisplayCalendarPopUp && (
                              <CalendarComp
                                date={new Date(date)}
                                onChangeDate={_onSelectDate}
                                isShowPopUp={setisDisplayCalendarPopUp}
                                passedClassName="calender-conatiner-custom"
                              />
                            )}
                          </div>
                          {editRprtsBtnData.map((item, i) => {
                            return (
                              <div
                                key={i}
                                className="col-lg-6 col-md-6 mt-3 mx-auto"
                              >
                                <button
                                  onClick={item.onClick}
                                  className="btn coverage-custom-btn w-100 badge-pill"
                                >
                                  {item.btnLabel}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-12"> */}
              {/*<div className="h3-head coverage-head book-content">
                  <div className="item-book">
                    <h3>Book Contents</h3>
                    <span>1 Item</span>
                  </div>
                   <div>
                  <button className="btn-reg add-section">
                    Add new Section
                  </button>
                </div> 
                </div>*/}
              {/* <div className="drag-and-drop-cont">
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}
                        >
                          {draggableItems.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <img
                                    alt=""
                                    src={item.img}
                                    style={{ width: "130px" }}
                                    loading="lazy"
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <div className="drag-and-drop-cont-2">
                  <p>this is dummy text</p>
                </div> 
                </div> */}
              {/* <div className="drag-and-drop-cont">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                      >
                        {draggableItems.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <img
                                  alt=""
                                  src={item.img}
                                  style={{ width: "130px" }}
                                  loading="lazy"
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                
              </div> */}
              {/* </div> */}
            </div>
          </div>
        </section>
        {isShowTitleModal && (
          <EditTitleModal
            isShowModal={isShowTitleModal}
            setIsShowModal={setIsShowTitleModal}
            onSave={_onSaveTitle}
            linkDomainName={linkTitle}
          />
        )}
        {isShowEditMetricModal && (
          <EditMetricsModal
            isShowModal={isShowEditMetricModal}
            setIsShowModal={setIsShowEditMetricModal}
            onSave={_onSaveMetrics}
            piecesOfCoverage={estCoveragePieces}
            monthlyVisit={estCoverageViews}
          />
        )}
        {isShowAddCommntModal && (
          <AddCommentModal
            isShowModal={isShowAddCommntModal}
            setIsShowModal={setIsShowAddCommntModal}
            onSave={_onLinkAddComment}
            commentSingleLinkMetrics={comments}
          />
        )}
        {isShowCropImgModal && (
          <CropImgModal
            isShowModal={isShowCropImgModal}
            setIsShowModal={setIsShowCropImgModal}
            onSave={_onSaveCroppedImg}
            originalImage={highestPriorityImg}
          />
        )}
      </>
    );
  }
);

// const mapStateToProps = ({ CoverageReducer }) => {
//   return { CoverageReducer };
// };

export default connect(null, actions, null, { forwardRef: true })(CoverageSec);

// import React, { useEffect, useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { One1, ImageIcon, Report, Img3 } from "../../assets";
// import moment from "moment";
// import CalendarComp from "../../components/CalendarComp";
// import EditTitleModal from "./CoverageModals/EditTitleModal";
// import EditMetricsModal from "./CoverageModals/EditMetricsModal";
// import AddCommentModal from "./CoverageModals/AddCommentModal";
// import { connect } from "react-redux";
// import * as actions from "../../store/Actions/Index";
// import CropImgModal from "./modals/CropImgModal";
// import { baseUrl } from "../../config/config.json";

// const CoverageSec = React.forwardRef(
//   ({ coverageData, updateSingleCoverageReport }, ref) => {
//     const [date, setDate] = useState(new Date());
//     const [link, setLink] = useState("link");
//     const [linkTitle, setLinkTitle] = useState("Link name");
//     const [comments, setComments] = useState("");
//     const [estCoveragePieces, setEstCoveragePieces] = useState("");
//     const [estCoverageViews, setEstCoverageViews] = useState("");
//     const [highestPriorityImg, setHighestPriorityImg] = useState();
//     // // for date pop up
//     const [isDisplayCalendarPopUp, setisDisplayCalendarPopUp] = useState(false);
//     // // for modal
//     const [isShowTitleModal, setIsShowTitleModal] = useState(false);
//     const [isShowEditMetricModal, setIsShowEditMetricModal] = useState(false);
//     const [isShowAddCommntModal, setIsShowAddCommntModal] = useState(false);
//     const [isShowCropImgModal, setIsShowCropImgModal] = useState(false);

//     useEffect(() => {
//       setDate(coverageData.website_metric_date);
//       setLink(coverageData.website_metric_url);
//       setLinkTitle(coverageData.website_metric_link);
//       setComments(coverageData.website_metric_comment);
//       setEstCoveragePieces(coverageData.website_metric_monthly_visits);
//       setEstCoverageViews(coverageData.website_metric_estimated_views);
//       setHighestPriorityImg(coverageData.website_metric_screenshot);
//     }, [coverageData]);

//     const _onSaveTitle = (title) => {
//       updateSingleCoverageReport({
//         id: coverageData.id,
//         linkDomainName: title,
//       });
//     };

//     const _onSaveMetrics = (estCoveragePieces, estCoverageViews) => {
//       updateSingleCoverageReport({
//         id: coverageData.id,
//         piecesOfCoverage: estCoveragePieces,
//         estimatedViews: estCoverageViews,
//       });
//     };

//     const _onSelectDate = (date) => {
//       updateSingleCoverageReport({
//         id: coverageData.id,
//         date,
//       });
//     };

//     const _onLinkAddComment = (onLinkComment) => {
//       updateSingleCoverageReport({
//         id: coverageData.id,
//         onLinkComment,
//       });
//     };

//     const editRprtsBtnData = [
//       {
//         btnLabel: "Edit Metric",
//         onClick: () => {
//           setIsShowEditMetricModal(true);
//         },
//       },
//       ,
//       {
//         btnLabel: "Add Comment",
//         onClick: () => {
//           setIsShowAddCommntModal(true);
//         },
//       },
//     ];

//     const _onEditCoverageTitle = () => {
//       setIsShowTitleModal(true);
//     };

//     const _onSaveCroppedImg = (img) => {
//       setHighestPriorityImg(img);
//     };
//     return (
//       <>
//         <section ref={ref} className="section-1 padding-mine min-height-top">
//           <div className="container-1000 min-height-container-row">
//             <div className="row min-height-container-row">
//               <div className="col-lg-12 col-12">
//                 <div className="row my-5">
//                   <div className="col-lg-8 col-md-7">
//                     <div>
//                       <div className="h3-head coverage-head">
//                         <h3>Front Matter</h3>
//                       </div>
//                       <div className="image-container">
//                         <span
//                           className="btn btn-sm btn-primary edit-coverage-btn"
//                           onClick={() => setIsShowCropImgModal(true)}
//                         >
//                           <i class="fas fa-crop"></i> Crop
//                         </span>
//                         {highestPriorityImg === "" ? (
//                           <img src={ImageIcon} loading="lazy" />
//                         ) : (
//                           <img
//                             src={`${baseUrl}${highestPriorityImg}`}
//                             loading="lazy"
//                           />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-4 col-md-5">
//                     <div>
//                       <div className="h3-head coverage-head">
//                         <h3>Summary</h3>
//                       </div>
//                       <div className="col-12">
//                         <div className="row">
//                           <div className="col-lg-6 col-md-6">
//                             <div className="cards-caverage">
//                               <h3>{estCoveragePieces}</h3>
//                               <span>Pieces of Coverage</span>
//                             </div>
//                           </div>
//                           <div className="col-lg-6 col-md-6">
//                             <div className="cards-caverage">
//                               <h3>{estCoverageViews}</h3>
//                               <span>Estimated View</span>
//                             </div>
//                           </div>
//                           <div className="col-lg-12 col-md-12 mt-3">
//                             <div className="editable-coverage-title">
//                               <h3>{linkTitle.substr(0, 10)}...</h3>
//                               <span onClick={_onEditCoverageTitle}>
//                                 <i className="fas fa-edit"></i>
//                               </span>
//                             </div>
//                           </div>
//                           <div className="col-lg-12 col-md-12 mt-3">
//                             <div
//                               className="editable-coverage-date"
//                               onClick={() =>
//                                 setisDisplayCalendarPopUp(
//                                   !isDisplayCalendarPopUp
//                                 )
//                               }
//                             >
//                               <h3>{moment(date).format("MMMM DD, YYYY")}</h3>
//                             </div>
//                             {isDisplayCalendarPopUp && (
//                               <CalendarComp
//                                 date={new Date(date)}
//                                 onChangeDate={_onSelectDate}
//                                 isShowPopUp={setisDisplayCalendarPopUp}
//                                 passedClassName="calender-conatiner-custom"
//                               />
//                             )}
//                           </div>
//                           {editRprtsBtnData.map((item, i) => {
//                             return (
//                               <div className="col-lg-6 col-md-6 mt-3 mx-auto">
//                                 <button
//                                   onClick={item.onClick}
//                                   className="btn coverage-custom-btn w-100 badge-pill"
//                                 >
//                                   {item.btnLabel}
//                                 </button>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/*
//               <div className="col-12">
//                 <div className="h3-head coverage-head book-content">
//                   <div className="item-book">
//                     <h3>Book Contents</h3>
//                     <span>1 Item</span>
//                   </div>
//                   <div>
//                   <button className="btn-reg add-section">
//                     Add new Section
//                   </button>
//                 </div>
//                 </div>
//               </div>*/}
//             </div>
//           </div>
//         </section>
//         {/* <EditTitleModal
//           isShowModal={isShowTitleModal}
//           setIsShowModal={setIsShowTitleModal}
//           onSave={_onSaveTitle}
//         />
//         <EditMetricsModal
//           isShowModal={isShowEditMetricModal}
//           setIsShowModal={setIsShowEditMetricModal}
//           onSave={_onSaveMetrics}
//         />
//         <AddCommentModal
//           isShowModal={isShowAddCommntModal}
//           setIsShowModal={setIsShowAddCommntModal}
//           onSave={_onLinkAddComment}
//         />
//         <CropImgModal
//           isShowModal={isShowCropImgModal}
//           setIsShowModal={setIsShowCropImgModal}
//           onSave={_onSaveCroppedImg}
//         /> */}
//       </>
//     );
//   }
// );

// // const mapStateToProps = ({ CoverageReducer }) => {
// //   return { CoverageReducer };
// // };

// export default connect(null, actions, null, { forwardRef: true })(CoverageSec);
