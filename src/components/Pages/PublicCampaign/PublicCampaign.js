import { React, useEffect, useState } from "react";
import { Get } from "../../../scripts";
import "./PublicCampaign.css";
import PublicContent from "./PublicContent";
import PublicReward from "./PublicReward";
import { Buffer } from "buffer";

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
    content: [],
    rewards: [],
  });

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    Get("/campaigns/638aad7387425dd86325e1ec", {}).then((result) => {
      const rewards = result.rewards;
      rewards.forEach((reward) => {
        reward.expectedDeliveryDate = new Date(reward.expectedDeliveryDate);
      });
      result.currentlyDonated = CampInfo.currentlyDonated;
      result.backerNum = CampInfo.backerNum;
      result.daysToGo = CampInfo.daysToGo;
      setCampInfo(result);

      Get(`/images/${result.mainImage}`).then((response) => {
        console.log(response);
        setMainImage(
          "data:image/png;base64," +
            Buffer.from(response.data).toString("base64")
        );
      });
    });
  }, []);

  return (
    <div>
      <div className="title-section">
        <h1 className="campaign-title">{CampInfo.title}</h1>
        <h4>{CampInfo.subtitle}</h4>
      </div>
      <div className="intro-block">
        {/* <div className="intro-block-image"> */}
        <img
          // src={
          //   mainImage != null
          //     ? "data:image/png;base64," +
          //       btoa(String.fromCharCode.apply(null, mainImage.data))
          //     : ""
          // }
          // alt="meow"
          src={mainImage ? mainImage : ""}
        />
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
          {CampInfo.content.map((content) => (
            <PublicContent content={content} key={content._id} />
          ))}
        </div>
        <div className="rewards-section">
          <h1 className="title-section reward-title">Rewards</h1>
          <div className="rewards-list">
            {CampInfo.rewards.map((reward) => (
              <PublicReward reward={reward} key={reward._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PublicCampaign;
