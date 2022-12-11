import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Post } from "../../../scripts";
// import "./Donate.css";
import PublicReward from "./PublicReward";

function Donate() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [sum, setSum] = useState(0);
  const [donation, setDonation] = useState({
    charityAmount: 0,
    rewards: [],
  });

  useEffect(() => {
    if (!location.state || !location.state.rewards) {
      // no rewards given, return to campaign page.
      // we can assume params always has a campaign ID
      navigate(`/Campaign/${params.campaignID}`, {});
    } else {
      // we have rewards.
      const rewards = location.state.rewards;
      rewards.forEach((reward) => {
        reward.selected = false;
      });
      setDonation({
        charityAmount: 0,
        rewards: rewards,
      });
    }
  }, []);

  const handleCharityChange = (e) => {
    let newSum = sum;
    newSum -= donation.charityAmount;
    newSum += +e.target.value;
    setSum(newSum);
    setDonation({ ...donation, charityAmount: +e.target.value });
  };

  const handleCheckBoxChange = (e) => {
    const rewards = donation.rewards;
    if (rewards[+e.target.name].selected === true) {
      // going to unselect
      let newSum = sum;
      newSum -= rewards[+e.target.name].price;
      setSum(newSum);
      rewards[+e.target.name].selected = false;
      setDonation({ ...donation, rewards: rewards });
    } else {
      // going to select
      let newSum = sum;
      newSum += rewards[+e.target.name].price;
      setSum(newSum);
      rewards[+e.target.name].selected = true;
      setDonation({ ...donation, rewards: rewards });
    }
  };

  const donate = () => {
    console.log(donation);
    // check valid params.
    if (donation.charityAmount < 0) {
      alert("Pledge Amount must be at least 0!");
      return;
    }
    if (sum <= 0) {
      alert("Please enter a positive donation amount!");
      return;
    }
    const rewardIDs = [];
    donation.rewards.forEach((reward) => {
      if (reward.selected === true) {
        rewardIDs.push(reward._id);
      }
    });
    Post(`/donations/${params.campaignID}/${location.state.userID}`, {
      charityAmount: donation.charityAmount,
      rewards: rewardIDs,
    });
    navigate(`/Campaign/${params.campaignID}`, {});
  };

  return (
    <div className="flex-row white">
      <div className="flex-column">
        <div>
          <label>Pledge Amount:</label>
          <input type="number" defaultValue={0} min={0} name="charityAmount" onChange={handleCharityChange} />
        </div>
        <div className="flex-column">
          {donation.rewards.map((reward, i) => {
            return (
              <div key={reward._id}>
                <input type="checkbox" name={i} checked={donation.rewards[i].selected} onChange={handleCheckBoxChange}></input>
                <PublicReward reward={reward} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-column">
        <div className="donate-total">
          PLEDGE AMOUNT: {donation.charityAmount} <br /> TOTAL SUM (WITH REWARDS): {sum}
        </div>
        <button onClick={donate}>DONATE</button>
      </div>
    </div>
  );
}

export default Donate;
