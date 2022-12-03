import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Post } from "../../scripts";
import "./style.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (onSuccess) => {
    const navigate = useNavigate;
    Post("/users/", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    })
      .then((result) => {
        console.log(result);
        localStorage.setItem("userID", result);
        // make sure everyone knows we're signed in now.
        // redirect to homepage
        onSuccess();
        navigate("/");
      })
      .catch((error) => {
        switch (error.response.status) {
          case 422: {
            // missing account information
            console.log("Missing Account Information!!");
            break;
          }
          case 409: {
            // username taken
            console.log("Username is Taken!!");
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
      <h2 className="login-register-header">Sign up</h2>

      {/* <form className="login-register-form"> */}
      <div className="container">
        <input
          className="center-block"
          type="text"
          placeholder="First Name"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          required
        />
        <input
          className="center-block"
          type="text"
          placeholder="Last Name"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          required
        />
        <input
          className="center-block"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />
        <input
          className="center-block"
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />

        {/* <button className="center-block login-register-button" type="submit">
            Create account
          </button> */}

        <button
          className="center-block login-register-button"
          onClick={() => {
            handleSignup();
          }}
        >
          Create Account
        </button>

        <div className="login-container">
          Have an account?{" "}
          <a className="login-link" href="/login">
            Login
          </a>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
};

export default Register;
