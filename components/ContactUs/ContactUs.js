import React from "react";
import ContactInfo from './ContactInfo/ContactInfo';
import ContactForm from './ContactForm/ContactForm';

const ContactUs = () => {
  return (
    <section className="contact py-5 bg-white mb-2">
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-3">
            <ContactInfo />
          </div>
          <div className="col-10 col-md-9">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactUs);
