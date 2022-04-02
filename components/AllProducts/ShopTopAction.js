import React from "react";
const ShopTopAction = ({
  getFilterSortParams,
  sortedProductCount
}) => {
  return (
    <div className="shop-top-bar mb-20">
      <div className="select-shoing-wrap">
        <div className="shop-select">
          <select
            onChange={e => getFilterSortParams("filterSort", e.target.value)}
          >
            <option value="default">Default</option>
            <option value="highLow">Price - High to Low</option>
            <option value="lowHigh">Price - Low to High</option>
            <option value="az">A to Z</option>
         	 <option value="za">Z to A</option>
          </select>
        </div>
        <p>
          Showing Total Products {sortedProductCount}
        </p>
      </div>

      <div className="shop-tab">
      
      </div>
    </div>
  );
};



export default ShopTopAction;
