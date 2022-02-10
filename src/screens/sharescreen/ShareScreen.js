import React, { useState } from "react";
import { Preview, Share, Pdf, Csv, Zip } from "../../assets";
import GenerateFileAndLinkCard from "./GenerateFileAndLinkCard";
import * as actions from "../../store/Actions/Index";
import { frontBaseUrl } from "../../config/config.json";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../config/config.json";
import { Redirect, useHistory, useParams } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRef } from "react";
import axios from "axios";

const ShareScreen = ({ downloadPdf }) => {
  const [isPdfAvailable, setIsPdfAvailable] = useState("");
  const [isPdfApicall, setIsPdfApicall] = useState(false);
  const { cover_id } = useParams();
  const history = useHistory();
  const openEmail = useRef();
  const GenerateFileAndLinkCardsData = [
    {
      img: Share,
      heading: "Share online",
      detail:
        "Send a private sharing link for others to view your book online.",
      onClickBtnFunc: () => {
        console.log("frontBaseUrl");
        navigator.clipboard.writeText(`${frontBaseUrl}/coverbook/${cover_id}`);
      },
      btnText: "Get shareable link",
    },
    {
      img: Pdf,
      heading: "Create a pdf",
      detail: "Ready to send digitally or print.",
      onClickBtnFunc: async() => {
        // if (isPdfAvailable !== "") {
        //   window.open(isPdfAvailable, "_blank");
        // } else {
        //   downloadPdf(`/api/cover/getpdf`, {
        //     link: `${frontBaseUrl}/coverbook/${cover_id}`,
        //   }).then((res) => {
        //     if (res.data.status) {
        //       toast.success(res.data.msg);
        //       setIsPdfAvailable(`${baseUrl}${res.data.data.pdf_path}`);
        //     } else {
        //       console.warn("erorrrr");
        //       toast.error(res.data.msg);
        //     }
        //   });
        // }
        if (isPdfApicall) {
          return;
        }
        setIsPdfApicall(true)
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
          } catch (err) {
            setIsPdfApicall(false);
            console.log(err);
          }
        }
      },
      btnText: isPdfApicall ? "Generating..." : isPdfAvailable === "" ? "Generate a pdf" : "Preview PDF",
    },
    {
      img: Csv,
      heading: "Export to email",
      detail: "Export all the metrics and date to email",
      onClickBtnFunc: () => {
        console.log(openEmail.current.click()); 
      },
      btnText: "Export to Email",
    },
    // {
    //   img: Zip,
    //   heading: "Create a zip",
    //   detail: "Download all images full size",
    //   onClickBtnFunc: () => {
    //     console.log("Zip");
    //   },
    //   btnText: "Generate a Zip",
    // },
  ];
  const _onPreview = () => {
    console.log("Preview");
    history.push(`/coverbook/${cover_id}`);
  };
  const [num, setnum] = useState(1);
  return (
    <>
      <main>
        <section className="section-1 padding-mine min-height-top">
          <div className="container-1200 min-height-container-row">
            <div className="row min-height-container-row">
              <div className="col-lg-6 col-md-12 my-auto text-sm-center-mine">
                <div className="h3-head">
                  <h3 onClick={() => setnum(num + 1)}>Share {num}</h3>
                </div>
                <div className="big-text share">
                  <div>
                    <h3>Ready to share your coverage book</h3>
                  </div>
                  <div>
                    <button className="preview-screen" onClick={_onPreview}>
                      <span>
                        <img src={Preview} />
                      </span>
                      <span>Preview fullscreen</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 my-auto">
                <div className="row share-row">
                  {GenerateFileAndLinkCardsData.map((item, i) => (
                    <GenerateFileAndLinkCard
                      key={i}
                      image={item.img}
                      heading={item.heading}
                      detail={item.detail}
                      onClickBtn={item.onClickBtnFunc}
                      btnText={item.btnText}
                    />
                  ))}
                  <a
                    ref={openEmail}
                    style={{ display: "none" }}
                    href={`mailto:?subject=coverbook&body=${frontBaseUrl}/coverbook/${cover_id}`}
                  >
                    Contact
                  </a>
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="copyright">
                  <h6>
                    Copyrights © 2021, <span> Coverage Master </span> All rights
                    reserved.
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// export default ShareScreen;
export default connect(null, actions)(ShareScreen);
