import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Link,
  useLocation,
  useHistory,
  useParams,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import {
  Logo,
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
  Icon1,
  Icon2,
  Icon3,
  Dp,
} from "../assets";
import * as actions from "../store/Actions/Index";
import { baseUrl } from "../config/config.json";
import InviteTeamMemModal from "../screens/Dashboard/Modals/InviteTeamMemModal";
import AddOfflineCoverage from "../screens/Dashboard/Modals/AddOfflineCoverage";

const NavBarComp = ({
  UserReducer,
  onClickScrollTo,
  userLogOut,
  clearFrontCover,
}) => {
  const [isOffCovModal, setIsOffCovModal] = useState(false);
  let { user_name, user_image } = UserReducer;
  const { cover_id } = useParams();
  const navBarbtnsData = [
    {
      id: 1,
      image: Icon1,
      onClick: () => {
        console.log("working1");
      },
      link: "/dashboard",
      label: "My Books",
    },
    {
      id: 2,
      image: Icon2,
      onClick: () => {
        console.log("working2");
      },
      link: "/insights",
      label: "Insights",
    },
    {
      id: 3,
      image: Icon3,
      onClick: () => {
        console.log("working3");
      },
      link: "/packages",
      label: "Pricing",
    },
  ];

  const btnsDataCreateCoverage = [
    {
      id: 1,
      image: Img1,
      onClick: () => {
        onClickScrollTo("frontCvrRef");
      },
      link: "#",
      label: "Front Cover",
    },
    {
      id: 2,
      image: Img2,
      onClick: () => {
        onClickScrollTo("metricRef");
      },
      link: "#",
      label: "Metrics Edits",
    },
    {
      id: 3,
      image: Img3,
      onClick: () => {
        console.log("working");
        onClickScrollTo("coverageRef");
      },
      link: "#",
      label: "Coverage",
    },
    {
      id: 4,
      image: Img4,
      onClick: () => {
        console.log("order_n_sortRef");
        onClickScrollTo("order_n_sortRef");
      },
      link: "#",
      label: "Order & Sort",
    },
    {
      id: 5,
      image: Img5,
      onClick: () => {
        console.log("working");
      },
      link: `/share/${cover_id}`,
      label: "Share",
    },
  ];
  const [activeLink, setActiveLink] = useState(1);
  let { pathname } = useLocation();
  const history = useHistory();
  let match = useRouteMatch("/edit-cover/:cover_id");

  return (
    <>
      <header className="header-main">
        <nav className="header-absolute navbar navbar-expand-lg">
          <Link className="navbar-brand" to="/">
            <img alt="" src={Logo} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i className="fas fa-bars"></i>
            </span>
          </button>

          <div
            className="my-header-fixed collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            {pathname === "/dashboard" && (
              <ul>
                <li className="nav-item">
                  <Link
                    className="nav-link addbtn"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOffCovModal(true)
                    }}
                  >
                    <i className="fa fa-plus fa-fw"></i>
                    <span>Add Offline Coverage</span>
                  </Link>
                </li>
              </ul>
            )}
            <ul className={`navbar-nav ${match?.isExact && "mx-auto"}`}>
              {match?.isExact
                ? btnsDataCreateCoverage.map((item, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          setActiveLink(item.id);
                          item.onClick();
                        }}
                        className={`nav-item ${
                          activeLink == item.id && " active"
                        }`}
                      >
                        <Link className="nav-link" to={item.link}>
                          <span>
                            <img alt="" src={item.image} />
                          </span>
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })
                : navBarbtnsData.map((item, i) => {
                    return (
                      <li key={i} className="nav-item">
                        <Link className="nav-link" to={item.link}>
                          <span>
                            <img src={item.image} />
                          </span>
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
            </ul>
          </div>
          <div className="social-icons">
            <span className="pic"></span>
            <div className="dropdown">
              <button
                className="btn-drop dropdown-toggle"
                type="button"
                id="settings"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <p className="mb-0">
                  {user_name}
                  <i className="fa fa-chevron-down fa-fw"></i>
                  <br />
                </p>
                <img
                  alt="user-dp"
                  src={
                    user_image === null
                      ? Dp
                      : `${baseUrl}/${user_image?.replace(
                          "uploads",
                          "uploads/"
                        )}`
                  }
                />
                {/* <span className="notification">2</span> */}
              </button>
              <div
                className="first-dropdown-menu dropdown-menu nav-drop-down text-center"
                aria-labelledby="settings"
              >
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
                {/* <Link className="dropdown-item" to="#">
                  Settings
                </Link> */}
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={(e) => {
                    e.stopPropagation();
                    userLogOut();
                    clearFrontCover();
                    history.push("/");
                  }}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {isOffCovModal && (
        <AddOfflineCoverage
          isShowModal={isOffCovModal}
          setIsShowModal={setIsOffCovModal}
          onSave={() => console.log("SAVEEEEEEEEEEEEEEEEEEEE")}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ UserReducer }) => {
  return {
    UserReducer,
  };
};
export default connect(mapStateToProps, actions)(NavBarComp);
