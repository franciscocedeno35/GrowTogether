import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { VscCircleLargeFilled } from 'react-icons/vsc';
import './style.css';


const SearchbarDropdown = ( props ) =>
{
  const { options, onInputChange } = props;
  const ulRef = useRef()
  const inputRef = useRef();
  useEffect( () =>
  {
    inputRef.current.addEventListener( 'click', ( event ) =>
    {
      event.stopPropagation();
      ulRef.current.style.display = 'flex';
    });
    document.addEventListener( 'click', ( event ) =>
    
    {
           ulRef.current.style.display = "none";
    })
  }, [] );
	return (
		<div className="search-bar-dropdown">
			<input
				type="text"
				className="form-control"
				placeholder="      Search for name or category"
				ref={inputRef}
        onChange={onInputChange}
        
			/>
			<ul className="list-group" ref={ulRef}>
				{options.map((option, index) => {
					return (
						<button
							type="button"
							key={index}
							onClick={(e) => {
								e.preventDefault();
								window.location.href = '/Project';
							}}
							className="list-group-item list-group-item-action">
							{option}
						</button>
					);
				})}
			</ul>
		</div>
	);
};

const defauktOptions = [];
for ( let i = 0; i < 10; i++ )
{
  defauktOptions.push( `technology ${i}` );
  defauktOptions.push(`art ${i}`);
  defauktOptions.push(`sport ${i}`);
}




const Home = () =>
{
  const [options, setOptions] = useState([]);   
  const onInputChange = ( event ) =>
  {
    setOptions(
      defauktOptions.filter( option => option.includes( event.target.value ) )
      );
  };


  
	return (
		<div className="homepage-body ">
			<div className="search-container">
				<SearchbarDropdown options={options} onInputChange={onInputChange} />
			</div>

			<div className="slider-container">
				<section className="slider">
					<div className="slides">
						<p className="featured-project">FEATURED PROJECTS</p>
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
								Help Aural Pleasure Records make an extraordinary pressing of
								this 2LP demo collection - mastered at THE legendary Abbey Road
								Studios!!
								<br></br>By Aural Pleasure Records
							</span>
						</div>
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
								<p className="project-caption-header">
									Gram Parsons Recordings
								</p>
								A recently discovered long-lost Gram Parsons performance on CD
								and 2LP
								<br></br>By Dave Prinz
							</span>
						</div>
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
								Single origin chocolate made from local ingredients in Nigeria{' '}
								<br></br>By Iyin @ Luji's Chocolate
							</span>
						</div>
					</div>
					<div className="icon-buttons">
						<VscCircleLargeFilled
							onClick={() => setSlide('slide1', 1)}
							className="icons"
						/>
						<VscCircleLargeFilled
							onClick={() => setSlide('slide2', 2)}
							className="icons"
						/>
						<VscCircleLargeFilled
							onClick={() => setSlide('slide3', 3)}
							className="icons"
						/>
					</div>
				</section>
			</div>
		</div>
	);
}
export default Home;



  let slideIndex = 1;
	function setSlide(input, index) {
		console.log('****', input, index);
		 slideIndex = index;
		 let item = document.querySelector(`#${input}`);
		 console.log("****" , item)
    let slides = [ ...document.querySelector( '.slides' ).children ];
		slides.forEach((element) => {
			element.classList.remove('active');
		});
		item.classList.add('active');
}
setInterval( () =>
{
   slideIndex += 1;
  if (slideIndex == 4)
  {
    slideIndex = 1;
 
  }
  setSlide(`slide${slideIndex}` , slideIndex)
  }, 5000)