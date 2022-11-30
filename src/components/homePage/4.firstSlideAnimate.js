import React from 'react';
import './style.css';


const firstSlideAnimate = () => 
	{
		return (
			<div className="item active" id="slide1">
				<img
					src="https://ksr-ugc.imgix.net/assets/039/264/528/e504f338cf8166cacbbdb009573d15f9_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1668776988&auto=format&frame=1&q=92&s=937514a4c7e118d714427786cccbdb1e"
					alt="PAXRISING"
					onClick={(e) => {
						e.preventDefault();
						window.location.href = '/Project';
					}}
				/>
				<span>
					<p className="project-caption-header">
						King Gizzard & The Lizard Wizard "Demos Vol. 3 + 4" on Vinyl
					</p>
					Help Aural Pleasure Records make an extraordinary pressing of this 2LP
					demo collection - mastered at THE legendary Abbey Road Studios!!
					<br></br>By Aural Pleasure Records
				</span>
			</div>
		);

}
	 export default firstSlideAnimate;

