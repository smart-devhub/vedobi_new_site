import React, { useState, useEffect, useCallback, memo } from "react";
import Swiper from "react-id-swiper";
import { baseUrl, token } from "../../utils/global";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHomeBanner } from "../../redux/products/products_actions";
//import CustomImage from "../Image/CustomImage";
//import CustomImage from "../Image/CustomImage"; 
import BannerPlaceholder from '../../assets/images/demo/banner/placeholder-banner.webp'

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const Api = "api/banner";
const url = baseUrl + Api;
function Slider() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const homeBanners = useSelector((state) => state.products.homeBanners);

  const params = {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    effect: 'fade',
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
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

  const fetchJobs = useCallback(async () => {
    const reponse = await axios.post(url, { token: token });
    const newJobs = await reponse.data;
    dispatch(setHomeBanner(newJobs));
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    setLoading(true)
    if (!homeBanners || homeBanners.length === 0) {
      fetchJobs();
    } else {
      setLoading(false);
    }
  }, [homeBanners, fetchJobs]);

  if (loading || !homeBanners || homeBanners.length === 0) {
    return (
      <img src={BannerPlaceholder} height="600" width="100%" className="img-fluid" alt="Place Holder" />
    );
  }


  return (
    <section className="slider-area">
      <div className="slider-active nav-style-1">
        <Swiper {...params}>
          {homeBanners.map((item, index) => {
            return (
              <div key={index}>
                <a href={item.urlImage} title="banner">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={item.mobile_image}
                      media="(max-width: 576px)"
                      height="500"
                      width="100%"
                    />
                    <source
                      type="image/webp"
                      srcSet={item.image}
                      media="(min-width: 576px)"
                      height="600"
                      width="100%"
                    />
                    <img
                      className="img-fluid w-100"
                      type="image/webp"
                      src={item.image}
                      alt="banner"
                      height="600"
                      width="100%"
                    />
                  </picture>

                  {/* <img
                    className="img-fluid w-100"
                    src={item.image}
                    alt="banner"
                    height="600"
                    width= "100%"
                  /> */}

                </a>
              </div>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

export default memo(Slider);
