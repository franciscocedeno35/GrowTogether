import 'bootstrap/dist/css/bootstrap.min.css';
import FirstSlideAnimate from './4.firstSlideAnimate';
import SecondSlideAnimate from './5.secondSlideAnimate';
import ThirdSlideAnimate from './6.thirdSlideAnimate';
import SliderIcons from './7.sliderIcons';
import './style.css';
import SearchbarDropdownn from './8.searchbarDropdown';



const Home = () =>
{ 
	return (
		<div className="homepage-body ">
			<SearchbarDropdownn />
			<div className="slider-container">
				<section className="slider">
					<div className="slides">
						<p className="featured-project">FEATURED PROJECTS</p>
						<FirstSlideAnimate />
						<SecondSlideAnimate />
						<ThirdSlideAnimate />
					</div>
					<SliderIcons />
				</section>
			</div>
		</div>
	);
}
export default Home;



 