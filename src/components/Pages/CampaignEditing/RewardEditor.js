import React from "react";
import { useEffect, useState } from "react";
import "./RewardEditor.css";

const RewardEditor = ({ data, saveReward, cancelEdit, deleteReward }) => {
  const [state, setState] = useState(data.reward);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const trySave = () => {
    // just make sure that the reward values are OK before saving.
    if (!state.name || !state.description) {
      alert("You must provide a Reward Name and Description!");
      return;
    }
    const stateDate = new Date(state.expectedDeliveryDate);
    const today = new Date(Date.now());
    if (stateDate < today) {
      alert("Your date must be after today!");
      return;
    }
    if (state.price <= 0) {
      alert("Price must be higher than 0");
      return;
    }
    // do other checks

    saveReward(state, data.index);
  };

  return (
    <div className="flex-column white reward-editor-container">
      <div className="justify-space-around"></div>
        <div id="inputs">
          <div>
            <h3 className="create-reward-label">Name</h3>
            <input className="create-reward-input" name="name" size="100" onChange={handleChange} type="text" defaultValue={state.name} />
          </div>
          <div>
            <h3 className="create-reward-label">Description</h3>
            <input className="create-reward-input" name="description" onChange={handleChange} type="text" defaultValue={state.description} />
          </div>
          <div>
            <h3 className="create-reward-label">Price</h3>
            <input className="create-reward-input" name="price" onChange={handleChange} type="number" defaultValue={state.price} />
          </div>
          <div>
            <h3 className="create-reward-label">Expected Delivery Date</h3>
            <input className="create-reward-input" name="expectedDeliveryDate" onChange={handleChange} type="datetime-local" defaultValue={state.expectedDeliveryDate} />
          </div>
        </div>
        <div>
          <button className="buttonsEditor" id="saveEditor" onClick={trySave}>SAVE</button>
          <button className="buttonsEditor" id="cancelEditor" onClick={cancelEdit}>CANCEL</button>
          {data.isNew ? "" : <button className="buttonsEditor" id="deleteEditor" onClick={deleteReward}>DELETE</button>}
      </div>
    </div>
  );
};
export default RewardEditor;
