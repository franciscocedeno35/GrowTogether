import { Buffer } from "buffer";
import { React, useEffect, useState } from "react";
import { Get, GetImage } from "../../../scripts";
import "./PublicCampaign.css";
import PublicContent from "./PublicContent";
import PublicReward from "./PublicReward";

const PublicCampaign = () => {
  const [CampInfo, setCampInfo] = useState({
		title: 'Re;ACT - The Arts of War',
		subtitle:
			'Play as an artist with magic powers in this 1 vs 1 dueling game built around effect chains',
		description: 'something cool',
		owner: 'birdsnbears',
		currentlyDonated: 100000,
		goal: 200000,
		backerNum: 123,
		daysToGo: 12,
		mainImageURL:
			'https://ksr-ugc.imgix.net/assets/039/310/556/38cb174b02dbc87b2aa0f37bff787eb1_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1669269851&auto=format&frame=1&q=92&s=9cc64e834dd12ba11a6e550f5381e1d0',

		content: [
			{
				type: 'header',
				content: 'Welcome!',
			},
			{
				type: 'paragraph',
				content:
					'Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			},
			{
				type: 'header',
				content: "Here's some media!",
			},
			{
				type: 'image',
				content:
					'https://ksr-ugc.imgix.net/assets/039/310/556/38cb174b02dbc87b2aa0f37bff787eb1_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1669269851&auto=format&frame=1&q=92&s=9cc64e834dd12ba11a6e550f5381e1d0',
			},
			{
				type: 'video',
				content: 'https://www.youtube.com/watch?v=bGzanfKVFeU&ab_channel=BeJS',
			},
		],
		rewards: [
			{
				campaign: '',
				name: 'reward1',
				price: 5,
				description: "Random letters just keep in mind goal youtube  youtube video is available    at http://www.youtube.com/watch",
				expectedDeliveryDate: new Date(),
			},
			{
				campaign: '',
				name: 'reward2',
				price: 6,
				description: 'meow',
				expectedDeliveryDate: new Date(),
			},
			{
				campaign: '',
				name: 'reward3',
				price: 7,
				description: 'meow',
				expectedDeliveryDate: new Date(),
			},
			{
				campaign: '',
				name: 'reward4',
				price: 9,
				description: 'meow',
				expectedDeliveryDate: new Date(),
			},
			{
				campaign: '',
				name: 'reward5',
				price: 10,
				description: 'meow',
				expectedDeliveryDate: new Date(),
			},
		],
	});

  const [mainImage, setMainImage] = useState(
		'https://ksr-ugc.imgix.net/assets/039/310/556/38cb174b02dbc87b2aa0f37bff787eb1_original.png?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1669269851&auto=format&frame=1&q=92&s=9cc64e834dd12ba11a6e550f5381e1d0'
	);

  // useEffect(() => {
  //   Get("/campaigns/638ae590d6312c2d2d8cc3f3", {}).then((result) => {
  //     const rewards = result.rewards;
  //     rewards.forEach((reward) => {
  //       reward.expectedDeliveryDate = new Date(reward.expectedDeliveryDate);
  //     });
  //     result.currentlyDonated = CampInfo.currentlyDonated;
  //     result.backerNum = CampInfo.backerNum;
  //     result.daysToGo = CampInfo.daysToGo;
  //     setCampInfo(result);
  //     GetImage(result.mainImage).then((src) => {
  //       setMainImage(src);
  //     });
  //   });
  // }, []);

  return (
    <div>
      <div className="title-section">
        <h1 className="campaign-title">{CampInfo.title}</h1>
        <h4>{CampInfo.subtitle}</h4>
      </div>
      <div className="intro-block">
        <img src={mainImage ? mainImage : ""} />
        <div className="intro-stats">
          <hr />
          <div className="stat-block">
            <div>
              <h1 className="intro-main-stat green-highlight">${CampInfo.currentlyDonated.toLocaleString("en")}</h1>
              <h6 className="intro-stat-label">pledged of ${CampInfo.goal.toLocaleString("en")} goal</h6>
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
