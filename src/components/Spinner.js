import React from "react";
import Loader from "react-loader-spinner";

const Spinner = ({ color, height, width, passedClass, spinnerType }) => {
  return (
    <>
      <Loader
        type={spinnerType || "Oval"}
        color={color || "#1c005b"}
        height={height || 20}
        width={width || 20}
        className={passedClass}
      />
    </>
  );
};

export default Spinner;
