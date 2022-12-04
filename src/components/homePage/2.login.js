import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Get } from "../../scripts";
import "./style.css";

const Login = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log(localStorage.getItem("userID"));
    console.log(Username + " " + Password);
    console.log("handling Login!");
    Get("/users/Login", {
      username: Username,
      password: Password,
    })
      .then(async (result) => {
        console.log(result);
        await localStorage.setItem("userID", result.userID);
        await console.log(localStorage.getItem("userID"));
        // make sure everyone knows we're signed in now.
        // redirect to homepage
        onSuccess();
        navigate("/");
      })
      .catch((error) => {
        alert("something's wrong!");
        switch (error.response.status) {
          case 400: {
            // something
            console.log("something");
            break;
          }
          default: {
            console.log("There was an error with the backend. what do?");
            break;
          }
        }
      });
  };

  return (
    <div className="login-register-body">
      <h2 className="login-register-header">Login</h2>

      {/* <form className="login-register-form"> */}
      <div className="container">
        <input
          className="center-block"
          type="text"
          placeholder="Enter Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />
        <input
          className="center-block"
          type="password"
          placeholder="Enter Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />

        <div className="psw">
          Forgot your{" "}
          <a className="login-link" href="#">
            {" "}
            password?
          </a>
        </div>

        <button
          className="center-block login-register-button"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="remember-me">
          <label>
            <input
              type="checkbox"
              className="remember"
              name="remember"
              defaultChecked={true}
            />{" "}
            Remember me
          </label>
        </div>
      </div>
      {/* </form> */}
      <div className="new-signup">
        New to GrowTogether?{" "}
        <a className="login-link" href="/register">
          Register
        </a>
      </div>
    </div>
  );
};
export default Login;
