import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoLogin } from "../../assets";
import * as actions from "../../store/Actions/Index";

const InvitedUserSetPaswrdScreen = ({
  verify_invited_user,
  InvitedUserReducer,
  set_invited_user_password,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invitedUserEmail, setInvitedUserEmail] = useState("");
  const [isApiCall, setIsApiCall] = useState(false);
  const { verify_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    verify_invited_user(verify_id).then(() => {
      console.log(InvitedUserReducer.invited_user_email, "------------");
    });
  }, []);

  useEffect(() => {
    setInvitedUserEmail(InvitedUserReducer.invited_user_email);
  }, [InvitedUserReducer]);

  const _saveInvitedUserPassword = () => {
    if (password === "" || confirmPassword === "") {
      toast.error("All fields required.");
    } else if (password !== confirmPassword) {
      toast.error("Password doesn't matched.");
    } else if (password.length < 8) {
      toast.error("Minimum 8 characters.");
    } else {
      setIsApiCall(true);
      set_invited_user_password({ invitedUserEmail, password }).then(() => {
        setPassword("");
        setConfirmPassword("");
        setInvitedUserEmail("");
        setIsApiCall(false);
        history.push("/");
      });
    }
  };

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
              <h3>Set Password</h3>
              <div className="form-div sing-in-form-div">
                <label className="m-0 forgot-password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <label className="m-0 forgot-password">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                <div>
                  <div>
                    <button
                      className="sign-in-btn"
                      onClick={() => _saveInvitedUserPassword()}
                      disabled={isApiCall}
                    >
                      Set Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = ({ InvitedUserReducer }) => {
  return { InvitedUserReducer };
};

export default connect(mapStateToProps, actions)(InvitedUserSetPaswrdScreen);
