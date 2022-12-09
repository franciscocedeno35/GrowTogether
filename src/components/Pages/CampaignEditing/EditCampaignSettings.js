import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Delete, Patch, Post } from "../../../scripts";
import "./EditCampaignSettings.css";

//TODO: ADD CHECK FOR PUBLISHED/UNPUBLISHED AND ADD DELETE BUTTON
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
    navigate("/campaign/Overview/" + campaign._id, { state: { campaign: response, userID: location.state.userID } });
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
        navigate("/accountOverview", { state: { userID: location.state.userID } });
      }
      return;
    }
  };

  return (
    <div className="flex-column white">
      <div>
        <label>Title</label>
        <input name="title" type="text" onChange={handleChange} defaultValue={campaign.title} />;
      </div>
      <div>
        <label>Subtitle</label>
        <input name="subtitle" type="text" onChange={handleChange} defaultValue={campaign.subtitle} />;
      </div>
      <div>
        <label>Description</label>
        <input name="description" type="text" onChange={handleChange} defaultValue={campaign.description} />;
      </div>
      <div>
        <label>Main Image</label>
        <img className="settings-image-preview" src={campaign.imageSrc} alt="Main Image" />
        <input name="imgURL" type="file" onChange={previewImage} defaultValue={campaign.imageSrc} />;
      </div>
      <div>
        <label>Goal</label>
        <input name="goal" type="number" onChange={handleChange} defaultValue={campaign.goal} disabled={campaign.publishDate} />;
      </div>
      <div>
        <label>Duration In Days</label>
        <input name="duration" type="number" onChange={handleChange} defaultValue={campaign.duration} disabled={campaign.publishDate} />;
      </div>
      <div>
        <button onClick={saveSettings}>SAVE</button>
        <Link to={"/campaign/Overview/" + campaign._id} state={{ campaign: campaign }}>
          Back
        </Link>
      </div>
      {campaign.publishDate ? <button disabled>DELETE</button> : <button onClick={deleteCampaign}>DELETE</button>}
    </div>
  );
};
export default EditCampaignSettings;
