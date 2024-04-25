import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={loginHandler}>
            <h2>PUG SOCIAL</h2>
            <h3>LOGIN</h3>
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
                placeholder="confirm password"
              />
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Log In Now</span>
            </button>
            <div className="social-login">
              <div className="social-icons">
                <Link className="link" to="/register">
                  New User? signup here
                </Link>
                {"  "}
                <Link className="link" to="/forgot/password">
                  forgot Password?
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

export default Login;
