import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ReactHtmlParser from "react-html-parser";
import { PostData } from "../..//utils/apiRequestHandler";


const ProductNotify = ({ show, handleClose, product }) => {
 const initialValues = { name: "", email: "", phone_no: "" };
  const [modalValues, setModalValues] = useState(initialValues);
  const [modalErrors, setModalErrors] = useState({});
  const [modalSubmit, setModalSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalValues({ ...modalValues, [name]: value });
  }


  const handleSubmit = e => {
    e.preventDefault();
    setModalErrors(validate(modalValues));
    let DataFrom = new FormData();
    DataFrom.append("name", modalValues.name);
    DataFrom.append("email", modalValues.email);
    DataFrom.append("phone_no", modalValues.phone_no);
    DataFrom.append("pid", product.pid);
    
    if (modalValues.name && modalValues.email && modalValues.phone_no) {
            PostData("api/notifyme", DataFrom).then((response) => {
        if (response.status === true) {
          resetInput();
          time();
        } else {
          console.log(response.message);
        }
      });
    }

    setModalSubmit(true);

  }

  const time = () => {
    setTimeout(() => {
      handleClose();
      setModalSubmit(false);
    }, 1000);
  }




  const resetInput = () => {
    setModalValues(initialValues);
  }


  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (! /^[a-z A-Z0-9]+$/.test(values.name) || /^[ ]+$/.test(values.name)) {
      errors.name = 'Name is not valid'
    }
    if (!values.name) {
      errors.name = "Name is Required"
    }
    if (!values.email) {
      errors.email = "Email is Required"
    }
    if (!regex.test(values.email) && values.email) {
      errors.email = 'Email is not valid'
    }
    if (values.phone_no.length < 10) {
      errors.phone_no = "Please enter Minimum 10 digit"
    }
    if (!values.phone_no) {
      errors.phone_no = "Number is required"
    }
    return errors;
  }



  return (
    <React.Fragment>
      <Modal show={show} onHide={handleClose} className="prd_notify_me_modal" size="md">
        <Modal.Body>
          <button className="modal-close-btn" onClick={handleClose}>
            <i className="fa fa-times" />
          </button>

          <div className="product-cover-image">
            <img
              src={product.product_cover_image}
              alt={product.p_name}
              className="img-fluid" 
            />
          </div>

          <div className="product-inner-content">
            <h3 className="pro_name">{product.p_name}</h3>
            <div className="shrt-desc">{ReactHtmlParser(product.description)}</div>
            {Object.keys(modalErrors).length === 0 && modalSubmit ?
              (
                <p className="text-success">Form Submitted Successfully</p>
              ) : (
                ""
              )}
            <div className="notify-me-form">

              <div className="form-group mb-2">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={modalValues.name}
                  onChange={handleChange}
                />
                <small className="text-red">{modalErrors.name}</small>
              </div>
              <div className="form-group mb-2">
                <input
                  type="text"
                  name="email"
                  value={modalValues.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                />
                <small className="text-red">{modalErrors.email}</small>
              </div>
              <div className="form-group mb-2">
                <input
                  type="text"
                  name="phone_no"
                  maxLength="10"
                  onChange={handleChange}
                  value={modalValues.phone_no}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  placeholder="Enter Your Phone Number"
                />
                <small className="text-red">{modalErrors.phone_no}</small>
              </div>
              <button className="btn btn-notify" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ProductNotify;
