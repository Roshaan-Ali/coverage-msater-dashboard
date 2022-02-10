// import React from "react";
// import Modal from "react-modal";

// const CustomModal = (props) => {
//   const _closeModal = () => {
//     props.closeModal();
//   };
//   return (
//     <>
//       <Modal
//         isOpen={props.isShowModal}
//         onRequestClose={_closeModal}
//         contentLabel="Example Modal"
//       >
//         {props.children}
//       </Modal>
//     </>
//   );
// };

// export default CustomModal;
// -----------------------------------------------------------------------------------------------------------------------------
// import React, { useRef, useState } from "react";
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
// } from "../../assets";
// import Modal from "react-modal";
// import UploadFileComp from "../UploadFileComp";
// import { toast } from "react-toastify";
// // import Loader from "react-loader-spinner";
// import BtnWithLoader from './BtnWithLoader';

// const NewModal = ({ updateBg, isShowModal, setisShowModal }) => {
//   const bgImgData = [
//     { id: 1, bgImg: Modal1 },
//     { id: 2, bgImg: Modal2 },
//     { id: 3, bgImg: Modal3 },
//     { id: 4, bgImg: Modal4 },
//     { id: 5, bgImg: Modal5 },
//     { id: 6, bgImg: Modal6 },
//   ];
//   const [selectedBgImage, setSelectedBgImage] = useState("");
//   const [previewUploadedImg, setPreviewUploadedImg] = useState("");
//   const [isSaving, setIsSaving] = useState(false);
//   const [isRemoving, setIsRemoving] = useState(false);

//   const _closeModal = () => {
//     setisShowModal(false);
//   };
//   const hiddenFileInput = useRef();

//   const _clickOnUploadBg = (event) => {
//     hiddenFileInput.current.click();
//   };

//   const handleUploadImage = (event) => {
//     if (event?.target?.files.length > 0) {
//       const imageUploaded = event.target.files[0];
//       if (!imageUploaded.name.match(/\.(jpg|jpeg|png|gif)$/)) {
//         toast.error(
//           "This file format is not accepted. The accepted file types are .bmp,.jpg,.jpeg,.gif,.png !",
//           {
//             position: "top-right",
//             autoClose: 5000,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           }
//         );
//       } else {
//         setSelectedBgImage("");
//         setPreviewUploadedImg(URL.createObjectURL(imageUploaded));
//       }
//     }
//   };

//   return (
//     <>
//       <Modal
//         isOpen={isShowModal}
//         onRequestClose={_closeModal}
//         contentLabel="Example Modal"
//       >
//         <div className="parent-class-modal-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <button
//                 className="close-btn"
//                 type="button"
//                 data-dismiss="modal"
//                 onClick={_closeModal}
//               >
//                 <span>
//                   <img src={CloseIcon} />
//                 </span>
//               </button>
//               <div className="row">
//                 <div className="col-lg-12">
//                   <div className="modal-heading-with-button">
//                     <div className="part-1">
//                       <h3>Edit Background Image</h3>
//                     </div>
//                     <div className="part-2">
//                       <UploadFileComp
//                         hiddenFileRef={hiddenFileInput}
//                         handleUpload={handleUploadImage}
//                       />
//                       <button
//                         className="btn-reg btn-upload-modal"
//                         onClick={_clickOnUploadBg}
//                       >
//                         Upload Image
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-md-5">
//                   {(selectedBgImage !== "" || previewUploadedImg !== "") && (
//                     <div className="current-image">
//                       <h4>Current Image</h4>
//                       <img
//                         src={
//                           selectedBgImage !== ""
//                             ? selectedBgImage
//                             : previewUploadedImg
//                         }
//                       />
//                       <BtnWithLoader
//                         label="Remove Image"
//                         lableOnSaving="Removing Image"
//                         passedStyle="btn-remove-modal"
//                         onClickBtn={() => {
//                           setTimeout(() => {
//                             setSelectedBgImage("");
//                             setIsRemoving(false);
//                             _closeModal();
//                           }, 5000);
//                         }}
//                         isApiCall={isRemoving}
//                         setIsApiCall={setIsRemoving}
//                       />
//                     </div>
//                   )}
//                 </div>
//                 <div className="col-lg-6 col-md-7 sm-margin">
//                   <div className="current-image font-weight">
//                     <h4>Or use one of these suggested images</h4>
//                     <div className="multiple-images">
//                       {bgImgData.map((item, i) => {
//                         return (
//                           <div key={i}>
//                             <button
//                               onClick={() => {
//                                 setSelectedBgImage(item.bgImg);
//                               }}
//                             >
//                               <img src={item.bgImg} />
//                               {selectedBgImage === item.bgImg && (
//                                 <img className="tick-mark" src={Selected} />
//                               )}
//                             </button>
//                           </div>
//                         );
//                       })}
//                     </div>
//                     <BtnWithLoader
//                         label="Save Image"
//                         lableOnSaving="Saving Image"
//                         onClickBtn={() => {
//                           setTimeout(() => {
//                             updateBg(
//                               selectedBgImage !== ""
//                                 ? selectedBgImage
//                                 : previewUploadedImg
//                             );
//                             setIsSaving(false);
//                             _closeModal();
//                           }, 5000);
//                         }}
//                         isApiCall={isSaving}
//                         setIsApiCall={setIsSaving}
//                       />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default NewModal;
