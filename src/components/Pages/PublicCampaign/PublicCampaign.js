import { React, useState } from "react";
import "./PublicCampaign.css";
import PublicContent from "./PublicContent";
import PublicReward from "./PublicReward";

const PublicCampaign = () => {
  const [CampInfo, setCampInfo] = useState({
    title: "Re;ACT - The Arts of War",
    subtitle:
      "Play as an artist with magic powers in this 1 vs 1 dueling game built around effect chains",
    description: "something cool",
    owner: "birdsnbears",
    currentlyDonated: 100000,
    goal: 200000,
    backerNum: 123,
    daysToGo: 12,
    mainImageURL:
      "https://ksr-ugc.imgix.net/assets/039/310/556/38cb174b02dbc87b2aa0f37bff787eb1_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1669269851&auto=format&frame=1&q=92&s=9cc64e834dd12ba11a6e550f5381e1d0",
    content: [
      {
        type: "Header",
        content: "I'm a header",
      },
      {
        type: "Paragraph",
        content: "I'm a paragraph",
      },
      {
        type: "Image",
        content: "I'm an Image",
      },
      {
        type: "Video",
        content: "I'm a video",
      },
    ],
    rewards: [
      {
        name: "Buy us boba tea",
        price: 8,
        description:
          "One of the best ways you can spend 8 dollars on the internet. Thank you for supporting this new indie publisher!!!\n\nYou'll also receive updates on the project and access to the pledge manager.",
        expectedDeliveryDate: new Date(12, 12, 2022),
      },
      {
        name: "The Arts of War",
        price: 59,
        description:
          "The base game with all 8 playable characters, each coming in their own jumbo tuck box.\n\nOver 100 pieces of art across over 500 components, from cards to tokens to even custom dice.",
        expectedDeliveryDate: new Date(12, 12, 2022),
      },
      {
        name: "Buy us boba tea",
        price: 8,
        description:
          "One of the best ways you can spend 8 dollars on the internet. Thank you for supporting this new indie publisher!!!\n\nYou'll also receive updates on the project and access to the pledge manager.",
        expectedDeliveryDate: new Date(12, 12, 2022),
      },
      {
        name: "Buy us boba tea",
        price: 8,
        description:
          "One of the best ways you can spend 8 dollars on the internet. Thank you for supporting this new indie publisher!!!\n\nYou'll also receive updates on the project and access to the pledge manager.",
        expectedDeliveryDate: new Date(12, 12, 2022),
      },
    ],
  });
  console.log(CampInfo);
  return (
    <div>
      <div className="title-section">
        <h1 className="campaign-title">{CampInfo.title}</h1>
        <h4>{CampInfo.subtitle}</h4>
      </div>
      <div className="intro-block">
        {/* <div className="intro-block-image"> */}
        <img src={CampInfo.mainImageURL} />
        {/* </div> */}
        <div className="intro-stats">
          <hr />
          <div className="stat-block">
            <div>
              <h1 className="intro-main-stat green-highlight">
                ${CampInfo.currentlyDonated.toLocaleString("en")}
              </h1>
              <h6 className="intro-stat-label">
                pledged of ${CampInfo.goal.toLocaleString("en")} goal
              </h6>
            </div>
            <div>
              <h1 className="intro-main-stat">{CampInfo.backerNum}</h1>
              <h6 className="intro-stat-label">backers</h6>
            </div>
            <div>
              <h1 className="intro-main-stat">{CampInfo.daysToGo}</h1>
              <h6 className="intro-stat-label">days to go</h6>
            </div>
          </div>
          <button className="donate-button">Back This Project</button>
          <hr />
        </div>
      </div>
      <div className="bottom-section">
        <div className="content-section">
          {CampInfo.content.map((content) => {
            return <PublicContent content={content} />;
          })}
        </div>
        <div className="rewards-section">
          <h1 className="title-section reward-title">Rewards</h1>
          <div className="rewards-list">
            {CampInfo.rewards.map((reward) => {
              return <PublicReward reward={reward} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PublicCampaign;
