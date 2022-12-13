import React from "react";
import "./style.css";
import './cardSlider.css';

const SlideBar = ({ image, title, creator, campaignID }) => {
  return (
		<div className="card-slider-container-imgspan">
			<div className="card-slider-image-container">
				<img
					src={image}
					alt="slidebar"
					onClick={(e) => {
						e.preventDefault();
						window.location.href = `/Campaign/${campaignID}`;
					}}
				/>
			</div>

			<span className="project-card-header-creator">
				<p className="project-card-header">{title}</p>
				{creator}
			</span>
		</div>
	);
};
export default SlideBar;
