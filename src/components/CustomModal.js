// import React, { useState } from "react";
// import {
//   Modal1,
//   Modal2,
//   Modal3,
//   Modal4,
//   Modal5,
//   Modal6,
//   CurrentModal,
//   Selected,
//   CloseIcon,
// } from "../assets";

// const CustomModal = ({ updateBg, isShowModal, setisShowModal }) => {
//   const bgImgData = [
//     { id: 1, bgImg: Modal1 },
//     { id: 2, bgImg: Modal2 },
//     { id: 3, bgImg: Modal3 },
//     { id: 4, bgImg: Modal4 },
//     { id: 5, bgImg: Modal5 },
//     { id: 6, bgImg: Modal6 },
//   ];
//   const [selectedBgImage, setSelectedBgImage] = useState("");
//   const [modalCheck, setSelectedModalCheck] = useState("abc");

//   return (
//     <div
//       className="modal parent-className-modal-1 fade"
//       id="signup"
//       tabindex="-1"
//       aria-labelledby="exampleModalLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <button className="close-btn" type="button" data-dismiss="modal">
//             <span>
//               <img src={CloseIcon} />
//             </span>
//           </button>
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="modal-heading-with-button">
//                 <div className="part-1">
//                   <h3>Edit Background Image</h3>
//                 </div>
//                 <div className="part-2">
//                   <button className="btn-reg btn-upload-modal">
//                     Upload Image
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-5">
//               {selectedBgImage !== "" && (
//                 <div className="current-image">
//                   <h4>Current Image</h4>
//                   <img src={selectedBgImage} />
//                   <button
//                     className="btn-reg btn-remove-modal"
//                     onClick={() => {
//                       //   setSelectedBgImage("");
//                       setSelectedModalCheck("modal");
//                       console.log("remove");
//                     }}
//                   >
//                     Remove Image
//                   </button>
//                 </div>
//               )}
//             </div>
//             <div className="col-lg-6 col-md-7 sm-margin">
//               <div className="current-image font-weight">
//                 <h4>Or use one of these suggested images</h4>
//                 <div className="multiple-images">
//                   {bgImgData.map((item, i) => {
//                     return (
//                       <>
//                         <div>
//                           <button
//                             onClick={() => setSelectedBgImage(item.bgImg)}
//                           >
//                             <img src={item.bgImg} />
//                             {selectedBgImage === item.bgImg && (
//                               <img className="tick-mark" src={Selected} />
//                             )}
//                           </button>
//                         </div>
//                       </>
//                     );
//                   })}
//                 </div>

//                 <button
//                   className="btn-reg btn-save-modal"
//                   data-dismiss="modal"
//                   onClick={() => updateBg(selectedBgImage)}
//                 >
//                   Save Image
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomModal;
