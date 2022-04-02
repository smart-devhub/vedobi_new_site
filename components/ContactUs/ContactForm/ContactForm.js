import React, { useState } from "react";
import { useToasts } from 'react-toast-notifications';
import { token } from "../../../utils/global";
import { PostData } from "../../../utils/apiRequestHandler";

const ContactForm = () => {
  const {addToast} = useToasts();
  const initialValues = { name: "", email: "", phone: "", MSG: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target; // take name and value from input in destructring
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorCheck = validate(formValues);
    setFormErrors(errorCheck);
    setIsSubmit(true);
    if (Object.keys(errorCheck).length === 0 && isSubmit) {
      let DataFrom = new FormData();
      DataFrom.append("name", formValues.name);
      DataFrom.append("email", formValues.email);
      DataFrom.append("phone", formValues.phone);
      DataFrom.append("MSG", formValues.MSG);
      DataFrom.append("token", token);

      PostData("api/ContactFrom", DataFrom).then((response) => {
        if (response.status === true) {
          addToast('Form Submit Successfully', { appearance: 'success' });
          console.log(formValues);
          setFormValues(initialValues);
          setIsSubmit();
        } else {
          addToast({ message: response.message }, { appearance: 'warning' });
        }
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    //first name
    if (!/^[a-z A-Z0-9]+$/.test(values.name) || /^[ ]+$/.test(values.name)) {
      errors.name = "Name is not valid";
    }

    if (!values.name) {
      errors.name = "Name is Required";
    }

    //email
    if (!values.email) {
      errors.email = "Email is Rerquired";
    }
    if (!regex.test(values.email) && values.email) {
      errors.email = "Email is not valid";
    }

    if (!values.phone) {
      errors.phone = "Number is Required";
    } else if (values.phone.length < 10) {
      errors.phone = "Please enter Minimum 10 digit";
    }

    //message
    if (!values.MSG) {
      errors.MSG = "Message is Required";
    }
    return errors;
  };

  return (
    <div className="contact-form">
      <h4 className="contact-form__title">Let`s Connect</h4>
      <p className="contact-form__text">
        Your email addres will not be published. Required fields are marked *
      </p>
      <form className="contact-form__form">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="billing-info mb-10">
              <label>
                Name<span className="text-red">&nbsp;*</span>
              </label>
              <input
                className="contact-form__input-field"
                type="text"
                name="name"
                placeholder="Your Name*"
                value={formValues.name}
                onChange={handleChange}
              />
              <span className="error_msg text-red">{formErrors.name}</span>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="billing-info mb-10">
              <label>
                Mobile<span className="text-red">&nbsp;*</span>
              </label>
              <input
                className="contact-form__input-field"
                type="text"
                maxLength="10"
                minLength="10"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                placeholder="Phone No."
              />
              <span className="error_msg text-red">{formErrors.phone}</span>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="billing-info mb-10">
              <label>
                Email<span className="text-red">&nbsp;*</span>
              </label>
              <input
                className="contact-form__input-field"
                type="text"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <span className="error_msg text-red">{formErrors.email}</span>
            </div>
          </div>
        </div>
        <div className="contact-form__message">
          <textarea
            rows="10"
            name="MSG"
            className="contact-form__message-field"
            placeholder="Your message*"
            onChange={handleChange}
          ></textarea>
          <small className="text-red">{formErrors.MSG}</small>
        </div>
        <button type="submit" className="btn btn-submit" onClick={handleSubmit}>
          Send
        </button>
      </form>
    </div>
  );
};

export default React.memo(ContactForm);
