import React, { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
// import ReactReadMoreReadLess from "react-read-more-read-less";
import ReactHtmlParser from "react-html-parser";

const ProductIngredients = () => {
  const { hn } = useParams();

  const singleProduct = useSelector((state) => state.products.singleProduct);

  const [isReadMore, setIsReadMore] = useState(true);
  const [readMore, setReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const openReadMore = () => {
    setReadMore(!readMore);
  };

  if (!singleProduct) {
    return null;
  }


  return (
    <section className="ingredients py-2 my-2 bg-white">
      {singleProduct?.Ingredients.length !== 0 ||
      singleProduct?.comboproductchk !== null ? (
        <div className="container">
          <div className="section-title text-center mb-50">
            <h2>Ingredients</h2>
          </div>
          <div className="row">
            {singleProduct?.comboproductchk !== null ? (
              <>
                {hn === undefined ? (
                  <>
                    <div className="col-md-6 mb-4">
                      {isReadMore ? (
                        <>
                          {singleProduct.comboproduct_ingredients_en !== null ||
                          singleProduct.comboproduct_ingredients_en !== "" ||
                          singleProduct.comboproduct_ingredients_en !==
                            undefined
                            ? ReactHtmlParser(
                                singleProduct?.comboproduct_ingredients_en.slice(
                                  0,
                                  850
                                ) + "..."
                              )
                            : ReactHtmlParser(
                                singleProduct?.comboproduct_ingredients_en
                              )}
                        </>
                      ) : (
                        ReactHtmlParser(
                          singleProduct?.comboproduct_ingredients_en
                        )
                      )}
                      <div className="text-center show-more">
                        <p
                          className="btn btn-rm-rl read-or-hide"
                          onClick={toggleReadMore}
                        >
                          {isReadMore ? (
                            <>
                              <span className="read-more">Read More</span>
                              <i
                                className="fa fa-plus-circle"
                                aria-hidden="true"
                              ></i>
                            </>
                          ) : (
                            <>
                              <span className="read-more">Read Less</span>
                              <i
                                className="fa fa-minus-circle"
                                aria-hidden="true"
                              ></i>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      {readMore ? (
                        <>
                          {singleProduct.comboproduct_ingredients_en_second !==
                            null ||
                          singleProduct.comboproduct_ingredients_en_second !==
                            undefined ||
                          singleProduct.comboproduct_ingredients_en_second !==
                            ""
                            ? ReactHtmlParser(
                                singleProduct?.comboproduct_ingredients_en_second.slice(
                                  0,
                                  850
                                ) + "..."
                              )
                            : ReactHtmlParser(
                                singleProduct?.comboproduct_ingredients_en_second
                              )}
                        </>
                      ) : (
                        ReactHtmlParser(
                          singleProduct?.comboproduct_ingredients_en_second
                        )
                      )}
                      <div className="text-center show-more">
                        <p
                          className="btn btn-rm-rl read-or-hide"
                          onClick={openReadMore}
                        >
                          {readMore ? (
                            <>
                              <span className="read-more">Read More</span>
                              <i
                                className="fa fa-plus-circle"
                                aria-hidden="true"
                              ></i>
                            </>
                          ) : (
                            <>
                              <span className="read-more">Read Less</span>
                              <i
                                className="fa fa-minus-circle"
                                aria-hidden="true"
                              ></i>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-6 mb-4">
                      {isReadMore ? (
                        <>
                          {singleProduct.comboproduct_ingredients_hn !== null ||
                          singleProduct.comboproduct_ingredients_hn !==
                            undefined ||
                          singleProduct.comboproduct_ingredients_hn !== ""
                            ? ReactHtmlParser(
                                singleProduct?.comboproduct_ingredients_hn.slice(
                                  0,
                                  850
                                ) + "..."
                              )
                            : ReactHtmlParser(
                                singleProduct?.comboproduct_ingredients_hn
                              )}
                        </>
                      ) : (
                        ReactHtmlParser(
                          singleProduct?.comboproduct_ingredients_hn
                        )
                      )}
                      <div className="text-center show-more">
                        <p
                          className="btn btn-rm-rl read-or-hide"
                          onClick={toggleReadMore}
                        >
                          {isReadMore ? (
                            <>
                              <span className="read-more">Read More</span>
                              <i
                                className="fa fa-plus-circle"
                                aria-hidden="true"
                              ></i>
                            </>
                          ) : (
                            <>
                              <span className="read-more">Read Less</span>
                              <i
                                className="fa fa-minus-circle"
                                aria-hidden="true"
                              ></i>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      {readMore ? (
                        <>
                          {singleProduct.comboproduct_ingredients_hn_second !==
                            null ||
                          singleProduct.comboproduct_ingredients_hn_second !==
                            undefined ||
                          singleProduct.comboproduct_ingredients_hn_second !==
                            ""
                            ? ReactHtmlParser(
                                singleProduct?.comboproduct_ingredients_hn_second.slice(
                                  0,
                                  850
                                ) + "..."
                              )
                            : ReactHtmlParser(
                                singleProduct?.comboproduct_ingredients_hn_second
                              )}
                        </>
                      ) : (
                        ReactHtmlParser(
                          singleProduct?.comboproduct_ingredients_hn_second
                        )
                      )}
                      <div className="text-center show-more">
                        <p
                          className="btn btn-rm-rl read-or-hide"
                          onClick={openReadMore}
                        >
                          {readMore ? (
                            <>
                              <span className="read-more">Read More</span>
                              <i
                                className="fa fa-plus-circle"
                                aria-hidden="true"
                              ></i>
                            </>
                          ) : (
                            <>
                              <span className="read-more">Read Less</span>
                              <i
                                className="fa fa-minus-circle"
                                aria-hidden="true"
                              ></i>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="col-md-12">
                {isReadMore ? (
                  <>
                    {singleProduct.Ingredients.lenglth !== 0 ? (
                      <ul className="single-benefit-ingredient">
                        {singleProduct?.Ingredients.slice(0, 7).map(
                          (item, index) => {
                            return (
                              <li key={index}>
                                {" "}
                                {hn === undefined ? (
                                  <>
                                    <span className="title">
                                      {item.product_ingredients_name_english}:
                                    </span>
                                    {item.product_ingredients_english}
                                  </>
                                ) : (
                                  <>
                                    <span className="title">
                                      {item.product_ingredients_name_hindi}:{" "}
                                    </span>
                                    {item.product_ingredients_hindi}
                                  </>
                                )}
                              </li>
                            );
                          }
                        )}
                      </ul>
                    ) : (
                      <ul className="single-benefit-ingredient">
                        {singleProduct?.Ingredients.map((item, index) => {
                          return (
                            <li key={index}>
                              {" "}
                              {hn === undefined ? (
                                <>
                                  <span className="title">
                                    {item.product_ingredients_name_english}:
                                  </span>
                                  {item.product_ingredients_english}
                                </>
                              ) : (
                                <>
                                  <span className="title">
                                    {item.product_ingredients_name_hindi}:{" "}
                                  </span>
                                  {item.product_ingredients_hindi}
                                </>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <>
                    <ul className="single-benefit-ingredient">
                      {singleProduct?.Ingredients.map((item, index) => {
                        return (
                          <li key={index}>
                            {" "}
                            {hn === undefined ? (
                              <>
                                <span className="title">
                                  {item.product_ingredients_name_english}:
                                </span>
                                {item.product_ingredients_english}
                              </>
                            ) : (
                              <>
                                <span className="title">
                                  {item.product_ingredients_name_hindi}:{" "}
                                </span>
                                {item.product_ingredients_hindi}
                              </>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </>
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
                        <i
                          className="fa fa-minus-circle"
                          aria-hidden="true"
                        ></i>
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default React.memo(ProductIngredients);
