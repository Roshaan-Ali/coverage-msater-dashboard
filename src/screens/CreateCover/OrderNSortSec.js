import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config.json";
import * as actions from "../../store/Actions/Index";

const OrderNSortSec = React.forwardRef(
  ({ CoverageReducer, reorderScreenshotReports,getSingleCoverDetail }, ref) => {
    // States
    const [draggableItems, setDraggableItems] = useState(
      []
      // [
      //   { website_metric_id: "1", website_metric_screenshot: Report },
      // ]
    );
    useEffect(() => {
      setDraggableItems(CoverageReducer.data);
    }, [CoverageReducer]);

    const { cover_id } = useParams();

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    // Styling
    const grid = 8;
    //   item style
    const getItemStyle = (isDragging, draggableStyle) => ({
      // some basic styles to make the items look a bit nicer
      userSelect: "none",
      margin: `0 ${grid}px ${grid}px 0`,
      display: "flex",
      flexWrap: "wrap",
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      // backgroundColor: "red",
      border: "2px solid #cecece",
      borderRadius: "5px",
      maxHeight: "200px",
      maxWidth: "200px",
      overflow: "hidden",
      // styles we need to apply on draggables
      ...draggableStyle,
    });

    //   Draggable main container style
    const getListStyle = (isDraggingOver) => ({
      display: "flex",
      padding: grid,
      justifyContent: "flex-start",
      overflow: "auto",
      width: "100%",
    });

    const onDragEnd = (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const dummyitems = reorder(
        draggableItems,
        result.source.index,
        result.destination.index
      );

      setDraggableItems(dummyitems);
      reorderScreenshotReports(
        `/api/cover/updatecoversorder?cover_id=${cover_id}`,
        { coverage_list: dummyitems }
      ).then(()=>{
        getSingleCoverDetail(cover_id);
      })
    };

    return (
      <>
        <section ref={ref} className="section-1 padding-mine min-height-top">
          <div className="container-1200 min-height-container-row">
            <div className="row min-height-container-row">
              <div className="col-lg-12">
                <div className="h3-head">
                  <h3>Generated Reports</h3>
                </div>
              </div>

              {/* -------------------------------------------------------------------------- */}
              <div className="drag-and-drop-cont">
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
                            key={String(item.website_metric_id)}
                            draggableId={String(item.website_metric_id)}
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
                                  src={baseUrl + item.website_metric_screenshot}
                                  style={{ width: "100%", height: "auto" }}
                                  // className="img-fluid"
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
              </div>
              {/* -------------------------------------------------------------------------- */}

              {/* <div className="col-lg-12 gen-reports">
              <div className="row">
                {generatedReports.map((item, i) => {
                  return (
                    <div key={i} className="col-lg-3 col-md-4 col-6">
                      <Link to={item.reportLink}>
                        <div className="report-image">
                          <img src={item.reportImg} loading="lazy" />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div> */}

              {/* <div className="col-12">
              <div className="copyright">
                <h6>
                  Copyrights © 2021, <span> Coverage Master </span> All rights
                  reserved.
                </h6>
              </div>
            </div> */}
            </div>
          </div>
        </section>
      </>
    );
  }
);

const mapStateToProps = ({ CoverageReducer }) => {
  return { CoverageReducer };
};

export default connect(mapStateToProps, actions, null, { forwardRef: true })(
  OrderNSortSec
);

// const OrderNSortSec = React.forwardRef((props, ref) => {
//   // States
//   const [generatedReports, setGeneratedReports] = useState([
//     { reportLink: "#", reportImg: Report,id:'1' },
//     { reportLink: "#", reportImg: Report,id:'2' },
//     { reportLink: "#", reportImg: Report,id:'3' },
//     { reportLink: "#", reportImg: Report,id:'4' },
//     { reportLink: "#", reportImg: Report,id:'5' },
//     { reportLink: "#", reportImg: Report,id:'6' },
//     { reportLink: "#", reportImg: Report,id:'7' },
//     { reportLink: "#", reportImg: Report,id:'8' },
//     { reportLink: "#", reportImg: Report,id:'9' },
//     { reportLink: "#", reportImg: Report,id:'10' },
//     { reportLink: "#", reportImg: Report,id:'11' },
//     { reportLink: "#", reportImg: Report,id:'12' },
//   ]);
//   const onDragEnd = (result) => {
//     // dropped outside the list
//     if (!result.destination) {
//       return;
//     }
//     const dummyitems = reorder(
//       generatedReports,
//       result.source.index,
//       result.destination.index
//     );
//   };
//    // a little function to help us with reordering the result
//    const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//     return result;
//   };

//   // Styling
//   const grid = 8;
//   //   item style
//   const getItemStyle = (isDragging, draggableStyle) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: "none",
//     margin: `0 ${grid}px ${grid}px 0`,
//     // display: "flex",
//     // flexWrap: "wrap",
//     // alignContent: "center",
//     // justifyContent: "center",
//     // alignItems: "center",
//     padding: "10px",    // styles we need to apply on draggables
//     ...draggableStyle,
//   });

//   //   Draggable main container style
//   const getListStyle = (isDraggingOver) => ({
//     background: "#ffffff",
//     display: "flex",
//     padding: grid,
//     flexDirection:"column",
//     // justifyContent: "flex-start",
//     overflow: "auto",
//     // flexWrap: "wrap",
//     // flexDirection: "row",
//     width: "80%",
//   });

//   return (
//     <>
//       <section ref={ref} className="section-1 padding-mine min-height-top">
//         <div className="container-1200 min-height-container-row">
//           <div className="row min-height-container-row">
//             <div className="col-lg-12">
//               <div className="h3-head">
//                 <h3>Generated Reports</h3>
//               </div>
//             </div>

//             <div className="col-lg-12 gen-reports">
//               <div className="row">
//                 <DragDropContext onDragEnd={onDragEnd}>
//                   <Droppable droppableId="droppable" direction="horizontal">
//                     {(provided, snapshot) => (
//                       <div
//                         ref={provided.innerRef}
//                         style={getListStyle(snapshot.isDraggingOver)}
//                         {...provided.droppableProps}
//                       >
//                         {generatedReports.map((item, i) => {
//                           return (
//                             <Draggable
//                               key={i}
//                               draggableId={item.id}
//                               index={i}
//                             >
//                               {(provided, snapshot) => (
//                                 <div
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                   style={getItemStyle(
//                                     snapshot.isDragging,
//                                     provided.draggableProps.style
//                                   )}
//                                 >
//                                   <div
//                                     key={i}
//                                     // className="col-lg-3 col-md-4 col-6"
//                                   >
//                                     <Link to={item.reportLink}>
//                                       <div className="report-image">
//                                         <img
//                                           src={item.reportImg}
//                                           loading="lazy"
//                                           width="150px"
//                                           height="150px"
//                                           style={{width:"40%"}}
//                                         />
//                                       </div>
//                                     </Link>
//                                   </div>
//                                 </div>
//                               )}
//                             </Draggable>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </Droppable>
//                 </DragDropContext>
//               </div>
//             </div>

//             <div className="col-12">
//               <div className="copyright">
//                 <h6>
//                   Copyrights © 2021, <span> Coverage Master </span> All rights
//                   reserved.
//                 </h6>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// });

// export default OrderNSortSec;
