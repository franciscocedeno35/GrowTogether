import { React, useState } from "react";
import "./PublicCampaign.css";

const PublicCampaign = () => {
  const [CI, setCI] = useState({
    title: "Re;ACT - The Arts of War",
    subtitle:
      "Play as an artist with magic powers in this 1 vs 1 dueling game built around effect chains",
    currentlyDonated: 100000,
    donateGoal: 200000,
    backerNum: 123,
    daysToGo: 12,
    mainImageURL:
      "https://ksr-ugc.imgix.net/assets/039/310/556/38cb174b02dbc87b2aa0f37bff787eb1_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1669269851&auto=format&frame=1&q=92&s=9cc64e834dd12ba11a6e550f5381e1d0",
  });
  console.log(CI);
  return (
    <div>
      <div className="title-section">
        <h1 className="campaign-title">{CI.title}</h1>
        <h4>{CI.subtitle}</h4>
      </div>
      <div className="intro-block">
        {/* <div className="intro-block-image"> */}
        <img src={CI.mainImageURL} />
        {/* </div> */}
        <div className="intro-stats">
          <hr />
          <div className="stat-block">
            <div>
              <h1 className="intro-main-stat green-highlight">
                ${CI.currentlyDonated.toLocaleString("en")}
              </h1>
              <h6 className="intro-stat-label">
                pledged of ${CI.donateGoal.toLocaleString("en")} goal
              </h6>
            </div>
            <div>
              <h1 className="intro-main-stat">{CI.backerNum}</h1>
              <h6 className="intro-stat-label">backers</h6>
            </div>
            <div>
              <h1 className="intro-main-stat">{CI.daysToGo}</h1>
              <h6 className="intro-stat-label">days to go</h6>
            </div>
          </div>
          <button className="donate-button">Back This Project</button>
          <hr />
        </div>
      </div>
      <div className="bottom-section">
        <div className="content-container">
          <h1 className="title-section">meow</h1>
        </div>
        <div className="rewards-container">
          <h1 className="title-section reward-title">Rewards</h1>
          <div className="rewards-list"></div>
        </div>
      </div>
    </div>
  );
};
export default PublicCampaign;
