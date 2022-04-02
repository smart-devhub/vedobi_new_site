import React from "react";
import "./ContactInfo.scss";

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <h4
        className="contact-info__title
      contact-info__title--main mb-5"
      >
        Contact Us
      </h4>
      {/* <div className="contact-info-align">
        <div>
          <i className="fa fa-map-marker"></i>
        </div>
        <div>
          <h4 className="contact-info__title mb-2"> OFFICE</h4>
          <p className="contact-info__text mb-4">
            Mansarover Garden
            New Delhi, Delhi 110015
          </p>
        </div>
      </div> */}
      <div className="contact-info-align">
        <div className="contact-icons">
          <i className="fa fa-phone" aria-hidden="true"></i>
        </div>
        <div>
          <h4 className="contact-info__title mb-2">GOT QUESTIONS? CALL US</h4>
          <p>Monday-Saturday (10:00 Am - 07:00 Pm)</p>
          <p className="contact-info__text">
            <a href="tel:18001210053">1800-121-0053 (Toll Free)</a>
          </p>
          <p className="contact-info__text">
            <a href="tel:01142455300">011 - 42455300</a>
          </p>
          <p className="contact-info__text">
            <a href="tel:01142455400">011 - 42455400</a>
          </p>
        </div>
      </div>

      <div className="contact-info-align">
        <div className="contact-icons">
          <i className="fa fa-headphones" aria-hidden="true"></i>
        </div>
        <div>
          <h4 className="contact-info__title mb-2">support</h4>
          <p className="contact-info__text mb-4">
            <a href="mailto:care@vedobi.com">care@vedobi.com</a>
            <br />
          </p>
        </div>
      </div>
      <div className="footer-list social-list">
        <ul>
          <li>
            <a
              className="facebook"
              href="https://www.facebook.com/MyVedobi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a
              className="twitter"
              href="https://twitter.com/MVedobi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a
              className="instagram"
              href="https://www.instagram.com/myvedobi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-instagram"></i>
            </a>
          </li>
          <li>
            <a
              className="pinterest"
              href="https://in.pinterest.com/MyVedobi/_created/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-pinterest-p"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(ContactInfo);
