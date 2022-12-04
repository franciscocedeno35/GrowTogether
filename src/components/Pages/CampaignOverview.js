import "./CampaignOverview.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Get, Post } from "../../scripts";

function CampaignOverview(props) {
  const location = useLocation();
  // const params = useParams();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [campaign, setCampaign] = useState({
    title: "",
    subtitle: "",
    description: "",
    mainImage: "",
    isPublished: false,
    owner: "",
    goal: 1,
    duration: 1,
    publishDate: false,
    viewsByDate: [],
    content: [],
    rewards: [],
  });
  const [overviewInfo, setOverviewInfo] = useState();

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
      // now we can get overviewInformation.
      if (c.isPublished == true) {
        Get(`/campaigns/overview/${location.state.campaign._id}/${userID}`)
          .then((response) => {
            console.log(response);
            setOverviewInfo(response);
          })
          .catch((error) => {});
      } else {
        // there isn't really any overview information to display...
        setOverviewInfo();
      }
    }

    // console.log(params);
    // if (!params || !params.campaignID) {
    //   console.log("No CampaignID given to overview via Params");
    // } else {
    //   console.log(params);
    // }
  }, []);

  const submitNewCampaign = async (e) => {
    Post(`/campaigns/${userID}`, campaign)
      .then((response) => {
        console.log("Campaign successfully created! It returned:");
        console.log(response);
        // successfully created!
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        switch (error.response.status) {
          case 428: {
            alert("You provided invalid information, please try again");
            break;
          }
          case 404: {
            // Image Not Found
            alert("We are having trouble finding your image, please try uploading it again");
            break;
          }
          default: {
            alert("There is an error with the server. Sorry");
            break;
          }
        }
      });
  };

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  return (
    <div className="campaign-overview">
      <h1></h1>
    </div>
  );
}
export default CampaignOverview;
