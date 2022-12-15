import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Delete, Patch, Post } from "../../../scripts";
import "./EditCampaignSettings.css";

const EditCampaignSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({ _id: "" });

  useEffect(() => {
    const c = location.state.campaign;
    console.log(c);
    setCampaign(c);
  }, [location.state]);

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const previewImage = (e) => {
    setCampaign({ ...campaign, imageSrc: URL.createObjectURL(e.target.files[0]), image: e.target.files[0] });
  };

  const saveSettings = async () => {
    // if they uploaded a new image...
    console.log(campaign);
    // setup endpoint and body
    const endPoint = (campaign.publishDate ? "" : "un") + "publishedCampaigns/settings/" + campaign._id + "/" + location.state.userID;

    const patchBody = {
      title: campaign.title,
      subtitle: campaign.subtitle,
      description: campaign.description,
    };
    if (!campaign.publishDate) {
      patchBody.goal = campaign.goal;
      patchBody.duration = campaign.duration;
    }
    let response;
    if (campaign.image) {
      // store image to db
      const formData = new FormData();
      formData.append("image", campaign.image);
      const newImageID = await Post("/images", formData);
      // record old imageID for deletion
      const oldID = campaign.mainImage;
      // record given image id as the new mainImage.
      patchBody.mainImage = newImageID;
      // PATCH campaign
      const newCampaign = await Patch(endPoint, patchBody);
      console.log(newCampaign);
      setCampaign({ ...newCampaign });
      response = newCampaign;
      // delete the old image from the db
      if (oldID != "638ae54cd4f54a8e23b56c4e") {
        await Delete("images/" + oldID, {});
      }
    } else {
      // if not ...
      // PATCH campaign
      const newCampaign = await Patch(endPoint, patchBody);
      console.log(newCampaign);
      setCampaign({ ...newCampaign });
      response = newCampaign;
    }
    // return to overview
    navigate("/Campaign/Overview/" + campaign._id, { state: { campaign: response, userID: location.state.userID } });
  };

  const deleteCampaign = async () => {
    // do the thing
    if (campaign.publishDate) {
      alert("You cannot delete a published campaign! You're already committed!");
      return;
    } else {
      if (window.confirm("Are you sure you want to delete this campaign?")) {
        const oldImageID = campaign.mainImage;
        await Delete(`/unpublishedCampaigns/${campaign._id}/${location.state.userID}`, {});
        if (oldImageID != "638ae54cd4f54a8e23b56c4e") {
          await Delete("images/" + oldImageID, {});
        }
        navigate("/AccountOverview", { state: { userID: location.state.userID } });
      }
      return;
    }
  };

  return (
    <div>
      <h1 className="flex-row justify-center white">{campaign.title}</h1>
      <h5 className="flex-row justify-center white">{campaign.subtitle}</h5>
      <hr className="white "></hr>
      <div className="flex-row justify-space-around ">
        <Link to={"/Campaign/Overview/" + campaign._id} state={{ campaign: campaign, userID: location.state.userID }}>
          Overview
        </Link>
        <Link to={"/Campaign/Settings/" + campaign._id} state={{ campaign: campaign, userID: location.state.userID }}>
          Settings
        </Link>
        <Link to={"/Campaign/Content/" + campaign._id} state={{ campaign: campaign, userID: location.state.userID }}>
          Content
        </Link>
        {campaign.publishDate ? (
          ""
        ) : (
          <Link to={"/Campaign/Rewards/" + campaign._id} state={{ campaign: campaign, userID: location.state.userID }}>
            Rewards
          </Link>
        )}
      </div>
      <hr className="Navbar-line"></hr>

      <h1 className="campaign-edit-title">Settings</h1>
      <div className="flex-column justify-center white">
        <div className="flex-row justify-center">
          <label className="create-campaign-label">Title:</label>
          <input className="create-campaign-input" name="title" type="text" onChange={handleChange} defaultValue={campaign.title} />
        </div>
        <div className="flex-row justify-center">
          <label className="create-campaign-label">Subtitle:</label>
          <input className="create-campaign-input" name="subtitle" type="text" onChange={handleChange} defaultValue={campaign.subtitle} />
        </div>
        <div className="flex-row justify-center">
          <label className="create-campaign-label">Description:</label>
          <input className="create-campaign-input" name="description" type="text" onChange={handleChange} defaultValue={campaign.description} />
        </div>
        <div className="flex-row justify-center">
          <div className="flex-column create-project-test">
            <label className="create-campaign-label">Main Image:</label>
            <input className="create-campaign-image-input" name="imgURL" type="file" onChange={previewImage} defaultValue={campaign.imageSrc} />
          </div>
          <img className="create-campaign-image-preview" src={campaign.imageSrc} alt="Main Image" />
        </div>
        <div className="flex-row justify-center">
          <label className="create-campaign-label">Goal:</label>
          <input
            className="create-campaign-input"
            name="goal"
            type="number"
            onChange={handleChange}
            defaultValue={campaign.goal}
            disabled={campaign.publishDate}
          />
        </div>
        <div className="flex-row justify-center">
          <label className="create-campaign-label">Duration In Days:</label>
          <input
            className="create-campaign-input"
            name="duration"
            type="number"
            onChange={handleChange}
            defaultValue={campaign.duration}
            disabled={campaign.publishDate}
          />
        </div>
        <div className="flex-column">
          <button className="buttonsEditor green-bg" onClick={saveSettings}>
            SAVE
          </button>

          {campaign.publishDate ? (
            <button className="buttonsEditor red-bg" disabled>
              DELETE
            </button>
          ) : (
            <button className="buttonsEditor red-bg" onClick={deleteCampaign}>
              DELETE
            </button>
          )}

          <Link className="buttonsEditor gray-bg" to={"/Campaign/Overview/" + campaign._id} state={{ campaign: campaign }}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EditCampaignSettings;
