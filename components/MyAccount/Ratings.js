import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaTags from "react-meta-tags";
import SidebarMain from "./SidebarMain";
import { Link } from "react-router-dom";
import Stars from "../../components/Stars/Stars";
import { fetchReviews } from "../../redux/products/products_actions";
import LayoutOne from "../../LayoutOne";

function Ratings() {
  let dispatch = useDispatch();

  const { user, UserReviews } = useSelector((state) => state.products);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    dispatch(fetchReviews(user.id));
    setLoading(true)
  }, [dispatch,user.id]);

  
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
                        Reviews & Ratings
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
                  <h2 className="tabcontent-title">Reviews & Ratings</h2>
                

                  <div className="myaccount-info-wrapper">
                    {loading ? (
                      <p>Loading... your Reviews</p>
                    ) : (
                      <>
                        {UserReviews.length > 0 ? (
                          <div className="product_rating">
                            {UserReviews.map((userreview, index) => {
                              return (
                                <div
                                  className="product_rating__details"
                                  key={index}
                                >
                                  <div className="product_rating__details__image">
                                    <img
                                      src={userreview.product_cover_image}
                                      className="img-fluid"
                                      alt="Big Gallery"
                                    />
                                  </div>
                                  <div className="product_rating__content">
                                    <h4 className="product_rating__product-name">
                                      <Link
                                        to={`/product/${userreview.categoryName}/${userreview.SubcategoryUrl}/${userreview.product_url}/${userreview.pid}`}
                                        className="order_modal_details__product"
                                      >
                                        {userreview.p_name}
                                      </Link>
                                    </h4>
                                    <p className="product_rating__content-stars">
                                      <span className="rating">Rating :</span>
                                      <Stars
                                        className="product-rating"
                                        stars={userreview.star}
                                      />
                                    </p>
                                    <p className="product_rating__content-date">
                                      <i className="fa fa-calendar" aria-hidden="true"></i>
                                      <span className="date">
                                        {userreview.create_dt}
                                      </span>
                                      {userreview.status === "Pending" ? (
                                        <span className="badge bg-warning">
                                          {userreview.status}
                                        </span>
                                      ) : (
                                        <span className="badge bg-success">
                                          {userreview.status}
                                        </span>
                                      )}
                                    </p>
                                    <p className="product_rating__content-reviews">
                                      <span className="review">Review :</span>
                                      {userreview.review}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          "No Reviews Found!"
                        )}
                      </>
                    )}
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

export default React(Ratings);
