import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Home from './components/homePage/1.home-page';
import Login from "./components/homePage/2.login";
import Register from "./components/homePage/3.register";
import Overview from './components/Pages/Accounts/Campaign/Overview';
import CreateProject from './components/Pages/Create-Project';
import Discover from './components/Pages/Discover';
import Project from './components/Pages/Project';
import Search from './components/Pages/Search';

const App = () => {
  return (
		<Router>
			<header className="header">
				<div className="App">
					<div id="divHead">
						<Link exact ClassName="nav-link" to="/Discover">
							Discover
						</Link>
						<Link exact ClassName="nav-link" to="/Create-Project">
							Start A Project
						</Link>
						<Link exact ClassName="Logo" to="/">
							<h1 id="h1Head">GrowTogether</h1>
						</Link>
						<Link exact ClassName="nav-link" to="/Search">
							Search
						</Link>
						<Link exact ClassName="nav-link" to="/login">
							Log In/Register
						</Link>
					</div>

					<hr></hr>

					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register />} />
						<Route path="/discover" element={<Discover />} />
						<Route path="/search" element={<Search />} />
						<Route path="/create-project" element={<CreateProject />} />
						<Route path="/project" element={<Project />} />
						<Route path="/test" element={<test />} />
					</Routes>
				</div>
				<Footer />
			</header>
		</Router>
	);
};



export default App;
