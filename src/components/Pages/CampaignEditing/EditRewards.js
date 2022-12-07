import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./EditRewards.css";
import RewardEditor from "./RewardEditor";

const emptyReward = {
  name: "",
  price: 0,
  description: "",
  expectedDeliveryDate: new Date(),
};

const EditRewards = () => {
  const location = useLocation();
  const [showingEditor, setShowingEditor] = useState(false);
  const [campaign, setCampaign] = useState({ _id: "" });
  const [rewards, setRewards] = useState([]);
  const [rewardToBeEdited, setRewardToBeEdited] = useState({ reward: emptyReward, index: 0 });

  useEffect(() => {
    const c = location.state.campaign;
    console.log(c);
    setCampaign(c);
    setRewards(c.rewards);
  }, []);

  const showEditor = (reward, index) => {
    setRewardToBeEdited({ reward: reward, index: index });
    setShowingEditor(true);
  };

  const saveEdit = (reward, index) => {
    // meow
    const newRewards = rewards;
    if (index >= newRewards.length) {
      console.log(newRewards.push(reward));
    } else {
      newRewards[index] = reward;
    }
    newRewards.sort((reward1, reward2) => {
      return reward1.price - reward2.price;
    });
    setRewards(newRewards);
    setShowingEditor(false);
  };

  const cancelEdit = () => {
    setShowingEditor(false);
  };

  const saveRewards = () => {
    // send save patch
  };

  return (
    <div className="flex-column white">
      {rewards.map((reward, i) => {
        return (
          <div key={i}>
            <div className="edit-reward-reward">
              <div>
                <label>Name</label>
                <h3>{reward.name}</h3>
              </div>
              <div>
                <label>Description</label>
                <h3>{reward.description}</h3>
              </div>
              <div>
                <label>Price</label>
                <h3>{reward.price}</h3>
              </div>
              <div>
                <label>Expected Delivery Date</label>
                <h3>{reward.expectedDeliveryDate}</h3>
              </div>
              <button
                onClick={() => {
                  showEditor(reward, i);
                }}
              >
                EDIT
              </button>
            </div>
          </div>
        );
      })}
      <button
        onClick={() => {
          showEditor(emptyReward, rewards.length);
        }}
      >
        CREATE NEW
      </button>
      <button onClick={saveRewards}>SAVE</button>
      <Link to={"/unpublishedCampaign/Overview/" + campaign._id} state={{ campaign: campaign }}>
        Back
      </Link>
      {showingEditor ? <RewardEditor data={rewardToBeEdited} saveReward={saveEdit} cancelEdit={cancelEdit} /> : ""}
    </div>
  );
};
export default EditRewards;
