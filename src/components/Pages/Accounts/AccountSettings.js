import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

function AccountSettings() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ _id: "" });

  useEffect(() => {
    if (!location.state || !location.state.user || !location.state.userID) {
      // did not receive the correct state.
      navigate("/accountOverview", location.state);
    } else {
      setUser({ ...location.state.user });
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveSettings = async () => {
    // do the thing
  };

  const deleteAccount = async () => {
    // do the thing
  };

  return (
    <div className="flex-column white">
      <div>
        <label>First Name</label>
        <input name="firstName" type="text" onChange={handleChange} defaultValue={user ? user.firstName : ""} />;
      </div>
      <div>
        <label>Last Name</label>
        <input name="lastName" type="text" onChange={handleChange} defaultValue={user ? user.lastName : ""} />;
      </div>
      <div>
        <label>Username</label>
        <input name="username" type="text" onChange={handleChange} defaultValue={user ? user.username : ""} />;
      </div>
      <div>
        <label>Password</label>
        <input name="oldPassword" type="password" onChange={handleChange} defaultValue={""} />;
      </div>
      <div>
        <button onClick={saveSettings}>SAVE</button>
        <Link to={"/accountOverview"} state={location.state}>
          Back
        </Link>
      </div>
      {user && user.publishedCampaignsOwned && user.publishedCampaignsOwned.length > 0 ? (
        <button disabled>DELETE</button>
      ) : (
        <button onClick={deleteAccount}>DELETE</button>
      )}
    </div>
  );
}

export default AccountSettings;
