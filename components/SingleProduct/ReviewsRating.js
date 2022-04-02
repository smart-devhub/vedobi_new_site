import React, { useState } from "react";
import { useParams } from "react-router";
import Collapse from "react-bootstrap/Collapse";
import { PostData } from "../..//utils/apiRequestHandler";
import { useSelector} from "react-redux";


function ReviewsRating({ submitForm }) {
  const { user } = useSelector((state) => state.products);

  const initialValues = { name: user.v_f_name, email: user.email, message: "", select: "", review_file: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target // take name and value from input in destructring
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues)
  }

  const filehandleChange = (e) => {
    const { name, files } = e.target // take name and value from input in destructring
    setFormValues({ ...formValues, [name]: files });
    console.log(files)
  }

  
  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    let DataFrom = new FormData();
    DataFrom.append("name", formValues.name);
    DataFrom.append("email", formValues.email);
    DataFrom.append("review", formValues.message);
    DataFrom.append("pid", pid);
    DataFrom.append("user_id", user.id);
    DataFrom.append("rating", formValues.select);
    DataFrom.append("review_file", formValues.review_file[0]);
    console.log(formValues.review_file);

    if (formValues.name && formValues.email && formValues.message && formValues.select) {
      PostData("api/addReviews", DataFrom).then((response) => {
        console.log(response);
        if (response.status === true) {
          console.log(formValues);
          console.log("---->", response)
          resetInput();
        } else {
          console.log("Message: " + response.message);
        }
      });
    }

    setIsSubmit(true);
    // setFormValues(initialValues);
  };

  const resetInput = () => {
    setFormValues(initialValues);
    setTimeout(() => {
      setOpen(false)
    }, 1000);

  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    //first name
    if (! /^[a-z A-Z0-9]+$/.test(values.name) || /^[ ]+$/.test(values.name)) {
      errors.name = 'Name is not valid'
    }

    if (!values.name) {
      errors.name = 'Name is Required'
    }

    //email
    if (!values.email) {
      errors.email = 'Email is Required'
    }
    if (!regex.test(values.email) && values.email) {
      errors.email = 'Email is not valid'
    }

    //message
    if (!values.message) {
      errors.message = 'Message is Required'
    }

    //rating
    if (!values.select) {
      errors.select = 'Please select Rating'
    }
    return errors;
  }



  const [open, setOpen] = useState(false);
  const { pid } = useParams();

  return (
    <div className="ratting-form-wrapper">
      <div className="sticky-form-wrapper">
        <div className="review-tgl-btn">
          <button
            className="btn btn-review"
            onClick={() => setOpen(!open)}
            aria-controls="reviewratingform"
            aria-expanded={open}
          >
            Write a Review <i className="fa fa-commenting-o" />
          </button>
        </div>

        <Collapse in={open}>
          <div id="reviewratingform">
            <div className="ratting-form">
              <div className="star-box">
                <span className="rating-title">
                  {Object.keys(formErrors).length === 0 && isSubmit ?
                    (
                      <div>Form Submitted Successfully</div>
                    ) : (
                      <div>Your Rating:</div>
                    )}
                </span>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="rating-form-style mb-10">
                    <select name="select" onChange={handleChange} value={formValues.select} required>
                      <option value="0">Select Rating</option>
                      <option value="5">5 Star</option>
                      <option value="4">4 Star</option>
                      <option value="3">3 Star</option>
                      <option value="2">2 Star</option>
                      <option value="1">1 Star</option>
                    </select>
                    <small className="text-red">{formErrors.select}</small>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="rating-form-style mb-10">
                    <input
                      className='form-control'
                      type='text'
                      name='name'
                      placeholder='Your Name*'
                      value={formValues.name}
                      onChange={handleChange}
                    />
                    <small className="text-red">{formErrors.name}</small>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="rating-form-style mb-10">
                    <input
                      className='form-control'
                      type='email'
                      name='email'
                      placeholder='Enter your email'
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    {formErrors.email && <small className="text-red">{formErrors.email}</small>}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="rating-form-style form-submit">
                    <textarea id="review" placeholder="Message" onChange={handleChange} name="message" value={formValues.message} />
                    {formErrors.message && <small className="text-red">{formErrors.message}</small>}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="rating-form-style mb-10">
                    <input
                      placeholder="file"
                      // value={formValues.review_file}
                      type="file"
                      name="review_file"
                      onChange={filehandleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-12 text-center">
                  <button className="btn btn-form-submit"
                    onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default React.memo(ReviewsRating);
