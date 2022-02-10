import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import * as actions from "../store/Actions/Index";

const ProfileScreen = ({
  UserReducer,
  update_profile,
  update_password,
  cancelSubscription,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setprofilePicture] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isApiCalled, setIsApiCalled] = useState(false);

  useEffect(() => {
    setName(UserReducer.user_name);
    setPhone(UserReducer.user_phone);
  }, []);

  const _handleUploadImage = (event) => {
    if (event?.target?.files.length > 0) {
      const imageUploaded = event.target.files[0];
      console.log(imageUploaded,"test imageUploaded");
      if (!imageUploaded.name.match(/\.(jpg|jpeg|png|PNG)$/)) {
        toast.error(
          "This file format is not accepted. The accepted file types are .bmp,.jpg,.jpeg,.png !"
        );
      } else {
        let reader = new FileReader();
        reader.onloadend = () => {
          setprofilePicture(imageUploaded);
        };
        reader.readAsDataURL(imageUploaded);
      }
    }
  };

  const _onConfirmUpdateProfile = () => {
    if (name === "") {
      toast.error("Name field must not be empty");
    } else {
      setIsApiCalled(true);
      let updatedData = new FormData();
      updatedData.append("name", name);
      updatedData.append("phone", phone);
      profilePicture !== "" && updatedData.append("image", profilePicture);
      update_profile(
        `/api/user/update?user_id=${UserReducer.user_id}`,
        updatedData
      ).then(() => setIsApiCalled(false));
    }
  };

  const _updatePassword = () => {
    setIsApiCalled(true);
    update_password(`/api/user/updatepassword?user_id=${UserReducer.user_id}`, {
      old_password: oldPassword,
      new_password: newPassword,
    }).then(() => {
      setIsApiCalled(false);
      setOldPassword("");
      setNewPassword("");
    });
  };

  return (
    <>
      <main>
        <section className="section-1 padding-mine min-height-top formTn">
          <div className="container-1200 min-height-container-row">
            <div className="row min-height-container-row">
              <div className="col-lg-12 formCol">
                <div className="h3-head">
                  <h3>Profile</h3>
                </div>
                <form
                  className="row formMain profileForm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    _onConfirmUpdateProfile();
                  }}
                >
                  <div className="col-lg-6 col-md-6 col-12 form-group">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 form-group">
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="phone"
                      name="phone"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 form-group profileUp">
                    <input
                      type="file"
                      name="name"
                      placeholder="Name"
                      id="uploadInput"
                      onChange={_handleUploadImage}
                    />
                    <label htmlFor="uploadInput">
                      <span className="upbtn">
                        <i className="fas fa-upload"></i>
                        Upload
                      </span>
                      <span>Click Here to Upload Profile</span>
                    </label>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 form-group">
                    <input
                      type="submit"
                      name="submit"
                      value={isApiCalled ? "Please wait" : "Confirm"}
                      className="confirmBtn"
                      disabled={isApiCalled}
                    />
                  </div>
                </form>
                <div className="h3-head smallh3">
                  <h3>Change Password</h3>
                </div>
                <form
                  className="row formMain passwordForm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    _updatePassword();
                  }}
                >
                  <div className="col-lg-6 col-md-6 col-12 form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Current Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 form-group">
                    <input
                      type="password"
                      name="confirmpassword"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 form-group">
                    <input
                      type="submit"
                      name="submit"
                      value={isApiCalled ? "Please wait" : "Confirm"}
                      className="confirmBtn"
                      disabled={isApiCalled}
                    />
                  </div>
                </form>
                {UserReducer.plan_id !== 1 && (
                  <>
                    <div className="h3-head">
                      <h3>Cancel Subscription</h3>
                    </div>
                    <p className="bg-warning p-3">
                      This will cancel your subscription immediately and it will
                      change your account status to free account.
                    </p>
                    <button
                      className="btn btn-danger btn-lg float-right"
                      // disabled={UserReducer.plan_id === 1}
                      onClick={() => {
                        cancelSubscription({
                          user_id: UserReducer.user_id,
                          subscription_id: UserReducer.subscription_id,
                        });
                      }}
                    >
                      Cancel Subscription
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const mapStateToProps = ({ UserReducer }) => {
  return {
    UserReducer,
  };
};
export default connect(mapStateToProps, actions)(ProfileScreen);
