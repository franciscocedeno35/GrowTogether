import React from 'react';
import './style.css';

const Register = () => {

	
		return (
			<div className="body">
				<h2>Sign up</h2>

				<form action="./App.js" method="post">
					<div className="container">
						<input
							className="center-block"
							type="text"
							placeholder="Name"
							name="name"
							required
						/>
						<input
							className="center-block"
							type="text"
							placeholder="Email"
							name="Email"
							required
						/>
						<input
							className="center-block"
							type="password"
							placeholder="Password"
							name="Password"
							required
						/>

						<button className="center-block" type="submit">
							Create account
						</button>

						<hr id='first-line'/>

						<div className="login-container">
							Have an account? <a href="#"> Log in</a>
						</div>

						
					</div>
				</form>
			</div>
		);
	
}

export default Register;