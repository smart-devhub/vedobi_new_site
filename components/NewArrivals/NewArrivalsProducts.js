import React, {useState} from "react";
import { useSelector } from "react-redux";
import Title from "../Title/Title";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";

const NewArrivalsProducts = ({ arrivalsProducts }) => {
  const { loading } = useSelector((state) => state.products);

  const [visible] = useState(8);
  

  if (loading) {
    return (
      <section className="py-5 overflow-hidden">
        <div className="container">
          <Title title="New Arrivals" />
          <div className="row">
            <div className="col-10 mx-auto col-md-6">
              <Loading />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-2 my-2 bg-white overflow-hidden">
        <div className="container">
          <Title title="New Arrivals" />
          <div className="product-grid">
            <div className="container">
              <div className="row">
                {arrivalsProducts.slice(0, visible).map((product, key) => {
                  return (
                    <div key={key} className="col-md-4 col-lg-3 col-sm-6 col-6">
                      <Product product={product} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(NewArrivalsProducts);
