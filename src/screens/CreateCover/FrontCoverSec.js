import React, { useState, useRef } from "react";
// Redux
import { connect } from "react-redux";
import * as actions from "../../store/Actions/Index";
// Images
import { One1, One2, One3, BgMain } from "../../assets";
// Components
import Modal from "react-modal";
import ChangeBgImgModal from "./modals/ChangeBgImgModal";
import AddCommentModal from "./modals/AddCommentModal";
import EditTitleModal from "./modals/EditTitleModal";
import ChooseBgColorModal from "./modals/ChooseBgColorModal";
import UploadFileComp from "../../components/UploadFileComp";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// import EditBckGrndImgModal from "./EditBckGrndImgModal";
// import ChngeTitleModal from "./ChngeTitleModal";

// Modal.setAppElement(document.getElementById("modal-root"));

const FrontCoverSec = React.forwardRef(
  (
    {
      FrontCoverReducer,
      saveData,
      saveComment,
      saveBckgrndColor,
      saveClientLogo,
      // saveTitle,
      updateFrontCover,
      // New functs
      updateFrontCoverLogo,
      updateFrontCoverTitle,
      updateFrontCoverCommentSec,
      updateFrontCoverBgImg,
      updateFrontCoverBgColor
    },
    ref
  ) => {
    // Reducer
    let {
      frontCoverBgImagePreview,
      cover_hide,
      cover_title,
      cover_title_color,
      cover_title_bg_color,
      cover_logo,
    } = FrontCoverReducer;

    // States
    // const [coverTitle, setCoverTitle] = useState(
    //   "I Made This Coverage Report in 2 mins"
    // );
    // Modals open/close states
    const [isShowChngeBgModal, setIsShowChngeBgModal] = useState(false);
    const [isShowChngeBgColorModal, setIsShowChngeBgColorModal] =
      useState(false);
    const [isShowAddCmmntModal, setIsShowAddCmmntModal] = useState(false);
    const [isShowEditTitleModal, setisShowEditTitleModal] = useState(false);
    const { cover_id } = useParams();
    const uploadClientLogoRed = useRef();

    const _handleUploadClientLogo = (event) => {
      if (event?.target?.files.length > 0) {
        const imageUploaded = event.target.files[0];
        if (!imageUploaded.name.match(/\.(jpg|jpeg|png|gif|PNG)$/)) {
          toast.error(
            "This file format is not accepted. The accepted file types are .bmp,.jpg,.jpeg,.gif,.png !"
          );
        } else {
          let reader = new FileReader();
          let logo = new FormData();
          reader.onloadend = () => {
            // setbgImgForApi(imageUploaded);
            // setSelectedBgImage(reader.result);
          };
          logo.append("cover_logo", imageUploaded);
          updateFrontCoverLogo(
            `/api/cover/updatecoverlogo?cover_id=${cover_id}`,
            logo
          );
          reader.readAsDataURL(imageUploaded);
        }
      }
    };
    // const state = useSelector((state) => state.FrontCoverReducer);
    // console.log(state)
    //   Components data
    const editDetailBtnData = [
      {
        image: One1,
        label: "Client Logo",
        onBtnClick: (e) => {
          e.preventDefault();
          console.log("work");
          uploadClientLogoRed.current.click();
        },
      },
      {
        image: One2,
        label: "Edit Title",
        onBtnClick: (e) => {
          e.preventDefault();
          setisShowEditTitleModal(true);
        },
      },
      {
        image: One3,
        label: "Add Comment",
        onBtnClick: (e) => {
          e.preventDefault();
          setIsShowAddCmmntModal(true);
        },
      },
    ];

    const editUiBtnData = [
      {
        label: "Edit Background Image",
        _onBtnPress: (e) => {
          e.preventDefault();
          setIsShowChngeBgModal(true);
        },
      },
      {
        label: "Edit Background Color",
        _onBtnPress: (e) => {
          e.preventDefault();
          setIsShowChngeBgColorModal(true);
        },
      },
      {
        label: "Hide Front Cover",
        _onBtnPress: (e) => {
          e.preventDefault();
          console.log("333");
          updateFrontCover({ cover_hide: !cover_hide });
        },
      },
    ];

    return (
      <>
        <section ref={ref} className="section-1 padding-mine min-height-top">
          <div className="container-1200 min-height-container-row">
            <div className="row min-height-container-row">
              <div className="col-lg-12">
                <div className="h3-head">
                  <h3>Front Cover</h3>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="big-text">
                  <h3
                    style={{
                      color: cover_title_color,
                      backgroundColor: cover_title_bg_color,
                      wordWrap: "break-word",
                    }}
                  >
                    {cover_title}
                    {/* {coverTitle !== ""
                      ? coverTitle
                      : "I Made This Coverage Report in 2 mins"} */}
                  </h3>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="buttons-portion">
                  <UploadFileComp
                    hiddenFileRef={uploadClientLogoRed}
                    handleUpload={_handleUploadClientLogo}
                  />
                  {editDetailBtnData.map((item, i) => {
                    return (
                      <a href="#" key={i}>
                        <button onClick={item.onBtnClick}>
                          <span>
                            <img src={item.image} />{" "}
                          </span>
                          <span>{item.label}</span>
                        </button>
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="button-inline">
                  {editUiBtnData.map((item, i) => {
                    return (
                      <Link to="#" key={i}>
                        <button
                          onClick={item._onBtnPress}
                          style={
                            i === 2 && cover_hide
                              ? {
                                  background: "#6a75ca",
                                  border: "2px solid transparent",
                                  color: "#ffffff",
                                }
                              : null
                          }
                        >
                          {item.label}
                        </button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        {isShowChngeBgModal && <ChangeBgImgModal
          isShowModal={isShowChngeBgModal}
          setIsShowModal={setIsShowChngeBgModal}
          CoverPageReducer={FrontCoverReducer}
          onSave={updateFrontCoverBgImg}
        />}
        {isShowAddCmmntModal && <AddCommentModal
          isShowModal={isShowAddCmmntModal}
          setIsShowModal={setIsShowAddCmmntModal}
          onSave={updateFrontCoverCommentSec}
          CoverPageReducer={FrontCoverReducer}
        />}
        {isShowEditTitleModal && <EditTitleModal
          isShowModal={isShowEditTitleModal}
          setIsShowModal={setisShowEditTitleModal}
          onSave={updateFrontCoverTitle}
          CoverPageReducer={FrontCoverReducer}
        />}
        {isShowChngeBgColorModal && <ChooseBgColorModal
          isShowModal={isShowChngeBgColorModal}
          setIsShowModal={setIsShowChngeBgColorModal}
          onSave={updateFrontCoverBgColor}
          CoverPageReducer={FrontCoverReducer}
        />}
      </>
    );
  }
);

const mapStateToProps = ({ FrontCoverReducer }) => {
  return {
    FrontCoverReducer,
  };
};

export default connect(mapStateToProps, actions, null, { forwardRef: true })(
  FrontCoverSec
);
