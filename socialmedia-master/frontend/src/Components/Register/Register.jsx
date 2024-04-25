import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, confirmPassword));
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login padding" onSubmit={submitHandler}>
            <div className="login__field">
              <input
                className="login__input"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="enter your Name"
              />
            </div>
            <div className="login__field">
              <input
                className="login__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email"
              />
            </div>
            <div className="login__field">
              <input
                className="login__input"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter your password"
              />
            </div>
            <div className="login__field">
              <input
                className="login__input"
                type="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="enter your password"
              />
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Sign up</span>
            </button>
            <div className="social-login">
              <div className="social-icons">
                <Link className="button login__submit" to="/">
                  Already User?login here
                </Link>
              </div>
            </div>
          </form>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
