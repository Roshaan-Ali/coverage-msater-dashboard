import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Logo } from "../../assets";
import ChatNowComp from "../../components/ChatNowComp";
import * as actions from "../../store/Actions/Index";
import { connect } from "react-redux";
import { validationEmailPattern } from "../../utils";

const SignUpScreen = ({ UserReducer, userSignup }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAccpetTrmsConditions, setIsAccpetTrmsConditions] = useState(false);
  const history = useHistory();
  const _startFreetrial = () => {
    if (email === "" || password === "") {
      toast.error("Both email and password is required.");
    } else if (!validationEmailPattern(email)) {
      toast.error("Please enter a valid email address.");
    } else if (!isAccpetTrmsConditions) {
      toast.error("Accept terms and conditions.");
    } else {
      userSignup(userName, email, password);
      // history.push("/");
    }
  };

  useEffect(() => {
    if (UserReducer?.isUserLogin) {
      history.push("/dashboard");
    }
  }, [UserReducer]);

  return (
    <>
      <section className="sign-up">
        <div className="logo-signup">
          <img src={Logo} />
        </div>

        <div className="sign-up-content">
          <div className="container-sign-up">
            <div className="content-start">
              <h3>Life is short. Start automating your coverage reports.</h3>
              <div className="margin-p">
                <p>Start free trial</p>
              </div>
              <div className="form-div">
                <input
                  type=""
                  name=""
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="User Name"
                />
                <input
                  type=""
                  name=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <input
                  type="password"
                  name=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <p>
                  Please state you have read and agreed to our{" "}
                  <span>
                    {" "}
                    <Link to="#">terms and conditions</Link>
                  </span>{" "}
                  and{" "}
                  <span>
                    <Link to="#"> privacy policy </Link>{" "}
                  </span>
                  before you continue.
                </p>
                <div className="checkbox-signup">
                  <input
                    id="check-signup"
                    type="checkbox"
                    name=""
                    defaultChecked={isAccpetTrmsConditions}
                    onChange={() =>
                      setIsAccpetTrmsConditions(!isAccpetTrmsConditions)
                    }
                  />
                  <label htmlFor="check-signup">
                    I agree to the terms & conditions
                  </label>
                </div>
                <div className="flex-btn-text">
                  <div>
                    <button
                      onClick={_startFreetrial}
                      disabled={UserReducer?.isApiCall}
                    >
                      start my free trial
                    </button>
                  </div>
                  <div>
                    <p>Free trial, no commitment, no credit card required.</p>
                  </div>
                </div>
              </div>

              <div className="already-text">
                <p>
                  Already have an account? <Link to="/"> Sign in </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <ChatNowComp />
      </section>
    </>
  );
};

const mapStateToProps = ({ UserReducer }) => {
  return { UserReducer };
};
// export default SignUpScreen;
export default connect(mapStateToProps, actions)(SignUpScreen);
