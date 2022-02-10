import React, { useEffect, useState } from "react";
import AddOnlineCoverageModal from "./Modals/AddOnlineCoverageModal";
// import ChatNowComp from "../../components/ChatNowComp";
import {
  AddedUser1,
  AddedUser2,
  AddedUser3,
  BookCover1,
  BookCover2,
  OipLogo,
  Dp,
} from "../../assets";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/Actions/Index";
import { baseUrl } from "../../config/config.json";
// import Spinner from "../../components/Spinner";
import Skeleton from "react-loading-skeleton";
// import axios from "axios";
import AddFolderModal from "./Modals/AddFolderModal";
import InviteTeamMemModal from "./Modals/InviteTeamMemModal";
import ConfirmDelCoverbookModal from "./Modals/ConfirmDelCoverbookModal";
import MoveCvrBookToFolderModal from "./Modals/MoveCvrBookToFolderModal";
import EditFolderModal from "./Modals/EditFolderModal";

// const ChildOne = () => {
//   return (
//     <div className="books">
//       <div className="previous-books">
//         <img src={BookCover1} />
//         <div className="logo-book">
//           <img src={OipLogo} />
//         </div>
//         <div className="on-hover-book-ui">
//           <button
//             onClick={() => console.log("VIEW")}
//             className="btn btn-outline-secondary"
//           >
//             View
//           </button>
//           <button
//             onClick={() => console.log("DELETE")}
//             className="btn btn-outline-secondary"
//           >
//             Delete
//           </button>
//         </div>
//         <div className="book-name">
//           <h5>{"item.bookName".substr(0, 16)}...</h5>
//         </div>
//       </div>
//     </div>
//   );
// };

