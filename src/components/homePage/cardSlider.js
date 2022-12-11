import React from "react";
import "./style.css";

const SlideBar = ({ image, title, creator, campaignID }) => {
  return (
    <div className="">
      <img
        src={image}
        alt="slidebar"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `/Campaign/${campaignID}`;
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
