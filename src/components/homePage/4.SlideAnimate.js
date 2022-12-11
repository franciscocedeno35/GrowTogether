import React from "react";
import "./style.css";

const SlideAnimate = ({ image, title, description, creator, slideClass, slideId, campaignID }) => {
  return (
    <div className={slideClass} id={slideId}>
      <img
        src={image}
        alt="slide1"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "Campaign/" + campaignID;
        }}
      />
      <span>
        <p className="project-caption-header">{title}</p>
        {description}
        <br></br>
        {creator}
      </span>
    </div>
  );
};
export default SlideAnimate;
