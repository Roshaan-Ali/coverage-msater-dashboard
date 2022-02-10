import React, { useRef, useState, useEffect, createRef } from "react";
import { connect } from "react-redux";
import { BgMain } from "../../assets";
// import ChatNowComp from "../../components/ChatNowComp";
import NavBarComp from "../../components/NavBarComp";
// import ShareScreen from "../sharescreen/ShareScreen";
import CoverageSec from "./CoverageSec";
import FrontCoverSec from "./FrontCoverSec";
import MetricsSec from "./MetricsSec";
import OrderNSortSec from "./OrderNSortSec";
import * as actions from "../../store/Actions/Index";
import Spinner from "../../components/Spinner";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config/config.json";
// import { toast } from "react-toastify";

const CreateCoverScreen = ({
  FrontCoverReducer,
  CoverageReducer,
  getSingleCoverDetail,
  reset_created_cover_id
}) => {
  // refs
  const frontCvrRef = useRef();
  const metricRef = useRef();
  const coverageRef = useRef();
  const order_n_sortRef = createRef();

  const onClickScrollTo = (name) => {
    switch (name) {
      case "frontCvrRef":
        frontCvrRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "metricRef":
        metricRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "coverageRef":
        coverageRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        order_n_sortRef.current.scrollIntoView({ behavior: "smooth" });
        break;
    }
  };

  const { cover_id } = useParams();

  useEffect(() => {
    getSingleCoverDetail(cover_id);
    reset_created_cover_id()
  }, []);

  let { cover_bg_image, cover_bg_color } = FrontCoverReducer;
  return (
    <>
      <NavBarComp onClickScrollTo={onClickScrollTo} />
      {CoverageReducer.isApiCall ? (
        <div className="create-cover-loader-cont">
          <Spinner height={"100px"} width={"100px"} />
        </div>
      ) : (
        <>
          <main
            style={{
              backgroundImage: `url(${
                cover_bg_image === ""
                  ? BgMain
                  : `${baseUrl}/${cover_bg_image?.replace(
                      "uploads",
                      "uploads/"
                    )}`
              })`,
            }}
          >
            <div
              className="layer"
              style={{
                backgroundColor: cover_bg_image === "" && cover_bg_color,
              }}
            >
              <FrontCoverSec ref={frontCvrRef} />
              <MetricsSec ref={metricRef} />
              {CoverageReducer.data.map((item, i) => {
                return (
                  <CoverageSec ref={coverageRef} key={i} coverageData={item} />
                );
              })}
              <OrderNSortSec ref={order_n_sortRef} />
            </div>
          </main>
          {/* <ChatNowComp /> */}
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ FrontCoverReducer, CoverageReducer }) => {
  return {
    FrontCoverReducer,
    CoverageReducer,
  };
};
export default connect(mapStateToProps, actions)(CreateCoverScreen);
