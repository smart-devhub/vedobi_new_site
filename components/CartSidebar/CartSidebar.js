import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdRemoveCircle } from "react-icons/md";
import { BiPlus, BiMinus } from "react-icons/bi";
import { CgCloseO } from "react-icons/cg";
import { formatPrice } from "../../utils/formatPrice";
import { useToasts } from "react-toast-notifications";
import { closeSideCart } from "../../redux/sidebar/sidebar_actions";
import {
  removeFromCart,
  decreaseItem,
  increaseItem,
  cartItemStock,
  trackEvent,
} from "../../redux/products/products_actions";
import cartEmptyImg from "../../assets/images/cart-empty.jpg";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const { cart } = useSelector((state) => state.products);
  const [visible, setVisible] = useState(true);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const { addToast } = useToasts();
  //const { sideCartOpen } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {

    let price = 0;
    cart.forEach((item) => {
      price += item.qty * item.p_price;
    });

    setTotalPrice(price);
  }, [cart, totalPrice, setTotalPrice]);

  return (
    <div>
      <div className="cart-sidebar__heading">
        <p className="cart-sidebar__title">your cart</p>
        <span className="cart-sidebar__close">
          <CgCloseO onClick={onClose} />
        </span>
      </div>
      <div className="cart-sidebar__content">
        {cart.length > 0 ? (
          cart.map((item, key) => {
            return (
              <div key={key} className="cart-sidebar__products">
                <div className="cart-sidebar__product-image-container">
                  <img
                    className="cart-sidebar__product-image"
                    src={item.product_cover_image}
                    alt="product"
                  />
                </div>

                <div className="cart-sidebar__product-info">
                  <p className="cart-sidebar__product-name">{item.p_name}</p>
                  <div className="cart-sidebar__qty-bar">
                    <span className="cart-sidebar__qty-plus">
                      <button
                        onClick={() =>
                          dispatch(decreaseItem(item.pid, addToast))
                        }
                      >
                        <BiMinus />
                      </button>
                    </span>
                    <span className="cart-sidebar__qty-current">
                      {item.qty}{" "}
                    </span>
                    <span className="cart-sidebar__qty-minus">
                      <button
                        onClick={() =>
                          dispatch(increaseItem(item.pid, addToast))
                        }
                        disabled={
                          item !== undefined &&
                          item.qty &&
                          item.qty >= cartItemStock(item.stock_qty)
                        }
                      >
                        <BiPlus />
                      </button>
                    </span>
                  </div>
                  <div className="cart-sidebar__prices">
                    <p className="cart-sidebar__product-qty mb-0">
                      {item.qty} X
                    </p>
                    <p className="cart-sidebar__product-price">
                      {formatPrice(item.p_price)}
                    </p>
                    <p className="cart-sidebar__product-price-total">
                      {formatPrice(item.p_price * item.qty)}
                    </p>
                  </div>
                </div>
                <p className="cart-sidebar__delete">
                  <MdRemoveCircle
                    onClick={() => dispatch(removeFromCart(item.pid))}
                  />
                </p>
              </div>
            );
          })
        ) : (
          <div className="cart-sidebar__empty-image-container">
            <img
              className="cart-sidebar__empty-image"
              src={cartEmptyImg}
              alt="cart is empty"
            />
          </div>
        )}
      </div>
      <div className="cart-sidebar__footer">
        <div className="cart-sidebar__footer-total-price-bar">
          cart total:{" "}
          <span className="cart-sidebar__footer-total-price">
            {formatPrice(totalPrice)}{" "}
          </span>
        </div>
        <div className="cart-sidebar__footer-action">
          <Link to="/cart" className="btn cart-sidebar__btn-1" onClick={() => dispatch(trackEvent({
            category: 'Go to cart',
            action: 'TO CART',
            track: "Cart"
          }, window.location.pathname
          ))}>
            go to Cart
          </Link>
          <Link to="/cart" className="btn cart-sidebar__btn-2" onClick={() => dispatch(trackEvent({
            category: 'Proceed to cart',
            action: 'TO CHECKOUT',
            track: "Checkout"
          }, window.location.pathname
          ))}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CartSidebar);
