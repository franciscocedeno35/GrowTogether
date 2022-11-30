import 'bootstrap/dist/css/bootstrap.min.css';
import SlideAnimate from './4.SlideAnimate';
import SliderIcons from './5.sliderIcons';
import SearchbarDropdownn from './6.searchbarDropdown';
import './style.css';

const Home = () => {
	return (
		<div className="homepage-body ">
			<SearchbarDropdownn />
			<div className="slider-container">
				<section className="slider">
					<div className="slides">
						<p className="featured-project">FEATURED PROJECTS</p>
						<SlideAnimate
							image="https://ksr-ugc.imgix.net/assets/039/264/528/e504f338cf8166cacbbdb009573d15f9_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1668776988&auto=format&frame=1&q=92&s=937514a4c7e118d714427786cccbdb1e"
							title='King Gizzard & The Lizard Wizard "Demos Vol. 3 + 4" on Vinyl'
							description="Help Aural Pleasure Records make an extraordinary pressing of this 2LP demo collection - mastered at THE legendary Abbey Road Studios!!"
							creator="By Aural Pleasure Records"
							slideClass="item active"
							slideId="slide1"
						/>
						<SlideAnimate
							image="https://ksr-ugc.imgix.net/assets/038/360/777/4fd8dd89177dc1dbe223a9c854a5ed65_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1661217670&auto=format&frame=1&q=92&s=0337bd0e6f4e8db890abd5835d7c3b17"
							title="Gram Parsons Recordings"
							description="A recently discovered long-lost Gram Parsons performance on CD and 2LP"
							creator="By Dave Prinz"
							slideClass="item "
							slideId="slide2"
						/>
						<SlideAnimate
							image="https://ksr-ugc.imgix.net/assets/039/030/603/9f98bafdfdf52ef3c39255a5c490e3f4_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1666743388&auto=format&frame=1&q=92&s=ba69422587ff574df3917107ed577d8f"
							title="Luji’s Chocolate"
							description="Single origin chocolate made from local ingredients in Nigeria"
							creator="By Dave Prinz"
							slideClass="item"
							slideId="slide3"
						/>					
					</div>
					<SliderIcons />
				</section>
			</div>
		</div>
	);
};
export default Home;
