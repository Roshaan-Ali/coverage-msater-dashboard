import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import * as actions from "../store/Actions/Index";

const InsightsScreen = ({
  UserReducer,
  CoverBooksReducer,
  getAllCoverBooks,
}) => {
  const [coverbookList, setcoverbookList] = useState([
    {
      title: "France 24",
      pub_date: "Nov 30, 2021",
      comment: "testing asdas dasdasdsa",
      created_at: "Nov 1, 2021",
    },
    {
      title: "France 25",
      pub_date: "Nov 28, 2021",
      comment: "testing asdas dasdasdsa",
      created_at: "Nov 1, 2021",
    },
    ,
    {
      title: "France 26",
      pub_date: "Nov 27, 2021",
      comment: "testing asdas dasdasdsa",
      created_at: "Nov 2, 2021",
    },
    {
      title: "France 27",
      pub_date: "Nov 28, 2021",
      comment: "testing asdas dasdasdsa",
      created_at: "Nov 1, 2021",
    },
  ]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const { user_id } = UserReducer;

  const _search = () => {
    let searchResult = coverbookList.filter((item) => {
      return item.cover_title.toLocaleLowerCase().includes(searchTitle);
    });
    setSearchedData(searchResult);
  };

  useEffect(() => {
    getAllCoverBooks(user_id);
  }, []);

  useEffect(() => {
    setcoverbookList(CoverBooksReducer.data);
  }, [CoverBooksReducer.data]);

  useEffect(() => {
    if (searchTitle !== "") {
      _search();
    }
  }, [searchTitle]);

  const history = useHistory();

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

  return (
    <>
      <main>
        <section className="section-1 padding-mine min-height-top formTn">
          <div className="container-1200 min-height-container-row">
            <div className="row min-height-container-row">
              <div className="col-lg-12">
                <div className="h3-head smallSpaceHeading">
                  <h3>
                    All Coverbooks
                    <span>{coverbookList.length} pieces of coverage</span>
                  </h3>
                </div>
              </div>
              <div className="col-lg-12">
                <form className="row formMain filterleForm">
                  <div className="col-lg-4 col-md-6 col-12 form-group">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search By Title"
                      onChange={(e) =>
                        setSearchTitle(e.target.value.toLocaleLowerCase())
                      }
                    />
                  </div>
                  <div className="col-lg-8 col-md-6 col-12 ">
                    {selectedBooks.length > 0 && (
                      <button
                        className="btn btn-danger float-right"
                        type="button"
                        onClick={() =>
                          console.log("------------", selectedBooks)
                        }
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  {/* <div className="col-lg-2 col-md-6 col-12 form-group">
                    <input
                      type="text"
                      name="fromdate"
                      placeholder="From Date"
                    />
                  </div>
                  <div className="col-lg-2 col-md-6 col-12 form-group">
                    <input type="text" name="todate" placeholder="To Date" />
                  </div> */}
                </form>
                <div className="tableDiv">
                  <table className="table tableTn">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col"></th>
                        <th className="text-center" scope="col">
                          Cover Title
                        </th>
                        {/* <th scope="col">Publist Date</th> */}
                        <th className="text-center" scope="col">
                          Comment
                        </th>
                        <th className="text-center" scope="col">
                          Created AT
                        </th>
                        <th className="text-center" scope="col">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(searchTitle === "" ? coverbookList : searchedData).map(
                        (item, i) => {
                          return (
                            <tr key={i}>
                              <td className="text-center">
                                {/* <input
                                  type="checkbox"
                                  onChange={() =>
                                    _onClickCheckBox(item.cover_id)
                                  }
                                /> */}
                                <span onClick={()=>_onClickCheckBox(item.cover_id)}>
                                  {/* {selectedBooks.includes(item.cover_id) ? (
                                    <i
                                      color="red"
                                      className="fas fa-check-square"
                                    ></i>
                                  ) : (
                                    <i
                                      color="#472398"
                                      className="far fa-square"
                                    ></i>
                                  )} */}
                                  {i+1}
                                </span>
                              </td>
                              <td className="text-center">
                                {item?.cover_title}
                              </td>
                              <td className="text-center">
                                {item?.cover_comment === ""
                                  ? "---"
                                  : item?.cover_comment}
                              </td>
                              <td className="text-center">
                                {moment(item?.cover_created_at).format(
                                  "MMM DD, YYYY"
                                )}
                              </td>
                              <td className="text-center">
                                <button
                                  onClick={() =>
                                    history.push(`/coverbook/${item.cover_id}`)
                                  }
                                  className="btn btn-success"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

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
      </main>
    </>
  );
};

// export default InsightsScreen;
const mapStateToProps = ({ UserReducer, CoverBooksReducer }) => {
  return { UserReducer, CoverBooksReducer };
};

export default connect(mapStateToProps, actions)(InsightsScreen);
