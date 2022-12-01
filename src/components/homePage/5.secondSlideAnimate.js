import React from 'react';
import './style.css';

const secondSlideAnimate = () => {
	return (
		<div className="item" id="slide2">
			<img
				src="https://ksr-ugc.imgix.net/assets/038/360/777/4fd8dd89177dc1dbe223a9c854a5ed65_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1661217670&auto=format&frame=1&q=92&s=0337bd0e6f4e8db890abd5835d7c3b17"
				alt="PAXRISING"
				onClick={(e) => {
					e.preventDefault();
					window.location.href = '/Project';
				}}
			/>
			<span>
				<p className="project-caption-header">Gram Parsons Recordings</p>A
				recently discovered long-lost Gram Parsons performance on CD and 2LP
				<br></br>By Dave Prinz
			</span>
		</div>
	);
};
export default secondSlideAnimate;
