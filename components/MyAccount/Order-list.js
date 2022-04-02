import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MetaTags from "react-meta-tags";
import SidebarMain from "./SidebarMain";
import { HashLink as Link } from "react-router-hash-link";
import axios from "axios";
import { token, baseUrl } from "../../utils/global";
import Modal from "react-bootstrap/Modal";
import LayoutOne from "../../LayoutOne";
function OrderList() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const { user } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [massge, setmassge] = useState("");
  const [ordersDetails, setOrdersDetails] = useState([]);
  const [orderspaymentDetails, setOrderspaymentDetails] = useState([]);
  const [orderId, setOrderId] = useState("Shopping Order ID");

   const Api = "api/user-order-list";
  const url = baseUrl + Api;
  const invoice = "invoice/";
  const invoiceUrl = baseUrl + invoice;

  // for order list
  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.post(url, {
        user_id: user.id,
        token: token,
      });
      if (response.data.status === true) {
        const newOrders = await response.data.OrderData;
        setOrders(newOrders);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(true);
      }
    };
    getOrders();
  }, [url, user.id]);

  // for cancel orders
  const handleCancelOrder = (shopping_order_id) => {
    const Api2 = "api/CencalOrder";
    const url2 = baseUrl + Api2;
    axios
      .post(url2, {
        user_id: user.id,
        token: token,
        shopping_order_id: shopping_order_id,
      })
      .then((response) => {
        const status = response.data.status;
        if (status === true) {
          setmassge(response.data.message);
          window.location.reload();
          //history.push("/my-account/order-list");
        } else {
          setmassge(response.data.message);
        }
      });
  };

  // for order details
  const ApiDetails = "api/orderDetails";
  const urldetails = baseUrl + ApiDetails;
  const showModal = async (shopping_order_id) => {
    const response = await axios.post(urldetails, {
      user_id: user.id,
      token: token,
      shopping_order_id: shopping_order_id,
    });
    if (response.data.status === true) {
      const ordersId = shopping_order_id;
      setShow(true);
      // console.log(ordersId)
      setOrderId(ordersId);
      const newOrders = await response.data.OrderData.OrderData;
      const paymentOrders = await response.data.OrderData.payment;
      setOrdersDetails(newOrders);
      setOrderspaymentDetails(paymentOrders);
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  // const steps = [
  //   {
  //     label: 'Placed',
  //     date: `12-09-2021`,
  //   },
  //   {
  //     label: 'Processing',
  //     date: `12-09-2021`,
  //   },
  //   {
  //     label: 'Shipped',
  //     date: `12-09-2021`,
  //   },
  //   {
  //     label: 'Dispatch',
  //     date: `12-09-2021`,
  //   },
  //   {
  //     label: 'Out For Delivery',
  //     date: `12-09-2021`,
  //   },
  //   {
  //     label: 'Delivered',
  //     date: `12-09-2021`,
  //   },
  // ];

  return (
    <>
      <LayoutOne>
        <MetaTags>
          <title>
            {" "}
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
                        Order History
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
                  <h2 className="tabcontent-title">Order History List</h2>
                  {massge && (
                    <>
                      <small className="text-red">{massge}</small>
                      <br />
                    </>
                  )}

                  <div className="myaccount-info-wrapper">
                    {loading ? (
                      <p>Loading... your orders</p>
                    ) : (
                      <>
                        {orders.length > 0 ? (
                          <div className="table-responsive">
                            <table className="table table-bordered table-hover table-sm">
                              <thead>
                                <tr>
                                  <th>Order ID</th>
                                  <th>Date/Time</th>
                                  <th>Tracking No.</th>
                                  <th>Shipping Status</th>
                                  <th>Status</th>
                                  <th>Amount</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.map((userData, index) => {
                                  //const fullDate = new Date(userData.date_pay);
                                  // console.log("FULL DATE ====== ",fullDate)
                                  //var date = fullDate.toString().split(" ");
                                  // console.log("DATE ====== ",date)
                                  //const hour = parseInt(date[4].substring(0, 2));
                                  // console.log("HOUR ====== ",hour)
                                  //const time = hour > 12 ? true : false;
                                  return (
                                    <tr key={index}>
                                      <td>{userData.shopping_order_id}</td>
                                      {/* <td>
                                      {date[2]} {date[1]} {date[3]}, {date[0]}{" "}
                                      at{" "}
                                      {time
                                        ? `${hour - 12}:${date[4].substring(
                                            3,
                                            5
                                          )} pm`
                                        : `${hour}:${date[4].substring(
                                            3,
                                            5
                                          )} am`}
                                    </td> */}
                                      <td>{userData.date_pay}</td>
                                      <td className="track-order-data">
                                        {userData.awb_number !== "" ||
                                        userData.awb_number !== null ? (
                                          <p
                                            className="window_open"
                                            onClick={() =>
                                              window.open(
                                                `https://pickrr.com/tracking/#/?tracking_id=${userData.awb_number}`,
                                                "_blank",
                                                "toolbar=no, location=no, directories=no,width=500,height=600,scrollbars=no,resizable=no,top=150,left=300"
                                              )
                                            }
                                          >
                                            {userData.awb_number}
                                            {userData.awb_number === "" ||
                                            userData.awb_number === null ? (
                                              ""
                                            ) : (
                                              <span className="btn btn-warning">
                                                <i className="fa fa-compass" ara-hidden="true" />
                                              </span>
                                            )}
                                          </p>
                                        ) : (
                                          ""
                                        )}
                                      </td>
                                      <td>{userData.shipping_status}</td>
                                      <td>{userData.status}</td>
                                      <td>Rs. {userData.amount}</td>
                                      <td className="action-list">
                                        {userData.created_by !== "shopify" ? (
                                          <span>
                                            <button
                                              onClick={() =>
                                                showModal(
                                                  userData.shopping_order_id
                                                )
                                              }
                                              className="btn btn-primary rounded-pill"
                                            >
                                              View Order
                                            </button>
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                        {userData.invoice_pdf !== "" &&
                                        userData.invoice_pdf !== null ? (
                                          <span>
                                            <a
                                              className="btn btn-success rounded-pill"
                                              href={
                                                invoiceUrl +
                                                userData.invoice_pdf
                                              }
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              Download Invoice
                                            </a>
                                          </span>
                                        ) : (
                                          ""
                                        )}

                                        {userData.created_by !== "shopify" &&
                                        (userData.shipping_status ===
                                          "Placed" ||
                                          userData.shipping_status ===
                                            "Shipped") ? (
                                          <span>
                                            {userData.cancellation_req !==
                                              "Yes" &&
                                            userData.cancellation_req !== "" ? (
                                              <button
                                                  className="btn btn-danger rounded-pill"
                                                  onClick={() =>
                                                    handleCancelOrder(
                                                      userData.shopping_order_id
                                                    )
                                                  }
                                                >
                                                  Cancel Request
                                                </button>
                                            ) : (
                                              <span className="btn btn-danger rounded-pill disabled">
                                                  Request Submitted
                                                </span>
                                            )}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          "No Order Found!"
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleShow}
          className="order-details-modal"
          size="sm"
        >
          <Modal.Body>
            <button className="modal-close-btn" onClick={handleShow}>
              <i className="fa fa-times" />
            </button>
            <div className="single-account-wrapper">
              <h2 className="tabcontent-title">Order #{orderId} Details</h2>
              <p className="tabcontent-subtitle">
                Was placed on <span>{orderspaymentDetails.date_pay}</span> and
                is currently <span>On hold now</span>.
              </p>
              <div className="myaccount-info-wrapper">
                <div className="order_modal">
                  {ordersDetails.map((OrderData, index) => {
                    return (
                      <div
                        className="order_modal_details flex-column flex-md-row"
                        key={index}
                      >
                        <div className="product_details-image">
                          <div className="order_modal_details__product-image mx-auto">
                            <img
                              src={OrderData.product_cover_image}
                              className="img-fluid"
                              alt="Big Gallery"
                            />
                          </div>
                        </div>
                        <div className="product_details-content">
                          <h4 className="order_modal_details__product-name">
                            {OrderData.gift_type === "Yes" ? (
                              <p>{OrderData.p_name}</p>
                            ) : (
                              <Link
                                to={`/product/${OrderData.categoryName}/${OrderData.SubcategoryUrl}/${OrderData.product_url}/${OrderData.pid}`}
                              >
                                {" "}
                                {OrderData.p_name}
                              </Link>
                            )}
                          </h4>
                          <p className="order_modal_details__product-quantity">
                            Qty: {OrderData.quantity}
                          </p>
                          <p className="order_modal_details__product-price">
                            <i className="fa fa-rupee icon" aria-hidden="true" />: {OrderData.p_v_price}
                          </p>
                          {OrderData.gift_type === "Yes" ? (
                            ""
                          ) : (
                            <Link
                              to={`/product/${OrderData.categoryName}/${OrderData.SubcategoryUrl}/${OrderData.product_url}/${OrderData.pid}#productReviews`}
                              className="btn btn-success order_modal_details__product-"
                            >
                              Write Review
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div className="order_modal_total">
                    <div className="order_modal_total__subtotal">
                      <p>Sub Total </p>
                      <p className="order_modal_total__subtotal-price">
                      <i className="fa fa-rupee icon" aria-hidden="true" />
                        {orderspaymentDetails.subtotal}
                      </p>
                    </div>
                    <div className="order_modal_total__subtotal">
                      <p>GST ({orderspaymentDetails.taxtype})</p>
                      <p className="order_modal_total__subtotal-price">
                      <i className="fa fa-rupee icon" aria-hidden="true" />
                        {orderspaymentDetails.total_gst_value}
                      </p>
                    </div>
                    {orderspaymentDetails.coupon_discount !== "" &&
                    orderspaymentDetails.coupon_discount !== null &&
                    orderspaymentDetails.coupon_discount > 0 ? (
                      <div className="order_modal_total__subtotal">
                        <p>Coupon Discount</p>
                        <p className="order_modal_total__subtotal-price">
                        <i className="fa fa-rupee icon" aria-hidden="true" />{" "}
                          {orderspaymentDetails.coupon_discount}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}

                    {orderspaymentDetails.firstsignup_discount !== "" &&
                    orderspaymentDetails.firstsignup_discount !== null &&
                    orderspaymentDetails.firstsignup_discount > 0 ? (
                      <div className="order_modal_total__subtotal">
                        <p>First Signup Discount</p>
                        <p className="order_modal_total__subtotal-price">
                        <i className="fa fa-rupee icon" aria-hidden="true" />{" "}
                          {orderspaymentDetails.firstsignup_discount}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}

                    {orderspaymentDetails.additional_discount !== "" &&
                    orderspaymentDetails.additional_discount !== null &&
                    orderspaymentDetails.additional_discount > 0 ? (
                      <div className="order_modal_total__subtotal">
                        <p>Prepaid Discount</p>
                        <p className="order_modal_total__subtotal-price">
                        <i className="fa fa-rupee icon" aria-hidden="true" />{" "}
                          {orderspaymentDetails.additional_discount}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="order_modal_total__subtotal payvalue">
                      <p className="total">Total Pay Value</p>
                      <p className="order_modal_total__subtotal-price total">
                      <i className="fa fa-rupee icon" aria-hidden="true" />
                        {orderspaymentDetails.amount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Box sx={{ width: "100%" }}>
              <Stepper activeStep={1} alternativeLabel>
                {steps.map((step, label) => (
                  <Step key={label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      <Typography>{step.date}</Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box> */}
          </Modal.Body>
        </Modal>
      </LayoutOne>
    </>
  );
}

export default React.memo(OrderList);