const Dashboard = ({
  CoverageReducer,
  UserReducer,
  CoverBooksReducer,
  generate_coverage,
  getAllCoverBooks,
  getSingleCoverDetail,
  delete_coverbook,
  reset_created_cover_id,
  delete_multiple_coverbooks,
  invite_team_member,
  get_all_folders,
  FoldersReducer,
  create_new_folder,
  getCoverBooksByFolder,
  get_team_members,
  TeamMembersReducer,
  isFetchCoverBooks,
  move_coverbook_to_folder,
}) => {
  const { user_id, user_invited } = UserReducer;
  const [isAddCoverageModalShow, setIsAddCoverageModalShow] = useState(false);
  const [allCoverbooks, setAllCoverbooks] = useState([]);
  const [isApiCall, setIsApiCall] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isAddFolderModal, setIsAddFolderModal] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isShowCnfrmDelCvrModal, setIsShowCnfrmDelCvrModal] = useState(false);
  const [isDelCvrApiCall, setIsDelCvrApiCall] = useState(false);
  const [isSHowMveFldrModal, setIsSHowMveFldrModal] = useState(false);
  const [selCvrToMove, setSelCvrToMove] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  // edit folder
  const [isEditFolder, setIsEditFolder] = useState(false);
  const [editFolderData, setEditFolderData] = useState("");

  const [teamMembers, setTeamMembers] = useState([
    { userPic: AddedUser1, userName: "Kyler Ochoa" },
    { userPic: AddedUser2, userName: "Maria Randall" },
    { userPic: AddedUser3, userName: "Jordy Eubanks" },
  ]);

  const [folders, setFolders] = useState([]);

  const onCreateFolder = (folderName) => {
    create_new_folder(folderName, user_id).then(() => {
      setIsAddFolderModal(false);
      get_all_folders(user_id);
    });
  };

  const history = useHistory();

  const _onAddCoverage = () => {
    setIsAddCoverageModalShow(true);
  };

  const _createCoverbook = (urls, selected_folder_id, cb1, cb2) => {
    generate_coverage(user_id, urls, selected_folder_id, () => {
      getAllCoverBooks(user_id);
    }).then(() => {
      cb1(false);
      cb2();
      // if (CoverBooksReducer.created_cover_id !== "") {
      //   console.log(CoverBooksReducer.created_cover_id,".......................")
      //   history.push(`/edit-cover/${CoverBooksReducer.created_cover_id}`);
      // }
    });
  };

  const _deleteCover = (cover_id) => {
    delete_coverbook(cover_id).then(() => {
      getAllCoverBooks(user_id);
    });
  };

  useEffect(() => {
    setIsApiCall(true);
    getAllCoverBooks(user_id).then(() => {
      reset_created_cover_id();
      setIsApiCall(false);
    });
    get_all_folders(user_id);
    get_team_members(user_id, user_invited);
  }, [isFetchCoverBooks]);

  useEffect(() => {
    setFolders(FoldersReducer);
  }, [FoldersReducer]);

  useEffect(() => {
    setAllCoverbooks(CoverBooksReducer.data);
    if (CoverBooksReducer.created_cover_id !== "") {
      history.push(`/edit-cover/${CoverBooksReducer.created_cover_id}`);
    }
  }, [CoverBooksReducer.data]);

  const _onClickCheckBox = (id) => {
    let tempSelectedData = [...selectedBooks];
    if (tempSelectedData.includes(id)) {
      tempSelectedData.forEach((item, i) => {
        if (item === id) {
          tempSelectedData.splice(i, 1);
        }
      });
    } else {
      tempSelectedData.push(id);
    }
    setSelectedBooks(tempSelectedData);
  };

  const _deleteMultipleBooks = async () => {
    setIsDelCvrApiCall(true);
    delete_multiple_coverbooks(selectedBooks).then(() => {
      getAllCoverBooks(user_id);
      setSelectedBooks([]);
      setIsDelCvrApiCall(false);
      setIsShowCnfrmDelCvrModal(false);
    });
  };

  const _onMoveFolder = (folder_id, cover_id) => {
    move_coverbook_to_folder({
      folders_id: folder_id,
      cover_id: cover_id,
    }).then(() => {
      setIsSHowMveFldrModal(false);
      getAllCoverBooks(user_id);
    });
  };

  const _on_update_folder_name = (updatedFolderName) =>{
    console.log(editFolderData.folders_id,updatedFolderName,"________________");
  }

  useEffect(() => {
    if (selectedFolder !== "") {
      getCoverBooksByFolder(user_id, selectedFolder);
    }
  }, [selectedFolder]);

  useEffect(() => {
    setTeamMembers(TeamMembersReducer);
  }, [TeamMembersReducer]);

  return (
    <>
      <main className="main-container">
        <section className="section-coverage-main">
          <div className="row reverse-columns-tablet">
            <div className="col-lg-3">
              <div className="coverage-main-left">
                {user_invited === 0 && (
                  <div className="profile-part">
                    <div className="h3-head coverage-main-text-head">
                      <h3>Your Team</h3>
                    </div>
                    <div className="profile-people">
                      {teamMembers.length > 0 &&
                        teamMembers.map((item, i) => {
                          return (
                            <Link to="#" key={i}>
                              <div className="profile-coverage-main">
                                <img
                                  src={
                                    item.user_image === null
                                      ? Dp
                                      : item.user_image
                                  }
                                />
                                <p className="text-capitalize mb-0">
                                  {item.user_name}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      <div className="coverage-main-btn">
                        <button
                          className="btn-coverage"
                          data-toggle="modal"
                          data-target="#edit-client"
                          onClick={() => setIsInviteModalOpen(true)}
                        >
                          Invite Team Member
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="clients-folder-part">
                  <div className="h3-head coverage-main-text-head">
                    <h3 onScrollCapture={(e) => console.log(e)}>
                      Client Folder (All)
                    </h3>
                  </div>

                  <Link to="#">
                    <div
                      className="folders-coverage-main"
                      onClick={() => getAllCoverBooks(user_id)}
                    >
                      <div className="d-flex align-items-center">
                        <span className="fas fa-folder fa-fw"></span>
                        <p className="mb-0">All</p>
                      </div>
                    </div>
                  </Link>
                  {folders.map((item, i) => {
                    return (
                      <Link to="#" key={i}>
                        <div
                          className="folders-coverage-main"
                          onClick={() => setSelectedFolder(item.folders_id)}
                        >
                          <div className="d-flex align-items-center">
                            <span className="fas fa-folder fa-fw"></span>
                            <p className="mb-0">{item.folders_name}</p>
                          </div>
                          <i
                            className="fas fa-pen edit-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setIsEditFolder(true);
                              setEditFolderData(item);
                            }}
                          ></i>
                        </div>
                      </Link>
                    );
                  })}

                  <div className="coverage-main-btn">
                    <button
                      className="btn-coverage"
                      onClick={() => setIsAddFolderModal(true)}
                    >
                      Add Client Folder
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Remove mx-auto */}
            <div className="col-lg-8 mr-auto mx-auto">
              <div className="row for-margin-cols">
                <div className="col-lg-12">
                  <div className="coverage-main-right">
                    <div className="h3-head coverage-main-text-head-bolder d-flex justify-content-between">
                      <h3>Your Coverage Books</h3>
                      <button
                        className="btn btn-danger btn-sm"
                        // onClick={() => _deleteMultipleBooks()}
                        onClick={() => setIsShowCnfrmDelCvrModal(true)}
                        disabled={selectedBooks.length === 0}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <Link to="#">
                    <div className="books">
                      <div className="add-new-book">
                        <p className="plus">+</p>
                        <div className="coverage-main-btn">
                          <button
                            onClick={_onAddCoverage}
                            className="btn-coverage no-before"
                          >
                            New Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {allCoverbooks.map((item, i) => {
                  return (
                    <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                      <Link to="#">
                        <div className="books">
                          <div
                            className="previous-books"
                            style={{
                              backgroundColor:
                                item?.cover_bg_image === ""
                                  ? item?.cover_bg_color === "rgba(0,0,0,0)"
                                    ? "rgba(71, 35, 152,0.3)"
                                    : item?.cover_bg_color
                                  : "",
                            }}
                          >
                            {selectedBooks.includes(item?.cover_id) && (
                              <i className="fas fa-check-square"></i>
                            )}
                            {item?.cover_bg_image !== "" && (
                              <img
                                src={`${baseUrl}/${item?.cover_bg_image?.replace(
                                  "uploads",
                                  "uploads/"
                                )}`}
                              />
                            )}
                            {item?.cover_logo && (
                              <div className="logo-book">
                                <img
                                  src={`${baseUrl}/${item?.cover_logo.replace(
                                    "uploads",
                                    "uploads/"
                                  )}`}
                                />
                              </div>
                            )}
                            <div className="on-hover-book-ui">
                              <div className="selected-checkbox">
                                <span
                                  onClick={() =>
                                    _onClickCheckBox(item.cover_id)
                                  }
                                >
                                  {selectedBooks.includes(item.cover_id) ? (
                                    <i
                                      color="red"
                                      className="fas fa-check-square"
                                    ></i>
                                  ) : (
                                    <i
                                      color="#472398"
                                      className="far fa-square"
                                    ></i>
                                  )}
                                </span>
                              </div>
                              <div className="d-flex justify-content-around w-100">
                                <button
                                  onClick={() => {
                                    // getSingleCoverDetail(item.cover_id);
                                    history.push(
                                      `/edit-cover/${item?.cover_id}`
                                    );
                                  }}
                                  className="btn btn-outline-secondary"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    history.push(
                                      `/coverbook/${item?.cover_id}`
                                    );
                                  }}
                                  className="btn btn-outline-secondary"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => {
                                    _deleteCover(item?.cover_id);
                                  }}
                                  className="btn btn-outline-secondary"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={() => {
                                    setSelCvrToMove({
                                      cover_id: item.cover_id,
                                      title: item.cover_title,
                                    });
                                    setIsSHowMveFldrModal(true);
                                    // console.log({
                                    //   cover_id: item.cover_id,
                                    //   title: item.cover_title,
                                    // });
                                  }}
                                  className="btn btn-outline-secondary"
                                >
                                  Move
                                </button>
                              </div>
                            </div>
                            <div className="book-name">
                              <h5>{item?.cover_title.substr(0, 40)}...</h5>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
                {isApiCall &&
                  [1, 2, 3, 4, 5].map((item, i) => {
                    return <CoverbookSkeleton key={i} />;
                  })}
              </div>
            </div>
          </div>
        </section>
        {/* <ChatNowComp /> */}
      </main>
      {isAddCoverageModalShow && (
        <AddOnlineCoverageModal
          isShowModal={isAddCoverageModalShow}
          setIsShowModal={setIsAddCoverageModalShow}
          onSave={_createCoverbook}
          reducerData={CoverageReducer}
        />
      )}
      {isAddFolderModal && (
        <AddFolderModal
          isShowModal={isAddFolderModal}
          setIsShowModal={setIsAddFolderModal}
          onCreateFolder={onCreateFolder}
        />
      )}
      {isInviteModalOpen && (
        <InviteTeamMemModal
          isShowModal={isInviteModalOpen}
          setIsShowModal={setIsInviteModalOpen}
          onInvite={invite_team_member}
        />
      )}
      {isShowCnfrmDelCvrModal && (
        <ConfirmDelCoverbookModal
          isShowModal={isShowCnfrmDelCvrModal}
          setIsShowModal={setIsShowCnfrmDelCvrModal}
          onClickOk={_deleteMultipleBooks}
          isApiCall={isDelCvrApiCall}
        />
      )}
      {isSHowMveFldrModal && (
        <MoveCvrBookToFolderModal
          isShowModal={isSHowMveFldrModal}
          setIsShowModal={setIsSHowMveFldrModal}
          coverDetail={selCvrToMove}
          setCoverDetail={setSelCvrToMove}
          onClickMove={_onMoveFolder}
        />
      )}
      {isEditFolder && (
        <EditFolderModal
          isShowModal={isEditFolder}
          setIsShowModal={setIsEditFolder}
          editFolderData={editFolderData}
          setEditFolderData={setEditFolderData}
          onUpdateFolder={_on_update_folder_name}
        />
      )}
    </>
  );
};

const CoverbookSkeleton = () => {
  return (
    <div className="col-xl-4 col-lg-6 col-md-6">
      <div className="books-skeleton">
        <Skeleton
          containerClassName="books-skeleton"
          className="books-skeleton"
          highlightColor="#ffffff"
          baseColor="#ede7ff"
          height="100%"
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  CoverageReducer,
  UserReducer,
  CoverBooksReducer,
  FoldersReducer,
  TeamMembersReducer,
}) => {
  return {
    CoverageReducer,
    UserReducer,
    CoverBooksReducer,
    FoldersReducer,
    TeamMembersReducer,
    isFetchCoverBooks: CoverBooksReducer.isFetchCoverBooks,
  };
};

export default connect(mapStateToProps, actions)(Dashboard);
