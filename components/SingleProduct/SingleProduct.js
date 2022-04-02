import React, { useState, useEffect, Suspense, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  addToCart,
  fetchGift,
  fetchUpsell,
} from "../../redux/products/products_actions";
import ReactHtmlParser from "react-html-parser";
import BrandLogo from "../../components/brand-logo/BrandLogo";
import ReactGA from "react-ga";
import { Modal } from "react-bootstrap";
import YouTube from "react-youtube";

const ProductGalleryForAttr = React.lazy(() =>
  import("./ProductGalleryForAttr")
);
const SingleProductInfo = React.lazy(() =>
  import("./SingleProductInfo/SingleProductInfo")
);
const Chooseus = React.lazy(() => import("./whyChooseUs"));
const ProductBenefits = React.lazy(() => import("./ProductBenefits"));
const ProductIngredients = React.lazy(() => import("./ProductIngredients"));
const ProductFaq = React.lazy(() => import("./ProductFaq"));
const ProductTestimonial = React.lazy(() => import("./ProductTestimonial"));
const ProductReviews = React.lazy(() => import("./ProductReviews"));
const ProductVideos = React.lazy(() => import("./ProductVideos"));
const SimilarProductsSlider = React.lazy(() =>
  import("../../components/SimilarProductsSlider/SimilarProductsSlider")
);
const TopDiscountProductsSlider = React.lazy(() =>
  import("../../components/TopDiscountProductsSlider/TopDiscountProductsSlider")
);
const Certification = React.lazy(() =>
  import("../certification/certification")
);
const CourierPartners = React.lazy(() =>
  import("../CourierPartners/CourierPartners")
);
const ProductNotify = React.lazy(() =>
  import("../ProductNotify/productNotify")
);

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const SingleProduct = () => {
  const opts = {
    height: "auto",
    width: "100%",
  };

  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { hn } = useParams();
  const { SubcategoryName } = useParams();

  const [show, setShow] = useState(false);
  const [videoShow, setVideoShow] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [disableCartBtn, setDisableCartBtn] = useState(false);

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  const {
    upsellProducts,
    parentUpsellId,
    attrList,
    cart,
    activeUpsellProduct,
  } = useSelector((state) => state.products);

  const singleProduct = useSelector((state) => state.products.singleProduct);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let history = useHistory();

  useEffect(() => {
    if (activeUpsellProduct) {
      if (
        activeUpsellProduct &&
        activeUpsellProduct.pid === singleProduct.pid
      ) {
        const isPresent = cart.some((c) => c.pid === parentUpsellId);
        setDisableCartBtn(!isPresent);
      } else {
        setDisableCartBtn(false);
      }
    } else {
      setDisableCartBtn(false);
    }
  }, [cart, activeUpsellProduct, singleProduct, parentUpsellId]);

  // console.log('render')

  // Handle Cart Action Start
  const handleAddToCart = (product) => {
    const ev = {
      category: "Cart",
      action: "Add to Cart",
      track: "Add to Cart",
    };

    ReactGA.event(ev);
    if (selectedAttribute) {
      dispatch({
        type: "ADD_ATTRIBUTES_TO_PRODUCT_LIST",
        payload: attrList,
      });
      dispatch(addToCart(selectedAttribute.pid, addToast, selectedAttribute));
    } else if (
      upsellProducts.length > 0 &&
      upsellProducts.some((up) => up.pid === product.pid)
    ) {
      const isUpSellProduct = upsellProducts.find((x) => x.pid === product.pid);

      if (isUpSellProduct) {
        dispatch({
          type: "ADD_UPSELL_TO_PRODUCT_LIST",
          payload: upsellProducts,
        });
        dispatch(addToCart(product.pid, addToast, "", true, parentUpsellId));
      } else {
        dispatch(addToCart(product.pid, addToast));
      }
    } else if (
      product.hasOwnProperty("gift_pack") &&
      product.gift_pack !== null &&
      product.gift_pack !== ""
    ) {
      dispatch(addToCart(product.pid, addToast));

      dispatch(fetchGift(product.gift_pack)).then((res) => {
        if (res.status) {
          dispatch(addToCart(res.giftPid));
        }
      });
    } else if (product.hasOwnProperty("upsell") && product?.upsell === "Yes") {
      dispatch(fetchUpsell(product.pid));
      dispatch(addToCart(product.pid, addToast));
    } else {
      dispatch(addToCart(product.pid, addToast));
    }
  };
  //Handle Cart Action End

  // Handle Cart Action Start
  const handleBuyNow = (product) => {
    const ev = {
      category: "Buy Now",
      action: "Buy Now",
      track: "Buy Now",
    };

    ReactGA.event(ev);
    dispatch(addToCart(product.pid, addToast));
    if (product.gift_pack !== null) {
      dispatch(fetchGift(product.gift_pack)).then((res) => {
        if (res.status) {
          dispatch(addToCart(res.giftPid));
        }
      });
    }
    history.push("/informations");
  };

  const handleVideo = (id) => {
    setSelectedVideo(id);
    setVideoShow(true);
  };
  //Handle Cart Action End

  if (!singleProduct) {
    return null;
  }

  const {
    pid,
    youtube,
    brand_name,
    p_name,
    p_price,
    old_price,
    p_code,
    percentage,
    category_name,
    star,
    stock_qty,
    product_url,
    what_we_offer,
    description,
    description_hindi,
    short_description,
    short_description_hindi,
    use_direction,
    use_direction_hindi,
    safety_instructions,
    safety_instructions_en,
    how_to_care,
    how_to_care_en,
    meta_title,
    meta_description,
    meta_keywords,
    categoryName,
    subcategory,
    SubcategoryUrl,
    review_count,
  } = singleProduct;

  const handleAttribute = (attributes) => {
    if (attributes.pid !== selectedAttribute.pid) {
      setSelectedAttribute(attributes);
    } else {
      setSelectedAttribute("");
    }
  };

  return (
    <>
      <div className="breadcrumb-area bg-white">
        {/* <PsudoTopbar /> */}
        <div className="container">
          <div className="breadcrumb-content">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    <i className="fa fa-home home--icon" />
                  </Link>
                </li>
                {SubcategoryName !== undefined &&
                SubcategoryName !== null &&
                SubcategoryName !== "" ? (
                  <>
                    <li className="breadcrumb-item">
                      <Link to={`/collections/${categoryName}`}>
                        {category_name}
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link
                        to={`/collections/${categoryName}/${SubcategoryName}`}
                      >
                        {subcategory}
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="breadcrumb-item">
                    <Link to={`/collections/${categoryName}`}>
                      {category_name}
                    </Link>
                  </li>
                )}
                <li className="breadcrumb-item active" aria-current="page">
                  {p_name}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <section className="pro-details-wrap-top py-2 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="sticky-gallery">
                {/* Gallery Start */}
                <ProductGalleryForAttr
                  attributeData={selectedAttribute}
                  percentage={percentage}
                />
                {/* Gallery End */}

                <div className="row row-5">
                  <div className="offset-xl-2 col-xl-10">
                    {/* Pro Quantity Bar Start */}
                    <div className="pro-details-quality mt-3">
                      {stock_qty > 0 ? (
                        <>
                          <div className="pro-details-cart">
                            <button
                              onClick={() => handleAddToCart(singleProduct)}
                              className="w-100"
                              disabled={disableCartBtn}
                            >
                              Add To Cart
                            </button>
                          </div>
                          <div className="pro-details-buy-now">
                            <button
                              className="w-100"
                              onClick={() => handleBuyNow(singleProduct)}
                              disabled={disableCartBtn}
                            >
                              Buy Now
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="pro-details-notify">
                          <button
                            className="w-100"
                            onClick={() => {
                              handleShow(true);
                            }}
                          >
                            Notify me
                          </button>
                        </div>
                      )}
                    </div>
                    {/* Pro Quantity Bar End */}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <SingleProductInfo
                p_name={p_name}
                brand_name={brand_name}
                youtube={youtube}
                p_price={p_price}
                percentage={percentage}
                star={star}
                short_description={short_description}
                short_description_hindi={short_description_hindi}
                pid={pid}
                product_url={product_url}
                category_name={category_name}
                old_price={old_price}
                p_code={p_code}
                stock_qty={stock_qty}
                what_we_offer={what_we_offer}
                singleProduct={singleProduct}
                meta_title={meta_title}
                meta_description={meta_description}
                meta_keywords={meta_keywords}
                categoryName={categoryName}
                hn={hn}
                subcategory={subcategory}
                SubcategoryUrl={SubcategoryUrl}
                handleAttribute={handleAttribute}
                selectedAttribute={selectedAttribute}
                review_count={review_count}
                executeScroll={executeScroll}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}

      <Suspense fallback={<>...</>}>
        <Chooseus />
      </Suspense>

      <Suspense fallback={<>...</>}>
        {/* Full Description Section */}

        {hn === undefined ? (
          <section className="full-desc py-2 my-2 bg-white">
            <div className="container">
              <div className="section-title text-center mb-50">
                <h2>Description</h2>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  {isReadMore ? (
                    <>
                      {description !== "" || description !== undefined
                        ? ReactHtmlParser(description.slice(0, 450) + "....")
                        : ReactHtmlParser(description)}
                    </>
                  ) : (
                    ReactHtmlParser(description)
                  )}
                  {/* <div className="show-more"> */}
                  <div className="text-center show-more">
                    <p
                      className="btn btn-rm-rl read-or-hide"
                      onClick={toggleReadMore}
                    >
                      {isReadMore ? (
                        <>
                          <span className="read-more">Read More</span>
                          <i
                            className="fa fa-plus-circle"
                            aria-hidden="true"
                          ></i>
                        </>
                      ) : (
                        <>
                          <span className="read-more">Read Less</span>
                          <i
                            className="fa fa-minus-circle"
                            aria-hidden="true"
                          ></i>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="full-desc py-2 my-2 bg-white">
            <div className="container">
              <div className="section-title text-center mb-50">
                <h2>Description</h2>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  {isReadMore ? (
                    <>
                      {description_hindi !== "" ||
                      description_hindi !== undefined
                        ? ReactHtmlParser(
                            description_hindi.slice(0, 450) + "...."
                          )
                        : ReactHtmlParser(description_hindi)}
                    </>
                  ) : (
                    ReactHtmlParser(description_hindi)
                  )}
                  <div className="text-center show-more">
                    <p
                      className="btn btn-rm-rl read-or-hide"
                      onClick={toggleReadMore}
                    >
                      {isReadMore ? (
                        <>
                          <span className="read-more">Read More</span>
                          <i
                            className="fa fa-plus-circle"
                            aria-hidden="true"
                          ></i>
                        </>
                      ) : (
                        <>
                          <span className="read-more">Read Less</span>
                          <i
                            className="fa fa-minus-circle"
                            aria-hidden="true"
                          ></i>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </Suspense>

      {/* Benefits Section */}
      <Suspense fallback={<>...</>}>
        <ProductBenefits />
      </Suspense>

      {/* Ingredients Section */}
      <Suspense fallback={<>...</>}>
        <ProductIngredients />
      </Suspense>

      <Suspense fallback={<>...</>}>
        {/* How to Use / Safety Instructons */}

        {(use_direction !== "" && use_direction !== null) ||
        (use_direction_hindi !== "" && use_direction_hindi !== null) ||
        (safety_instructions !== "" && safety_instructions !== null) ||
        (how_to_care !== "" && how_to_care !== null) ? (
          <section className="ht-use-sfty py-2 mt-2 bg-white">
            <div className="container">
              <div className="ht-use-sfty-wrapper">
                <Tab.Container
                
                  defaultActiveKey={
                    (use_direction !== "" && use_direction !== null) ||
                    (use_direction_hindi !== "" && use_direction_hindi !== null)
                      ? "uses"
                      : "how_to_care"
                  }
                >
                  <Nav variant="tabs" className="ht-use-sfty-topbar">
                    {(use_direction !== "" && use_direction !== null) ||
                    (use_direction_hindi !== "" &&
                      use_direction_hindi !== null) ? (
                      <Nav.Item>
                        <Nav.Link eventKey="uses">How to Use</Nav.Link>
                      </Nav.Item>
                    ) : (
                      ""
                    )}
                    {(safety_instructions !== "" &&
                      safety_instructions !== null) ||
                    (safety_instructions_en !== "" &&
                      safety_instructions_en !== null) ? (
                      <Nav.Item>
                        <Nav.Link eventKey="s_instructions">
                          Safety Instructions
                        </Nav.Link>
                      </Nav.Item>
                    ) : (
                      ""
                    )}
                    {(how_to_care !== "" && how_to_care !== null) ||
                    (how_to_care_en !== "" && how_to_care_en !== null) ? (
                      <Nav.Item>
                        <Nav.Link eventKey="how_to_care">How to Care</Nav.Link>
                      </Nav.Item>
                    ) : (
                      ""
                    )}
                  </Nav>
                  <Tab.Content className="ht-use-sfty-bottom">
                    <Tab.Pane eventKey="uses">
                      {/* Product Uses */}
                      <div className="row">
                        <div className="col-md-12">
                          <div className="product-uses">
                            {hn === undefined ? (
                              <div className="col-xl-12">
                                {ReactHtmlParser(use_direction)}
                              </div>
                            ) : (
                              <div className="col-xl-12">
                                {ReactHtmlParser(use_direction_hindi)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="s_instructions">
                      {/* Product Safety Instructions */}
                      <div className="row">
                        <div className="col-md-12">
                          <div className="pro-safety-inst">
                            {hn === undefined ? (
                              <div className="col-xl-12">
                                {ReactHtmlParser(safety_instructions)}
                              </div>
                            ) : (
                              <div className="col-xl-12">
                                {ReactHtmlParser(safety_instructions_en)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="how_to_care">
                      {/* Product how_to_care */}
                      <div className="row">
                        <div className="col-md-12">
                          <div className="pro-safety-inst">
                            {hn === undefined ? (
                              <div className="col-xl-12">
                                {ReactHtmlParser(how_to_care)}
                              </div>
                            ) : (
                              <div className="col-xl-12">
                                {ReactHtmlParser(how_to_care_en)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
      </Suspense>

      <Suspense fallback={<>...</>}>
        {/* Reviews Section */}
        <section className="description-review-area py-2 my-2 bg-white">
          <div className="container">
            <div className="description-review-wrapper">
              <Tab.Container defaultActiveKey="productReviews">
                <Nav variant="tabs" className="description-review-topbar">
                  <Nav.Item>
                    <Nav.Link eventKey="productReviews" ref={myRef}>
                      Reviews
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="customertestimonial">
                      Testimonials
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="productFAQ">FAQ</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="productVid">Customer Says</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content className="description-review-bottom">
                  <Tab.Pane eventKey="productReviews">
                    <Suspense fallback={<>...</>}>
                      <ProductReviews />
                    </Suspense>
                  </Tab.Pane>
                  <Tab.Pane eventKey="customertestimonial">
                    <Suspense fallback={<>...</>}>
                      <ProductTestimonial />
                    </Suspense>
                  </Tab.Pane>
                  <Tab.Pane eventKey="productFAQ">
                    <Suspense fallback={<>...</>}>
                      <ProductFaq />
                    </Suspense>
                  </Tab.Pane>
                  <Tab.Pane eventKey="productVid">
                    <Suspense fallback={<>...</>}>
                      <ProductVideos handleVideo={handleVideo} />
                    </Suspense>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </section>
      </Suspense>

      <div className="mobile-btn-active">
        {stock_qty > 0 ? (
          <>
            <div className="pro-details-cart">
              <button
                onClick={() => handleAddToCart(singleProduct)}
                className="w-100"
                disabled={disableCartBtn}
              >
                Add To Cart
              </button>
            </div>
            <div className="pro-details-buy-now">
              <button
                className="w-100"
                onClick={() => handleBuyNow(singleProduct)}
                disabled={disableCartBtn}
              >
                Buy Now
              </button>
            </div>
          </>
        ) : (
          <div className="pro-details-notify">
            <button
              className="w-100"
              onClick={() => {
                handleShow(true);
              }}
            >
              Notify me
            </button>
          </div>
        )}
      </div>

      {/* Similar Products Slider */}
      <Suspense fallback={<>...</>}>
        <SimilarProductsSlider />
      </Suspense>

      <Suspense fallback={<>...</>}></Suspense>
      {/* Best Selling Products Slider */}

      {/* Top Discount Products Slider */}
      <Suspense fallback={<>...</>}>
        <TopDiscountProductsSlider />
      </Suspense>

      {/* Brand Logos Slider */}
      <Suspense fallback={<>...</>}>
        <BrandLogo />
      </Suspense>

      {/* Section Certification */}
      <Suspense fallback={<>...</>}>
        <Certification />
      </Suspense>

      {/* Section Our Courier Cartners */}
      <Suspense fallback={<>...</>}>
        <CourierPartners />
      </Suspense>

      {/* Product Notify Start */}
      <Suspense fallback={<>...</>}>
        <ProductNotify
          product={singleProduct}
          show={show}
          handleClose={handleClose}
        />
      </Suspense>

      {/* Single Video Pop start */}
      <Suspense fallback={<>...</>}>
        <Modal
          show={videoShow}
          onHide={() => setVideoShow(false)}
          keyboard={false}
          className="video-popup"
        >
          <Modal.Body>
            <button className="closeButton" onClick={() => setVideoShow(false)}>
              <i className="fa fa-times"></i>
            </button>
            <div className="inner-video">
              <YouTube
                videoId={selectedVideo} // defaults -> null
                id={selectedVideo}
                auto
                opts={opts}
                onReady={(e) => {
                  e.target.playVideo();
                }}
              />
            </div>
          </Modal.Body>
        </Modal>
      </Suspense>
    </>
  );
};

export default React.memo(SingleProduct);
