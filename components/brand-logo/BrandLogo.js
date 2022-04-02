import React from "react";
//import { useSelector, useDispatch } from "react-redux";
import Swiper from "react-id-swiper";
// import { ImgUrl, baseUrl } from "../../utils/global";
//import { fetchBrandLogo } from "../../redux/products/products_actions";
import brandLogo1 from "../../assets/images/brand-logo/brand-logo-1.webp";
import brandLogo2 from "../../assets/images/brand-logo/brand-logo-2.webp";
import brandLogo3 from "../../assets/images/brand-logo/brand-logo-3.webp";
import brandLogo4 from "../../assets/images/brand-logo/brand-logo-4.webp";
import brandLogo5 from "../../assets/images/brand-logo/brand-logo-5.webp";
import brandLogo6 from "../../assets/images/brand-logo/brand-logo-6.webp";
import brandLogo7 from "../../assets/images/brand-logo/brand-logo-7.webp";

function BrandLogo() {

  // const BrandLogoData = useSelector((state) => state.products.BrandLogoData);
  // const dispatch = useDispatch();

  const Brand_settings = {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    grabCursor: true,
    breakpoints: {
      1024: {
        slidesPerView: 6,
      },
      768: {
        slidesPerView: 4,
      },
      640: {
        slidesPerView: 3,
      },
      320: {
        slidesPerView: 2,
      },
    },
  };


  // useEffect(() => {
  //   dispatch(fetchBrandLogo());
  // }, [dispatch]);


  return (
    <section className="brand-logo-area py-2 my-2 bg-white" >
      <div className="container" >
        <div className="brand-logo-active" >
          <Swiper {...Brand_settings} >
            {/* {BrandLogoData.map((item) => {
                                return (
                                    <div className="single-brand-logo text-center swiper-slide" key={item.id}>
                                        <img src={ImgUrl + item.logo} alt={item.title} className="img-fluid" height="150" width="150" />
                                    </div>
                                );
                            })
                        } */}

            <div className="single-brand-logo text-center swiper-slide">
              <img src={brandLogo1} className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
            <div className="single-brand-logo text-center swiper-slide">
              <img src={brandLogo2} className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
            <div className="single-brand-logo text-center swiper-slide">
              <img src={brandLogo3} className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
            <div className="single-brand-logo text-center swiper-slide">
              <img src={brandLogo4} className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
            <div className="single-brand-logo text-center swiper-slide">
              <img src={brandLogo5} className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
            <div className="single-brand-logo text-center swiper-slide">
              <img src={brandLogo6} className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
            <div className="single-brand-logo text-center swiper-slide">
              <img src={brandLogo7} className="img-fluid" alt="Brand Logo" height="100" width="100" />
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default React.memo(BrandLogo);
