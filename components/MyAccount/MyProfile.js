import React, { useState, useEffect } from "react";
import SidebarMain from "./SidebarMain";
import { useSelector, useDispatch } from "react-redux";
import MetaTags from "react-meta-tags";
import userImg from "../../assets/images/user-img.webp";
import { token } from "../../utils/global";
import { PostData } from "../../utils/apiRequestHandler";
import { useToasts } from "react-toast-notifications";
import { Link, useHistory } from "react-router-dom";
import { ImgUrl } from "../../utils/global";
import statesList from "../../data/stateList";
import LayoutOne from "../../LayoutOne";

const MyProfile = () => {
  let dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts();
  const { user } = useSelector((state) => state.products);

  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(false);

  const initialValues = {
    profile_pic: user.profile_pic,
    v_m_number: user.v_m_number,
    email: user.email,
    v_f_name: user.v_f_name,
    v_l_name: user.v_l_name,
    v_address: user.v_address,
    location_area: user.location_area,
    landmark_name: user.landmark_name,
    city_name: user.city_name,
    country: user.country,
    v_state: user.v_state,
    v_pincode: user.v_pincode,
    user_gst: user.user_gst,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleImageChange = (e) => {
    const profile_pic = e.target.files[0];
    const ALLOWED_TYPES = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    if (profile_pic && ALLOWED_TYPES.includes(profile_pic.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setError(false);
        setFormValues({ ...formValues, profile_pic });
        console.log(profile_pic);
      };
      reader.readAsDataURL(profile_pic);
    } else {
      setError(true);
      console.log("File not Supported");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // take name and value from input in destructring
    setFormValues({ ...formValues, [name]: value });
    console.log(user.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    // if(Object.keys(formErrors).length !== 0) {
    setIsSubmit(true);
    // }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let DataFrom = new FormData();
      DataFrom.append("profile_pic", formValues.profile_pic);
      DataFrom.append("email", formValues.email);
      DataFrom.append("v_f_name", formValues.v_f_name);
      DataFrom.append("v_l_name", formValues.v_l_name);
      DataFrom.append("v_address", formValues.v_address);
      DataFrom.append("location_area", formValues.location_area);
      DataFrom.append("landmark_name", formValues.landmark_name);
      DataFrom.append("city_name", formValues.city_name);
      DataFrom.append("country", formValues.country);
      DataFrom.append("v_state", formValues.v_state);
      DataFrom.append("v_pincode", formValues.v_pincode);
      DataFrom.append("user_gst", formValues.user_gst);
      DataFrom.append("user_id", user.id);
      DataFrom.append("token", token);

      PostData("api/UserProfile", DataFrom).then((response) => {
        if (response.status === true) {
          addToast("Data Updated Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          dispatch({ type: "login", payload: response.data });
          setIsSubmit();
          history.push("/my-account");
        } else {
          addToast(response.message, {
            appearance: "warning",
            autoDismiss: true,
          });
        }
      });
    }
  }, [formErrors, dispatch, formValues, isSubmit,addToast,user.id,history]);

  // console.log(formErrors);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    //first name
    if (
      !/^[a-z A-Z0-9]+$/.test(values.v_f_name) ||
      /^[ ]+$/.test(values.v_f_name)
    ) {
      errors.v_f_name = "First Name is not valid";
    }
    if (!values.v_f_name) {
      errors.v_f_name = "First Name is Required";
    }

    // last name
    if (
      !/^[a-z A-Z0-9]+$/.test(values.v_l_name) ||
      /^[ ]+$/.test(values.v_l_name)
    ) {
      errors.v_l_name = "Last Name is not valid";
    }
    if (!values.v_l_name) {
      errors.v_l_name = "Last Name is Required";
    }

    // email
    if (!regex.test(values.email) && values.email) {
      errors.email = "Email is not valid";
    }

    // number
    if (!values.v_m_number) {
      errors.v_m_number = "Number is Required";
    } else if (values.v_m_number.length < 10) {
      errors.v_m_number = "Please enter Minimum 10 digit";
    }

    //address
    if (!values.v_address || /^[ ]+$/.test(values.v_address)) {
      errors.v_address = "Please fill Address correctly";
    }

    //city
    if (
      !/^[a-z A-Z0-9]+$/.test(values.city_name) ||
      /^[ ]+$/.test(values.city_name)
    ) {
      errors.city_name = "City Name is not valid";
    }

    if (!values.city_name) {
      errors.city_name = "Please Enter City name";
    }

    //country
    if (!values.country) {
      errors.country = "Please select Country";
    }

    //state
    if (!values.v_state) {
      errors.v_state = "Please Select Your state";
    }

    //pincode
    if (!values.v_pincode) {
      errors.v_pincode = "Please Enter your Postcode/Zip";
    } else if (values.v_pincode.length < 6) {
      errors.v_pincode = "Please enter Minimum 6 digit";
    }
    return errors;
  };

  return (
    <>
      <LayoutOne>
        <MetaTags>
          <title>
            {" "}
            Vedobi - 100% Herbal Product Market Place - Best Online Price
          </title>
          <meta
            name="description"
            content="Vedobi is an online Market Place for 100% herbal products on best price. Vedobi offers personal care and nutrition under one roof with global standards of quality."
          />
          <meta
            name="keywords"
            content="Buy Online Ayurvedic Products, Online Herbal Products, Ayurvedic Products, Vedobi Ayurvedic Products, Vedobi Ayurvedic Hand Sanitizer, Vedobi Hand Fortune Sanitizer Liquid, Ayurvedic Immunity Booster, Vedobi Skin Care Products, Vedobi Herbal Body Care lotion, Cura Immunity Booster"
          />
        </MetaTags>

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
                        My Profile
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
                    <h2 className="tabcontent-title">My Profile</h2>
                    <div className="simplified_main-box">
                      <div className="row">
                        <div className="profile-image">
                          <div className="image-preview">
                            {user.profile_pic !== "" &&
                            user.profile_pic !== null ? (
                              <img
                                src={
                                  imgPreview
                                    ? imgPreview
                                    : ImgUrl + user.profile_pic
                                }
                                alt="user name"
                                className="img-fluid"
                              />
                            ) : (
                              <img
                                src={userImg}
                                alt="user name"
                                className="img-fluid"
                              />
                            )}

                            <label htmlFor="fileInput">
                              <i className="fa fa-plus"></i>
                            </label>
                            <input
                              type="file"
                              id="fileInput"
                              name="profile_pic"
                              style={{ display: "none" }}
                              onChange={handleImageChange}
                            />
                            {error && (
                              <span className="text-red file-error">
                                File not Supported
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-10">
                            <label>
                              Mobile
                              <span className="text-red">
                                &nbsp;(Can't Update)*
                              </span>
                            </label>
                            <input
                              type="text"
                              maxLength="10"
                              minLength="10"
                              name="v_m_number"
                              readOnly={true}
                              value={formValues.v_m_number}
                              onChange={handleChange}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              placeholder="Phone No."
                            />
                            <span className="error_msg text-red">
                              {formErrors.v_m_number}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-10">
                            <label>Email </label>
                            <input
                              type="email"
                              name="email"
                              value={formValues.email}
                              onChange={handleChange}
                              placeholder="Enter Email"
                            />
                            <span className="error_msg text-red">
                              {formErrors.email}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-10">
                            <label>
                              First Name
                              <span className="text-red">*</span>
                            </label>
                            <input
                              type="text"
                              name="v_f_name"
                              value={formValues.v_f_name}
                              onChange={handleChange}
                              placeholder="First Name"
                            />
                            <span className="error_msg text-red">
                              {formErrors.v_f_name}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-10">
                            <label>
                              Last Name
                              <span className="text-red">*</span>
                            </label>
                            <input
                              type="text"
                              name="v_l_name"
                              value={formValues.v_l_name}
                              onChange={handleChange}
                              placeholder="Last Name"
                            />
                            <span className="error_msg text-red">
                              {formErrors.v_l_name}
                            </span>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="billing-info mb-10">
                            <label>
                              Address<span className="text-red">*</span>
                            </label>
                            <input
                              className="billing-address"
                              placeholder="House Number & Street Name"
                              type="text"
                              name="v_address"
                              value={formValues.v_address}
                              onChange={handleChange}
                            />
                            <span className="error_msg text-red">
                              {formErrors.v_address}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-5">
                          <div className="billing-info mb-10">
                            <label> Apartment, suite, etc.</label>
                            <input
                              placeholder="Apartment, suite, unit etc."
                              type="text"
                              name="location_area"
                              value={formValues.location_area}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="billing-info mb-10">
                            <label> Landmark</label>
                            <input
                              placeholder="Enter Landmark"
                              type="text"
                              name="landmark_name"
                              value={formValues.landmark_name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-3">
                          <div className="billing-info mb-10">
                            <label>
                              City<span className="text-red">*</span>
                            </label>
                            <input
                              type="text"
                              name="city_name"
                              value={formValues.city_name}
                              onChange={handleChange}
                              placeholder="City Name"
                            />
                            <span className="error_msg text-red">
                              {formErrors.city_name}
                            </span>
                          </div>
                        </div>

                        <div className="col-lg-5 col-md-5">
                          <div className="billing-select mb-10">
                            <label>
                              Country<span className="text-red">*</span>
                            </label>
                            <select
                              name="country"
                              value={formValues.country}
                              onChange={handleChange}
                            >
                              <option value="" key="2">
                                Select Country
                              </option>
                              <option value="India" key="4">
                                India
                              </option>
                            </select>
                            <span className="error_msg text-red">
                              {formErrors.country}
                            </span>
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                          <div className="billing-select mb-10">
                            <label>
                              State<span className="text-red">*</span>
                            </label>
                            <select
                              name="v_state"
                              value={formValues.v_state}
                              onChange={handleChange}
                            >
                              <option value="">Select State</option>
                              {statesList.map((Rowstate, indkey) => (
                                <option key={indkey} value={Rowstate.sub_name}>
                                  {Rowstate.sub_name}
                                </option>
                              ))}
                            </select>
                            <span className="error_msg text-red">
                              {formErrors.v_state}
                            </span>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-3">
                          <div className="billing-info mb-10">
                            <label>
                              Postcode / ZIP
                              <span className="text-red">*</span>
                            </label>
                            <input
                              type="text"
                              maxLength="6"
                              name="v_pincode"
                              value={formValues.v_pincode}
                              onChange={handleChange}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              placeholder="PIN Code"
                            />
                            <span className="error_msg text-red">
                              {formErrors.v_pincode}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="billing-info mb-10">
                            <label>GST Number</label>
                            <input
                              type="text"
                              name="user_gst"
                              value={formValues.user_gst}
                              onChange={handleChange}
                              placeholder="GST Number"
                            />
                            <span className="error_msg text-red">
                              {formErrors.user_gst}
                            </span>
                          </div>
                        </div>

                        <div className="col-md-5 order-4 order-md-4">
                          <div className="place-order mt-25">
                            <button
                              className="btn-hover"
                              type="button"
                              onClick={handleSubmit}
                            >
                              Update
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
        </div>
      </LayoutOne>
    </>
  );
};

export default React.memo(MyProfile);
