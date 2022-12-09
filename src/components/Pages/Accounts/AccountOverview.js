import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Get, GetImage } from "../../../scripts";
import "./AccountOverview.css";

function AccountOverview() {
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [userInfoPlusOverviewInfo, setOverviewInfo] = useState({
    firstname: "",
    lastName: "",
    username: "",
    password: "",
    donations: [],
    unpublishedCampaignsOwned: [],
    publishedCampaignsOwned: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!userID) {
      navigate("/");
    }
    // we're logged in!
    Get(`/users/${userID}`, {})
      .then((result) => {
        setOverviewInfo(result);
        retrieveCampaignImages(result);
      })
      .catch((error) => {
        console.log(error);
        switch (error.response.status) {
          case 400: {
            // something
            console.log("something");
            break;
          }
          default: {
            console.log("There was an error with the backend. what do?");
            break;
          }
        }
      });
  }, []);

  const retrieveCampaignImages = async (info) => {
    console.log(info);
    for (let i = 0; i < info.unpublishedCampaignsOwned.length; i++) {
      const campaign = info.unpublishedCampaignsOwned[i];
      const imageSrc = await GetImage(campaign.mainImage);
      campaign.imageSrc = imageSrc;
      info.unpublishedCampaignsOwned[i] = { ...campaign };
    }
    for (let i = 0; i < info.publishedCampaignsOwned.length; i++) {
      const campaign = info.publishedCampaignsOwned[i];
      const imageSrc = await GetImage(campaign.mainImage);
      campaign.imageSrc = imageSrc;
      info.publishedCampaignsOwned[i] = { ...campaign };
    }
    console.log(info);
    setOverviewInfo(info);
  };

  const goToCampaignOverview = (campaign) => {
    navigate(`/campaign/Overview/${campaign._id}`, {
      state: { campaign: campaign, userID: userID },
    });
  };

  const goToAccountOverview = () => {
    navigate(`/accountOverview/Settings`, {
      state: { userID: userID, user: userInfoPlusOverviewInfo },
    });
  };

  const goToCreateCampaign = () => {
    navigate(`/create-project`);
  };

  return (
    <header>
      <div className="welcomer">
        <h1>Hello, {userInfoPlusOverviewInfo.username}</h1>
        <button id="settings" onClick={goToAccountOverview}>
          Settings
        </button>
      </div>
      <hr className="whiteLine"></hr>
      <div id="titles">
        <h2>Campaigns Backed:</h2>
        <h2>Your Campaigns:</h2>
      </div>
      <div className="a">
        <div id="backed">
          {/* <div id="present">
            <div id="imgPresent"></div>
            <div id="info">
              <h2>Campaign Title</h2>
              <h3>Progress $###/$###</h3>
              <p>Created By Username</p>
              <h5 id="contribution">Total Contributed: $###</h5>
            </div>
          </div>
          <h3 id="rewardsPromised">Rewards Promised:</h3>
          {overviewInfo.donations.map((reward, i) => {
            return (
              <div className="rewardsSummary" id={"rewards" + (i + 1)} key={i}>
                <div className="rewardTitle" id={"rewardTitle" + (i + 1)}>
                  <h3 className="title">{reward.name}</h3>
                  <h3 className="price">Reward Price: ${reward.price.toLocaleString("en")}</h3>
                </div>
                <p id={"summary" + (i + 1)}>{reward.description}</p>
                <p className="delivery" id="delivery1">
                  Delivery {reward.expectedDeliveryDate.toDateString()}
                </p>
              </div>
            );
          })} */}
        </div>
        {userInfoPlusOverviewInfo.donations.map((donation, i) => {
          return (
            <div className="backed">
              <div id="present">
                <div id="imgPresent"></div>
                <div id="info">
                  <h2>donation.campaign.title</h2>
                  <h3>Progress $###/$###</h3>
                  <p>Created By {donation.campaign.owner}</p>
                  <h5 id="contribution">Total Contributed: ${donation.total.toLocaleString("en")}</h5>
                </div>
              </div>
              <h3 id="rewardsPromised">Rewards Promised:</h3>
              {userInfoPlusOverviewInfo.donations.map((reward, i) => {
                return (
                  <div className="rewardsSummary" id={"rewards" + (i + 1)} key={i}>
                    <div className="rewardTitle" id={"rewardTitle" + (i + 1)}>
                      <h3 className="title">{reward.name}</h3>
                      <h3 className="price">Reward Price: ${reward.price.toLocaleString("en")}</h3>
                    </div>
                    <p id={"summary" + (i + 1)}>{reward.description}</p>
                    <div class="rewardInfo">
                      <p className="delivery" id={"delivery" + (i + 1)}>
                        Delivery {reward.expectedDeliveryDate.toDateString()}
                      </p>
                      <p className="purchased" id={"purchased" + (i + 1)}>
                        Purchased on {donation.purchaseDate.toDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* <div className="rewardsSummary" id="rewards1">
          <div className="rewardTitle" id="rewardTitle1">
            <h3 className="title">Reward Title</h3>
            <h3 className="price">Reward Price: $###</h3>
          </div>
          <p id="summary1">Summary</p>
          <p className="delivery" id="delivery1">
            Delivery XX/XX/XXXX
          </p>
        </div>
        <div className="rewardsSummary" id="rewards2">
          <div className="rewardTitle" id="rewardTitle2">
            <h3 className="title">Reward Title</h3>
            <h3 className="price">Reward Price: $###</h3>
          </div>
          <p id="summary2">Summary</p>
          <p className="delivery" id="delivery2">
            Delivery XX/XX/XXXX
          </p>
        </div>
        <div className="rewardsSummary" id="rewards3">
          <div className="rewardTitle" id="rewardTitle3">
            <h3 className="title">Reward Title</h3>
            <h3 className="price">Reward Price: $###</h3>
          </div>
          <p id="summary3">Summary</p>
          <p className="delivery" id="delivery3">
            Delivery XX/XX/XXXX
          </p>
        </div> */}
        <div id="yourCampaigns">
          {userInfoPlusOverviewInfo.unpublishedCampaignsOwned.map((campaign, i) => {
            return (
              <div
                className="campaign"
                id={"campaign" + (i + 1)}
                key={campaign._id}
                onClick={() => {
                  goToCampaignOverview(campaign);
                }}
              >
                <img className="img" src={campaign.imageSrc ? campaign.imageSrc : ""} />
                <div id="srcCamp1">
                  <h4 className="projectTitle">{campaign.title}</h4>
                  <p>Unpublished!</p>
                </div>
              </div>
            );
          })}
          {userInfoPlusOverviewInfo.publishedCampaignsOwned.map((campaign, i) => {
            return (
              <div
                className="campaign"
                id={"campaign" + (i + 1)}
                key={campaign._id}
                onClick={() => {
                  goToCampaignOverview(campaign);
                }}
              >
                <img className="img" src={campaign.imageSrc ? campaign.imageSrc : ""} />
                <div id="srcCamp1">
                  <h4 className="projectTitle">{campaign.title}</h4>
                  <p>Published!</p>
                </div>
              </div>
            );
          })}
          {/* <div className="campaign" id="campaign1">
            <div className="img" id="imageCamp1"></div>
            <div id="srcCamp1">
              <h4>Project 1</h4>
              <p>Status Text</p>
            </div>
          </div>
          <div className="campaign" id="campaign2">
            <div className="img" id="imageCamp2"></div>
            <div id="srcCamp2">
              <h4>Project 2</h4>
              <p>Status Text</p>
            </div>
          </div>
          <div className="campaign" id="campaign3">
            <div className="img" id="imageCamp3"></div>
            <div id="srcCamp3">
              <h4>Project 3</h4>
              <p>Status Text</p>
            </div>
          </div> */}
          <div className="campaign" id="newCamp">
            <button id="add" onClick={goToCreateCampaign}>
              Add
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AccountOverview;
