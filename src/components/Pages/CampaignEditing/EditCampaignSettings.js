import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./EditCampaignSettings.css";

const EditCampaignSettings = () => {
  const location = useLocation();
  const [campaign, setCampaign] = useState({ _id: "" });
  const [settings, setSettings] = useState({
    title: "",
    subtitle: "",
    description: "",
    mainImage: "",
    imageSrc: "",
    goal: 1,
    duration: 1,
  });

  useEffect(() => {
    const c = location.state.campaign;
    console.log(c);
    setCampaign(c);
    setSettings({
      title: c.title,
      subtitle: c.subtitle,
      description: c.description,
      mainImage: c.mainImage,
      imageSrc: c.imageSrc,
      goal: c.goal,
      duration: c.duration,
    });
  }, [location]);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const previewImage = (e) => {
    setSettings({ ...settings, imageSrc: URL.createObjectURL(e.target.files[0]) });
  };

  const saveSettings = () => {
    // delete the old image from the db
    // store image to db
    // record given image id as the new mainImage.
    // update campaign var
    // PATCH campaign
    // return to overview
  };

  return (
    <div className="flex-column white">
      <div>
        <label>Title</label>
        <input name="title" type="text" onChange={handleChange} defaultValue={settings.title} />;
      </div>
      <div>
        <label>Subtitle</label>
        <input name="subtitle" type="text" onChange={handleChange} defaultValue={settings.subtitle} />;
      </div>
      <div>
        <label>Description</label>
        <input name="description" type="text" onChange={handleChange} defaultValue={settings.description} />;
      </div>
      <div>
        <label>Main Image</label>
        <img className="settings-image-preview" src={settings.imageSrc} alt="Main Image" />
        <input name="imgURL" type="file" onChange={previewImage} defaultValue={settings.imageSrc} />;
      </div>
      <div>
        <label>Goal</label>
        <input name="goal" type="number" onChange={handleChange} defaultValue={settings.goal} />;
      </div>
      <div>
        <label>Duration In Days</label>
        <input name="duration" type="number" onChange={handleChange} defaultValue={settings.duration} />;
      </div>
      <button onClick={saveSettings}>SAVE</button>
      <Link to={"/unpublishedCampaign/Overview/" + campaign._id} state={{ campaign: campaign }}>
        Back
      </Link>
    </div>
  );
};
export default EditCampaignSettings;
