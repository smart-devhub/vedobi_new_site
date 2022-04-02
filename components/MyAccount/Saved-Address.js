import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { useSelector } from "react-redux";
import { baseUrl } from "../../utils/global";
import { Link } from "react-router-dom";
import SidebarMain from "./SidebarMain";
import axios from "axios";
import { token } from "../../utils/global";
import { Collapse } from "react-bootstrap";
import AddressForm from "./AddressForm";
import { useToasts } from "react-toast-notifications";
import LayoutOne from "../../LayoutOne";

function SavedAddress() {
  const { addToast } = useToasts();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);
  const [ShippingAddressDetails, setShippingAddressDetails] = useState([]);

  const Api = "api/UserShipping";
  const url = baseUrl + Api;

  useEffect(() => {
    const getShipping = async () => {
      const response = await axios.post(url, {
        user_id: user.id,
        token: token,
      });
      if (response.data.status === true) {
        const ShipAddress = await response.data.ShippingData;
        setShippingAddressDetails(ShipAddress);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        setLoading(true);
      }
    };
    getShipping();
  }, [url, user.id]);

  const delApi = "api/deleteShip";
  const urlDel = baseUrl + delApi;
  const handleDelete = async (id) => {
    const response = await axios.get(urlDel + "/" + id);
    if (response.data.status === true) {
      addToast("Deleted Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      window.location.reload();
    } else {
      addToast(response.message, { appearance: "error", autoDismiss: true });
    }
  };

  if (loading) {
    return (
      <section className="section-loading">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <>
      <LayoutOne>
        <MetaTags>
          <title>
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
                      <li className="breadcrumb-item">
                        <Link to="/my-account">My Account</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Saved Address
                      </li>
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
                      <div className="address-button">
                        <button
                          onClick={() => setOpen(!open)}
                          aria-controls=".addnewaddform"
                          aria-expanded={open}
                          className="btn-add-address"
                        >
                          Add New Address
                        </button>
                      </div>
                      <Collapse in={open}>
                        <div className="addnewaddform">
                          <AddressForm />
                        </div>
                      </Collapse>
                      {ShippingAddressDetails.length > 0 ? (
                        <div className="address-lists">
                          {ShippingAddressDetails.map((UserShipping, index) => {
                            return (
                              <div className="card card-address" key={index}>
                                <div className="entries-info text-center">
                                  <h4>
                                    {UserShipping.s_f_name}{" "}
                                    {UserShipping.s_l_name}
                                  </h4>
                                  <p>{UserShipping.s_m_number} </p>
                                  <p>{UserShipping.s_address} </p>
                                  <p>{UserShipping.s_location_area}</p>
                                  <p>{UserShipping.s_pincode}</p>
                                  <p>{UserShipping.state}</p>
                                  <p>{UserShipping.s_city}</p>
                                </div>
                                <div className="entries-edit-delete">
                                  <Link
                                    to={`/my-account/update-shipping/${UserShipping.id}`}
                                  >
                                    <i
                                      className="fa fa-pencil-square-o"
                                      aria-hidden="true"
                                    ></i>
                                  </Link>
                                  {UserShipping.default_as === "1" ? (
                                    ""
                                  ) : (
                                    <i
                                      className="fa fa-trash-o"
                                      aria-hidden="true"
                                      onClick={() =>
                                        handleDelete(UserShipping.id)
                                      }
                                    ></i>
                                  )}
                                </div>
                                {UserShipping.default_as === "1" ? (
                                  <div className="badge badge-default">
                                    Default
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
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

export default React.memo(SavedAddress);
