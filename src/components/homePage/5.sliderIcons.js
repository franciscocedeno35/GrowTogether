import React from "react";
import { VscCircleLargeFilled } from "react-icons/vsc";
import "./style.css";

let slideIndex = 1;
function setSlide(input, index) {
  // console.log('****', input, index);
  slideIndex = index;
  let item = document.querySelector(`#${input}`);
  // console.log('****', item);
  let slides = [...document.querySelector(".slides").children];
  slides.forEach((element) => {
    element.classList.remove("active");
  });
  item.classList.add("active");
}
setInterval(() => {
  slideIndex += 1;
  if (slideIndex == 4) {
    slideIndex = 1;
  }
  setSlide(`slide${slideIndex}`, slideIndex);
}, 5000);

const sliderIcons = () => {
  return (
    <div className="icon-buttons">
      <VscCircleLargeFilled
        onClick={() => setSlide("slide1", 1)}
        className="icons"
      />
      <VscCircleLargeFilled
        onClick={() => setSlide("slide2", 2)}
        className="icons"
      />
      <VscCircleLargeFilled
        onClick={() => setSlide("slide3", 3)}
        className="icons"
      />
    </div>
  );
};
export default sliderIcons;
