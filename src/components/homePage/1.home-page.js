import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import SlideAnimate from "./4.SlideAnimate";
import { VscCircleLargeFilled } from "react-icons/vsc";
import SearchbarDropdownn from "./5.searchbarDropdown";
import SlideBar from "./6.SlideBar";
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
      <div className="slide-bar">
        <SlideBar />
      </div>
    </div>
  );
};
export default Home;
