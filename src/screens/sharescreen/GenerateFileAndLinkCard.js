/**
 * image - (Required - path)
 * heading - (Required - string)
 * detail - (Required - string)
 * onClickBtn - (Required - Function)
 * btnText - (Required - string)
 */
import React from "react";

const GenerateFileAndLinkCard = ({
  image,
  heading,
  detail,
  onClickBtn,
  btnText,
}) => {
  const _onClickBtn = () => {
    onClickBtn();
  };
console.log("GenerateFileAndLinkCard")
  return (
    <div className="col-lg-6 col-md-5 col-sm-mine mx-auto">
      <div className="card-share-main">
        <div className="card-share">
          <img src={image} />
          <h3>{heading}</h3>
          <p>{detail}</p>
        </div>
        <div className="btn-share">
          <button onClick={_onClickBtn}>{btnText}</button>
        </div>
      </div>
    </div>
  );
};

export default GenerateFileAndLinkCard;
