import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { VscCircleLargeFilled } from "react-icons/vsc";
import SlideAnimate from "./4.SlideAnimate";
import SearchbarDropdownn from "./5.searchbarDropdown";
import SlideBar from './cardSlider';
import "./style.css";
import { Get, GetImage } from "../../scripts";

let counter = 0;

const Home = () => {
  const [slideIndex, setslideIndex] = useState(0);
  const [Featured, setFeatured] = useState([]);

  useEffect(() => {
    getFeatured();
    const interval = setInterval(() => {
      // console.log(counter);
      counter++;
      if (counter == 3) {
        counter = 0;
      }
      setslideIndex(counter);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getFeatured = async () => {
    const featured = await Get(`/publishedCampaigns/featured`, {});
    for (let i = 0; i < featured.length; i++) {
      const c = featured[i];
      if (i == 1) {
        c.class = "item active";
      } else {
        c.class = "item";
      }
      c.id = "slide" + i;
      c.image = await GetImage(c.mainImage);
    }
    console.log(featured);
    setFeatured(featured);
  };

  useEffect(() => {
    setSlide(`slide${slideIndex}`, slideIndex);
  }, [slideIndex]);

  const setSlide = (input, index) => {
    setslideIndex(index);
    for (let i = 0; i < Featured.length; i++) {
      let feature = Featured[i];
      if (i == index) {
        feature.class = "item active";
      } else {
        feature.class = "item";
      }
      Featured[i] = feature;
    }
    setFeatured(Featured);
  };


   const [Recommended, setRecommended] = useState([
			{
				image:
					'https://ksr-ugc.imgix.net/assets/039/169/407/00b57bd86d87f8b0fc3cc9d6d92577f2_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1667919249&auto=format&frame=1&q=92&s=0004ef93070e663d4ef699bf273fa2b7',
				title: 'Clockwork Basilisk',
				creator: 'By Headstamp Publishing',
				class: 'slider-card',
				id: '',
			},
			{
				image:
					'https://ksr-ugc.imgix.net/assets/039/339/306/39816e3e87407e2a11eec8667b195e03_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1669648310&auto=format&frame=1&q=92&s=e072a8705562bb94ef874fbb384db73a',
				title: 'Tiny Epic Crimes - with Red Reveal!',
				creator: 'By Gamelyn Games',
				class: 'slider-card',
				id: '',
			},
			{
				image:
					'https://ksr-ugc.imgix.net/assets/039/339/604/56d08784836891650bb2b00137925d55_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1669650692&auto=format&frame=1&q=92&s=79380107d8cd1f5fcd92d5495efb8b0e',
				title: 'Maple Valley',
				creator: 'By Kids Table Board Gaming',
				class: 'slider-card',
				id: '',
			},
			{
				image:
					'https://ksr-ugc.imgix.net/assets/039/211/569/22eaf34aa92e21af04e8bc58f65b0ea5_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1668309289&auto=format&frame=1&q=92&s=27eb4a285960c7f8baeda6479548cea4',

				title: 'Paper Koi Lantern: a DIY Kit',
				creator: 'By Yuumei Art',
				class: 'slider-card',
				id: '',
			},
			{
				image:
					'https://ksr-ugc.imgix.net/assets/039/179/033/b753898ca7497106933b63ee71060738_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1667995401&auto=format&frame=1&q=92&s=a9610b0daab572d97b50713fa653698b',
				title: 'Castle in the Stars: The Universe in 1875',
				creator: 'By Caurette',
				class: 'slider-card',
				id: '',
			},
			{
				image:
					'https://ksr-ugc.imgix.net/assets/039/310/556/38cb174b02dbc87b2aa0f37bff787eb1_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1669269851&auto=format&frame=1&q=92&s=9cc64e834dd12ba11a6e550f5381e1d0',
				title: 'Re;ACT - The Arts of War',
				creator: 'By Brother Ming Games',
				class: 'slider-card',
				id: '',
			},
		
		]);
  
 

  return (
    <div className="homepage-body ">
      <SearchbarDropdownn />
      <div className="slider-container">
        <section className="slider">
          <div className="slides">
            <p className="featured-project">FEATURED PROJECTS</p>
            {Featured.map((campaign) => (
              <SlideAnimate
                image={campaign.image}
                title={campaign.title}
                description={campaign.description}
                creator={campaign.owner}
                slideClass={campaign.class}
                slideId={campaign.id}
                key={campaign.id}
                campaignID={campaign._id}
              />
            ))}
          </div>
          <div className="icon-buttons">
            <VscCircleLargeFilled onClick={() => setSlide("slide1", 0)} className="icons" />
            <VscCircleLargeFilled onClick={() => setSlide("slide2", 1)} className="icons" />
            <VscCircleLargeFilled onClick={() => setSlide("slide3", 2)} className="icons" />
          </div>
        </section>
      </div>
      <div className="cardSlider-container-body">
			<div className="cardSlider-container">
				<div className="cardSlider">
					
					<div id="slider">
						{Recommended.map((campaign) => (
							<SlideBar
								image={campaign.image}
								title={campaign.title}
								creator={campaign.creator}
								cardSliderClass={campaign.class}
								cardSliderId={campaign.id}
								key={campaign.id}
							/>
						))}
					</div>
         
				</div>
      </div>
      </div>
		</div>
	);
};
export default Home;
