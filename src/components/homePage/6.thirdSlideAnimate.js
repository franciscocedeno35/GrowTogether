import React from 'react';
import './style.css';

const thirdSlideAnimate = () => {
	return (
		<div className="item" id="slide3">
			<img
				src="https://ksr-ugc.imgix.net/assets/039/030/603/9f98bafdfdf52ef3c39255a5c490e3f4_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1666743388&auto=format&frame=1&q=92&s=ba69422587ff574df3917107ed577d8f"
				alt="PAXRISING"
				onClick={(e) => {
					e.preventDefault();
					window.location.href = '/Project';
				}}
			/>
			<span>
				<p className="project-caption-header">Luji’s Chocolate </p>
				Single origin chocolate made from local ingredients in Nigeria <br></br>
				By Iyin @ Luji's Chocolate
			</span>
		</div>
	);
};
export default thirdSlideAnimate;
