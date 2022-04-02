import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAdModal } from "../../redux/products/products_actions";
import axios from "axios";
import { baseUrl } from "../../utils/global";
import { useToasts } from "react-toast-notifications";
import OfferPopupImg from "../../assets/images/offer-popup/offer-gift.png";

const AdModal = () => {
  const {addToast} = useToasts();
  const { openAdModal } = useSelector((state) => state.products);
  const [coupon, setCoupon] = useState("");
  const [show, setShow] = useState(false);

  const copyHandle = () => {
    var code = document.getElementById("offerCode");
    code.select();
    document.execCommand("Copy");

    addToast('Coupon Code Copied', {appearance: 'success', autoDismiss: true});

    setTimeout(() => {
      setShow(!show);
    }, 1000);
  };

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpenAdModal(false));
  };

  useEffect(() => {
    async function getCoupon() {
      if (openAdModal) {
        const result = await axios.post(baseUrl + "api/CouponCode");
        if (result.data.success) {
          setCoupon(result.data);
        }
      }
    }
    getCoupon();
  }, [openAdModal]);
  return (
    <Modal
      show={openAdModal}
      onHide={handleClose}
      className="exit-modal"
      keyboard={false}
    >
      <Modal.Body>
        <button className="closeButton" onClick={handleClose}>
          <i className="fa fa-times"></i>
        </button>
        
        <div className="offer-img">
          <img
            src={OfferPopupImg}
            alt="offer Popup"
            className="img-fluid"
          />
        </div>
        <div className="offers-content">
          <h1 className="offers-heading">Discount Available</h1>
          <h3 className="coupon-discount">
            Coupon discount : {coupon?.data?.coupan_discount}
            {coupon?.data?.coupan_type}
          </h3>
          <div className="coupon_code-box">
            <input
              type="text"
              className="code"
              defaultValue={coupon?.data?.couponcode}
              id="offerCode"
            />
            <button className="btn btn-coupon-code" onClick={copyHandle}>
              <i className="fa fa-copy"></i>
            </button>
          </div>

          <h3 className="coupon-discount-text">
            Minimum order value : {coupon?.data?.minimum_order_value}
          </h3>
        </div>

        <p className="modal-close-btn" onClick={handleClose}>No Thanks</p>
      </Modal.Body>
    </Modal>
  );
};

export default AdModal;
