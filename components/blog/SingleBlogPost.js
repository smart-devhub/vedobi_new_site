import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { InlineShareButtons } from 'sharethis-reactjs';
import { PostData } from "../../utils/apiRequestHandler";
import { useToasts } from 'react-toast-notifications';
import Modal from "react-bootstrap/Modal";
import MetaTags from "react-meta-tags";
import { token } from '../../utils/global';
import drConsultation from '../../assets/images/dr-consultation.gif'

const SingleBlogPost = ({ SingleData }) => {
  const { addToast } = useToasts();

  //const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const initialValues = {
    f_name: "",
    l_name: "",
    m_number: "",
    email: "",
    problem: ""
  }


  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
  const  timer = loadBlog();
    return () => {
      // setShow(show); // This worked for modal popup 
      clearTimeout(timer);
    };
  }, []);


  const loadBlog = () => {
    return setTimeout(() => {
      setShow(true);
      // console.log('use log for blog');
    }, 20000);
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
      DataFrom.append("email", formValues.email);
      DataFrom.append("f_name", formValues.f_name);
      DataFrom.append("l_name", formValues.l_name);
      DataFrom.append("m_number", formValues.m_number);
      DataFrom.append("problem", formValues.problem);
      DataFrom.append("token", token);

      PostData("api/LeadConsultant", DataFrom).then((response) => {
        if (response.status === true) {
          addToast('Submit Successfully', { appearance: 'success' });
          setIsSubmit();
          resetInput();
        }
        else {
          addToast('please fill correctly', { appearance: 'warning' });
        }
      });
    }
  }, [formErrors, formValues, isSubmit]);


  const resetInput = () => {
    setTimeout(() => {
      setShow(false)
    }, 1000);
    setFormValues(initialValues);
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    //first name
    if (! /^[a-z A-Z0-9]+$/.test(values.f_name) || /^[ ]+$/.test(values.f_name)) {
      errors.f_name = 'First Name is not valid'
    }
    if (!values.f_name) {
      errors.f_name = 'First Name is Required'
    }

    // last name 
    if (! /^[a-z A-Z0-9]+$/.test(values.l_name) || /^[ ]+$/.test(values.l_name)) {
      errors.l_name = 'Last Name is not valid'
    }
    if (!values.l_name) {
      errors.l_name = 'Last Name is Required'
    }

    // email
    if (!regex.test(values.email) && values.email) {
      errors.email = 'Email is not valid'
    }

    if (!values.email) {
      errors.email = 'Email is required'
    }

    // number
    if (!values.m_number) {
      errors.m_number = 'Number is Required'
    }
    else if (values.m_number.length < 10) {
      errors.m_number = "Please enter Minimum 10 digit"
    }
    return errors;
  }


  // if (loading) {
  //     return (
  //       <div className="preloader-wrapper">
  //         <div className="preloader">
  //           <span></span>
  //           <span></span>
  //           <span></span>
  //         </div>
  //       </div>
  //     );
  //   }

  // return(
  //   <div> </div>
  // )
  return (
    <>
      <Modal show={show} onHide={handleShow} className="prd_notify_me_modal blog-post-modal" size="sm">
        <Modal.Body>
          <button className="modal-close-btn" onClick={handleShow}>
            <i className="fa fa-times" />
          </button>
          <div className="blog-content-modal">
            <div className="modal-heading">
              {Object.keys(formErrors).length === 0 && isSubmit ?
                (
                  <h3 className="text-success">Submitted Successfully</h3>
                ) : (
                  <h3>Get a Consultation</h3>
                )
              }
            </div>
            <div className="submit-consult-form">
              <img src={drConsultation} alt="Consultation" className="img-fluid" />
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <label>First Name<span className="text-red">*</span></label>
                  <input
                    type="text"
                    name="f_name"
                    value={formValues.f_name}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                  <span className="error_msg text-red">{formErrors.f_name}</span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <label>Last Name<span className="text-red">*</span></label>
                  <input
                    type="text"
                    name="l_name"
                    value={formValues.l_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                  <span className="error_msg text-red">{formErrors.l_name}</span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <label>Mobile Number<span className="text-red">*</span></label>
                  <input
                    type="text"
                    name="m_number"
                    maxLength="10"
                    value={formValues.m_number}
                    onChange={handleChange}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    placeholder="Phone No."
                  />
                  <span className="error_msg text-red">{formErrors.m_number}</span>
                </div>
                <div className="col-lg-6 col-md-6">
                  <label>Email<span className="text-red">*</span></label>
                  <input
                    type="text"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <span className="error_msg text-red">{formErrors.email}</span>
                </div>
                <div className="col-md-12">
                  <div className="rating-form-style form-submit">
                    <label>Your Problem</label>
                    <textarea id="problem" placeholder="Please Describe your Problem" onChange={handleChange} name="problem" value={formValues.problem} />
                    {formErrors.message && <small className="text-red">{formErrors.message}</small>}
                  </div>
                </div>
                <div className="col-md-12">
                <button className="btn btn-update" onClick={handleSubmit}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <MetaTags>
        <title> {SingleData.meta_title}</title>
        <meta name="description" content={SingleData.meta_description} />
        <meta
          name="keywords"
          content="Buy Online Ayurvedic Products, Online Herbal Products, Ayurvedic Products, Vedobi Ayurvedic Products, Vedobi Ayurvedic Hand Sanitizer, Vedobi Hand Fortune Sanitizer Liquid, Ayurvedic Immunity Booster, Vedobi Skin Care Products, Vedobi Herbal Body Care lotion, Cura Immunity Booster"
        />
      </MetaTags>

      <div className="blog-details-top">
        <div className="blog-details-img">
          <img
            alt={SingleData.title}
            src={SingleData.big_image}
          />
        </div>
        <div className="blog-details-content">
          <div className="blog-meta-2">
            <ul>
              <li>{SingleData.create_at}</li>

            </ul>
          </div>
          <h3>{SingleData.title}</h3>

          {ReactHtmlParser(SingleData.description)}


        </div>
      </div>

      <div className="tag-share">

        <div className="blog-share">
          <span>shares :</span>
          <div className="share-social">
            <InlineShareButtons
              config={{
                alignment: 'center',  // alignment of buttons (left, center, right)
                color: 'social',      // set the color of buttons (social, white)
                enabled: true,        // show/hide buttons (true, false)
                font_size: 12,        // font size for the buttons
                labels: 'cta',        // button labels (cta, counts, null)
                language: 'en',       // which language to use (see LANGUAGES)
                networks: [           // which networks to include (see SHARING NETWORKS)

                  'facebook',
                  'twitter',
                  'pinterest'
                ],
                padding: 12,          // padding within buttons (INTEGER)
                radius: 30,            // the corner radius on each button (INTEGER)
                show_total: true,
                size: 30,            // the size of each button (INTEGER)
              }}
            />
          </div>
        </div>
      </div>
      {/* <div className="next-previous-post">
        <Link to="/ayurveda-care/blog-details-standard">
          {" "}
          <i className="fa fa-angle-left" /> prev post
        </Link>
        <Link to="/ayurveda-care/blog-details-standard">
          next post <i className="fa fa-angle-right" />
        </Link>
      </div> */}
    </>
  );
};

export default React.memo(SingleBlogPost);
