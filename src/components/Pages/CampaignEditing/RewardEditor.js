import React from "react";
import { useEffect, useState } from "react";
import "./RewardEditor.css";

const RewardEditor = ({ data, saveReward, cancelEdit }) => {
  const [reward, setReward] = useState(data.reward);

  const handleChange = (e) => {
    setReward({ ...reward, [e.target.name]: e.target.value });
  };

  const trySave = () => {
    // just make sure that the reward values are OK before saving.
    if (reward.price <= 0) {
      alert("Price must be higher than 0");
      return;
    }
    // do other checks

    saveReward(reward, data.index);
  };

  return (
    <div className="flex-column white reward-editor-container">
      <div>
        <label>Name</label>
        <input name="name" onChange={handleChange} type="text" defaultValue={reward.name} />
      </div>
      <div>
        <label>Description</label>
        <input name="description" onChange={handleChange} type="text" defaultValue={reward.description} />
      </div>
      <div>
        <label>Price</label>
        <input name="price" onChange={handleChange} type="number" defaultValue={reward.price} />
      </div>
      <div>
        <label>Expected Delivery Date</label>
        <input name="expectedDeliveryDate" onChange={handleChange} type="date" defaultValue={reward.expectedDeliveryDate} />
      </div>
      <button onClick={trySave}>SAVE</button>
      <button
        onClick={() => {
          cancelEdit();
        }}
      >
        CANCEL
      </button>
    </div>
  );
};
export default RewardEditor;
