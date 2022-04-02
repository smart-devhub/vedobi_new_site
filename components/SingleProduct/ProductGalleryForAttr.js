import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import Loading from "../Loading/Loading";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import { useParams } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import { useSelector } from "react-redux";
 
const ProductGalleryAttr = ({ percentage, attributeData,  selectedAttribute }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const { pid } = useParams();
  const [loading, setLoading] = useState(false);
  const [gallery, setJobs] = useState([]);

  const singleProduct = useSelector((state) => state.products.singleProduct);

  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
    if (singleProduct) {
      const newGallery = singleProduct.Gallery;
      setJobs(newGallery);
    }
  }, [gallerySwiper, thumbnailSwiper, pid, singleProduct, setLoading]);

  useEffect(() => {
    if (attributeData) {
      const newGallery = [...gallery];

      const fillGallery = newGallery.filter(g => g.isAttr !== true);

      const gImageObj = {
        gid: attributeData.pid,
        pid: attributeData.pid,
        smallGalery: attributeData.product_cover_image,
        bigGalery: attributeData.product_cover_image,
        isAttr: true
      };
      fillGallery.unshift(gImageObj);
      setJobs(fillGallery);

      setTimeout(() => {
        gallerySwiper.slideTo(4)
      }, 200);
    } else if (singleProduct) {
      setJobs(singleProduct.Gallery);
    }
  }, [attributeData, singleProduct, gallerySwiper]);

  if (!singleProduct || gallery.length === 0) {
    return null;
  }

  //console.log('attr data ', gallerySwiper, thumbnailSwiper, gallery);

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    loop: true,
    slideToClickedSlide: true,
    direction: "vertical",
    breakpoints: {
      1200: {
        slidesPerView: 4,
        direction: "vertical",
      },
      992: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      320: {
        slidesPerView: 4,
        direction: "horizontal",
      },
    },
  };



  if (loading) {
    return (
      <Loading />
    );
  }

  //console.log("=========================Gallery==image",gallery);
  return (
    <>
      {/* Gallery Start */}
      <div className="row row-5">
        <div className="col-xl-10 order-1 order-xl-2">
          <div className="product-large-image-wrapper">
          {percentage > "0" ? (
              <div className="product-img-badges">
                {attributeData ? (
                  <>
                    {attributeData.percentage > 0 ? (
                      <span className="red">
                        {" "}
                        {attributeData.percentage} % OFF
                      </span>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <span className="red">{percentage} % OFF</span>
                )}
              </div>
            ) : (
              ""
            )}

            <LightgalleryProvider>
              <Swiper {...gallerySwiperParams}>

                {gallery?.map((item, di) => {
                  return (
                    <div key={di}>
                      <div className="single-image">
                        <ReactImageMagnify
                          className="magnifier"
                          {...{
                            smallImage: {
                              alt: "Gallery Big Image",
                              isFluidWidth: true,
                              src: item.bigGalery,
                              imageStyle: {
                                height: 500,
                              }
                            },
                            largeImage: {
                              src: item.bigGalery,
                              width: 800,
                              height: 800,
                            },
                            lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                            enlargedImagePosition: "over",
                          }}
                        />
                        <LightgalleryItem group="any" src={item.bigGalery}>
                          <button>
                            <i className="pe-7s-expand1"></i>
                          </button>
                        </LightgalleryItem>
                      </div>
                    </div>
                  );
                })}

              </Swiper>
            </LightgalleryProvider>
          </div>
        </div>
        <div className="col-xl-2 order-2 order-lg-1 order-md-1 order-xl-1">
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            <Swiper {...thumbnailSwiperParams}>
              {gallery?.map((item, di) => {
                return (
                  <div key={di}>
                    <div className="single-image">
                      <img
                        src={item.smallGalery}
                        className="img-fluid"
                        alt="Big Gallery"
                        height="120"
                        width="120"
                      />
                    </div>
                  </div>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
      {/* Gallery End */}
    </>
  );
};

export default React.memo(ProductGalleryAttr);
