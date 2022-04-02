import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const ProductBenefits = () => {
  const { hn } = useParams();

  const singleProduct = useSelector((state) => state.products.singleProduct);

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  if (!singleProduct) {
    return null;
  }

  

  return (
    <section className="benefits py-2 my-2 bg-white">
      {singleProduct?.Benefits.length !== 0 ? (
        <div className="container">
          <div className="section-title text-center mb-50">
            <h2>Benefits</h2>
          </div>
          <div className="row">
            <div className="col-md-12">
              {isReadMore ? (
                <>
                  {singleProduct.Benefits.length !== 0 ||
                  singleProduct.Benefits.length !== undefined ? (
                    <ul className="single-benefit-ingredient">
                      {singleProduct.Benefits.slice(0, 7).map((item, index) => {
                        return (
                          <li key={index}>
                            {hn === undefined ? (
                              <>
                                <span className="title">
                                  {item.product_benefits_name_english}:{" "}
                                </span>
                                {item.product_benefits_english}
                              </>
                            ) : (
                              <>
                                <span className="title">
                                  {item.product_benefits_name_hindi}:{" "}
                                </span>
                                {item.product_benefits_hindi}
                              </>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <ul className="single-benefit-ingredient">
                      {singleProduct.Benefits.map((item, index) => {
                        return (
                          <li key={index}>
                            {" "}
                            {hn === undefined ? (
                              <>
                                <span className="title">
                                  {item.product_benefits_name_english}:{" "}
                                </span>
                                {item.product_benefits_english}
                              </>
                            ) : (
                              <>
                                <span className="title">
                                  {item.product_benefits_name_hindi}:{" "}
                                </span>
                                {item.product_benefits_hindi}
                              </>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              ) : (
                <ul className="single-benefit-ingredient">
                  {singleProduct.Benefits.map((item, index) => {
                    return (
                      <li key={index}>
                        {" "}
                        {hn === undefined ? (
                          <>
                            <span className="title">
                              {item.product_benefits_name_english}:{" "}
                            </span>
                            {item.product_benefits_english}
                          </>
                        ) : (
                          <>
                            <span className="title">
                              {item.product_benefits_name_hindi}:{" "}
                            </span>
                            {item.product_benefits_hindi}
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
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
            </div>
            {/* {benefits.map((item, index) => {
              return (

                
                  <li key={index}><span className="">:</span></li>
                </ul>
                <div
                  className="col-xl-3 col-lg-3 col-md-4 col-sm-6"
                  key={index}
                >
                  <div className="single-benefit">
                    {item.image !== "" ? (
                      <img
                        src={item.image}
                        className="img-fluid w-100"
                        alt="Benefit"
                      />
                    ) : (
                      ""
                    )}
                    {hn === undefined ? (
                      <div className="content">
                        <h5 className="title">
                          {item.product_benefits_name_english}
                        </h5>
                        <p className="desc">
                          <ReactReadMoreReadLess
                            charLimit={90}
                            readMoreText={"Read more"}
                            readLessText={"Read less"}
                            readMoreClassName="read-more-less--more"
                            readLessClassName="read-more-less--less"
                          >
                            {item.product_benefits_english}
                          </ReactReadMoreReadLess>
                        </p>
                      </div>
                    ) : (
                      <div className="content">
                        <h5 className="title">
                          {item.product_benefits_name_hindi}
                        </h5>
                        <p className="desc">
                          <ReactReadMoreReadLess
                            charLimit={90}
                            readMoreText={"Read more"}
                            readLessText={"Read less"}
                            readMoreClassName="read-more-less--more"
                            readLessClassName="read-more-less--less"
                          >
                            {item.product_benefits_hindi}
                          </ReactReadMoreReadLess>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default React.memo(ProductBenefits);
