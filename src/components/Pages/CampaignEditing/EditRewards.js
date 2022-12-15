import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Patch } from "../../../scripts";
import "./EditRewards.css";
import RewardEditor from "./RewardEditor";

const emptyReward = {
  name: "",
  price: 1,
  description: "",
  expectedDeliveryDate: new Date(),
};

const EditRewards = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showingEditor, setShowingEditor] = useState(false);
  const [campaign, setCampaign] = useState({ _id: "" });
  const [rewards, setRewards] = useState([]);
  const [rewardToBeEdited, setRewardToBeEdited] = useState({ reward: emptyReward, index: 0, isNew: true });

  useEffect(() => {
    const c = location.state.campaign;
    console.log(c);
    setCampaign(c);

    const newRewards = [];
    // this is to make it so newRewards is a different pointer than campaign.rewards
    c.rewards.forEach((reward) => {
      newRewards.push(reward);
    });

    setRewards(newRewards);
  }, []);

  const showEditor = (reward, index, isNew) => {
    console.log(reward.expectedDeliveryDate);
    setRewardToBeEdited({ reward: reward, index: index, isNew: isNew });
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

  const deleteReward = () => {
    // const contents = contents;
    console.log(rewards.splice(rewardToBeEdited.index, 1));
    setRewards(rewards);
    setShowingEditor(false);
  };

  const cancelEdit = () => {
    setShowingEditor(false);
  };

  const saveRewards = () => {
    if (campaign.publishDate) {
      // this is a public campaign, don't allow.
    } else {
      Patch(`/unpublishedCampaigns/rewards/${campaign._id}/${location.state.userID}`, {
        rewards: rewards,
      })
        .then((updatedCampaign) => {
          console.log(updatedCampaign);
          navigate(`/Campaign/Overview/${campaign._id}`, {
            state: {
              ...location.state,
              campaign: { ...campaign, rewards: updatedCampaign.rewards },
              userID: location.state.userID,
            },
          });
        })
        .catch((error) => {
          console.error(error);
          alert(error.response.data.message);
        });
    }
  };

  return (
    <div>
      <h1 className="flex-row justify-center white" id="rewardTitle">Rewards</h1>
      <div className="flex-column white" id="containerRewards">
        {rewards.map((reward, i) => {
          return (
            <div key={i}>
              <div id="edit-reward-reward">
                <div>
                  <h2 className="rewardSpacing">Pledge ${reward.price} or more</h2>
                </div>
                <div>
                  <h6 className="rewardSpacing">Delivery {new Date(reward.expectedDeliveryDate).toString()}</h6>
                </div>
                <div>
                  <h3 className="rewardSpacing">{reward.name}</h3>
                </div>
                <div>
                  <h4 className="rewardSpacing">{reward.description}</h4>
                </div>
                <button id="editButton"
                  onClick={() => {
                    showEditor(reward, i, false);
                  }}
                >
                  EDIT
                </button>
              </div>
            </div>
          );
        })}
        <button className="buttonRewards" id="createNew"
          onClick={() => {
            showEditor(emptyReward, rewards.length, true);
          }}
        >
          CREATE NEW
        </button>
        <button className="buttonRewards" id="saveRewards" onClick={saveRewards}>SAVE</button>
        <Link className="buttonRewards" id="backRewardButton" to={"/Campaign/Overview/" + campaign._id} state={{ campaign: campaign }}>
          Back
        </Link>
        {showingEditor ? <RewardEditor data={rewardToBeEdited} saveReward={saveEdit} cancelEdit={cancelEdit} deleteReward={deleteReward} /> : ""}
      </div>
      <br></br>
    </div>
  );
};
export default EditRewards;
