import React from "react";
import { Link } from "react-router-dom";
import LayoutOne from "../../LayoutOne";
import SidebarMain from "./SidebarMain";

function HelpDesk() {
  return (
    <>
      <LayoutOne>
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
                        Helpdesk
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-account-area pt-30 pb-50 my-2 bg-white">
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
                    <h2 className="tabcontent-title">Helpdesk</h2>
                    <p className="tabcontent-subtitle">
                      Got questions for us? Reach out to us anytime through the
                      given mediums and we're here to answer your queries.
                    </p>
                    <div className="helpdesk__box">
                      <div className="card">
                        <div className="card-title">
                          <div className="card-icon">
                            <i
                              className="fa fa-envelope-o"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <h5 className="card-name">Email Us</h5>
                        </div>
                        <div className="card-info">
                          <a
                            href="mailto:care@vedobi.com"
                            className="card-link"
                          >
                            care@vedobi.com
                          </a>
                          <p className="info-details">
                            Mail us and we'll revert back to your query ASAP
                          </p>
                        </div>
                        <a
                          className="btn btn-support"
                          href="mailto:care@vedobi.com"
                        >
                          Mail Now
                        </a>
                      </div>
                      <div className="card">
                        <div className="card-title">
                          <div className="card-icon">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                          </div>
                          <h5 className="card-name">Call Us</h5>
                        </div>
                        <div className="card-info">
                          <a href="tel:18001210053" className="card-link">
                            1800-121-0053 (Toll Free)
                          </a>
                          <p className="info-details">
                            We're here to answer all your queries. Give us a
                            call now.
                          </p>
                        </div>
                        <a className="btn btn-support" href="tel:18001210053">
                          Call Now
                        </a>
                      </div>
                      <div className="card">
                        <div className="card-title">
                          <div className="card-icon">
                            <i
                              className="fa fa-whatsapp"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <h5 className="card-name">Let's Chat</h5>
                        </div>
                        <div className="card-info">
                          <a
                            href="https://wa.me/919832535353?text=https://www.vedobi.com/%0D%0A%0D%0AI have some questions. Can you help?"
                            target="_blank"
                            className="card-link"
                            rel="noopener noreferrer"
                          >
                            How can we Help You
                          </a>
                          <p className="info-details">
                            Leave us a message and we'll get back to you at the
                            earliest.
                          </p>
                        </div>
                        <a
                          className="btn btn-support"
                          href="https://wa.me/919832535353?text=https://www.vedobi.com/%0D%0A%0D%0AI have some questions. Can you help?"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Chat Now
                        </a>
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
}

export default React.memo(HelpDesk);
