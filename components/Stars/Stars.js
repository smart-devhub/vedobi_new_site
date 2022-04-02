import React from "react";

const Stars = ({ stars }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <i className="fa fa-star" />
        ) : stars >= number ? (
          <i className="fa fa-star-half-o" />
        ) : (
          <i className="fa fa-star-o" />
        )}
      </span>
    );
  });

  return <div className="product-rating">{tempStars}</div>;
};

export default Stars;
