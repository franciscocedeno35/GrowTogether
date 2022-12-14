import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Delete, Patch } from "../../../scripts";
import "./AccountSettings.css";

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
		<div className="flex-column justify-center">
			<div className="flex-row justify-center ">
				<h1 className="accountSetting-h1">Setting</h1>
			</div>
			<div className="flex-row justify-center ">
				<label className="accountSetting-label">First Name:</label>
				<input
					className="accountSetting-input"
					name="firstName"
					type="text"
					onChange={handleChange}
					defaultValue={user ? user.firstName : ''}
				/>
			</div>
			<div className="flex-row justify-center">
				<label className="accountSetting-label">Last Name:</label>
				<input
					className="accountSetting-input"
					name="lastName"
					type="text"
					onChange={handleChange}
					defaultValue={user ? user.lastName : ''}
				/>
			</div>
			<div className="flex-row justify-center">
				<label className="accountSetting-label">Username:</label>
				{/* <p >Username:</p> */}
				<input
					className="accountSetting-input"
					name="username"
					placeholder="Username"
					type="text"
					onChange={handleChange}
					defaultValue={user ? user.username : ''}
				/>
			</div>
			<div className="flex-row justify-center">
				<label className="accountSetting-label">Password:</label>
				<input
					className="accountSetting-input"
					name="password"
					type="text"
					onChange={handleChange}
					defaultValue={user ? user.password : ''}
				/>
			</div>
			<div className="flex-row justify-center accountSetting-save-button ">
				<button onClick={saveSettings}>SAVE</button>
			</div>
			<div className="flex-row justify-center accountSetting-signout-button">
				<button className="accountSetting-signOut" onClick={signOut}>
					SIGN OUT
				</button>
			</div>
			<div className="flex-row justify-center accountSetting-button ">
				{user &&
				((user.publishedCampaignsOwned &&
					user.publishedCampaignsOwned.length > 0) ||
					(user.donations && user.donations.length > 0)) ? (
					<button disabled>DELETE</button>
				) : (
					<button className="accountSetting-delete" onClick={deleteAccount}>
						DELETE
					</button>
				)}
			</div>
			<div className="flex-row justify-center create-campaign-create-button editSetting-campaign-cancel-button ">
				<Link to={'/AccountOverview'} state={location.state}>
					CANCEL
				</Link>
			</div>
		</div>
	);
}

export default AccountSettings;
