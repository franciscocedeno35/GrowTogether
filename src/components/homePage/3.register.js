import React from 'react';
import './style.css';

const Register = () => {

	
		return (
			<div className="login-register-body">
				<h2 className="login-register-header">Sign up</h2>

				<form className="login-register-form" action="./App.js" method="post">
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

						<button
							className="center-block login-register-button"
							type="submit">
							Create account
						</button>

						<div className="login-container">
							Have an account?{' '}
							<a className="login-link" href="/login">
								Login
							</a>
						</div>
					</div>
				</form>
			</div>
		);
	
}

export default Register;