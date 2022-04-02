import React, { useState, useEffect } from "react";
// import { Drawer, Dropdown, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { useToasts } from "react-toast-notifications";
import NavMenu from "../header/NavMenu";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import Logo from "../header/Logo";

import {
  removeFromCart,
  decreaseItem,
  increaseItem,
  cartItemStock,
  searchProducts,
} from "../../redux/products/products_actions";
import cartEmptyImg from "../../assets/images/emptycart.png";
import "./Navbar.scss";
import Topbar from "../Topbar/Topbar";
import { toggleSidebar } from "../../redux/sidebar/sidebar_actions";

function Navbar(props) {
  //const user = getUser();
  const { user } = useSelector((state) => state.products);

  const [searchShow, setsearchShow] = useState(false);
  const { cart, loggedin } = useSelector((state) => state.products);
  let history = useHistory();
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(searchProducts(name, history));
  };

  const showSearchBar = () => {
    setsearchShow(!searchShow);
  }

  const handleLogout = () => {
    dispatch({ type: "logout", user: {} });
    localStorage.removeItem("vedobi_login");
    history.push("/login");
  };
  //const [visible, setVisible] = useState(false);
  const handleShow = () => {
    if (history.location.pathname === "/payment") {
      history.push("/cart");
    } else {
      setShow(true);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  // const onClose = () => {
  //   setVisible(false);
  // };

  const [cartCount, setCartCount] = useState(0);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(".sidebar__content");
    const offcanvasMobileMenuOverlay = document.querySelector(".sidebar");
    var body = document.getElementsByTagName("BODY")[0];
    offcanvasMobileMenu.classList.toggle("sidebar__content--show");
    offcanvasMobileMenuOverlay.classList.toggle("sidebar--show");
    body.classList.toggle("overlayToggle");
    dispatch(toggleSidebar(true));
  };

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    let price = 0;
    cart.forEach((item) => {
      price += item.qty * item.p_price;
    });

    setTotalPrice(price);

    setCartCount(count);
  }, [cart, cartCount, setTotalPrice]);

  const isItemGift = (item) => {
    if (item?.gift_type !== undefined && item.gift_type === "Yes") {
      return true;
    } else {
      return false;
    }
  };
  const test = (ob) => {
    let ids = cart.filter((x) => +x.gift_pack).map((x) => +x.gift_pack);
    return ids.some((x) => x === ob.pid);
  };
  

  return (
    <header className="site-header">
      <div className="offer-bar-top">
        <div className="marquee">
          <marquee width="100%" direction="left">
            <i className="fa fa-flash me-1" />
            Get 10% Instant Discount on your 1st Order + 5% EXTRA (on all
            prepaid orders) upto Rs. 100 with Free Shipping & COD Available.
          </marquee>
        </div>
      </div>
      <Topbar />

      <div className="middle-bar">
        {/* bootstrap container class */}

        <div className="container">
          {/* navbar */}
          <nav className="site-header__navbar">
            {/* navbar logo & links */}
            <div className="site-header__navbar-nav">
              <div className="site-header__logo-container">
                {/* navbar logo */}
                <Logo logoClass="logo" />
              </div>
              <NavMenu />
            </div>

            {/* navbar login icon & cart icon */}
            <div className="site-header__icons">
              <ul className="site-header__icons-list">
                <li className="site-header__icons-item">
                <button
                    className="site-header__icon"
                    onClick={() => setsearchShow(!searchShow)}
                    aria-controls="search-bar"
                    aria-expanded={searchShow}
                  >
                    <i className="fa fa-search"></i>
                    <span className="icon-title">Search</span>
                  </button>
                </li>

                {loggedin ? (
                  <li className="site-header__icons-item">
                    <Dropdown>
                      <Dropdown.Toggle
                        className="site-header__icon"
                        id="dropdown-basic"
                        as="span"
                      >
                        <span className="icon-group">
                          <i className="fa fa-user " />
                          <i className="fa fa-angle-down" />
                        </span>
                        <span className="icon-title">{user.v_f_name}</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu as="ul">
                        <Dropdown.Item as="li">
                          <Link to="/my-account">
                            <i className="fa fa-user" /> My Account
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item as="li">
                          <button onClick={handleLogout} className="mx-0">
                            <i className="fa fa-sign-out" /> Logout
                          </button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                ) : (
                  <li className="site-header__icons-item">
                    <Link
                      style={{ color: "#000" }}
                      to="/login"
                      className="site-header__icon"
                    >
                      <i className="fa fa-user" />
                      <span className="icon-title">Login</span>
                    </Link>
                  </li>
                )}

                <li className="site-header__icons-item">
                  <span
                    className="site-header__cart-toggle site-header__icon"
                    //onClick={showDrawer}
                    onClick={handleShow}
                  >
                    <i className="fa fa-shopping-bag site-header__icon" />
                    <span className="site-header__cart-count">
                      {cart?.length}
                    </span>
                    <span className="icon-title">Cart</span>
                  </span>
                </li>

                <li className="site-header__icons-item">
                  <span
                    className="site-header__toggle"
                    onClick={() => triggerMobileMenu()}
                  >
                    <i className="fa fa-bars" />
                    <span className="icon-title">Menu</span>
                  </span>
                </li>
              </ul>
            </div>
          </nav>

           {/* Search panel Start */}
   
          <div className={searchShow ? 'search-bar active' : 'search-bar'}>
           
            <div className="search-bar-area container">
              <form className="search" onSubmit={submitHandler}>
                <input
                  type="text"
                  name="q"
                  id="q"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Type to Search"
                />
                  <button
                    type="submit"
                    className="btn-search"
                    onClick={() => setsearchShow(!searchShow)}
                  >
                    Search
                  </button>
              </form>
            </div>
          </div>
          {/* Search panel End */}
        </div>
      </div>

      {/* SideBar Panel Start */}

      <Offcanvas
        className="cart-sidebar"
        placement="end"
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="cart-sidebar__heading">
            <p className="cart-sidebar__title">Cart Items</p>
            {/* <span className="cart-sidebar__close">
              <i className="fa fa-times-circle" onClick={handleClose } />
            </span> */}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="cart-sidebar__content">
          {cart.length > 0 ? (
            cart.map((product, key) => {
              return (
                <div key={key} className="cart-sidebar__products">
                  <div className="cart-sidebar__product-image-container">
                    {!test(product) ? (
                      <Link
                        to={`/product/${product.categoryName}/${product.SubcategoryUrl}/${product.product_url}/${product.pid}`}
                        onClick={handleClose}
                      >
                        <img
                          className="cart-sidebar__product-image"
                          src={product.product_cover_image}
                          alt="product"
                        />
                      </Link>
                    ) : (
                      <img
                        className="cart-sidebar__product-image img-fluid"
                        src={product.product_cover_image}
                        alt="product"
                      />
                    )}
                  </div>

                  <div className="cart-sidebar__product-info">
                    <p className="cart-sidebar__product-name">
                      {!test(product) ? (
                        <Link
                          to={`/product/${product.categoryName}/${product.SubcategoryUrl}/${product.product_url}/${product.pid}`}
                          onClick={handleClose}
                        >
                          {product.p_name}
                        </Link>
                      ) : (
                        <span>{product.p_name}</span>
                      )}
                    </p>
                    <div className="cart-sidebar__qty-bar">
                      <span className="cart-sidebar__qty-plus">
                        <button
                          disabled={isItemGift(product)}
                          onClick={() =>
                            dispatch(decreaseItem(product.pid, addToast))
                          }
                        >
                          <i className="fa fa-minus" />
                        </button>
                      </span>
                      <span className="cart-sidebar__qty-current">
                        {product.qty}{" "}
                      </span>
                      <span className="cart-sidebar__qty-minus">
                        <button
                          onClick={() =>
                            dispatch(increaseItem(product.pid, addToast))
                          }
                          disabled={
                            product.gift_type === "Yes"
                              ? true
                              : product !== undefined &&
                                product.qty &&
                                product.qty >= cartItemStock(product.stock_qty)
                          }
                        >
                          <i className="fa fa-plus" />
                        </button>
                      </span>
                    </div>
                    <div className="cart-sidebar__prices">
                      <p className="cart-sidebar__product-qty mb-0">
                        {product.qty} X
                      </p>
                      <p className="cart-sidebar__product-price">
                        {formatPrice(product.p_price)}
                      </p>
                      <p className="cart-sidebar__product-price-total">
                        {formatPrice(product.p_price * product.qty)}
                      </p>
                    </div>
                  </div>
                  {!test(product) && (
                    <>
                      <p className="cart-sidebar__delete">
                        <i
                          className="fa fa-minus-circle"
                          onClick={() => dispatch(removeFromCart(product.pid))}
                        />
                      </p>
                    </>
                  )}
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
        </Offcanvas.Body>

        {cart.length > 0 ? (
          <div className="cart-sidebar__footer">
            <div className="cart-sidebar__footer-total-price-bar">
              cart total:{" "}
              <span className="cart-sidebar__footer-total-price">
                {formatPrice(totalPrice)}{" "}
              </span>
            </div>
            <div className="cart-sidebar__footer-action">
              <Link
                to="/cart"
                className="btn cart-sidebar__btn-1"
                onClick={handleClose}
              >
                Go to Cart
              </Link>
              <Link
                to="/informations"
                className="btn cart-sidebar__btn-2"
                onClick={handleClose}
              >
                Proceed to Informations
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </Offcanvas>
    </header>
  );
}

export default Navbar;
