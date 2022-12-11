import React from "react";
import "./style.css";

const SlideBar = ({ image, title, creator }) => {
  return (
    <div className="">
      <img
        src={image}
        alt="slidebar"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "PublicCampaign/";
        }}
      />
      <span className="project-card-header-creator">
        <p className="project-card-header">{title}</p>
        {creator}
      </span>
    </div>
  );
};
export default SlideBar;
