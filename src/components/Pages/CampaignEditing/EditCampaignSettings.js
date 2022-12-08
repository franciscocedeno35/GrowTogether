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
    if (campaign.image) {
      // store image to db
      const formData = new FormData();
      formData.append("image", campaign.image);
      Post("/images", formData).then(async (newImageID) => {
        // record old imageID for deletion
        const oldID = campaign.mainImage;
        // record given image id as the new mainImage.
        campaign.mainImage = newImageID;
        // PATCH campaign
        const newCampaign = await Patch("unpublishedCampaigns/settings/" + campaign._id + "/" + location.state.userID, campaign);
        console.log(newCampaign);
        // delete the old image from the db
        if (oldID != "638ae54cd4f54a8e23b56c4e") {
          Delete("images/" + oldID, {});
        }
        // update campaign var
        setCampaign({ ...campaign });
        // return to overview
        navigate("/unpublishedCampaign/Overview/" + campaign._id, { state: { campaign: campaign, userID: location.state.userID } });
      });
    } else {
      // if not ...
      // PATCH campaign
      await Patch("unpublishedCampaigns/settings/" + campaign._id + "/" + location.state.userID, campaign);
      // update campaign var
      setCampaign({ ...campaign });
      // return to overview
      navigate("/unpublishedCampaign/Overview/" + campaign._id, { state: { campaign: campaign, userID: location.state.userID } });
    }
  };

  const deleteCampaign = () => {
    // do the thing
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
        <input name="goal" type="number" onChange={handleChange} defaultValue={campaign.goal} />;
      </div>
      <div>
        <label>Duration In Days</label>
        <input name="duration" type="number" onChange={handleChange} defaultValue={campaign.duration} />;
      </div>
      <div>
        <button onClick={saveSettings}>SAVE</button>
        <Link to={"/unpublishedCampaign/Overview/" + campaign._id} state={{ campaign: campaign }}>
          Back
        </Link>
      </div>
      {campaign.publishDate ? <button disabled>DELETE</button> : <button onClick={deleteCampaign}>DELETE</button>}
    </div>
  );
};
export default EditCampaignSettings;
