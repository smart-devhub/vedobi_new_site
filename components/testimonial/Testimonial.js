import React, { useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import { ImgUrl, baseUrl } from "../../utils/global";
import ReactHtmlParser from "react-html-parser";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const Api = "api/testimonial-all";
const url = baseUrl + Api;
function Testimonial() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const reponse = await fetch(url);
    const newJobs = await reponse.json();
    setJobs(newJobs);
    setLoading(false);
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  if (loading) {
    return (
      <section className="section loading">
        <p>Loading...</p>
      </section>
    );
  }

  const settings = {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  };

  return (
    <div
      className="testimonial-area pt-50 pb-50 bg-gray-3 ml-70 mr-70 bg-gray-3"
      data-aos="fade-up"
    >
      <div className="container">
        <div className="section-title text-center mb-30">
          <h2>Customer Says</h2>
        </div>
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="testimonial-active nav-style-1 nav-testi-style ">
              <Swiper {...settings}>
                {jobs.map((item) => {
                  return (
                    <div className="swiper-slide" key={item.id}>
                      <div className="single-testimonial text-center">
                        {item.image !== "" ? (
                          <img src={ImgUrl + item.image} alt={item.name} className="img-fluid" loading="lazy" height="90" width="90" />
                        ) : (
                          <img
                            className="img-fluid"
                            src={baseUrl+'product_image/noimage.jpg'}
                            alt={item.name}
                            loading="lazy"
                            height="90"
                            width="90"
                          />
                        )}
                        {ReactHtmlParser(item.testimonial)}
                        <div className="client-info">
                          <i className="fa fa-quote-left"></i>
                          <h5>{item.name}</h5>
                          <span>{item.city}</span>
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
    </div>
  );
}

export default React.memo(Testimonial);
