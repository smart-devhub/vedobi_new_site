import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSubCategory, trackEvent } from "../../redux/products/products_actions";
import { animateScroll } from "react-scroll";
import { PostData } from '../../utils/apiRequestHandler';
import FlipkartLogo from '../../assets/images/Outsider-sellers/flipkart.jpg'
import AmazonLogo from '../../assets/images/Outsider-sellers/amazon.jpg'
// import MyntraLogo from '../../assets/images/Outsider-sellers/myntra.jpg'
// import SnapdealLogo from '../../assets/images/Outsider-sellers/snapdeal.jpg'

const FooterOne = () => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);
  const [showElement, setShowElement] = useState(false);
  const dispatch = useDispatch();

  const OnClickAmazon = () => {
    const ev = {
      category: 'Page',
      action: 'Clicked Amazon',
      track: "Page"
    }

    dispatch(trackEvent(ev, window.location.href));
  }

  const OnClickFlipkart = () => {
    const ev = {
      category: 'Page',
      action: 'Clicked Flipkart',
      track: "Page"
    }

    dispatch(trackEvent(ev, window.location.href));
  }

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  useEffect(() => {
    dispatch(fetchSubCategory());
  }, [dispatch]);

  const { SubCategory } = useSelector((state) => state.products);



  const initialValues = { email: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let DataFrom = new FormData();
    DataFrom.append("email", formValues.email);
    if (formValues.email && regex.test(formValues.email)) {
      PostData("api/NewsLetters", DataFrom).then((response) => {
        console.log(response);
        if (response.status === true) {
          console.log(formValues.email);
          setFormValues(initialValues);
          setShowElement(true);
          showEffect();
        } else {
          console.log("Message: " + response.message);
        }
      });
    }

    setIsSubmit(true);
  };

  const showEffect = () => {
    setTimeout(function () {
      setShowElement(false);
    }, 2000);
  };


  const validate = (values) => {
    const errors = {};
    const success = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //email
    if (!values.email) {
      errors.email = 'Email is Required'
    }
    if (!regex.test(values.email) && values.email) {
      errors.email = 'Email is not valid'
    }
    if (values.email) {
      success.email = "Submit Successfully"
    }
    return errors;
  }


  return (
    <footer className="footer-area pt-50 pb-50"
    >
      <div className="container">
        <div className="row">
          <div
            className="col-lg-2 col-sm-6">
            <div className="footer-widget mb-30">
              <div className="footer-title">
                <h3>INFORMATIONS</h3>
              </div>
              <div className="footer-list ml-10 mt-30">
                <ul>
                  <li>
                    <Link to="/about">About us</Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs/ayurveda-book">
                      Ayurveda Care
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/career">
                      Career
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="footer-widget mb-30">
              <div className="footer-title ">
                <h3>QUICK LINKS</h3>
              </div>
              <div className="footer-list ml-10 mt-30">
                <ul>
                  <li>
                    <Link to="/cancellation-and-returns-policy">Cancellation & Returns</Link>
                  </li>
                  <li>
                    <Link to="/intellectual-property-rights">Intellectual Property Rights</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/disclaimer">Disclaimer</Link>
                  </li>
                  <li>
                    <Link to="/shipping-policy">Shipping Policy</Link>
                  </li>
                  <li>
                    <a href="https://pickrr.com/tracking/#/" rel="noopener noreferrer" target="_blank">Order Track</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="col-lg-3 col-sm-6">
            {/* footer newsletter */}
            <div
              className="footer-widget mb-30">
              <div className="footer-title">
                <h3>SUBSCRIBE</h3>
              </div>
              <div className="subscribe-style">
                <p>Get E-mail updates about our latest shop and special offers.</p>
                {/* subscribe email */}
                <div className="mc-form">
                  <div>
                    <input
                      id="mc-form-email"
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="Enter your email address..."
                      autoComplete="off"
                    />
                  </div>
                  <div className="clear">
                    <button className="btn btn-newsletter" onClick={handleSubmit}>
                      SUBSCRIBE
                    </button>
                  </div>
                </div>
                <small className="text-danger">{formErrors.email}</small>
                {Object.keys(formErrors).length === 0 && isSubmit && showElement ? (
                  <div className="text-success" style={{ opacity: showElement ? 1 : 0 }}>Submitted Successfully</div>
                ) : (''
                )}
              </div>

              <div className="footer-title mt-30">
                <h3>SHOP FROM</h3>
              </div>

              <div className="outside-platforms mt-30">
                <ul>
                  <li>
                    <a href="https://www.amazon.in/s?k=Vedobi&ref=bl_dp_s_web_0" target="_blank" rel="noopener noreferrer" onClick={OnClickAmazon} title="amazon-url" className="amazon-icon">
                      <img src={AmazonLogo} className="img-fluid" alt="Amazon Icon" height="60px" width="60px" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.flipkart.com/search?q=vedobi%20&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off" onClick={OnClickFlipkart} target="_blank" rel="noopener noreferrer" title="Flipkart-url" className="flipkart-icon">
                      <img src={FlipkartLogo} className="img-fluid" alt="Flipkart Icon" height="60px" width="60px" />
                    </a>
                  </li>
                  {/* <li>
                    <a href="/" target="_blank" rel="noopener noreferrer" title="Myntra-url" className="myntra-icon">
                      <img src={MyntraLogo} className="img-fluid" alt="Myntra Icon" height="60px" width="60px" />
                    </a>
                  </li> */}
                  {/* <li>
                    <a href="/" target="_blank" rel="noopener noreferrer" title="Snapdeal-url" className="snapdeal-icon">
                      <img src={SnapdealLogo} className="img-fluid" alt="Snapdeal Icon" height="60px" width="60px" />
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6" >
            <div className="footer-widget mb-30">
              <div className="footer-title">
                <h3>CONTACT US</h3>
              </div>

              <div className="contact-box mt-30">
                <div className="contact-icon">
                  <i className="fa fa-phone"></i>
                </div>
                <div className="Contact-details">
                  <p className="need-help-text">GOT QUESTIONS? CALL US</p>
                  <p className="timings">Monday-Friday (10:00 Am - 07:00 Pm)</p>

                  <div className="contact-numbers">
                    <a href="tel:18001210053" title="Toll Free Number">1800-121-0053</a><span className="text-sm-light">(Toll Free)</span> <br />
                    <a href="tel:01142455300" title="Toll Free Number">011 - 42455300 </a><br />
                    <a href="tel:011 - 42455400" title="Toll Free Number">011 - 42455400</a>
                  </div>
                </div>
              </div>
              <div className="footer-list social-list">
                <ul>
                  <li>
                    <a className="facebook"
                      href="https://www.facebook.com/MyVedobi/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a className="twitter"
                      href="https://twitter.com/MVedobi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a className="instagram"
                      href="https://www.instagram.com/myvedobi/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a className="pinterest"
                      href="https://in.pinterest.com/MyVedobi/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-pinterest-p"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>



        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="secondary-footer-bar footer-widget">

              <div className="footer-category-list">

              {/* <div className="footer-title mb-10">
                  <h3>CHOOSE FROM</h3>
                </div> */}

                {SubCategory.map((SubCategoryRow, index) => {
                  return (
                    <Link to={`/collections/${SubCategoryRow.categoryName}/${SubCategoryRow.SubcategoryUrl}`} key={index}>{SubCategoryRow.subcategory}</Link>
                  );
                })}

              </div>
            </div>

          </div>
        </div>
      </div>

      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  );
};


export default FooterOne;
