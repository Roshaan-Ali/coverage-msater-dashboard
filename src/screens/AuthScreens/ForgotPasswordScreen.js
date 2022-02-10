import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { LogoLogin } from "../../assets";
// import ChatNowComp from "../../components/ChatNowComp";
import { connect } from "react-redux";
import { validationEmailPattern } from "../../utils";
import * as actions from "../../store/Actions/Index";

const ForgotPasswordScreen = ({
  UserReducer,
  ForgetAuthReducer,
  forgetPassword,
  checkVerificationCode,
  update_password,
}) => {
  const [resetPaswrdUi, setResetPaswrdUi] = useState("enterEmail");
  // send verification code
  const [email, setEmail] = useState("");
  // check verification code
  const [verificationCode, setVerificationCode] = useState("");
  // new password
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isApiCall, setIsApiCall] = useState(false);

  const _sendResetPsswrdLnk = () => {
    if (email === "") {
      setError("Email is required");
    } else if (!validationEmailPattern(email)) {
      setError("Email is badly Formatted");
    } else {
      // console.log(email);
      setIsApiCall(true);
      forgetPassword({ email }).then(() => {
        setIsApiCall(false);
        // setResetPaswrdUi("enterVerification");
      });
    }
  };

  const _checkVerificationCode = () => {
    console.log("_checkVerificationCode");
    if (verificationCode === "") {
      setError("Verification code is required.");
    } else {
      console.log(verificationCode);
      setIsApiCall(true);
      checkVerificationCode({
        email: email,
        verification_code: verificationCode,
      }).then(() => {
        setIsApiCall(false);
        setVerificationCode("");
      });
    }
  };

  const _changePassword = () => {
    if (newPassword === "" || confirmNewPassword === "") {
      setError("Both fields required!");
    } else if (newPassword.length < 8) {
      setError("Minimum 8 characters!");
    } else if (newPassword !== confirmNewPassword) {
      setError("Password don't match!");
    } else {
      console.log(email, newPassword);
      update_password(`/updatepassword`, {
        email: email,
        password: newPassword,
      }).then(() => {
        setEmail("");
        setNewPassword("");
        setConfirmNewPassword("");
        history.push("/");
      });
    }
  };

  const history = useHistory();

  useEffect(() => {
    if (UserReducer?.isUserLogin) {
      history.push("/dashboard");
    }
    setResetPaswrdUi(ForgetAuthReducer?.forgetPassUiFlow);
    // return setResetPaswrdUi("enterEmail");
  }, [UserReducer, ForgetAuthReducer]);

  useEffect(() => {
    return setResetPaswrdUi("enterEmail");
  }, []);

  return (
    <>
      <section className="sign-up">
        <div className="sign-in-content forget-password">
          <div className="logo-signin">
            <Link to="#">
              <img src={LogoLogin} />
            </Link>
          </div>
          <div className="container-sign-in">
            {resetPaswrdUi === "enterEmail" ? (
              <div className="content-start sign-in-heading">
                <h3>FORGOT PASSWORD</h3>
                <div className="form-div sing-in-form-div">
                  <label className="m-0">Enter Your Email</label>
                  <input
                    type=""
                    name=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    onFocus={() => setError("")}
                  />
                  {error !== "" && (
                    <small
                      className="d-block alert alert-danger"
                      role="alert"
                      style={{ marginBottom: "10px" }}
                    >
                      {error}
                    </small>
                  )}
                  <div>
                    <div>
                      <button
                        disabled={isApiCall}
                        className="sign-in-btn"
                        onClick={_sendResetPsswrdLnk}
                      >
                        Send reset password instruction
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 backtosignin">
                    <Link to="/">Back To Sign In</Link>
                  </div>
                </div>
              </div>
            ) : resetPaswrdUi === "enterVerification" ? (
              <div className="content-start sign-in-heading">
                <h3>Verification Code</h3>
                <div className="form-div sing-in-form-div">
                  <label className="m-0">Enter Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Verification Code"
                    onFocus={() => setError("")}
                  />
                  {error !== "" && (
                    <small
                      className="d-block alert alert-danger"
                      role="alert"
                      style={{ marginBottom: "10px" }}
                    >
                      {error}
                    </small>
                  )}
                  <div>
                    <div>
                      <button
                        disabled={isApiCall}
                        className="sign-in-btn"
                        onClick={_checkVerificationCode}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 backtosignin">
                    <Link to="/">Back To Sign In</Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="content-start sign-in-heading">
                <h3>New Password</h3>
                <div className="form-div sing-in-form-div">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
                    onFocus={() => setError("")}
                  />
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    onFocus={() => setError("")}
                  />
                  {error !== "" && (
                    <small
                      className="d-block alert alert-danger"
                      role="alert"
                      style={{ marginBottom: "10px" }}
                    >
                      {error}
                    </small>
                  )}
                  <div>
                    <div>
                      <button
                        className="sign-in-btn"
                        disabled={isApiCall}
                        onClick={_changePassword}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 backtosignin">
                    <Link to="/">Back To Sign In</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <ChatNowComp /> */}
      </section>
    </>
  );
};

const mapStateToProps = ({ UserReducer, ForgetAuthReducer }) => {
  return { UserReducer, ForgetAuthReducer };
};

export default connect(mapStateToProps, actions)(ForgotPasswordScreen);
