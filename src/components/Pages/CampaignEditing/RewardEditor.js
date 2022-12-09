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
      alert("You must provide a valid date!");
      return;
    }

    // if (state.expectedDeliveryDate < new Date(Date.now()).toISOString()) {
    //   alert("You must provide a valid date!");
    //   return;
    // }
    if (state.price <= 0) {
      alert("Price must be higher than 0");
      return;
    }
    // do other checks

    saveReward(state, data.index);
  };

  return (
    <div className="flex-column white reward-editor-container">
      <div>
        <label>Name</label>
        <input name="name" onChange={handleChange} type="text" defaultValue={state.name} />
      </div>
      <div>
        <label>Description</label>
        <input name="description" onChange={handleChange} type="text" defaultValue={state.description} />
      </div>
      <div>
        <label>Price</label>
        <input name="price" onChange={handleChange} type="number" defaultValue={state.price} />
      </div>
      <div>
        <label>Expected Delivery Date</label>
        <input
          name="expectedDeliveryDate"
          onChange={handleChange}
          type="datetime-local"
          // defaultValue={new Date(state.expectedDeliveryDate).toLocaleDateString("en-CA")
          defaultValue={new Date(state.expectedDeliveryDate).toLocaleDateString("en-CA")}
        />
      </div>
      <button onClick={trySave}>SAVE</button>
      <button onClick={cancelEdit}>CANCEL</button>
      {data.isNew ? "" : <button onClick={deleteReward}>DELETE</button>}
    </div>
  );
};
export default RewardEditor;
