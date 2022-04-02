import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Stars from "../../Stars/Stars";
import ReactHtmlParser from "react-html-parser";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./SingleProductInfo.scss";
import { baseUrl } from "../../../utils/global";
import { InlineShareButtons } from "sharethis-reactjs";
import PlaceholderImg from "../../../assets/images/demo/placeholder.webp";

const SingleProductInfo = ({
  youtube,
  p_id,
  p_name,
  p_price,
  old_price,
  star,
  p_code,
  short_description,
  short_description_hindi,
  percentage,
  brand_name,
  what_we_offer,
  product_url,
  categoryName,
  category_name,
  hn,
  handleAttribute,
  selectedAttribute,
  SubcategoryUrl,
  subcategory,
  review_count,
  executeScroll,
}) => {
  const { pid } = useParams();
  const [attributes, setJobs] = useState([]);

  const dispatch = useDispatch();

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  useEffect(() => {
    let controller = new AbortController();
    const Api = "api/attributesAll/" + pid;
    const url = baseUrl + Api;

    (async () => {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        const newJobs = await response.json();
        setJobs(newJobs.attributes);
        dispatch({
          type: "ADD_ATTRIBUTES_TO_PRODUCT_LIST",
          payload: newJobs.attributes,
        });
        controller = null;
      } catch (e) {
        // Handle fetch error
      }
    })();
    return () => controller?.abort();
  }, [pid, dispatch]);

  return (
    <>
      <div className="product-details-content ml-70">
        {/* Social Bar */}
        <div className="pro-details-social mb-2">
          <InlineShareButtons
            config={{
              alignment: "center",
              color: "social",
              enabled: true,
              font_size: 12,
              labels: "cta",
              language: "en",
              networks: [
                "whatsapp",
                "linkedin",
                "facebook",
                "twitter",
                "pinterest",
              ],
              padding: 5, // padding within buttons (INTEGER)
              radius: 30, // the corner radius on each button (INTEGER)
              show_total: false,
              size: 30, // the size of each button (INTEGER)

              // OPTIONAL PARAMETERS
              url: window.location.href, // (defaults to current url)
              image: { PlaceholderImg },
              description: short_description.slice(0, 150) + "...",
              title: p_name,
            }}
          />
        </div>

        <hr />

        <h2>{selectedAttribute ? selectedAttribute?.p_name : p_name}</h2>

        <div className="product-details-price">
          <span className="sell-price">
            <i className="fa fa-rupee" />{" "}
            {selectedAttribute ? selectedAttribute.p_price : p_price}
          </span>{" "}
          {old_price > p_price ? (
            <span className="old">
              {selectedAttribute ? (
                <>
                  {selectedAttribute.old_price > selectedAttribute.p_price ? (
                    <>
                      <i className="fa fa-rupee fs-16" />{" "}
                      {selectedAttribute.old_price}{" "}
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <i className="fa fa-rupee fs-16" />
                  {old_price}
                </>
              )}
            </span>
          ) : (
            ""
          )}
          {percentage > 0 ? (
            <span className="save-pill badge badge-pill">
              {selectedAttribute ? (
                <>
                  {selectedAttribute.percentage > 0
                    ? selectedAttribute.percentage + " % OFF"
                    : ""}
                </>
              ) : (
                percentage + " % OFF"
              )}
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="pro-details-rating-wrap">
          <Stars stars={star} />

          <div className="ttl-rating-reviews">
            <span onClick={executeScroll}>
              ({star > 0 ? star : 0} Ratings &#38;{" "}
              {review_count > 0 ? review_count : 0} Reviews)
            </span>
          </div>
        </div>

        {SubcategoryUrl !== undefined &&
        SubcategoryUrl !== null &&
        SubcategoryUrl !== "" ? (
          <div className="language-btn-bar">
            <NavLink
              exact
              className="lang-btn btn"
              to={`/product/${categoryName}/${SubcategoryUrl}/${product_url}/${pid}`}
            >
              English
            </NavLink>
            <NavLink
              exact
              className="lang-btn btn"
              to={`/product/${categoryName}/${SubcategoryUrl}/${product_url}/${pid}/hn`}
            >
              हिन्दी
            </NavLink>
          </div>
        ) : (
          <div className="language-btn-bar">
            <NavLink
              exact
              className="lang-btn btn"
              to={`/product/${categoryName}/${product_url}/${pid}`}
            >
              en
            </NavLink>
            <NavLink
              exact
              className="lang-btn btn"
              to={`/product/${categoryName}/subcat/${product_url}/${pid}/hn`}
            >
              hn
            </NavLink>
          </div>
        )}

        <p className="pro-details-brand-name">
          <span>Brand:</span> {brand_name}
        </p>

        <p className="pro-details-sku">
          <span>SKU:</span> {p_code}
        </p>
        {attributes.length > 0 ? (
          <div className="pro-details-attributes">
            <span>Select Your Pack:</span>
            <div className="attribute-wrapper">
              {attributes.map((attributesRow, index) => {
                return (
                  <div
                    className={`${
                      selectedAttribute?.pid === attributesRow.pid
                        ? "attributes-box selected"
                        : "attributes-box"
                    }`}
                    key={index}
                    onClick={() => handleAttribute(attributesRow)}
                  >
                    <img
                      src={attributesRow.product_cover_image}
                      alt="attribute"
                      height="40"
                      width="40"
                      className="img-fluid"
                    />
                    <p>{attributesRow.attributes_name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        {hn === undefined ? (
          <div className="pro-details-list">
            <h6 className="highlights-title">Key Benefits</h6>
            <ul className="highlights-list">
              {isReadMore ? (
                <>
                  {short_description !== "" || short_description !== undefined
                    ? ReactHtmlParser(short_description.slice(0, 350) + "...")
                    : ReactHtmlParser(short_description)}
                </>
              ) : (
                ReactHtmlParser(short_description)
              )}

              <div className="text-center show-more">
                <p
                  className="btn btn-rm-rl read-or-hide"
                  onClick={toggleReadMore}
                >
                  {isReadMore ? (
                    <>
                      <span className="read-more">Read More</span>
                      <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    </>
                  ) : (
                    <>
                      <span className="read-more">Read Less</span>
                      <i className="fa fa-minus-circle" aria-hidden="true"></i>
                    </>
                  )}
                </p>
              </div>
            </ul>
          </div>
        ) : (
          <div className="pro-details-list">
            <h6 className="highlights-title">मुख्य लाभ</h6>
            <ul className="highlights-list">
              {isReadMore ? (
                <>
                  {short_description !== "" || short_description !== undefined
                    ? ReactHtmlParser(
                        short_description_hindi.slice(0, 350) + "..."
                      )
                    : ReactHtmlParser(short_description_hindi)}
                </>
              ) : (
                ReactHtmlParser(short_description_hindi)
              )}
              <div className="text-center show-more">
                <p
                  className="btn btn-rm-rl read-or-hide"
                  onClick={toggleReadMore}
                >
                  {isReadMore ? (
                    <>
                      <span className="read-more">Read More</span>
                      <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    </>
                  ) : (
                    <>
                      <span className="read-more">Read Less</span>
                      <i className="fa fa-minus-circle" aria-hidden="true"></i>
                    </>
                  )}
                </p>
              </div>
            </ul>
          </div>
        )}

        {what_we_offer === null || what_we_offer === "" ? (
          ""
        ) : (
          <div className="pro-details-offer-area">
            <h5>What We Offer</h5>
            <div className="offer-list">{ReactHtmlParser(what_we_offer)}</div>
          </div>
        )}

        {youtube !== "" && youtube !== null ? (
          <div className="pro-details-video-area">
            <iframe
              className="yt-video"
              src={youtube}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default React.memo(SingleProductInfo);
