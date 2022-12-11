import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Delete, Patch } from "../../../scripts";

function AccountSettings({ onSuccess }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ _id: "" });

  useEffect(() => {
    if (!location.state || !location.state.user || !location.state.userID) {
      // did not receive the correct state.
      navigate("/AccountOverview", location.state);
    } else {
      setUser({ ...location.state.user });
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.name + ": " + user[e.target.name] + " --> " + e.target.value);
  };

  const saveSettings = async () => {
    // make sure every field is populated with something.
    if (!(user.firstName && user.lastName && user.username && user.password)) {
      alert("Please provide something for all settings!");
    } else {
      Patch(`/users/settings/${user._id}`, {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.password,
      })
        .then((newUserInfo) => {
          // user has been saved.
          console.log(newUserInfo);
          setUser(newUserInfo);
          navigate(`/AccountOverview`, { state: { ...location.state, user: newUserInfo } });
        })
        .catch((error) => {
          console.error(error);
          alert(error.response.data.message);
        });
    }
  };

  const deleteAccount = async () => {
    await Delete(`users/${user._id}`, {});
    localStorage.removeItem("userID");
    onSuccess();
    navigate("/", { state: {} });
  };

  const signOut = async () => {
    localStorage.removeItem("userID");
    onSuccess();
    navigate("/", { state: {} });
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
        <input name="password" type="text" onChange={handleChange} defaultValue={user ? user.password : ""} />;
      </div>
      <div>
        <button onClick={saveSettings}>SAVE</button>
        <Link to={"/AccountOverview"} state={location.state}>
          CANCEL
        </Link>
      </div>
      {user && ((user.publishedCampaignsOwned && user.publishedCampaignsOwned.length > 0) || (user.donations && user.donations.length > 0)) ? (
        <button disabled>DELETE</button>
      ) : (
        <button onClick={deleteAccount}>DELETE</button>
      )}
      <button onClick={signOut}>SIGN OUT</button>
    </div>
  );
}

export default AccountSettings;
