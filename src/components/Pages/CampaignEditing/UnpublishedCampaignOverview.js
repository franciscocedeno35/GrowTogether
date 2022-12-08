import "./UnpublishedCampaignOverview.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Get, Post } from "../../../scripts";
import { Link } from "react-router-dom";

function UnpublishedCampaignOverview(props) {
  const canBePublished = {
    get() {
      console.log(campaign.content.length);
      return campaign.content.length > 0;
    },
  };
  const location = useLocation();
  // const params = useParams();
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
      const c = location.state.campaign;
      setCampaign(location.state.campaign);
    }

    // console.log(params);
    // if (!params || !params.campaignID) {
    //   console.log("No CampaignID given to overview via Params");
    // } else {
    //   console.log(params);
    // }
  }, []);

  return (
    <div className="campaign-overview white">
      <h1>{campaign.title}</h1>
      <h1>{campaign.subtitle}</h1>
      <p>{campaign.description}</p>
      <img className="overview-image-preview" src={campaign.imageSrc} alt="Main Image" />
      <hr />
      <div className="flex-row justify-space-around">
        <Link to={"/unpublishedCampaign/Settings/" + campaign._id} state={{ campaign: campaign }}>
          Settings
        </Link>
        <Link to={"/unpublishedCampaign/Content/" + campaign._id} state={{ campaign: campaign }}>
          Content
        </Link>
        <Link to={"/unpublishedCampaign/Rewards/" + campaign._id} state={{ campaign: campaign }}>
          Rewards
        </Link>
        <hr />
        {canBePublished ? <button disabled>PUBLISH</button> : <button>PUBLISH</button>}
      </div>
    </div>
  );
}
export default UnpublishedCampaignOverview;
