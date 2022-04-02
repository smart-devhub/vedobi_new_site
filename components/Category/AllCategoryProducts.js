import React, { useState } from "react";
import Product from "../Product/Product";
import { InView } from "react-intersection-observer";


const AllCategoryProducts = ({ products }) => {
  const [visible, setVisible] = useState(8);
  const showMoreProducts = () => { 
    setVisible((oldValue) => oldValue + 8);
  };

  const changeHandlerScroller = (inView) => {
    if (inView) {
        showMoreProducts();
    }
  };


  return (
    <div className="shop-grid">
      <div className="container">
        <div className="row">
          {products.slice(0, visible).map((product) => {
            return (
              <div
                key={product.pid}
                className="col-lg-3 col-md-4 col-sm-6 col-6"
              >
                <Product product={product} />
              </div>
            );
          })}
        </div>
        <InView as="div" onChange={changeHandlerScroller}>
          <div>{/* Scrolling work */}</div>
        </InView>
      </div>

      {/* {visible <= products.length ? (
        <div className="loadmore-btn">
          <div style={{ textAlign: "center" }} className="col-12  pt-3">
            <button onClick={showMoreProducts} className="btn btn-loadmore">
              Load More <i className="fa fa-refresh" />
            </button>
          </div>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default React.memo(AllCategoryProducts);
