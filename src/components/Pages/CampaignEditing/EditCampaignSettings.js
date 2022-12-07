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
      goal: c.goal,
      duration: c.duration,
    });
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const saveSettings = () => {
    // send save patch
  };

  return (
    <div className="flex-column white">
      {Object.keys(settings).map((settingKey) => {
        return (
          <div key={settingKey}>
            <label>{settingKey}</label>
            <input name={settingKey} onChange={handleChange} />;
          </div>
        );
      })}
      <button onClick={saveSettings}>SAVE</button>
      <Link to={"/unpublishedCampaign/Overview/" + campaign._id} state={{ campaign: campaign }}>
        Back
      </Link>
    </div>
  );
};
export default EditCampaignSettings;
