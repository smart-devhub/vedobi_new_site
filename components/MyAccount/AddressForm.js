import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { token } from '../../utils/global';
import { PostData } from "../../utils/apiRequestHandler";
import statesList from '../../data/stateList';
import { useToasts } from 'react-toast-notifications';


function AddressForm() {
  const {addToast} = useToasts();
  
  const { user } = useSelector((state) => state.products);
  // const [checked, setChecked] = useState(true);

  const initialValues = {
    s_f_name: "",
    s_l_name: "",
    s_m_number: "",
    v_address: "",
    location_area: "",
    landmark_name: "",
    city_name: "",
    country: "",
    v_state: "",
    v_pincode: "",
    default_as: "0"
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setFormValues({ ...formValues, [name]: checked });
    console.log(checked)
  }

  const handleChange = (e) => {
    const { name, value } = e.target // take name and value from input in destructring
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true)
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let DataFrom = new FormData();
      DataFrom.append("s_f_name", formValues.s_f_name);
      DataFrom.append("s_l_name", formValues.s_l_name);
      DataFrom.append("s_m_number", formValues.s_m_number);
      DataFrom.append("v_address", formValues.v_address);
      DataFrom.append("location_area", formValues.location_area);
      DataFrom.append("landmark_name", formValues.landmark_name);
      DataFrom.append("city_name", formValues.city_name);
      DataFrom.append("country", formValues.country);
      DataFrom.append("v_state", formValues.v_state);
      DataFrom.append("v_pincode", formValues.v_pincode);
      DataFrom.append("user_id", user.id);
      DataFrom.append("token", token);
      DataFrom.append("default_as", formValues.default_as);


      PostData("api/shippingAddressAdd", DataFrom).then((response) => {
        if (response.status === true) {
          addToast('Data Updated Successfully', { appearance: 'success', autoDismiss: true });
          setIsSubmit();
          setFormValues(initialValues);
          window.location.reload();
        }
        else {
          addToast(response.message, { appearance: 'warning', autoDismiss: true });
        }
      });
    }
  }, [formErrors, formValues]);


  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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
    if (!values.v_address || /^[ ]+$/.test(values.v_address)) {
      errors.v_address = 'Please fill Address correctly'
    }

    //city
    if (! /^[a-z A-Z0-9]+$/.test(values.city_name) || /^[ ]+$/.test(values.city_name)) {
      errors.city_name = 'City Name is not valid'
    }

    if (!values.city_name) {
      errors.city_name = 'Please Enter City name'
    }

    //country
    if (!values.country) {
      errors.country = 'Please select Country'
    }

    //state
    if (!values.v_state) {
      errors.v_state = 'Please Select Your state'
    }

    //pincode
    if (!values.v_pincode) {
      errors.v_pincode = 'Please Enter your Postcode/Zip'
    }
    else if (values.v_pincode.length < 6) {
      errors.v_pincode = "Please enter Minimum 6 digit"
    }
    return errors;
  }



  return (
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
              name="v_address"
              value={formValues.v_address}
              onChange={handleChange}
            />
            <span className="error_msg text-red">{formErrors.v_address}</span>
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
          <div className="billing-info mb-20">
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
            <span className="error_msg text-red">{formErrors.city_name}</span>
          </div>
        </div>
        <div className="col-lg-5 col-md-5">
          <div className="billing-select mb-20">
            <label>Country<span className="text-red">*</span></label>
            <select
              name="country"
              value={formValues.country}
              onChange={handleChange}
            >
              <option value='' key='2'>Select Country</option>
              <option value='India' key='4'>India</option>
            </select>
            <span className="error_msg text-red">{formErrors.country}</span>
          </div>
        </div>

        <div className="col-lg-4 col-md-4">
          <div className="billing-select mb-20">
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
            <span className="error_msg text-red">{formErrors.v_state}</span>
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
            <span className="error_msg text-red">{formErrors.v_pincode}</span>
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
          <button type="submit" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(AddressForm);