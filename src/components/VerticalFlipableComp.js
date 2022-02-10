import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Link } from "react-router-dom";
import { Folder_pupr } from "../assets";
import { numFormatter } from "../utils";

const ChildOne = ({ onClick, metrics,openEditModal }) => {
  return (
    <>
      {metrics.cover_metric_is_edit === 1 && (
        <button
          className="btn btn-primary custom-metric-edit-btn"
          onClick={() => openEditModal(metrics)}
        >
          Edit
        </button>
      )}
      <div
        className="metrics-card"
        onClick={(e) => onClick() || e.preventDefault()}
      >
        <img src={Folder_pupr} loading="lazy" />
        <div className="card-text-metrics">
          <h3>{numFormatter(metrics.cover_metric_count)}</h3>
          <span>{metrics.cover_metric_label}</span>
        </div>
      </div>
    </>
  );
};

const ChildTwo = ({ onOut, descp }) => {
  return (
    <div
      className="metrics-card"
      onClick={(e) => onOut() || e.preventDefault()}
    >
      <img src={Folder_pupr} loading="lazy" />
      <div className="card-metrics-description">
        <p>{descp}</p>
      </div>
    </div>
  );
};

// const VerticalFlipableComp = ({ ChildOne, ChildTwo }, props) => {
const VerticalFlipableComp = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const _flipBack = () => {
    setIsFlipped((prev) => !prev);
  };

  return props.data?.cover_metric_description !== "" ? (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="vertical"
      containerClassName={props.passStyle}
    >
      <ChildOne onClick={_flipBack} metrics={props.data} openEditModal={props.openEditModal} />
      <ChildTwo
        onOut={_flipBack}
        descp={props.data?.cover_metric_description}
      />
    </ReactCardFlip>
  ) : (
    <ChildOne onClick={_flipBack} metrics={props.data} />
  );
};

export default VerticalFlipableComp;
