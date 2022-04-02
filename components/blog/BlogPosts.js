import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InlineShareButtons } from "sharethis-reactjs";
import PlaceholderImg from "../../assets/images/demo/placeholder.webp";
import { fetchBlogViewCount } from "../../redux/products/products_actions";
import { InView } from "react-intersection-observer";

const BlogPosts = ({ BlogPost }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(12);
  const [loading, setLoading] = useState(false);
  const showMoreProducts = () => {
    setVisible((oldValue) => oldValue + 12);
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);
  const handleViewCount = (id) => {
    dispatch(fetchBlogViewCount(id));
  };

  const changeHandlerScroller = (inView) => {
    if (inView) {
        showMoreProducts();
    }
  };

  //console.log(BlogPost)

  return (
    <>
      {BlogPost.slice(0, visible).map((postData, index) => {
        return (
          <div className="col-lg-6 col-md-6 col-sm-12" key={index}>
            <div className="blog-wrap-2 mb-30">
              <div className="blog-img-2">
                {loading ? (
                  <img
                    src={PlaceholderImg}
                    alt="Placeholder"
                    className="img-fluid img-loading"
                    height="270"
                    width="100%"
                  />
                ) : (
                  <Link
                    to={`/blogs/ayurveda-book/${postData.url}`}
                    onClick={() => handleViewCount(postData.id)}
                  >
                    <img
                      height={postData.small_image.height}
                      width="100%"
                      src={postData.small_image}
                      alt={postData.title}
                      className="img-fluid"
                    />
                  </Link>
                )}
              </div>
              <div className="blog-content-2">
                <div className="blog-meta-2">
                  <ul>
                    <li>{postData.create_at}</li>
                  </ul>
                </div>
                <h4>
                  <Link
                    to={`/blogs/ayurveda-book/${postData.url}`}
                    onClick={() => handleViewCount(postData.id)}
                  >
                    {postData.title}
                  </Link>
                </h4>
                <p>{postData.description}</p>
                <div className="blog-share-comment">
                  <div className="blog-btn-2">
                    <Link
                      to={`/blogs/ayurveda-book/${postData.url}`}
                      onClick={() => handleViewCount(postData.id)}
                    >
                      read more
                    </Link>
                  </div>
                  <div className="blog-share">
                    <span>share :</span>
                    <div className="share-social">
                      <InlineShareButtons
                        config={{
                          alignment: "center", // alignment of buttons (left, center, right)
                          color: "social", // set the color of buttons (social, white)
                          enabled: true, // show/hide buttons (true, false)
                          font_size: 12, // font size for the buttons
                          labels: "cta", // button labels (cta, counts, null)
                          language: "en", // which language to use (see LANGUAGES)
                          networks: [
                            // which networks to include (see SHARING NETWORKS)

                            "facebook",
                            "twitter",
                            "pinterest",
                          ],
                          padding: 12, // padding within buttons (INTEGER)
                          radius: 30, // the corner radius on each button (INTEGER)
                          show_total: false,
                          size: 30, // the size of each button (INTEGER)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <InView as="div" onChange={changeHandlerScroller}>
        <div>{/* Scrolling work */}</div>
      </InView>

      {/* {visible <= BlogPost.length ? (
        <div className="col-md-12 mx-auto">
          <div className="loadmore-btn text-center mt-20">
            <div style={{ textAlign: "center" }} className="col-12  pt-3">
              <button onClick={showMoreProducts} className="btn btn-loadmore">
                Load More <i className="fa fa-refresh" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}
    </>
  );
};

export default React.memo(BlogPosts);
