import React, { useState } from "react";
import { baseUrl } from "../../utils/global";
import ReactHtmlParser from "react-html-parser";
import NoData from "../NoData/NoData";
import { useSelector } from "react-redux";

const ProductTestimonial = () => {
  const [visible, setVisible] = useState(4); 

  const singleProduct = useSelector((state) => state.products.singleProduct);
  if(!singleProduct){
    return null;
  } 
  
  const showMoreTesti = () => {
    setVisible((oldValue) => oldValue + 2);
  };

  return (
    <>
      {singleProduct?.TESTIMANIAL.length > 0 ? (
        <div className="pro_detail_testimonial">
          {singleProduct?.TESTIMANIAL.slice(0, visible).map((Row) => {
            return (
              <div className="pro-detail-cust-ttmnl" key={Row.id}>
                <div className="testimonial-img">
                  {Row.image !== "" ? (
                    <img
                      className="img-fluid"
                      src={Row.image}
                      alt={Row.name}
                    />
                  ) : (
                    <img
                      className="img-fluid"
                      src={baseUrl + "product_image/noimage.webp"}
                      alt={Row.name}
                    />
                  )}
                </div>
                <div className="ttmnl-content">
                  {ReactHtmlParser(Row.testimonial)}
                  <h4 className="customer-name">{Row.name}</h4>
                  <p className="customer-state">{Row.city}</p>
                </div>
              </div>
            );
          })}

          {visible === singleProduct?.TESTIMANIAL.length ? null : (
            <div className="text-center">
              {singleProduct?.TESTIMANIAL.length > 0 ? (
                <div className="loadmore-btn">
                  <button
                    onClick={showMoreTesti}
                    className="btn btn-loadmore"
                  >
                    Load More <i className="fa fa-refresh" />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default React.memo(ProductTestimonial);
