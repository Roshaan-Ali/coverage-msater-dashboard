import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoLogin } from "../../assets";
// import ChatNowComp from "../../components/ChatNowComp";
import * as actions from "../../store/Actions/Index";
import { connect } from "react-redux";
import { useEffect } from "react";
import { validationEmailPattern } from "../../utils";
import Loader from "react-loader-spinner";
import Spinner from "../../components/Spinner";

const SignInScreen = ({ UserReducer, userLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const history = useHistory();

  const _onLogin = () => {
    localStorage.clear();
    if (!validationEmailPattern(email)) {
      toast.error("Please enter a valid email address.");
    } else if (email === "" || password === "") {
      toast.error("Both email and password is required.");
    } else {
      userLoggedIn(email, password);
    }
  };

  useEffect(() => {
    if (UserReducer?.isUserLogin) {
      history.push("/dashboard");
    }
  }, [UserReducer]);

  const bottomLinks = [
    {
      text: "Signed up for a trial but can’t sign in?",
      labelText: "Re-send activation email",
      link: "#",
    },
    {
      text: "Trying to start a free trial?",
      labelText: "Sign up",
      link: "/signup",
    },
    {
      text: "Account holder but can’t sign in?",
      labelText: "Setup a new password",
      link: "#",
    },
  ];

  return (
    <>
      <section className="sign-up">
        <div className="sign-in-content">
          <div className="logo-signin">
            <Link to="#">
              <img src={LogoLogin} />
            </Link>
          </div>
          <div className="container-sign-in">
            <div className="content-start sign-in-heading">
              <h3>Sign In</h3>
              <div className="form-div sing-in-form-div">
                <label className="m-0">Email</label>
                <input
                  type=""
                  name=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <label className="m-0 forgot-password">
                  Password
                  <p>
                    <Link to="/forgot-password">Forgot password?</Link>
                  </p>
                </label>
                <input
                  type="password"
                  name=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <div className="checkbox-signup">
                  <input
                    id="check-signup"
                    type="checkbox"
                    name=""
                    defaultChecked={isRememberMe}
                    onChange={() => setIsRememberMe(!isRememberMe)}
                  />
                  <label htmlFor="check-signup">Remember Me</label>
                </div>
                <div>
                  <div>
                    <button
                      className="sign-in-btn"
                      disabled={UserReducer?.isApiCall}
                      onClick={_onLogin}
                    >
                      {UserReducer?.isApiCall ? (
                       <Spinner />
                      ) : (
                        "Login"
                      )}  
                    </button>
                  </div>
                </div>
              </div>

              <div className="row">
                {bottomLinks.map((item, i) => {
                  return (
                    <div
                      className="col-lg-4 col-md-4 col-sm-6 col-xs-6 pd-small"
                      key={i}
                    >
                      <div
                        className="bottom-text-sign-in"
                        // remove style when moving forward
                        style={{ visibility: i % 2 === 0 && "hidden" }}
                      >
                        <p>
                          {item.text}
                          <br />
                          <Link to={item.link}>{item.labelText} </Link>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* <ChatNowComp /> */}
      </section>
    </>
  );
};

const mapStateToProps = ({ UserReducer }) => {
  return { UserReducer };
};

export default connect(mapStateToProps, actions)(SignInScreen);
