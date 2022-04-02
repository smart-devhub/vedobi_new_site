import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { token } from "../../utils/global";
import { useToasts } from "react-toast-notifications";
import { PostData } from "../../utils/apiRequestHandler";
import SidebarMain from "./SidebarMain";
import LayoutOne from "../../LayoutOne";

function ChangePassword() {
  const { addToast } = useToasts();

  const { user } = useSelector((state) => state.products);

  const [passwordShownConfirm, setPasswordShownConfirm] = useState(false);
  const [passwordNew, setPasswordNew] = useState(false);

  const initialValue = { newpassword: "", cpassword: "" };

  const [formValue, setFormValue] = useState(initialValue);
  const [passwordErrors, setPasswordErrors] = useState({});
  //const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordErrors(validate(formValue));
    let DataFrom = new FormData();
    DataFrom.append("newpassword", formValue.newpassword);
    DataFrom.append("cpassword", formValue.cpassword);
    DataFrom.append("user_id", user.id);
    DataFrom.append("token", token);

    if (Object.keys(passwordErrors).length === 0) {
      if (formValue.cpassword && formValue.newpassword) {
        PostData("api/UserChangePassword", DataFrom).then((response) => {
          if (response.status === true) {
            addToast("Change Password successfully", {
              appearance: "success",
              autoDismiss: true,
            });
          } else {
            addToast(response.message, {
              appearance: "warning",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  const validate = (values) => {
    const errors = {};

    // NEW PASSWORD
    if (values.newpassword.length < 8) {
      errors.Newpassword = "Please enter Minimum 8 digit";
    }
    if (!values.newpassword) {
      errors.newpassword = "Password is required";
    }

    // CONFIRM PASSWORD
    if (values.cpassword !== values.newpassword) {
      errors.cpassword = "Confirm Password & New Password Not matched";
    }
    if (!values.cpassword) {
      errors.cpassword = "Confirm Password must Required";
    }
    return errors;
  };

  const togglePasswordNew = () => {
    setPasswordNew(passwordNew ? false : true);
  };

  const togglePasswordVisiblityConfirm = () => {
    setPasswordShownConfirm(passwordShownConfirm ? false : true);
  };

  return (
    <>
      <LayoutOne>
        <div className="breadcrumb-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="breadcrumb-content">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="fa fa-home home--icon" />
                        </Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="/my-account">My Account</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Change Password
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-account-area pt-30 pb-50 bg-white my-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="account-sidebar">
                  <div id="backdrop-hook"></div>
                  <SidebarMain />
                </div>
              </div>
              <div className="col-lg-9">
                <div className="single-account-wrapper">
                  <div className="single-account-wrapper">
                    <h2 className="tabcontent-title">Change Password</h2>

                    <div className="myaccount-info-wrapper">
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="billing-info">
                            <label>New Password</label>
                            <div className="login-pass">
                              <input
                                type={passwordNew ? "text" : "password"}
                                name="newpassword"
                                onChange={handleChange}
                                value={formValue.newpassword}
                              />
                              <button
                                className="eye-toggle"
                                onClick={togglePasswordNew}
                              >
                                {passwordNew ? (
                                  <i className="fa fa-eye-slash" />
                                ) : (
                                  <i className="fa fa-eye" />
                                )}
                              </button>
                            </div>
                            <small className="text-red">
                              {passwordErrors.newpassword}
                            </small>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="billing-info">
                            <label>Reenter New Password</label>
                            <div className="login-pass">
                              <input
                                type={
                                  passwordShownConfirm ? "text" : "password"
                                }
                                name="cpassword"
                                value={formValue.cpassword}
                                onChange={handleChange}
                              />
                              <button
                                className="eye-toggle"
                                onClick={togglePasswordVisiblityConfirm}
                              >
                                {passwordShownConfirm ? (
                                  <i className="fa fa-eye-slash" />
                                ) : (
                                  <i className="fa fa-eye" />
                                )}
                              </button>
                            </div>
                            <small className="text-red">
                              {passwordErrors.cpassword}
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="billing-back-btn">
                        <div className="billing-btn">
                          <button type="submit" onClick={handleSubmit}>
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </>
  );
}

export default React.memo(ChangePassword);
