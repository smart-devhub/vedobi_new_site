import React, {useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Spinner from "react-bootstrap/Spinner";
import {
  addToCart,
  fetchGift,
  fetchUpsell,
  RecentVeiwProduct,
  trackEvent,
} from "../../redux/products/products_actions";
import ReactGA from "react-ga";
import PlaceholderImg from "../../assets/images/demo/placeholder.webp";
import ProductNotify from "../ProductNotify/productNotify";
import Stars from "../Stars/Stars";
const Product = ({ product, isUpsellProduct = false, parentUpsellId = "" }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const { upsellProducts, cart } = useSelector((state) => state.products);
  isUpsellProduct = upsellProducts?.some((u) => u.pid === product.pid);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  let stockQty = product.stock_qty;
  const handleAddToCart = (product) => {
    const ev = {
      category: "Cart",
      action: "Add to Cart",
      track: "Add to Cart",
    };
    setBtnLoading(true);
    ReactGA.event(ev);
    const catPresent = cart.find(
      (cartdat) => cartdat.qty && cartdat.pid === product.pid
    );

    if (catPresent === undefined) {
      dispatch(trackEvent(ev, window.location.href));
      dispatch(
        addToCart(product.pid, addToast, "", isUpsellProduct, parentUpsellId)
      );
      setTimeout(() => {
        setBtnLoading(false);
      }, 500);
    } else {
      if (product.stock_qty > catPresent.qty) {
        dispatch(trackEvent(ev, window.location.href));
        dispatch(
          addToCart(product.pid, addToast, "", isUpsellProduct, parentUpsellId)
        );
        setTimeout(() => {
          setBtnLoading(false);
        }, 500);
      } else {
        addToast("Item not in stock", {
          appearance: "error",
          autoDismiss: true,
        });
        setTimeout(() => {
          setBtnLoading(false);
        }, 500);
      }
    }

    if (
      product.hasOwnProperty("gift_pack") &&
      product.gift_pack !== null &&
      product.gift_pack !== ""
    ) {
      dispatch(fetchGift(product.gift_pack)).then((res) => {
        if (res.status) {
          if (product.stock_qty > catPresent?.qty || !catPresent?.qty) {
            dispatch(addToCart(res.giftPid));
          }
        }
      });
    }

    if (product?.upsell === "Yes") {
      dispatch(fetchUpsell(product.pid));
    }
  };

  const handleRecentView = (product) => {
    dispatch(RecentVeiwProduct(product.pid));

    dispatch({
      type: "OPEN_UPSELL_MODAL",
      modalState: false,
    });

    if (isUpsellProduct) {
      dispatch({
        type: "ACTIVE_UPSELL_PRODUCT",
        payload: product,
      });
    } else {
      dispatch({
        type: "ACTIVE_UPSELL_PRODUCT",
        payload: "",
      });
    }
  };

  return (
    <>
      <div className="product-wrap mb-25">
        {loading ? (
          <img
            src={PlaceholderImg}
            alt="Placeholder"
            className="img-fluid img-loading"
            height="300"
            width="100%"
          />
        ) : (
          <div className="product-img">
            {product.SubcategoryUrl !== undefined &&
            product.SubcategoryUrl !== null &&
            product.SubcategoryUrl !== "" ? (
              <Link
                className="link-img"
                to={`/product/${product.categoryName}/${product.SubcategoryUrl}/${product.product_url}/${product.pid}`}
                onClick={() => handleRecentView(product)}
              >
                <img
                  className="default-img img-fluid"
                  srcSet={`${product.product_cover_image_mobile} 576w, ${product.product_cover_image} 1000w`}
                  src={product.product_cover_image}
                  alt={product.p_name}
                  sizes="(max-width: 600px) 576px, 1000px"
                  height="300"
                  width="100%"
                  loading="lazy"
                />

                {/* <img
                  className="hover-img img-fluid"
                  srcSet={`${product.product_cover_image2_mobile} 576w, ${product.product_cover_image2} 1000w`}
                  src={product.product_cover_image2}
                  alt={product.p_name}
                  sizes="(max-width: 600px) 576px, 1000px"
                  height="300"
                  width="100%"
                  loading="lazy"
                /> */}
              </Link>
            ) : (
              <Link
                className="link-img"
                to={`/product/${product.categoryName}/${product.product_url}/${product.pid}`}
                onClick={() => handleRecentView(product)}
              >
                <img
                  className="default-img img-fluid"
                  srcSet={`${product.product_cover_image_mobile} 576w, ${product.product_cover_image} 1000w`}
                  src={product.product_cover_image}
                  alt={product.p_name}
                  sizes="(max-width: 600px) 576px, 1000px"
                  height="300"
                  width="100%"
                  loading="lazy"
                />

                {/* <img
                  className="hover-img img-fluid"
                  srcSet={`${product.product_cover_image2_mobile} 576w, ${product.product_cover_image2} 1000w`}
                  src={product.product_cover_image2}
                  alt={product.p_name}
                  sizes="(max-width: 600px) 576px, 1000px"
                  height="300"
                  width="100%"
                  loading="lazy"
                /> */}
              </Link>
            )}

            <div className="product-img-badges">
              {product.percentage > "0" ? (
                <span className="red">{product.percentage}% OFF</span>
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        <div className="product-content text-center">
          <h3>
            {product.SubcategoryUrl !== undefined &&
            product.SubcategoryUrl !== null &&
            product.SubcategoryUrl !== "" ? (
              <Link
                to={`/product/${product.categoryName}/${product.SubcategoryUrl}/${product.product_url}/${product.pid}`}
                onClick={() => handleRecentView(product)}
              >
                {product.p_name}
              </Link>
            ) : (
              <Link
                to={`/product/${product.categoryName}/${product.product_url}/${product.pid}`}
                onClick={() => handleRecentView(product)}
              >
                {product.p_name}
              </Link>
            )}
          </h3>

          <div className="product-price">
            <span className="sell-price">
              <i className="fa fa-rupee" />
              {product.p_price}
            </span>
            {product.percentage > 0 ? (
              <span className="old">
                <i className="fa fa-rupee" />
                {product.old_price}
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="prod-review-ration-bar ">
            <Stars className="product-rating" stars={product.star} />

            <span className="ttl-rev-rat-count text-muted">
            {product.review_count > 0 ? product.review_count : 0} Reviews
            </span>
          </div>

          
        </div>
        <div className="product-action">
          <div className="pro-same-action pro-cart">
            {stockQty > "0" ? (
              <>
                {btnloading ? (
                  <button className="btn" type="button" disabled>
                    <Spinner
                      size="sm"
                      animation="border"
                      className
                      role="status"
                    ></Spinner>
                  </button>
                ) : (
                  <>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => handleAddToCart(product)}
                    >
                      <i className="pe-7s-cart"></i> Add to cart
                    </button>
                  </>
                )}
              </>
            ) : (
              <button
                type="button"
                className="btn btn-notify"
                onClick={() => {
                  handleShow(true);
                }}
              >
                Notify me
              </button>
            )}
          </div>
        </div>
      </div>

      <Suspense fallback={<>...</>}>
        <ProductNotify
          product={product}
          show={show}
          handleClose={handleClose}
        />
      </Suspense>
    </>
  );
};

export default Product;
