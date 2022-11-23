import React from 'react';
import './style.css';



const Login = () => {

	
		return (
			<div className="body">
				<h2 className='login-register-header'>Login</h2>

				<form className='login-register-form' action="./App.js" method="post">
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
							Forgot your <a className='login-link' href="#"> password?</a>
						</div>

						<button  className="center-block login-register-button" type="submit">
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

