import Button from "./Button";
import "./Header.css";
import Login from '../login/login';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function Header() {
	return (
		<Router>
		<header className="header">
			<div id="divHead">
				
					<Button id="discover" text="Discover" />
					<Button id="start" text="Start A Project" />
					<h1 id="h1Head">GrowTogether</h1>
					<Button id="search" text="Search" />
					<Link className="login-link" to="/login">
						Login
						{/* <Button id="logIn" text="Log In" /> */}
					</Link>
					{/* <Routes>
						<Route path="/login" element={<Login />} />
					</Routes> */}
				
			</div>
			<hr></hr>
		</header>
		</Router>
	);
}

export default Header