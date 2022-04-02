import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swiper from "react-id-swiper";
import { Link } from "react-router-dom";
import Stars from "../Stars/Stars";
import { useToasts } from "react-toast-notifications";
import ReactGA from "react-ga";
import {
  fetchProducts,
  addToCart,
  fetchGift,
  RecentVeiwProduct,
  fetchUpsell,
  trackEvent,
} from "../../redux/products/products_actions";
import PlaceholderImg from "../../assets/images/demo/placeholder.webp";

const TopDiscountProductsSlider = ({
  product,
  isUpsellProduct = false,
  parentUpsellId = "",
}) => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [loading] = useState(false);

  const { upsellProducts, cart } = useSelector((state) => state.products);

  isUpsellProduct = upsellProducts?.some((u) => u.pid === product.pid);

  useEffect(() => {
    // setLoading(true);

    dispatch(fetchProducts());

    // setTimeout(() => {
    //   setLoading(false)
    // }, 700)
  }, [dispatch]);

  // Fetch Products from products action file
  // Filter Top Discount Products From Products
  const topDiscounted = products?.filter(
    (product) => product?.top_discounted === "topdiscounted"
  );

  //console.log('>>>>>>>', products)

  // Handle Cart for Add Product Gift Item
  const handleAddToCart = (product) => {
    const ev = {
      category: "Cart",
      action: "Add to cart",
      track: "Cart",
    };

    ReactGA.event(ev);

    const catPresent = cart.find(
      (cartdat) => cartdat.qty && cartdat.pid === product.pid
    );

    if (catPresent === undefined) {
      dispatch(trackEvent(ev, window.location.href));
      dispatch(
        addToCart(product.pid, addToast, "", isUpsellProduct, parentUpsellId)
      );
    } else {
      if (product.stock_qty > catPresent.qty) {
        dispatch(trackEvent(ev, window.location.href));
        dispatch(
          addToCart(product.pid, addToast, "", isUpsellProduct, parentUpsellId)
        );
      } else {
        addToast("Item not in stock", {
          appearance: "error",
          autoDismiss: true,
        });
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

  // Slider Settings
  const settings = {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      640: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 2,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

  return (
    <>
      <section className="top-discount-product py-2 my-2 bg-white">
        <div className="container">
          <div className="section-title text-center mb-30">
            <h2>Top Discounts</h2>
          </div>
          <div className="product-grid">
            <div className="container">
              <div className="row">
                <Swiper {...settings}>
                  {topDiscounted.map((product, key) => {
                    return (
                      <div
                        className="col-xl-3 col-md-6 col-lg-4 col-sm-6 col-6 swiper-slide"
                        key={key}
                      >
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
                                  <span className="red">
                                    {product.percentage}% OFF
                                  </span>
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
                              <span>
                                <i className="fa fa-rupee" />
                                {product.p_price}
                              </span>
                              {product.old_price > 1 ? (
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
                              {product.stock_qty > "0" ? (
                                <button
                                  className="btn"
                                  type="button"
                                  onClick={() => handleAddToCart(product)}
                                >
                                  <i className="pe-7s-cart"></i> Add to cart
                                </button>
                              ) : (
                                <button className="btn btn-notify text-white disabled">
                                  Sold Out
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(TopDiscountProductsSlider);
