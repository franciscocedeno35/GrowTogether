import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Get, GetImage } from "../../../scripts";
import "./AccountOverview.css";

function AccountOverview() {
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [overviewInfo, setOverviewInfo] = useState({
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

  const retrieveCampaignImages = async (userInfo) => {
    console.log(userInfo);
    for (let i = 0; i < userInfo.unpublishedCampaignsOwned.length; i++) {
      const campaign = userInfo.unpublishedCampaignsOwned[i];
      const imageSrc = await GetImage(campaign.mainImage);
      campaign.imageSrc = imageSrc;
      userInfo.unpublishedCampaignsOwned[i] = { ...campaign };
    }
    for (let i = 0; i < userInfo.publishedCampaignsOwned.length; i++) {
      const campaign = userInfo.publishedCampaignsOwned[i];
      const imageSrc = await GetImage(campaign.mainImage);
      campaign.imageSrc = imageSrc;
      userInfo.publishedCampaignsOwned[i] = { ...campaign };
    }
    for (let i = 0; i < userInfo.donations.length; i++) {
      const campaign = userInfo.donations[i].campaign;

      // compute campaign progress
      let totalSum = 0;
      let donatedSum = 0;
      const campDonations = await Get(`/donations/${campaign._id}`, {});
      for (let j = 0; j < campDonations.length; j++) {
        totalSum += campDonations[j].sum;
        donatedSum += campDonations[j].charityAmount;
      }
      campaign.currentlyDonated = totalSum;
      campaign.totalDonated = donatedSum;

      const imageSrc = await GetImage(campaign.mainImage);
      campaign.imageSrc = imageSrc;
      userInfo.donations[i].campaign = { ...campaign };
    }
    console.log(userInfo);
    setOverviewInfo(userInfo);
  };

  const goToCampaignOverview = (campaign) => {
    navigate(`/Campaign/Overview/${campaign._id}`, {
      state: { campaign: campaign, userID: userID },
    });
  };

  const goToAccountOverview = () => {
    navigate(`/AccountOverview/Settings`, {
      state: { userID: userID, user: overviewInfo },
    });
  };

  const goToCreateCampaign = () => {
    navigate(`/CreateProject`);
  };

  return (
    <header>
      <div className="welcomer">
        <h1>Hello, {overviewInfo.username}</h1>
        <button id="settings" onClick={goToAccountOverview}>
          Settings
        </button>
      </div>
      <hr className="whiteLine"></hr>

      <div className="a">
        <div className="flex-column campaigns-backed">
          <div id="titles">
            <h2>Campaigns Backed:</h2>
          </div>
          {overviewInfo.donations.map((donation) => {
            return (
              <div className="backed" key={donation._id}>
                <div className="present">
                  <img className="imgPresent" src={donation.campaign.imageSrc ? donation.campaign.imageSrc : ""} alt="" />
                  <div className="info">
                    <h2>{donation.campaign.title}</h2>
                    <h3>
                      Progress ${donation.campaign.currentlyDonated}/$
                      {donation.campaign.goal}
                    </h3>
                    <p>Created By {donation.campaign.owner}</p>
                    <h5 className="donated">Total Donated: ${donation.charityAmount.toLocaleString("en")}</h5>
                    <h5 className="contribution">Total Contributed: ${donation.sum.toLocaleString("en")}</h5>
                  </div>
                </div>

                <h3 className="rewardsPromised">Rewards Promised:</h3>
                {donation.rewards.map((reward, i) => {
                  return (
                    <div className="rewardsSummary" id={"rewards" + (i + 1)} key={reward._id}>
                      <div className="rewardTitle" id={"rewardTitle" + (i + 1)}>
                        <h3 className="title">{reward.name}</h3>
                        <h3 className="price">Reward Price: ${reward.price.toLocaleString("en")}</h3>
                      </div>
                      <p id={"summary" + (i + 1)}>{reward.description}</p>
                      <div className="rewardInfo">
                        <p className="delivery" id={"delivery" + (i + 1)}>
                          Delivery {new Date(reward.expectedDeliveryDate).toDateString()}
                        </p>
                        <p className="purchased" id={"purchased" + (i + 1)}>
                          Purchased on {new Date(donation.purchaseDate).toDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="flex-column your-campaigns">
          <div id="titles">
            <h2>Your Campaigns:</h2>
          </div>
          <div id="yourCampaigns">
            {overviewInfo.unpublishedCampaignsOwned.map((campaign, i) => {
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
            {overviewInfo.publishedCampaignsOwned.map((campaign, i) => {
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

            <div className="campaign" id="newCamp">
              <button id="add" onClick={goToCreateCampaign}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AccountOverview;
