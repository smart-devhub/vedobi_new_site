import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaTags from "react-meta-tags";
import { Link, useParams, useHistory } from "react-router-dom";
import { baseUrl } from "../../utils/global";
import SidebarMain from "./SidebarMain";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { token } from '../../utils/global';
import { PostData } from "../../utils/apiRequestHandler";
import statesList from '../../data/stateList';


function UpdateShipping() {

  const history = useHistory();
  const { id } = useParams();
  const { addToast } = useToasts();
  const { user } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setFormValues({ ...formValues, [name]: checked });
    console.log(checked)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorCheck = validate(formValues);
    setFormErrors(errorCheck);
    setIsSubmit(true)
    if (Object.keys(errorCheck).length === 0 && isSubmit) {
      let DataFrom = new FormData();
      DataFrom.append("s_m_number", formValues.s_m_number);
      DataFrom.append("s_f_name", formValues.s_f_name);
      DataFrom.append("s_l_name", formValues.s_l_name);
      DataFrom.append("s_address", formValues.s_address);
      DataFrom.append("s_location_area", formValues.s_location_area);
      DataFrom.append("s_landmark_name", formValues.s_landmark_name);
      DataFrom.append("s_city", formValues.s_city);
      DataFrom.append("s_country", formValues.s_country);
      DataFrom.append("s_state", formValues.s_state);
      DataFrom.append("s_pincode", formValues.s_pincode);
      DataFrom.append("default_as", formValues.default_as);
      DataFrom.append("id", id);
      DataFrom.append("user_id", user.id);
      DataFrom.append("token", token);

      PostData("api/shippingAddressUpdate", DataFrom).then((response) => {
        if (response.status === true) {
          addToast('Address Updated Successfully', { appearance: 'success', autoDismiss: true });
          setIsSubmit()
          history.push('/my-account/saved-address')
        }
        else {
          addToast(response.message, { appearance: 'warning', autoDismiss: true });
        }
      });
    }
  }

  const validate = (values) => {
    const errors = {};
    //first name
    if (! /^[a-z A-Z0-9]+$/.test(values.s_f_name) || /^[ ]+$/.test(values.s_f_name)) {
      errors.s_f_name = 'First Name is not valid'
    }
    if (!values.s_f_name) {
      errors.s_f_name = 'First Name is Required'
    }

    // last name 
    if (! /^[a-z A-Z0-9]+$/.test(values.s_l_name) || /^[ ]+$/.test(values.s_l_name)) {
      errors.s_l_name = 'Last Name is not valid'
    }
    if (!values.s_l_name) {
      errors.s_l_name = 'Last Name is Required'
    }


    // mobile number
    if (values.s_m_number.length < 10) {
      errors.s_m_number = "Please enter Minimum 10 digit"
    }
    if (!values.s_m_number) {
      errors.s_m_number = "Number is required"
    }

    //address
    if (!values.s_address || /^[ ]+$/.test(values.s_address)) {
      errors.s_address = 'Please fill Address correctly'
    }

    //city
    if (! /^[a-z A-Z0-9]+$/.test(values.s_city) || /^[ ]+$/.test(values.s_city)) {
      errors.s_city = 'City Name is not valid'
    }

    if (!values.s_city) {
      errors.s_city = 'Please Enter City name'
    }

    //country
    if (!values.s_country) {
      errors.s_country = 'Please select Country'
    }

    //state
    if (!values.s_state) {
      errors.s_state = 'Please Select Your state'
    }

    //pincode
    if (!values.s_pincode) {
      errors.s_pincode = 'Please Enter your Postcode/Zip'
    }
    else if (values.s_pincode.length < 6) {
      errors.s_pincode = "Please enter Minimum 6 digit"
    }
    return errors;
  }
  const Api = "api/shippingEdit";
  const urlShip = baseUrl + Api + "/" + id;
  useEffect(() => {
    
       const getShippingDetails = async () => {
      const response = await axios.get(urlShip);
      if (response.data.status === true) {
        const shippingAddress2 = await response.data.datashipping;
        //console.log(shippingAddress2)
        setFormValues(shippingAddress2);
        setLoading(false);
      }
      else {
        setLoading(true);
      }
    };
    getShippingDetails();
  }, [id,urlShip]);


  return (

    <div>
      <>
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
                      <li className="breadcrumb-item active" aria-current="page">Update Shipping Address</li>
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
                    <h2 className="tabcontent-title">Your Addresses</h2>

                    <div className="myaccount-info-wrapper">
                      <div className="addnewaddform">
                        {loading ? (
                          <p>loading...</p>
                        )
                          : (
                            <>
                              <div className="myaccount-info-wrapper">

                                <div className="row">

                                  <div className="col-lg-6">
                                    <div className="billing-info mb-20">
                                      <label>
                                        First Name<span className="text-red">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        name="s_f_name"
                                        value={formValues.s_f_name}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                      />
                                      <span className="error_msg text-red">{formErrors.s_f_name}</span>
                                    </div>
                                  </div>

                                  <div className="col-lg-6">
                                    <div className="billing-info mb-20">
                                      <label>
                                        Last Name<span className="text-red">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        name="s_l_name"
                                        value={formValues.s_l_name}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                      />
                                      <span className="error_msg text-red">{formErrors.s_l_name}</span>
                                    </div>
                                  </div>

                                  <div className="col-lg-12">
                                    <div className="billing-info mb-20">
                                      <label>Mobile Number<span className="text-red">*</span></label>
                                      <input
                                        type="text"
                                        maxLength="10"
                                        minLength="10"
                                        className="billing-address"
                                        placeholder="Mobile Number"
                                        name="s_m_number"
                                        value={formValues.s_m_number}
                                        onChange={handleChange}
                                        onKeyPress={(event) => {
                                          if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                          }
                                        }}
                                      />
                                      <span className="error_msg text-red">{formErrors.s_m_number}</span>
                                    </div>
                                  </div>

                                  <div className="col-lg-12">
                                    <div className="billing-info mb-20">
                                      <label>Address<span className="text-red">*</span></label>
                                      <input
                                        className="billing-address"
                                        placeholder="House Number & Street Name"
                                        type="text"
                                        name="s_address"
                                        value={formValues.s_address}
                                        onChange={handleChange}
                                      />
                                      <span className="error_msg text-red">{formErrors.s_address}</span>
                                    </div>
                                  </div>

                                  <div className="col-lg-5 col-md-5">
                                    <div className="billing-info mb-10">
                                      <label> Apartment, suite, etc.</label>
                                      <input
                                        placeholder="Apartment, suite, unit etc."
                                        type="text"
                                        name="s_location_area"
                                        value={formValues.s_location_area}
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
                                        name="s_landmark_name"
                                        value={formValues.s_landmark_name}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-lg-3 col-md-3">
                                    <div className="billing-info mb-20">
                                      <label>
                                        City<span className="text-red">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        name="s_city"
                                        value={formValues.s_city}
                                        onChange={handleChange}
                                        placeholder="City Name"
                                      />
                                      <span className="error_msg text-red">{formErrors.s_city}</span>
                                    </div>
                                  </div>

                                  <div className="col-lg-5 col-md-5">
                                    <div className="billing-select mb-20">
                                      <label>Country<span className="text-red">*</span></label>
                                      <select
                                        name="s_country"
                                        value={formValues.s_country}
                                        onChange={handleChange}
                                      >
                                        <option value='' key='2'>Select Country</option>
                                        <option value='India' key='4'>India</option>
                                      </select>
                                      <span className="error_msg text-red">{formErrors.s_country}</span>
                                    </div>
                                  </div>

                                  <div className="col-lg-4 col-md-4">
                                    <div className="billing-select mb-20">
                                      <label>
                                        State<span className="text-red">*</span>
                                      </label>
                                      <select
                                        name="s_state"
                                        value={formValues.s_state}
                                        onChange={handleChange}
                                      >
                                        <option value="">Select State</option>
                                        {statesList.map((Rowstate, indkey) => (
                                          <option key={indkey} value={Rowstate.sub_name}>
                                            {Rowstate.sub_name}
                                          </option>
                                        ))}
                                      </select>
                                      <span className="error_msg text-red">{formErrors.s_state}</span>
                                    </div>
                                  </div>

                                  <div className="col-lg-3 col-md-3">
                                    <div className="billing-info mb-20">
                                      <label>
                                        Postcode / ZIP
                                        <span className="text-red">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        maxLength="6"
                                        name="s_pincode"
                                        value={formValues.s_pincode}
                                        onChange={handleChange}
                                        onKeyPress={(event) => {
                                          if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                          }
                                        }}
                                        placeholder="PIN Code"
                                      />
                                      <span className="error_msg text-red">{formErrors.s_pincode}</span>
                                    </div>
                                  </div>
                                  <div className="col-lg-12">
                                    <div className="billing-info mb-20">
                                      <div className="custom-form-check">
                                        <input
                                          type="checkbox"
                                          id="ter_con"
                                          name="default_as"
                                          value={formValues.default_as}
                                          onChange={handleChecked}
                                        />
                                        <label htmlFor="ter_con"></label>
                                        <span className="text-red">{formErrors.default_as}</span>
                                        <span>Set as Default Address</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="billing-back-btn">
                                  <div className="billing-btn">
                                    <button type="submit" onClick={handleSubmit}>Update</button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default React.memo(UpdateShipping);
