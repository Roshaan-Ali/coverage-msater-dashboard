import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Folder, Screen6 } from "../../assets";
import { numFormatter } from "../../utils";
import * as actions from "../../store/Actions/Index";
import moment from "moment";
import { baseUrl } from "../../config/config.json";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
// import { jsPDF } from "jspdf";
import { renderToString } from "react-dom/server";
import { toast } from "react-toastify";
import { frontBaseUrl } from "../../config/config.json";
import axios from "axios";
const Coverbook = ({
  FrontCoverReducer,
  MetricsReducer,
  CoverageReducer,
  getSingleCoverDetail,
  // downloadPdf,
}) => {
  const [isApiCall, setIsApiCall] = useState(true);
  const [isPdfApicall, setIsPdfApicall] = useState(false);
  const [isPdfAvailable, setIsPdfAvailable] = useState("");
  const { cover_id } = useParams();

  useEffect(() => {
    getSingleCoverDetail(cover_id).then(() => setIsApiCall(false));
  }, []);

  if (isApiCall) {
    return (
      <div className="w-100 h-100 spinner-div">
        <Spinner
          passedClass="coverbook-loader"
          height={"100px"}
          width={"100px"}
          spinnerType="ThreeDots"
        />
      </div>
    );
  }
  const data = document.getElementsByClassName("pdf-contianer");
  const _download_pdf = async () => {
    if (isPdfAvailable !== "") {
      window.open(isPdfAvailable, "_blank");
      setIsPdfApicall(false);
    } else {
      try {
        const res = await axios.post(`${baseUrl}/api/cover/getpdf`, {
          link: `${frontBaseUrl}/coverbook/${cover_id}`,
        });
        if (res.data.status) {
          toast.success(res.data.msg);
          setIsPdfAvailable(`${baseUrl}${res.data.data.pdf_path}`);
          window.open(`${baseUrl}${res.data.data.pdf_path}`, "_blank");
        } else {
          console.warn("erorrrr");
          toast.error(res.data.msg);
        }
        setIsPdfApicall(false);
        // downloadPdf(`/api/cover/getpdf`, {
        //   link: `${frontBaseUrl}/coverbook/${cover_id}`,
        // },()=>setIsPdfApicall(false)).then((res) => {
        //   console.log("OOOOOOOOOOOOOOOOOOOOOOOOO");
        //   if (res.data.status) {
        //     toast.success(res.data.msg);
        //     setIsPdfAvailable(`${baseUrl}${res.data.data.pdf_path}`);
        //     window.open(`${baseUrl}${res.data.data.pdf_path}`, "_blank");
        //   } else {
        //     console.warn("erorrrr");
        //     toast.error(res.data.msg);
        //   }
        //   setIsPdfApicall(false);
        // });
      } catch (err) {
        setIsPdfApicall(false);
        console.log(err, "PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
      }
    }
  };

  return (
    <>
      {/* {isApiCall && (
        <div className="w-100 h-100 spinner-div">
          <Spinner
            passedClass="coverbook-loader"
            height={"100px"}
            width={"100px"}
            spinnerType="ThreeDots"
          />
        </div>
      )} */}
      <div
        style={{
          backgroundColor: FrontCoverReducer?.cover_bg_color,
          position: "relative",
        }}
        className="pdf-contianer"
        id="pdf-contianer"
      >
        <section
          className="screen-1"
          style={{
            background: `url(${baseUrl}/${FrontCoverReducer?.cover_bg_image?.replace(
              "uploads",
              "uploads/"
            )})`,
          }}
        >
          <div className="container-1440">
            <div className="screen-1-content">
              {FrontCoverReducer?.cover_logo !== "" && (
                <img
                  src={`${baseUrl}/${FrontCoverReducer?.cover_logo?.replace(
                    "uploads",
                    "uploads/"
                  )}`}
                />
              )}
              <h3
                style={{
                  backgroundColor: FrontCoverReducer?.cover_title_bg_color,
                  color: FrontCoverReducer?.cover_title_color,
                }}
              >
                {FrontCoverReducer?.cover_title}
              </h3>
              {(FrontCoverReducer?.cover_comment_title !== "" ||
                FrontCoverReducer?.cover_comment !== "") && (
                <div
                  className="text-box"
                  style={{
                    backgroundColor: FrontCoverReducer?.cover_comment_bg_color,
                  }}
                >
                  {FrontCoverReducer?.cover_comment_title !== "" && (
                    <h3>{FrontCoverReducer?.cover_comment_title}</h3>
                  )}
                  {FrontCoverReducer?.cover_comment !== "" && (
                    <p
                      style={{
                        color: FrontCoverReducer?.cover_comment_text_color,
                      }}
                    >
                      {FrontCoverReducer?.cover_comment}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="screen-1 screen-2">
          <div className="container-summary">
            <div className="screen-2-content">
              <h3>Summary</h3>
              <div className="row">
                {MetricsReducer.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="col-lg-4 col-md-4 col-6 margin-summary"
                    >
                      <div className="folder-summary">
                        <img src={Folder} />
                        <div className="folder-text">
                          <h6>{numFormatter(item?.cover_metric_count)}</h6>
                          <p>{item?.cover_metric_label}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {CoverageReducer.data.map((item, i) => {
          return (
            <section key={i} className="screen-1 screen-4">
              <div className="container-1440">
                <div className="screen-1-content">
                  <h3 className="mb-1">{item?.website_metric_link}</h3>
                  <span className="date">
                    {moment(item?.website_metric_date).format("MMMM DD, YYYY")}
                  </span>
                  <div className="demo-testing">
                    <ul className="list-demo-items">
                      <li>(est.) Monthly visits:</li>
                      <li>
                        {numFormatter(item?.website_metric_monthly_visits)}
                      </li>
                    </ul>
                  </div>
                  <div className="demo-testing">
                    <ul className="list-demo-items">
                      <li>(est.) Coverage views:</li>
                      <li>
                        {numFormatter(item?.website_metric_estimated_views)}
                      </li>
                    </ul>
                  </div>
                  <p className="text-left mt-3">
                    <i className="fa fa-quote-left quote-icon"></i>
                    {item?.website_metric_comment}
                  </p>
                </div>
                <div className="screen-4-img">
                  <Link
                    to={{
                      pathname: item?.website_metric_url,
                    }}
                    target="_blank"
                  >
                    <img src={`${baseUrl}${item?.website_metric_screenshot}`} />
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
        <div
          onClick={() => {
            if (!isPdfApicall) {
              setIsPdfApicall(true);
              _download_pdf();
            }
          }}
          className="dwnload-btn-on-shareable-link"
        >
          {isPdfApicall ? (
            <Spinner spinnerType="ThreeDots" />
          ) : (
            <i className="fas fa-file-download"></i>
          )}
        </div>
      </div>
    </>
  );
};

// export default Coverbook;
const mapStateToProps = ({
  FrontCoverReducer,
  MetricsReducer,
  CoverageReducer,
}) => {
  return { FrontCoverReducer, MetricsReducer, CoverageReducer };
};

export default connect(mapStateToProps, actions)(Coverbook);
