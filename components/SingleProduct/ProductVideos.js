import React from "react";
import NoData from "../NoData/NoData";
import { useSelector } from "react-redux";

const ProductVideos = ({ handleVideo }) => {
  const singleProduct = useSelector((state) => state.products.singleProduct);
  if (!singleProduct) {
    return null;
  }

  return (
    <>
      {singleProduct?.Video.length > 0 ? (

        <div className="pro-detail-video-wrapper">
          <div className="container">
            <div className="row">
              {singleProduct?.Video.map((data) => {
                return (
                  <div className="col-md-4" key={data.url}>
                    <div className="single-video-box" >
                      <img
                        src={`https://img.youtube.com/vi/${data.url}/sddefault.jpg`}
                        className="img-fluid"
                        alt="youtube"
                        loading="lazy"
                        height="300"
                        width="450"
                        onClick={() => handleVideo(data.url)}
                      />
                      <span className="video-icon">
                        <i className="fa fa-video-camera"></i>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default React.memo(ProductVideos);
