import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { baseUrl } from "../../utils/global";
import Stars from "../Stars/Stars";
import ReviewsRating from "../SingleProduct/ReviewsRating";
import NoData from "../NoData/NoData";
import ReactGA from 'react-ga';


const ProductReviewRatings = () => {
  const { pid } = useParams();
  const [review, setJobs] = useState([]);
  const [visible, setVisible] = useState(8);

  

  useEffect(() => {
    let controller = new AbortController();
    const Api = "api/product-details/" + pid;
    const url = baseUrl + Api;
    (async () => {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });
        const newJobs = await response.json();
        setJobs(newJobs.review);
        ReactGA.event('View Content');
        controller = null;
      } catch (e) {
        // Handle fetch error
      }
    })();
    return () => controller?.abort();
  }, [pid]);
  const showMoreReview = () => {
    setVisible((oldValue) => oldValue + 8);
  };



  return (
    <div className="Pro-review-rating">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            {review.length > 0 ?
              <div className="review-wrapper">
                {review.slice(0, visible).map((item, index) => {
                  return (
                    <div className="single-review" key={index}>
                      <div className="review-img">
                        {item.image !== "" ? (
                          <img
                            className="img-fluid"
                            src={item.image}
                            alt={item.user_name}
                          />
                        ) : (
                          <div className="alpha-ltr">
                            {item.first_letter}
                          </div>
                        )}
                      </div>
                      <div className="review-content">
                        <div className="review-top-wrap">
                          <div className="review-left">
                            <div className="review-name">
                              <h4>{item.user_name}</h4>
                            </div>
                            <div className="review-rating">
                              <Stars stars={item.star} />
                            </div>
                          </div>
                          {item.certified !== "" && item.certified !== null ? (
                            <div className="review-right">
                              <p><span className="icon"><i className="fa fa-check-square-o" /></span>{item.certified}</p>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="review-bottom">
                          <p className="review-date">{item.create_dt}</p>
                          <p className="review-txt">{item.review}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {visible === review.length ? null : (
                  <div className="loadmore-btn">
                    {review.length > 0 ? (
                      <button onClick={showMoreReview} className="btn btn-loadmore">
                        Load More <i className="fa fa-refresh" />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
              :
              <NoData />
            }
          </div>
          <div className="col-lg-5">
            <ReviewsRating pid={pid} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductReviewRatings);
