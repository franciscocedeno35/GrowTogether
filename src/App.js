import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./components/homePage/1.home-page";
import Login from "./components/homePage/2.login";
import Register from "./components/homePage/3.register";
import AccountOverview from "./components/Pages/Accounts/AccountOverview";
import AccountSettings from "./components/Pages/Accounts/AccountSettings";
import { CampaignOverview, EditCampaignSettings, EditContent, EditRewards } from "./components/Pages/CampaignEditing";
import CreateProject from "./components/Pages/Create-Project";
import Discover from "./components/Pages/Discover";
import PublicCampaign from "./components/Pages/PublicCampaign/PublicCampaign";
import Search from "./components/Pages/Search";

const App = () => {
  const [loginSetting, setloginSetting] = useState({
    path: "/Login",
    text: "Log In/Register",
  });
  const [createProj, setCreateProj] = useState({
    path: "/Create-Project",
  });

  useEffect(() => {
    alterHeaderIfLoggedIn();
  }, []);

  const alterHeaderIfLoggedIn = () => {
    let storedUSER = localStorage.getItem("userID");
    if (storedUSER) {
      setloginSetting({
        path: "/AccountOverview",
        text: "Hello username",
      });
      setCreateProj({
        path: "/Create-Project",
      });
      return true;
    } else {
      setloginSetting({
        path: "/Login",
        text: "Log In/Register",
      });
      setCreateProj({
        path: "/Login",
      });
      return false;
    }
  };

  return (
    <Router>
      <header className="header">
        <div className="App">
          <div id="divHead">
            <Link className="nav-link" to="/Discover">
              <text className="white">Discover</text>
            </Link>
            <Link className="nav-link" to={createProj.path}>
              <text className="white">Start A Project</text>
            </Link>
            <Link className="Logo" to="/">
              <h1 id="h1Head">GrowTogether</h1>
            </Link>
            <Link className="nav-link" to="/Search">
              <text className="white">Search</text>
            </Link>
            <Link className="nav-link" to={loginSetting.path}>
              <text className="white">{loginSetting.text}</text>
            </Link>
          </div>

          <hr className="whiteLine"></hr>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login onSuccess={alterHeaderIfLoggedIn} />} />
            <Route path="/Register" element={<Register onSuccess={alterHeaderIfLoggedIn} />} />
            <Route path="/AccountOverview" element={<AccountOverview />} />
            <Route path="/AccountOverview/Settings" element={<AccountSettings onSuccess={alterHeaderIfLoggedIn} />} />
            <Route path="/Campaign/Overview/:campaignID" element={<CampaignOverview />} />
            <Route path="/Campaign/Settings/:campaignID" element={<EditCampaignSettings />} />
            <Route path="/Campaign/Content/:campaignID" element={<EditContent />} />
            <Route path="/Campaign/Rewards/:campaignID" element={<EditRewards />} />
            <Route path="/Discover" element={<Discover />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/CreateProject" element={<CreateProject />} />
            <Route path="/Campaign" element={<Home />} />
            <Route path="/Campaign/:campaignID" element={<PublicCampaign />} />
          </Routes>
        </div>
        <Footer />
      </header>
    </Router>
  );
};

export default App;
