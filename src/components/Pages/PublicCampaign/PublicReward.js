import "./PublicReward.css";

function PublicReward({ reward }) {
  return (
    <div className="reward-container">
      <h1 className="test">Pledge ${reward.price.toLocaleString("en")}</h1>
      <p>Delivery {reward.expectedDeliveryDate.toDateString()}</p>
      <h5>{reward.name}</h5>
      <p>{reward.description}</p>
    </div>
  );
}

export default PublicReward;
