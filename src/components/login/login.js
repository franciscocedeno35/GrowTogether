import React from 'react';
import './style.css';



const Login = () => {

	
		return (
			<div className="body">
				<h2>Login</h2>

				<form action="./App.js" method="post">
					<div className="container">
						<input
							className="center-block"
							type="text"
							placeholder="Enter Username"
							name="uname"
							required
						/>
						<input
							className="center-block"
							type="password"
							placeholder="Enter Password"
							name="psword"
							required
						/>

						<div className="psw">
							Forgot your <a href="#"> password?</a>
						</div>

						<button className="center-block" type="submit">
							Login
						</button>
						<div className="remember-me">
							<label>
								<input
									type="checkbox"
									className="remember"
									name="remember"
									defaultChecked={true}
								/>{' '}
								Remember me
							</label>
						</div>
					</div>
				</form>
			</div>
		);
}
	 export default Login;

