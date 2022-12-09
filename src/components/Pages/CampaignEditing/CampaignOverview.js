import "./CampaignOverview.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { GetImage, Patch } from "../../../scripts";
import { Link } from "react-router-dom";

function CampaignOverview(props) {
  // TODO: update canBePublished
  const canBePublished = () => {
    console.log("content length is: " + campaign.content.length);
    return campaign.content.length > 0;
  };
  const isPublished = () => {
    console.log(campaign.publishDate);
    return campaign.publishDate;
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [campaign, setCampaign] = useState({
    title: "",
    subtitle: "",
    description: "",
    mainImage: "",
    imageSrc: "",
    owner: "",
    goal: 1,
    duration: 1,
    content: [],
    rewards: [],
  });

  useEffect(() => {
    console.log(userID);
    if (!userID) {
      // then user is not logged in!!! they shouldn't ever be here!
      navigate("/Login");
    }

    console.log(location.state);
    if (!location.state || !location.state.campaign) {
      // no campaignID!
      console.error("location did not give state or the campaign info we need");
      // safely navigate away
      navigate("/");
    } else {
      // we can assume state.campaign is present.
      // TODO: Get all relevent Overview information
      // for example, get all donations that were donated to this campaign.
      const c = location.state.campaign;
      if (!c.imageSrc) {
        GetImage(c.mainImage).then((id) => {
          location.state.campaign.imageSrc = id;
          setCampaign(location.state.campaign);
        });
      } else {
        setCampaign(location.state.campaign);
      }
    }

    // console.log(params);
    // if (!params || !params.campaignID) {
    //   console.log("No CampaignID given to overview via Params");
    // } else {
    //   console.log(params);
    // }
  }, []);

  const publishCampaign = () => {
    // check if you can publish it (we can assume all values are OK, but we must verify that content is not-empty)
    if (!canBePublished) {
      alert("You Must add something to your campaign's content before publishing!");
      return;
    }
    // prompt to make sure that they truly want to publish right now.
    if (window.confirm("Are you sure you want to publish right now?")) {
      // if so, publish it
      Patch(`unpublishedCampaigns/publish/${campaign._id}/${userID}`, {}).then((publishedCampaign) => {
        //  navigate to /publishedCampaign/Overview/:campaignID
        navigate(`publishedCampaign/Overview/${publishedCampaign._id}/${userID}`, {
          state: {
            campaign: publishedCampaign,
            userID: userID,
          },
        });
      });
    }
  };

  return (
    <div className="campaign-overview white">
      <h1>{campaign.title}</h1>
      <h1>{campaign.subtitle}</h1>
      <p>{campaign.description}</p>
      <img className="overview-image-preview" src={campaign.imageSrc} alt="Main Image" />
      <hr />
      <div className="flex-row justify-space-around">
        <Link to={"/campaign/Settings/" + campaign._id} state={{ campaign: campaign, userID: userID }}>
          Settings
        </Link>
        <Link to={"/campaign/Content/" + campaign._id} state={{ campaign: campaign, userID: userID }}>
          Content
        </Link>
        {isPublished() ? (
          ""
        ) : (
          <Link to={"/campaign/Rewards/" + campaign._id} state={{ campaign: campaign, userID: userID }}>
            Rewards
          </Link>
        )}
        {isPublished() ? (
          ""
        ) : (
          <button disabled={!canBePublished()} onClick={publishCampaign}>
            PUBLISH
          </button>
        )}
      </div>
    </div>
  );
}
export default CampaignOverview;
