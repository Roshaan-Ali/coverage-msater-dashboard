import React from "react";
import Loader from "react-loader-spinner";

/**
 * label --- (Button Text - Required)
 * lableOnSaving (Button Text when api hit - Required)
 * onClickBtn (Function on btn click - Required)
 * isApiCall (variable/state for changing btn ui - Required)
 * passedStyle (custom styling - Optional),
 */

const BtnWithLoader = ({
  label,
  lableOnSaving,
  onClickBtn,
  isApiCall,
  passedStyle,
  loaderWithBtn = false,
}) => {
  return loaderWithBtn ? (
    <button
      className={`btn-reg ${passedStyle}`}
      onClick={() => {
        onClickBtn();
      }}
      disabled={isApiCall}
    >
      {isApiCall ? (
        <span className="d-flex">
          <Loader
            type="Oval"
            color="#00BFFF"
            height={20}
            width={20}
            className="mr-2"
          />{" "}
          {lableOnSaving}
        </span>
      ) : (
        label
      )}
    </button>
  ) : (
    <button
      className={`btn-reg ${passedStyle}`}
      onClick={() => {
        onClickBtn();
      }}
    >
      {label}
    </button>
  );
};

export default BtnWithLoader;
