import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Login from "./components/login/login"
import Home from './components/login/home-page';
import  Register  from "./components/login/register"
import { useState } from 'react';
import Header from './components/Header-Footer/Header';
import Footer from './components/Header-Footer/Footer';


const App = () => {
  return (
		<div>
			<header>
				<Header />

				<Router>
					<ul>
						<li>
							<Link to="/">Home-Page</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>

						<li>
							<Link to="/register">Register</Link>
						</li>
					</ul>
					<Routes>
						<Route path="/login" element={<Login />} />

						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</Router>
				<Footer />
			</header>
		</div>
	);
};



export default App;
