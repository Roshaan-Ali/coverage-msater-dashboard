// import React, { useState } from "react";
// // import Modal from "react-modal";

// const CustomModalComp = ({ saveData, children }) => {
//   const _save = () => {
//     saveData();
//   };
//   return (
//     <>
//       <div
//         className="modal parent-className-modal fade"
//         id="signup"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//         style={{zIndex:"99999",backgroundColor:'rgba(0,0,0,0.5)'}}
//       >
//         <div className="modal-dialog" style={{ marginTop: "15%" }}>
//           <div className="modal-content">
//             <div className="modal-header">
//               <h3 className="mb-0">Add Metrics</h3>
//             </div>
//             <div className="modal-body">{children}</div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={() => {
//                   _save();
//                 }}
//                 data-dismiss="modal"
//               >
//                 Save changes
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-dismiss="modal"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomModalComp;
